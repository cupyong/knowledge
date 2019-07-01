## [golang的time包](https://www.cnblogs.com/jiangxiangxiang/p/11102103.html)

- Time对象转换为string和时间戳调用Time对象的方法

  - 转换为string：Time.Format(输出的格式)
  - 转换为时间戳 ：Time.Unix()

- 两者转换为Time对象的时候调用的是time包的方法

  - string转换：time.Parse("输出格式"，string字符串)
  - 时间戳对象转换：time.unix(秒，纳秒)

- go1.9之前, time.Time的定义为

  ```go
  type Time struct {
    sec int64
    nsec int32
    loc *Location
  }
  //sec表示从公元1年1月1日00:00:00UTC到要表示的整数秒数,
  //nsec表示余下的纳秒数, 它必须在[0,999999999]范围内。
  //loc表示时区. sec和nsec处理没有歧义的时间值, loc处理偏移量.
  ```

```go
package main

import (
    "github.com/golang/glog"
    "time"
    "fmt"
)

func main()  {
    fmt.Println(time.Now().AddDate(0,0,100).Unix())
    // 获取当前时间，返回time.Time对象
    fmt.Println(time.Now())
    /*
    输出：2019-06-12 22:21:37.7036 +0800 CST m=+0.000255350
    其中CST可视为美国，澳大利亚，古巴或中国的标准时间
    +0800表示比UTC时间快8个小时
    */

    // 获取当前时间戳,单位是秒
    fmt.Println(time.Now().Unix())

    // 精确到纳秒，通过纳秒就可以计算出毫秒和微妙
    fmt.Println(time.Now().UnixNano())

    //fmt.Println(time.Now().AddDate(0,0,30).Unix())


    // 获取当前时间，进行格式化
    /*
    月份 1,01,Jan,January
    日　 2,02,_2
    时　 3,03,15,PM,pm,AM,am
    分　 4,04
    秒　 5,05
    年　 06,2006
    周几 Mon,Monday
    时区时差表示 -07,-0700,Z0700,Z07:00,-07:00,MST
    时区字母缩写 MST
    */
    fmt.Println("=============月份===========")
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-1-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-Jan-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-January-02 15:04:05"))


    fmt.Println("==================日期==============")
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-01-2 15:04:05"))
    fmt.Println(time.Now().Format("2006-01-_2 15:04:05"))

    fmt.Println("==================小时==============")
    fmt.Println(time.Now().Format("2006-01-02 3:04:05"))
    fmt.Println(time.Now().Format("2006-01-02 03:04:05"))
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-01-02 3:04:05 PM"))
    fmt.Println(time.Now().Format("2006-01-02 3:04:05 pm"))
    fmt.Println(time.Now().Format("2006-01-02 15:04:05 AM"))
    fmt.Println(time.Now().Format("2006-01-02 15:04:05 am"))

    fmt.Println("==================分==============")
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-01-02 15:4:05"))

    fmt.Println("==================秒==============")
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("2006-01-02 15:4:5"))


    fmt.Println("==================年==============")
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
    fmt.Println(time.Now().Format("06-01-02 15:04:05"))


    fmt.Println(time.Now().Format("02/01/2006 15:04:05 PM"))

    //第一个参数是时间戳的秒，第二个参数是时间戳的纳秒
    fmt.Println(time.Unix(1560350574,999748000).Format("2006-01-02 15:04:05"))
    //2019-06-12 22:42:54

    // 获取指定时间戳的年月日，小时分钟秒
    t:= time.Unix(1560350574,999748000)
    fmt.Printf("%d-%d-%d %d:%d:%d\n", t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute(), t.Second())


    //时间字符串转换为时间戳
    // 先用time.Parse对时间字符串进行分析，如果正确会得到一个time.Time对象
    t,err := time.Parse("2006-01-02 15:04:05","2019-06-12 22:47:29")
    if err!= nil {
        glog.Error(err)
    }
    fmt.Println(t)
    // 后面就可以用time.Time对象的函数Unix进行获取
    fmt.Println(t.Unix())

    //总结：string转换为time对象，time对象拥有很多函数

    fmt.Println("=====时间戳转化为一天开始的时候的时间戳===============")
    //根据时间戳获取当日开始的时候的时间戳
    // 方法就是通过时间戳取到2016-01-01 00:00:00这样的时间格式
    // 然后再转成时间戳就OK了
    // 获取月开始时间和年开始时间类似
    fmt.Println("==时间戳用time.Unix方法转换为time对象,time对象通过format函数返回指定格式的string===")
    time1 := time.Unix(1560350574,999748000).Format("2006-01-02")
    fmt.Println(time1)

    fmt.Println("====string想要转换为时间戳，需要先用time.Parse对时间字符串进行分析，如果正确会得到一个time.Time对象=======")
    t,err = time.Parse("2006-01-02",time1)
    if err!= nil {
        glog.Error(err)
    }
    fmt.Println(t)

    fmt.Println("===========后面就可以用time.Time对象的函数Unix进行获取=======")
    fmt.Println(t.Unix())

    //获取这个月开始的那一天的日期
    time1 = time.Unix(1560350574,999748000).Format("2006-01")
    fmt.Println(time1)

    t,err = time.Parse("2006-01",time1)
    if err!= nil {
        glog.Error(err)
    }
    fmt.Println(t)
    fmt.Println(t.Unix())


    //获取今年开始的那个日期
    time1 = time.Unix(1560350574,999748000).Format("2006")
    fmt.Println(time1)

    t,err = time.Parse("2006",time1)
    if err!= nil {
        glog.Error(err)
    }
    fmt.Println(t)
    fmt.Println(t.Unix())


    // 休眠1秒
    // time.Millisecond    表示1毫秒
    // time.Microsecond    表示1微妙
    // time.Nanosecond    表示1纳秒
    time.Sleep(1 * time.Second)
    // 休眠100毫秒
    time.Sleep(100 * time.Millisecond)

    /*
    获取某一时区的现在时间-time.Now().In(), Time结构体的In()方法仅设置loc, 不会改变时间值.
    特别地, 如果是获取现在的UTC时间, 可以使用Time.Now().UTC().
    */

}

// 获取月初时间
func  getEarlyMonthUnix()int64  {
    now := time.Now()
    tm :=time.Date(now.Year(),now.Month(),0,0,0,0,0,now.Location())
    fmt.Println(tm.Unix())
    return tm.Unix()
}

// 获取零时时间
func GetZeroHourUnix() int64 {
    now := time.Now()
    tm := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
    return tm.Unix()
}

// 获取当前小时时间
func GetNowHourUnix() int64 {
    now := time.Now()
    tm := time.Date(now.Year(), now.Month(), now.Day(), now.Hour(), 0, 0, 0, now.Location())
    return tm.Unix()
}

// 获取年初时间
func GetEarlyYearUnix() int64 {
    now := time.Now()
    tm := time.Date(now.Year(), 1, 1, 0, 0, 0, 0, now.Location())
    return tm.Unix()
}
```