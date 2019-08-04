># Go Modules 详解使用

>## Module
>
>自从 `Go` 官方从去年推出 1.11 之后，增加新的依赖管理模块并且更加易于管理项目中所需要的模块。模块是存储在文件树中的 Go 包的集合，其根目录中包含 go.mod 文件。 go.mod 文件定义了模块的模块路径，它也是用于根目录的导入路径，以及它的依赖性要求。每个依赖性要求都被写为模块路径和特定语义版本。
>
>从 Go 1.11 开始，Go 允许在 $GOPATH/src 外的任何目录下使用 go.mod 创建项目。在 $GOPATH/src 中，为了兼容性，Go 命令仍然在旧的 GOPATH 模式下运行。从 Go 1.13 开始，模块模式将成为默认模式。
>
>本文将介绍使用模块开发 Go 代码时出现的一系列常见操作：
>
>- 创建一个新模块。
>- 添加依赖项。
>- 升级依赖项。
>- 删除未使用的依赖项。
>
>下面使用的案例都是以 `GIN` 模块为例。
>在这之前呢，需要先设置一些环境变量：
>
>```shell
>export GO111MODULE=on
>export GOPROXY=https://goproxy.io // 设置代理
>```
>
>### 创建一个新模块
>
>你可以在 $GOPATH/src 之外的任何地方创建一个新的目录。比如：
>
>> mkdir backend && cd backend
>
>然后初始化 `go mod init backend`，成功之后你会发现目录下会生成一个 `go.mod` 文件.
>
>> $ cat go.mod
>>
>> 内容如下
>>
>> module backend
>>
>> go 1.12
>
>### 添加依赖项
>
>创建一个文件 main.go 然后加入以下代码，这里直接 import 了 gin 的依赖包。
>
>> vim main.go
>
>```go
>package main
>
>import "github.com/gin-gonic/gin"
>
>func main() {
>    r := gin.Default()
>    r.GET("/ping", func(c *gin.Context) {
>        c.JSON(200, gin.H{
>            "message": "pong",
>        })
>    })
>    r.Run() // listen and serve on 0.0.0.0:8080
>}
>```
>
>go build 之后，会在 go.mod 引入所需要的依赖包。之后再来看看 go.mod 文件的情况。
>
>```go
>module backend
>
>go 1.12
>
>require (
>    github.com/gin-contrib/sse v0.0.0-20190301062529-5545eab6dad3 // indirect
>    github.com/gin-gonic/gin v1.3.0
>    github.com/golang/protobuf v1.3.1 // indirect
>    github.com/mattn/go-isatty v0.0.7 // indirect
>    github.com/ugorji/go v1.1.4 // indirect
>    gopkg.in/go-playground/validator.v8 v8.18.2 // indirect
>    gopkg.in/yaml.v2 v2.2.2 // indirect
>```
>
>require 就是 gin 框架所需要的所有依赖包 并且在每个依赖包的后面已经表明了版本号
>
>### 升级依赖项
>
>首先我们需要查看以下我们使用到的依赖列表
>
>```shell
>> $ go list -m all
>// 你会看到所有项目使用的依赖包
>backend
>github.com/gin-contrib/sse v0.0.0-20190301062529-5545eab6dad3
>github.com/gin-gonic/gin v1.3.0
>github.com/golang/protobuf v1.3.1
>github.com/mattn/go-isatty v0.0.7
>github.com/ugorji/go v1.1.4
>golang.org/x/sys v0.0.0-20190222072716-a9d3bda3a223
>gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405
>gopkg.in/go-playground/validator.v8 v8.18.2
>gopkg.in/yaml.v2 v2.2.2
>```
>
>因为这里使用的是最新的版本，无法升级，所以这里给出一个回退的例子。将 GIN 框架的版本回退到上个版本。这里需要使用一个命令查看依赖的版本历史。
>
>```go
>>$ go list -m -versions github.com/gin-gonic/gin
>// 将会列出 Gin 版本历史
>github.com/gin-gonic/gin v1.1.1 v1.1.2 v1.1.3 v1.1.4 v1.3.0
>```
>
>将版本更新到上个版本，这里只是个演示。
>
>```go
>>$ go get github.com/gin-gonic/gin@v1.1.4 // 只需要在依赖后面加上 @version 就可以了
>>$ go list -m all
>// 看到了版本变化
>github.com/gin-gonic/gin v1.1.4
>```