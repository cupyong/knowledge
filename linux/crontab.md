# crontab

**安装部署**

```Shell
 yum -y install vixie-cron
 yum -y install crontabs
```
**配置**

```shell
service crond start     //启动服务
service crond stop      //关闭服务
service crond restart   //重启服务
service crond reload    //重新载入配置
service crond status    //查看crontab服务状态
```

