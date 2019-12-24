# crontab

# Docker部署Redis集群



# [搭建Docker]



```undefined
➜ yum -y install docker
```

# 从docker库获取redis镜像



```undefined
➜ docker pull redis
```

# 创建redis容器([run命令]

创建6个容器，3主3从。接下来先为这6个容器创建6个不同的目录、端口和配置文件。



```bash
# 在 /home 目录下创建redis-cluster-test 文件夹
➜ mkdir -p /home/redis-cluster-test
➜ cd  /home/redis-cluster-test
➜ vim redis-cluster.conf

# 把下列信息写入redis-cluster.conf文件中
  port ${PORT}
  cluster-enabled yes
  cluster-config-file nodes.conf
  cluster-node-timeout 5000
  appendonly yes

# 在 /home/redis-cluster-test 目录下生成conf和data目录，并生成配置文件
➜ for port in `seq 6380 6385`; do 
    mkdir -p ./${port}/conf && PORT=${port} envsubst < ./redis-cluster.conf > ./${port}/conf/redis.conf && mkdir -p ./${port}/data;
  done

# tree命令查看目录(如果命令不存在，执行安装命令：yum -y install tree)
➜ tree
.
├── 6380
│   ├── conf
│   │   └── redis.conf
│   └── data
├── 6381
│   ├── conf
│   │   └── redis.conf
│   └── data
├── 6382
│   ├── conf
│   │   └── redis.conf
│   └── data
├── 6383
│   ├── conf
│   │   └── redis.conf
│   └── data
├── 6384
│   ├── conf
│   │   └── redis.conf
│   └── data
├── 6385
│   ├── conf
│   │   └── redis.conf
│   └── data
└── redis-cluster.conf

18 directories, 7 files

# 创建6个redis容器
➜ for port in `seq 6380 6385`; do 
     docker run --net=host --name=redis-${port} -v `pwd`/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf -d redis:latest redis-server /usr/local/etc/redis/redis.conf; 
  done
```

# redis-trib.rb启动主从集群



```bash
# 如果没有ruby，请执行 yum -y install ruby
➜ gem install redis

# 通过locate或find命令查找 `redis-trib.rb`文件位置，
➜ locate redis-trib.rb
  /var/files/redis-3.2.0/src/redis-trib.rb

# 创建软连接到bin目录
➜ ln -s  /var/files/redis-3.2.0/src/redis-trib.rb /usr/local/bin/redis-trib.rb

# 启动集群
➜ myiplist=''
➜ for port in `seq 6380 6385 `; do
      myiplist=${myiplist}' '"127.0.0.1:"${port};
  done
➜ redis-trib.rb create --replicas 1 `echo ${myiplist}`
```

- [设置Ruby报错bad response Not Found 404](https://www.jianshu.com/p/60f3707cb3ce)
- 终端提示：`Can I set the above configuration? (type 'yes' to accept): yes`时，输入 `yes`
- 创建完成后提示：`[OK] All 16384 slots covered.`

# Redis客户端测试

> 进入redis客户端：`redis-cli -c -h ip地址 -p 端口号`

- -c 参数为连接集群
- -p 端口号6380-6385中的任意一个皆可



```css
➜ redis-cli -c -p 6380
127.0.0.1:6380> set say "hello world"
-> Redirected to slot [5885] located at 127.0.0.1:6381
OK
127.0.0.1:6380> set from "China..."
-> Redirected to slot [11836] located at 127.0.0.1:6382
OK
```

上例中，key为“say”，存入了端口号为6381的容器；key为“from”存入端口号为6382的容器。

> 在redis客户端中，使用`info` 或 `info Replication`命令查看某个容器的主从配置信息



```csharp
127.0.0.1:6381> info replication
# Replication
role:master // 角色为master 
connected_slaves:1 // 有一个slave连接
slave0:ip=127.0.0.1,port=6384,state=online,offset=3991,lag=1 // slave的IP、端口、状态、复制偏移量
master_replid:37b6db251b966f8372d829a60b5847bcf3870bae 
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:3991 // 当前master记录的复制偏移量。此例中master和slave的offset相同，说明此刻slave已经复制到最新的数据。
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:3991
```

> 非集群方式登陆查看某个容器存储的值



```css
# 进入6381
➜ redis-cli -p 6381
127.0.0.1:6383> keys *
1) "say"

# 进入6381的slave 6384，结果与6381相一致
➜ redis-cli -p 6384
127.0.0.1:6384> keys *
1) "say"

# 再看下另一个主容器6382的存储情况，与6381、6384 不同
➜ redis-cli -p 6382
127.0.0.1:6382> keys *
1) "from"
```

# PHP(predis)连接集群测试（生产中推荐使用phpredis）

> 下载predis



```swift
➜ wget https://github.com/nrk/predis/archive/v1.0.zip
➜ unzip v1.0.zip
```

> 创建test.php 文件，写入下列代码



```php
<?php
// 连接本地的 Redis 服务
require 'predis-1.0/autoload.php';
// 可以是集群中的任意一个IP，也可以是多个
$parameters = ['tcp://127.0.0.1:6380', 'tcp://127.0.0.1:6381',];
$options    = ['cluster' => 'redis'];
$redis = new Predis\Client($parameters, $options);
// 为测试方便，一次多存储几个
for ($i = 0; $i <5; $i++) {
  $x = rand(10,100);
  $key = "k" . $x;
  // 设置 redis 字符串数据
  $redis->set($key, "say " . $x); 
  // 获取存储的数据并输出
  $result = $redis->get($key);  
  // 输出结果
  echo "key: " . $key . '  value: ' . $result . "\n";
}
```

> 执行php文件，查看结果



```csharp
➜ php test.php
key: k35  value: say 35
key: k33  value: say 33
key: k61  value: say 61
key: k46  value: say 46
key: k49  value: say 49
```

## 几个命令



```ruby
# 查看运行中的容器
➜ docker ps 
# 删除刚创建的redis集群(先stop再rm) --- 批量操作，谨慎使用
➜ docker rm $(docker ps -a |grep redis-6| awk '{ print $1}') 
```