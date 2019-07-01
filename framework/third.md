

#####需要的路由方式


```Go
router.Get('/user',func)
router.Post('/user',func)
```
##### 我们如下处理

```go
//定义
type HandlerFunc func(http.ResponseWriter, *http.Request)
type Router struct {
	Method string
	Url    string
	Func   HandlerFunc
}
func Get(url string, handlerFunc HandlerFunc) *Router {
	return &Router{
		Method: "GET",
		Func:    handlerFunc,
		Url: url,
	}
}
func Post(url string, handlerFunc HandlerFunc) *Router {
	return &Router{
		Method: "GET",
		Func:    handlerFunc,
		Url: url,
	}
}
```

##### 需要把路由放在一个初始化的列表中

```Go

type Trie struct{
	routerList []*Router
}
func Makerouter(routes ...*Router)  *Trie{
	 routerList:= make([]*Router,0)
	for _,router :=range routes{
		routerList = append(routerList, router)
	}
	return  &Trie{
		routerList,
	}
}

```



