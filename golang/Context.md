
在go服务器中，对于每个请求的request都是在单独的goroutine中进行的，处理一个request也可能设计多个goroutine之间的交互， 使用context可以使开发者方便的在这些goroutine里传递request相关的数据、取消goroutine的signal或截止日期。

## Context结构

```go
// A Context carries a deadline, cancelation signal, and request-scoped values
// across API boundaries. Its methods are safe for simultaneous use by multiple
// goroutines.
type Context interface {
    // Done returns a channel that is closed when this Context is canceled
    // or times out.
    Done() <-chan struct{}

    // Err indicates why this context was canceled, after the Done channel
    // is closed.
    Err() error

    // Deadline returns the time when this Context will be canceled, if any.
    Deadline() (deadline time.Time, ok bool)

    // Value returns the value associated with key or nil if none.
    Value(key interface{}) interface{}
}
```

**Done** 方法在Context被取消或超时时返回一个close的channel,close的channel可以作为广播通知，告诉给context相关的函数要停止当前工作然后返回。

当一个父operation启动一个goroutine用于子operation，这些子operation不能够取消父operation。下面描述的WithCancel函数提供一种方式可以取消新创建的Context.

Context可以安全的被多个goroutine使用。开发者可以把一个Context传递给任意多个goroutine然后cancel这个context的时候就能够通知到所有的goroutine。

**Err**方法返回context为什么被取消。

**Deadline**返回context何时会超时。

**Value**返回context相关的数据。

## 继承的Context

### BackGround

```go
// Background returns an empty Context. It is never canceled, has no deadline,
// and has no values. Background is typically used in main, init, and tests,
// and as the top-level Context for incoming requests.
func Background() Context
```

BackGound是所有Context的root，不能够被cancel。

### WithCancel

```go
// WithCancel returns a copy of parent whose Done channel is closed as soon as
// parent.Done is closed or cancel is called.
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
```

WithCancel返回一个继承的Context,这个Context在父Context的Done被关闭时关闭自己的Done通道，或者在自己被Cancel的时候关闭自己的Done。
WithCancel同时还返回一个取消函数cancel，这个cancel用于取消当前的Context。

视频[Advanced Go Concurrency Patterns](https://www.youtube.com/watch?v=QDDwwePbDtw)中的第一个关于WithCancel的样例代码，本人有所修改

```go
package main

import (
    "context"
    "log"
    "os"
    "time"
)

var logg *log.Logger

func someHandler() {
    ctx, cancel := context.WithCancel(context.Background())
    go doStuff(ctx)

//10秒后取消doStuff
    time.Sleep(10 * time.Second)
    cancel()

}

//每1秒work一下，同时会判断ctx是否被取消了，如果是就退出
func doStuff(ctx context.Context) {
    for {
        time.Sleep(1 * time.Second)
        select {
        case <-ctx.Done():
            logg.Printf("done")
            return
        default:
            logg.Printf("work")
        }
    }
}

func main() {
    logg = log.New(os.Stdout, "", log.Ltime)
    someHandler()
    logg.Printf("down")
}
```

结果

```go
E:\wdy\goproject>go run context_learn.go
15:06:44 work
15:06:45 work
15:06:46 work
15:06:47 work
15:06:48 work
15:06:49 work
15:06:50 work
15:06:51 work
15:06:52 work
15:06:53 down
```

### withDeadline withTimeout

```go
WithTimeout func(parent Context, timeout time.Duration) (Context, CancelFunc)
WithTimeout returns WithDeadline(parent, time.Now().Add(timeout)).
```

WithTimeout 等价于 WithDeadline(parent, time.Now().Add(timeout)).

对上面的样例代码进行修改

```go
func timeoutHandler() {
    // ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
    // go doTimeOutStuff(ctx)
    go doStuff(ctx)

    time.Sleep(10 * time.Second)

    cancel()

}

func main() {
    logg = log.New(os.Stdout, "", log.Ltime)
    timeoutHandler()
    logg.Printf("end")
}
```

输出

```Go
15:59:22 work
15:59:24 work
15:59:25 work
15:59:26 work
15:59:27 done
15:59:31 end
```

可以看到doStuff在context超时的时候被取消了，ctx.Done()被关闭。
将context.WithDeadline替换为context.WithTimeout

```go
func timeoutHandler() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    // ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
    // go doTimeOutStuff(ctx)
    go doStuff(ctx)

    time.Sleep(10 * time.Second)

    cancel()

}
```

输出

```
16:02:47 work
16:02:49 work
16:02:50 work
16:02:51 work
16:02:52 done
16:02:56 end
```

根据视频[Advanced Go Concurrency Patterns](https://www.youtube.com/watch?v=QDDwwePbDtw)5分48秒处的代码编写doTimeOutStuff替换doStuff

```go
func doTimeOutStuff(ctx context.Context) {
    for {
        time.Sleep(1 * time.Second)

        if deadline, ok := ctx.Deadline(); ok { //设置了deadl
            logg.Printf("deadline set")
            if time.Now().After(deadline) {
                logg.Printf(ctx.Err().Error())
                return
            }

        }

        select {
        case <-ctx.Done():
            logg.Printf("done")
            return
        default:
            logg.Printf("work")
        }
    }
}

func timeoutHandler() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    // ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
    go doTimeOutStuff(ctx)
    // go doStuff(ctx)

    time.Sleep(10 * time.Second)

    cancel()

}
```

输出：

```
16:03:55 deadline set
16:03:55 work
16:03:56 deadline set
16:03:56 work
16:03:57 deadline set
16:03:57 work
16:03:58 deadline set
16:03:58 work
16:03:59 deadline set
16:03:59 context deadline exceeded
16:04:04 end
```

**context deadline exceeded**就是ctx超时的时候ctx.Err的错误消息。

### 搜索测试程序

完整代码参见官方文档[Go Concurrency Patterns: Context](https://blog.golang.org/context)，其中关键的地方在于函数httpDo

```Go
func httpDo(ctx context.Context, req *http.Request, f func(*http.Response, error) error) error {
    // Run the HTTP request in a goroutine and pass the response to f.
    tr := &http.Transport{}
    client := &http.Client{Transport: tr}
    c := make(chan error, 1)
    go func() { c <- f(client.Do(req)) }()
    select {
    case <-ctx.Done():
        tr.CancelRequest(req)
        <-c // Wait for f to return.
        return ctx.Err()
    case err := <-c:
        return err
    }
}
```

httpDo关键的地方在于

```go
    select {
    case <-ctx.Done():
        tr.CancelRequest(req)
        <-c // Wait for f to return.
        return ctx.Err()
    case err := <-c:
        return err
    }
```

要么ctx被取消，要么request请求出错。

### WithValue

```Go
func WithValue(parent Context, key interface{}, val interface{}) Context
```

参见搜索程序[userip](https://blog.golang.org/context/userip/userip.go)中的代码
关键的代码如下：

```Go
// NewContext returns a new Context carrying userIP.
func NewContext(ctx context.Context, userIP net.IP) context.Context {
    return context.WithValue(ctx, userIPKey, userIP)
}

// FromContext extracts the user IP address from ctx, if present.
func FromContext(ctx context.Context) (net.IP, bool) {
    // ctx.Value returns nil if ctx has no value for the key;
    // the net.IP type assertion returns ok=false for nil.
    userIP, ok := ctx.Value(userIPKey).(net.IP)
    return userIP, ok
}
```

## go doc中的信息

```Go
The WithCancel, WithDeadline, and WithTimeout functions take a Context (the
parent) and return a derived Context (the child) and a CancelFunc. Calling
the CancelFunc cancels the child and its children, removes the parent's
reference to the child, and stops any associated timers.
```

里面需要注意的就是 调用CancelFunc会取消child以及child生成的context，取出父context对这个child的引用，停止相关的计数器。