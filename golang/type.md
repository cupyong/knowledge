### bool to string

`strconv`包的`FormatBool`函数用于将`bool`转为`string`

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    isNew := true
    isNewStr := strconv.FormatBool(isNew)
    // message := "Purchased item is " + isNew 会报错，类型不匹配
    message := "Purchased item is " + isNewStr
    
    fmt.Println(message)
}
```

### int/float to string

`strconv`包的`FormatInt`、`FormatFloat`函数用于将`int、float`转为`string`

```go
package main

import (
     "fmt"
     "strconv"
 )

func main() {
     // Int to String
     numberInt := int64(20)
     numberItoS := strconv.FormatInt(numberInt, 8)
     fmt.Println(numberItoS)

     // Float to String
     numberFloat := 177.12211
     // FormatFloat函数第二个参数表示格式，例如`e`表示指数格式；
     // 第三个参数表示精度，当你想要显示所有内容但又不知道确切位数可以设为-1。
     numberFtoS := strconv.FormatFloat(numberFloat, 'f', 3, 64)
     fmt.Println(numberFtoS)
}
```

### string to bool

`strconv`包的`ParseBool`函数用于将`string`转为`bool`

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    isNew := "true"
    isNewBool, err := strconv.ParseBool(isNew)
    if err != nil {
        fmt.Println("failed")
    } else {
        if isNewBool {
            fmt.Println("IsNew")
        } else {
            fmt.Println("Not New")
        }
    }
}
// ParseBool函数只接受1、0、t、f、T、F、true、false、True、False、TRUE、FALSE，其他值均返回error
```

### string to int/float

`strconv`包的`ParseInt`、`ParseFloat`函数用于将`string`转为`int、float`

```go
package main

import (
     "fmt"
     "strconv"
 )

func main() {
     // string to int
     numberI := "2"
     numberInt, err := strconv.ParseInt(numberI, 10, 32)
     if err != nil {
         fmt.Println("Error happened")
     } else {
         if numberInt == 2 {
             fmt.Println("Success")
         }
     }

    // string to float
    numberF := "2.2"
    numberFloat, err := strconv.ParseFloat(numberF, 64)
    if err != nil {
        fmt.Println("Error happened")
    } else {
        if numberFloat == 2.2 {
            fmt.Println("Success")
        }
    }
}
```

### []byte to string

在Go中，`string`的底层就是`[]byte`，所以之间的转换很简。

```go
package main

import "fmt"

func main() {
    helloWorld := "Hello, World"
    helloWorldByte := []byte{72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100}
    fmt.Println(string(helloWorldByte), []byte(helloWorld))
    // fmt.Printf("%q", string(helloWorldByte))
}
```