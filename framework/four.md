

#####main函数修改


```Go
func main() {
    trie :=Makerouter(
        Get("/user",GetUser),
		Post("/user",PostUser),
	)
	HttpService(trie)
	log.Fatal(http.ListenAndServe(":8888", nil))
}
func HttpService(tries *Trie){
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		//获取method
		method := r.Method
		url := r.URL
		fmt.Println(url.Path)
		//根据不同的路由和url去处理不同的函数
		switch url.Path {
		case "/user":
			if method == "GET" {
				GetUser(w, r)
				return
			}
			if method == "POST" {
				PostUser(w, r)
				return
			}
		}
		io.WriteString(w, "404")
	})
}

```
#####根据路由处理函数
```go
func main() {
    trie :=Makerouter(
        Get("/user",GetUser),
		Post("/user",PostUser),
	)
	HttpService(trie)
	log.Fatal(http.ListenAndServe(":8888", nil))
}
func HttpService(tries *Trie){
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		//获取method
		method := r.Method
		url := r.URL
		fmt.Println(url.Path)

		for _,v:=range tries.routerList{
			fmt.Println(v.Method,method , v.Url,url.Path)
			if v.Method==method && v.Url == url.Path{
				v.Func(w,r)
				return
			}
		}
		io.WriteString(w, "404")
	})
}

```

