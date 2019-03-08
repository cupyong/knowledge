# golang性能测试

**格式**

- 性能测试函数以Benchmark 开头

- 参数类型是 *testing.B
  ​

**执行**

go test不执行Benchmark测试，必须用“-bench <pattern>”指定性能测试函数。

**code**

```go 
// filename: add_test.go
  package test
  import (
      "testing"
  )

  func Add(a, b int) int {
      return a + b
  }

  func Benchmark(b *testing.B) {
      for i := 0; i < b.N; i++ { // b.N，测试循环次数
          Add(4, 5)
      }
  }
```

**执行命令测试**

```
go test -bench=.
```

参数

- benchmem：输出内存分配统计

- benchtime：指定测试时间

- cpu：指定GOMAXPROCS

- timeout：超市限制

expamle

```
go test -v -bench=. -cpu=8 -benchtime="3s" -timeout="5s" -benchmem
```

输出

Benchmark-8：-cpu参数指定，-8表示8个CPU线程执行

5000000000：表示总共执行了5000000000次

0.34 ns/op：表示每次执行耗时0.34纳秒

0 B/op:表示每次执行分配的内存（字节）

0 allocs/op：表示每次执行分配了多少次对象