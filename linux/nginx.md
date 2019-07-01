# yum升级nginx或安装最新版本nginx



```
vi /etc/yum.repos.d/nginx.repo

```

写入

```
# nginx.repo

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

```

```
yum update nginx
# 或
yum install -y nginx

```

如果出现

```
13536#13536: module "/usr/lib64/nginx/modules/ngx_http_geoip_module.so" version 1012002 instead of 1015008 in /usr/share/nginx/modules/mod-http-geoip.conf:1

```

原因在于nginx模块版本之间的冲突
1、

```
yum remove nginx-mod*

```

2、

```
yum install nginx-module-*

```

3、

```
systemctl start nginx
```