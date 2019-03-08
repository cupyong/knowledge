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





code

```go
package per
import (
	"testing"
	"math/rand"
)
//冒泡排序
func BubbleAsort(values []int) {
	for i := 0; i < len(values)-1; i++ {
		for j := i+1; j < len(values); j++ {
			if  values[i]>values[j]{
				values[i],values[j] = values[j],values[i]
			}
		}
	}
}
//选择排序
func SelectSort(values []int) {
	length := len(values)
	if length <= 1 {
		return
	}
	for i := 0; i < length; i++ {
		min := i // 初始的最小值位置从0开始，依次向右
		// 从i右侧的所有元素中找出当前最小值所在的下标
		for j := length - 1; j > i; j-- {
			if values[j] < values[min] {
				min = j
			}
		}
		// 把每次找出来的最小值与之前的最小值做交换
		values[i], values[min] = values[min], values[i]
	}
}
//插入排序
func InsertSort(arr []int) {
	for i := 1; i < len(arr); i++ {
		val := arr[i]
		index := i - 1
		for index >= 0 && arr[index] > val {
			arr[index+1] = arr[index]
			index--
		}
		if index + 1 == i {
			continue
		}
		arr[index+1] = val
	}
}
//快排
func swap(a int, b int) (int, int) {
	return b, a
}
func partition(aris []int, begin int, end int) int {
	pvalue := aris[begin]
	i := begin
	j := begin + 1
	for j < end {
		if aris[j] < pvalue {
			i++
			aris[i], aris[j] = swap(aris[i], aris[j])
		}
		j++
	}
	aris[i], aris[begin] = swap(aris[i], aris[begin])
	return i
}

func quickSort(aris []int, begin int, end int) {
	if begin+1 < end {
		mid := partition(aris, begin, end)
		quickSort(aris, begin, mid)
		quickSort(aris, mid+1, end)
	}
}
//希尔排序
func shellSort(arr []int)  {
	len := len(arr)
	if len <= 1 {
		return
	}
	var i, j, gap int
	for gap = len / 2; gap > 0; gap = gap / 2 {
		for i = gap; i < len; i++ {
			for j = i - gap; j >= 0 && arr[j] > arr[j+gap]; j = j - gap {
				arr[j], arr[j+gap] = arr[j+gap], arr[j]
			}
		}
	}
}
//性能测试
func getList() []int {
	var s []int;
	for i:=0;i<10000;i++{
         s=append(s,rand.Intn(1000000))
	}
	return  s
}

func BenchmarkBubbleAsort(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		BubbleAsort(getList())
	}
}
func BenchmarkSelectSort(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		SelectSort(getList())
	}
}

func BenchmarkInsertSort(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		InsertSort(getList())
	}
}
func BenchmarkQuickSort(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		quickSort(getList(),0,len(getList())-1)
	}
}
func BenchmarkShellSort(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		shellSort(getList())
	}
}


```

