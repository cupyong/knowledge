# golang 字符串拼接

 go语言中支持的字符串拼接的方法有很多种，这里就来罗列一下

## 常用的字符串拼接方法

1.最常用的方法肯定是 + 连接两个字符串。这与python类似，不过由于golang中的字符串是不可变的类型，因此用 + 连接会产生一个新的字符串对效率有影响。

```go
s1 := "字符串"
s2 := "拼接"
s3 := s1 + s2
fmt.Print(s3) //s3 = "打印字符串"
```

 

2.第二种方法使用sprintf函数，虽然不会像直接使用 + 那样产生临时字符串。但是效率也不高

```Go
s1 := "字符串"
s2 := "拼接"
s3 := fmt.Sprintf("%s%s", s1, s2) //s3 = "打印字符串"
```

 

3.第三种方法是用Join函数，这里我们需要先引入strings包才能调用Join函数。Join函数会先根据字符串数组的内容，计算出一个拼接之后的长度，然后申请对应大小的内存，一个一个字符串填入，在已有一个数组的情况下，这种效率会很高，如果没有的话效率也不高。



```Go
//需要先导入strings包
s1 := "字符串"
s2 := "拼接"
//定义一个字符串数组包含上述的字符串
var str []string = []string{s1, s2}
//调用Join函数
s3 := strings.Join(str, "")
fmt.Print(s3)

```



 

4.第四个方法是调用buffer.WriteString函数，这种方法的性能就要大大优于上面的了。



```Go
//需要先导入bytes包
s1 := "字符串"
s2 := "拼接"
//定义Buffer类型
var bt bytes.Buffer
向bt中写入字符串
bt.WriteString(s1)
bt.WriteString(s2)
//获得拼接后的字符串
s3 := bt.String()
```



5.第5个方法是用buffer.Builder，这个方法和上面的差不多，不过官方建议用这个，使用方法和上面基本一样



```Go
//需要先导入Strings包
s1 := "字符串"
s2 := "拼接"
var build strings.Builder
build.WriteString(s1)
build.WriteString(s2)
s3 := build.String()
```



## 结论

一般对于少量的字符串拼接可以直接用+来连接，不过最好的方法还是Builder。