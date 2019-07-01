

#####添加路由判断


```Go
package main

import (
	"io"
	"log"
	"net/http"
	"fmt"
)

func HelloServer(w http.ResponseWriter, r *http.Request) {
	//获取method
	method := r.Method
	url := r.URL
	fmt.Println(url.Path)
	//根据不同的路由和url去处理不同的函数
	switch url.Path {
	case "/user":
		if method == "GET" {
			io.WriteString(w, "get user")
			return
		}
		if method == "POST" {
			io.WriteString(w, "post user")
			return
		}
	}
	io.WriteString(w, "404")
}

func main() {
	http.HandleFunc("/", HelloServer)
	log.Fatal(http.ListenAndServe(":8888", nil))
}

```
##### 接下来提取路由的公共方法

```go
package main

import (
	"io"
	"log"
	"net/http"
	"fmt"
)

func HelloServer(w http.ResponseWriter, r *http.Request) {
	//获取method
	method := r.Method
	url := r.URL
	fmt.Println(url.Path)
	//根据不同的路由和url去处理不同的函数
	switch url.Path {
	case "/user":
		if method == "GET" {
			GetUser(w,r)
			return
		}
		if method == "POST" {
			PostUser(w,r)
			return
		}
	}
	io.WriteString(w, "404")
}

func main() {
	http.HandleFunc("/", HelloServer)
	log.Fatal(http.ListenAndServe(":8888", nil))
}

func GetUser(w http.ResponseWriter,r *http.Request)  {
	io.WriteString(w, "get user")
}
func PostUser(w http.ResponseWriter,r *http.Request)  {
	io.WriteString(w, "post user")
}
```

