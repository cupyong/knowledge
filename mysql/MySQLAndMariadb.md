### mysql于MariaDB区别
|         功能特点         |                    说明                    |         MariaDB         |                MySQL                |
| :------------------: | :--------------------------------------: | :---------------------: | :---------------------------------: |
|         使用名单         |                    ——                    | Facebook、Github、YouTube |       Redhat、DBS、Suse、Ubuntu        |
|      JSON 数据类型       |              访问 JSON 文档中的数据              |            无            |              5.7版本开始支持              |
|        默认身份认证        |                  提高安全性                   |       unix_socket       |  caching_sha2_password（MySQL 8.0）   |
|     MySQL Shell      |              高级命令行客户端和代码编辑器              |            无            |                  有                  |
|          加密          |                                          |  MariaDB 支持二进制日志和临时表加密  | 对重做 / 撤消日志进行了加密（可配），但不加密临时表空间或二进制日志 |
|         密钥管理         |                                          |       AWS 密钥管理插件        | 透明数据加密（Transparent Data Encryption） |
|        sys 模式        | 帮助数据库管理员和软件工程师更好地理解通过 Performance 模式收集的数据 |      MySQL 8.0 提供       |                  无                  |
| validate_password 插件 |              主要用于测试密码并提高安全性              |          默认启用           |                 不启用                 |
|         超级只读         | read_only，服务器只允许具有 SUPER 权限的用户执行客户端更新。如果同时启用了 super_read_only，那么服务器将禁止具有 SUPER 权限的用户执行客户端更新。 |           支持            |                 不支持                 |
|         不可见列         | 允许创建未在 SELECT * 语句中出现的列，而在进行插入时，如果它们的名字没有出现在 INSERT 语句中，就不需要为这些列提供值 |           不支持           |                 支持                  |

