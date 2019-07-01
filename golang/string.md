### 修剪空格

`strings`包中的`TrimSpace`函数用于去掉字符串首尾的空格。

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    helloWorld := "\t Hello, World "
    trimHello := strings.TrimSpace(helloWorld)

    fmt.Printf("%d %s\n", len(helloWorld), helloWorld)
    fmt.Printf("%d %s\n", len(trimHello), trimHello)

    // 15    Hello, World 
    // 12 Hello, World
}
```

### 提取子串

Go字符串的底层是`read-only`的`[]byte`，所以对切片的任何操作都可以应用到字符串。

```go
package main

import "fmt"

func main() {
    helloWorld := "Hello, World and Water"
    cutHello := helloWorld[:12]
    fmt.Println(cutHello)
    // Hello, World
}
```

### 替换子串

`strings`包的`Replace`函数可以对字符串中的子串进行替换。

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    helloWorld := "Hello, World. I'm still fine."
    replaceHello := strings.Replace(helloWorld, "fine", "OK", 1)
    fmt.Println(replaceHello)
    // Hello, World. I'm still OK.
}
// 注：Replace函数的最后一个参数表示替换子串的个数，为负则全部替换。
```

### 转义字符

字符串中需要出现的特殊字符要用转义字符`\`转义先，例如`\t`需要写成`\\t`。

```go
package main

import "fmt"

func main() {
    helloWorld := "Hello, \t World."
    escapeHello := "hello, \\t World."
    fmt.Println(helloWorld)
    fmt.Println(escapeHello)
    // Hello,    World.
    // Hello, \t World.
}
```

### 大写字符

`strings`包的`Title`函数用于将每个单词的首字母大写，`ToUpper`函数则将单词的每个字母都大写。

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    helloWorld := "hello, world. i'm still fine."
    titleHello :=strings.Title(helloWorld)
    upperHello := strings.ToUpper(helloWorld)
    fmt.Println(titleHello)
    fmt.Println(upperHello)
    // Hello, World. I'M Still Fine.
    // HELLO, WORLD. I'M STILL FINE.
}
```