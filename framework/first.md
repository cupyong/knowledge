### 如何搭建一个框架（前后端）

#####入口文件 后端以golang为例

```Go
package main
func main(){
  //todo
}
```

前端js 

```javascript
（function(){
  //todo
})(window)
```



##### golang 启动http服务

```Go

func main(){
  
package main
 
import (
	"io"
	"log"
	"net/http"
)
 
func HelloServer(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "hello world")
}
 
func main() {
	http.HandleFunc("/", HelloServer)
	log.Fatal(http.ListenAndServe(":8888", nil))
}
```
golang 的http.HandleFunc 自身提供的相应的路由 但是对于框架的设计还不够合理
大部分框架的http入口都是一个函数

接下来的设计如下
```Go

func main(){
  
package main
 
import (
	"io"
	"log"
	"net/http"
)
 
func HelloServer(w http.ResponseWriter, r *http.Request) {
     //全部函数都走这个入口
     //需要处理路由
     //根据路由处理不同的函数
	io.WriteString(w, "hello world")
}
 
func main() {
	http.HandleFunc("/", HelloServer)
	log.Fatal(http.ListenAndServe(":8888", nil))
} /'?
```