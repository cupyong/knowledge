# golang单元测试 

**格式**

- 一般测试代码放在*_test.go文件中，与被测代码放于同一个包中
-   参数类型*testing.T
- 测试函数名称格式是：`Test[^a-z]` 即以Test开头，跟上非小写字母开头的字符串
- 每个测试函数都接受一个*testing.T类型参数，用于输出信息或中断测试。

**测试方法**

- Fail: 标记失败，但继续执行当前测试函数
- FailNow: 失败，立即终止当前测试函数执行
- Log: 输出错误信息
- Error: Fail + Log
- Fatal: FailNow + Log
- Skip: 跳过当前函数，通常用于未完成的测试用例

**代码**

```go
package test
import (
	"testing"
)

func Add(a, b int) int {
	return a + b
}

func TestAdd1(t *testing.T) {
	if Add(2, 3) != 5 {
		t.Error("Error  5")
	} else {
		t.Log("result is right")
	}
}

func TestAdd2(t *testing.T) {
	if Add(2, 3) != 6 {
		t.Fatal("result 6")
	} else {
		t.Log("result is right")
	}
}

func TestAdd3(t *testing.T) {
	//t.Skip()
	if Add(2, 3) != 6 {
		t.Fail()
	}
	t.Log("111")
}
```

**查看运行结果**

```
go test   动搜集所有的测试文件（*_test.go），提取全部测试函数
```

- -v：显示所有测试函数运行细节 
- -run：指定要执行的测试函数
- -count 运行多少次
- args  参数 `os.Args` 获取参数