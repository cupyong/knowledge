

#####中间价处理


```Go
func HttpService(tries *Trie){
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		//获取method
		method := r.Method
		url := r.URL
		fmt.Println(url.Path)

		var httpFunc HandlerFunc
		for _,v:=range tries.routerList{
			fmt.Println(v.Method,method , v.Url,url.Path)
			if v.Method==method && v.Url == url.Path{
				httpFunc =v.Func
			}
		}
        if httpFunc!=nil{
			httpFunc(w,r)
			return
		}else {
			io.WriteString(w, "404")
			return
		}
	})
}
```


