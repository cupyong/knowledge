# golang性能分析



**pprof工具**

目前针对golang程序占用资源的优化 主要针对CPU和内存的优化 针对于我们用golang自带的工具pprof来测试

支持模式

- Report generation：报告生成
- Interactive terminal use：交互式终端使用
- Web interface：Web 界面

**安装软件**

```Js
//安装包
go get github.com/pkg/profile
//可视化工具
brew install graphviz
//压力测试工具
brew install wrk
//火焰山图标工具
go get -v github.com/uber/go-torch
git clone https://github.com/brendangregg/FlameGraph.git
export PATH=$PATH:/Users/zengzhiyong/documents/mygo/src/github.com/uber/go-torch/FlameGraph
//其他工具
1、GOM 
   gom是一个实时的 curses-风格的命令行工具，由Google的工程师Jaana Dogan开发。
   安装  go get github.com/rakyll/gom/cmd/gom
2、Debug charts 
   
```

**web项目**

**code**

```go
package main

import (
	"net/http"
	"log"
	_ "net/http/pprof"
	"time"
)

func main() {
	http.HandleFunc("/test", handler)
	log.Fatal(http.ListenAndServe(":8000", nil))
}
func handler(w http.ResponseWriter, r *http.Request) {
	nums(10000)
	calculate(10000)
	w.Write([]byte("111"))
}

//循环次数
func nums(times int) {
	for i := 0; i < times; i++ {
		for j := 0; j < times; j++ {
		}
	}
}

//计算数据
func calculate(times int) {
	total := 0
	for i := 0; i < times; i++ {
		for j := 0; j < times; j++ {
			total += j;
			total -= j;
		}
	}
}

```

1、go run main.go

2、open  http://localhost:8000/debug/pprof/

```html
profiles:
0	block
3	goroutine
26	heap
0	mutex
9	threadcreate
full goroutine stack dump

/debug/pprof/
```

继续分析页面得到的结果

- cpu（CPU Profiling）: `$HOST/debug/pprof/profile`，默认进行 30s 的 CPU Profiling，得到一个分析用的 profile 文件
- block（Block Profiling）：`$HOST/debug/pprof/block`，查看导致阻塞同步的堆栈跟踪
- goroutine：`$HOST/debug/pprof/goroutine`，查看当前所有运行的 goroutines 堆栈跟踪
- heap（Memory Profiling）: `$HOST/debug/pprof/heap`，查看活动对象的内存分配情况
- mutex（Mutex Profiling）：`$HOST/debug/pprof/mutex`，查看导致互斥锁的竞争持有者的堆栈跟踪
- threadcreate：`$HOST/debug/pprof/threadcreate`，查看创建新OS线程的堆栈跟踪

3、`wrk -c 400 -t 8 -d 3m http://localhost:8000/test`  

```
-c, --connections: total number of HTTP connections to keep open with
                   each thread handling N = connections/threads

-d, --duration:    duration of the test, e.g. 2s, 2m, 2h

-t, --threads:     total number of threads to use

-s, --script:      LuaJIT script, see SCRIPTING

-H, --header:      HTTP header to add to request, e.g. "User-Agent: wrk"

    --latency:     print detailed latency statistics

    --timeout:     record a timeout if a response is not received within
                   this amount of time.
```

4、 cpu性能信息。 open http://localhost:8000/debug/pprof/profile

​      通过命令行查看 `go tool pprof http://localhost:8080/debug/pprof/profile`  

​      查看堆栈信息.  open http://localhost:8000/debug/pprof/[heap](http://localhost:8080/debug/pprof/heap) 

​     通过命令行查看  `go tool pprof http://localhost:8080/debug/pprof/heap`

5、`go tool pprof test profile` 查看内存使用情况

6。tree. top. pdf 等查看细节


定义

- flat：给定函数上运行耗时
- flat%：同上的 CPU 运行耗时总比例
- sum%：给定函数累积使用 CPU 总比例
- cum：当前函数加上它之上的调用运行总耗时
- cum%：同上的 CPU 运行耗时总比例

火焰山查看结果

```shell
go-torch test profile
```

 GOM

```go
import (
	_ "github.com/rakyll/gom/http"
)

 //gom --target http://localhost:6060

```

Debug charts 

```go
import (
	_ "github.com/mkevac/debugcharts"
)
//然后访问 localhost:8000/debug/charts就可以显示相关的实时性能图表了
```

**普通项目**

**code**

```Go
package main

import (
	"runtime/pprof"
	"os"
	"log"
	"flag"
	"time"
	"fmt"
	"runtime/trace"
)

var cpuprofile = flag.String("cpuprofile", "cpu", "write cpu profile to file")
var heapprofile = flag.String("heapprofile", "heap", "write cpu profile to file")
var traceprofile = flag.String("traceprofile", "trace.out", "write trace profile to file")


func main()  {
	flag.Parse();
	 go cpuProfile(*cpuprofile)
	 go heapProfile(*heapprofile)
	 go traceProfile(*traceprofile)
	nums(100000)
	fmt.Println(1212)
	time.Sleep(15 * time.Second)
}
// 生成 CPU 报告
func cpuProfile(cpu string) {
	f,err:=os.Create(cpu)
	if err!=nil{
		log.Fatal(err)
	}
	log.Println("CPU Profile started")
	pprof.StartCPUProfile(f)
	defer pprof.StopCPUProfile()
	time.Sleep(10 * time.Second)
	fmt.Println("CPU Profile stopped")
}
// 生成堆内存报告
func heapProfile(heap string) {
	f,err:=os.Create(heap)
	if err!=nil{
		log.Fatal(err)
	}
	time.Sleep(10 * time.Second)
	pprof.WriteHeapProfile(f)
	fmt.Println("Heap Profile generated")
}
// 生成追踪报告
func traceProfile(t string) {
	f,err:=os.Create(t)
	if err!=nil{
		log.Fatal(err)
	}
	log.Println("Trace started")
	trace.Start(f)
	defer trace.Stop()
	time.Sleep(10 * time.Second)
	fmt.Println("Trace stopped")
}
func nums(times int) {
	for i := 0; i < times; i++ {
		for j := 0; j < times; j++ {
		}
	}
}

```

运行如下命令查看

```
go run main.go --cpuprofile=cpu.prof --heapprofile=heap.prof
go tool pprof heap.prof
go tool pprof cpu.prof
go tool trace trace.out 
```