#### 基本概念
Java 是OOP思想的面向对象编程语言，核心思想：封装，继承，多态。跨平台，泛型编程，舍弃指针，改为引用取代。
Java是一个编译语言，它首先将源代码编译成字节码，再依赖各种不同平台上的虚拟机来解释执行字节码，从而具有“一次编写，到处运行”的跨平台特性。


Go 是一种静态强类型、编译型、并发型，并具有垃圾回收功能的函数式编程语言。

![](C:\Users\MagicBook\Desktop\Image.png)


#### Hello World
**Java**
```java
package com.company; //所在包 ①

public class Main { // ②
    public static void main(String[] args) {
      System.out.println("hello world"); //打印出 hello world
    }
}
````
说明：
① 第一行必须是声明 包名
② 主方法入口  ： public static void main(String[] args)

**go**
```go
package main  //  ① main方法所在包必须是 main

//引入的 fmt  包   ②
import (     
   "fmt"
)

func main()  { //  { 不能在单独的行上   ③
   fmt.Println("hello world") //打印出 hello world
}
````
说明：
① 定义包名，必须在源文件中非注释的第一行指明这个文件属于哪个包，如：package main。package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包。

②  告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数。

③  程序开始执行的函数。main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数（如果有 init() 函数则会先执行该函数）。




#### 基础语法对比

**Java**
1. 类，对象，方法，变量
````text
实例变量：每个对象都有独特的实例变量，对象的状态由这些实例变量的值决定。例如，狗可以有名字，体重，身高等，这些都是狗的具体特征。

对象：对象是类的一个实例，有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。

类：类是一个模板，它描述一类对象的行为和状态。例如，一条狗是动物，动物就是一个模板。

方法：方法就是行为，一个类可以有很多方法。逻辑运算、数据修改以及所有动作都是在方法中完成的。例如，动物会呼吸，吃饭，奔跑，睡觉等行为，这些都是方法。
````
代码示例
```java
/**
* 创建一个类：动物类
*/
public class Animal {
   //实例变量
   int age;
   int weight;
   int heigh;
   String name;
   //动物类公共的方法
   void hungry(){}
   void sleeping(){}
   void barking(){}
}

//创建一个 猫 类
class Cat {
   String color;
   String  name;
   //构造方法
   public Cat(String color,String name){
      System.out.println("小猫的名字是："+name+" 颜色是： "+color);
   }
}
```
2. 创建一个对象：使用 new 关键字
```java
public class Main {
    public static void main(String[] args) {
       //使用默认的构造方法
       Cat myCat = new Cat();
       myCat.color = "白色";
       myCat.name = "丸子";
       //使用自定义的构造方法
       Cat yourCat = new Cat("白色","丸子");
    }
}
```
3. 标识符：
```java
所有的标识符都应该以字母（A-Z 或者 a-z）,美元符（$）、或者下划线（_）开始
首字符之后可以是字母（A-Z 或者 a-z）,美元符（$）、下划线（_）或数字的任何字符组合
关键字不能用作标识符
标识符是大小写敏感的
合法标识符举例：age、$salary、_value、__1_value
非法标识符举例：123abc、-salary
```
4. 修饰符：
```java
访问控制修饰符 : default, public , protected, private
default (即缺省，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法。

private : 在同一类内可见。使用对象：变量、方法。 注意：不能修饰类（外部类）。

public : 对所有类可见。使用对象：类、接口、变量、方法。

protected : 对同一包内的类和所有子类可见。使用对象：变量、方法。 注意：不能修饰类（外部类）。


非访问控制修饰符 : final, abstract, static, synchronized
static 修饰符，用来修饰类方法和类变量。
final 修饰符，用来修饰类、方法和变量，final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。
abstract 修饰符，用来创建抽象类和抽象方法。
synchronized 和 volatile 修饰符，主要用于线程的编程。
```


特点：
```text
大小写敏感：Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。
主方法入口：所有的 Java 程序由 public static void main(String []args) 方法开始执行。
```
**go**
1. 结构体，函数，变量

结构体是由一系列具有相同类型或不同类型的数据构成的数据集合。
结构体表示一项记录，比如保存图书馆的书籍记录，每本书有以下属性：

- Title ：标题
- Author ： 作者
- Subject：学科
- ID：书籍ID


结构体定义需要使用 type 和 struct 语句。struct 语句定义一个新的数据类型，结构体有中有一个或多个成员。type 语句设定了结构体的名称。比如上面说到的图书的结构体的格式如下：
```go
package main

import "fmt"

/** 
* 创建一个结构体：图书 
*/
type Books struct {
    //声明变量
   title string
   author string
   subject string
   book_id int
}

func main() {
   // 创建一个新的结构体
   fmt.Println(Books{"Go 语言", "XXX", "Go 语言教程", 23444})
   // 也可以使用 key => value 格式
   fmt.Println(Books{title: "Go 语言", author: "XXX", subject: "Go 语言教程", book_id: 23444})
   // 忽略的字段为 0 或 空
   fmt.Println(Books{title: "Go 语言", author: "XXX"})
}
```

函数是基本的代码块，用于执行一个任务。可以通过函数来划分不同功能，逻辑上每个函数执行的是指定的任务。函数声明告诉了编译器函数的名称，返回类型，和参数。

```go
/* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
   /* 声明局部变量 */
   var result int
   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result
}
```

变量
```
①指定变量类型：var + 变量名 + 类型
比如：var v1 int = 10 

②根据值自行判定变量类型：var + 变量名
比如 var v1 = 10

③省略 var 关键字，注意 :=左侧的变量不应该是已经声明过的，否则会导致编译错误，而且这种不能声明全局变量，也就是说只能在函数内使用。
比如 v1:= 10
:= 是用来明确表达同时进行变量声明与初始化的工作
```

2. 标识符

Go语言标识符是一个非空的字母或数字串，其中第一个字符必须是字母，该标识符不能是关键字的名字。

标识符是区分大小写的，以大写字母开头的标识符是公开的---以Go语言术语来讲就是可以导出的。其他的任何标识符都是私有的---以Go语言术语来讲就是未到处的。

空标识符“_”是一个占位符，用于在赋值操作的时候将某一个值赋值给空标识符，从而达到丢弃该值的目的。空标识符不是一个新的变量，因此它用于赋值时，必须同时还有其他值赋值。

。以下是有效的标识符：
```
mahesh   kumar   abc   move_name   a_123
myname50   _temp   j   a23b9   retVal
```
3. 修饰符

不同于Java中有各种访问权限的修饰符，go中是使用大小写标记访问权限。

在go中不能随便使用大小写的问题，是因为大小写具有特殊意义，在go中，大些字母开头的变量或者函数等是public的，可以被其他包访问；小些的则是private的，不能被其他包访问到。这样就省去了public和private声明的烦恼，使代码变的更简洁。

特别说明，这些导出规则只适用于包级别名字定义，不能使函数内部的定义。



#### 数据类型对比：
**Java**
① 基本数据类型
```
八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

byte：
byte 数据类型是8位、有符号的，以二进制补码表示的整数；
最小值是 -128（-2^7）；
最大值是 127（2^7-1）；
默认值是 0；
byte 类型用在大型数组中节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一；
例子：byte a = 100，byte b = -50。

short：
short 数据类型是 16 位、有符号的以二进制补码表示的整数
最小值是 -32768（-2^15）；
最大值是 32767（2^15 - 1）；
Short 数据类型也可以像 byte 那样节省空间。一个short变量是int型变量所占空间的二分之一；
默认值是 0；
例子：short s = 1000，short r = -20000。

int：
int 数据类型是32位、有符号的以二进制补码表示的整数；
最小值是 -2,147,483,648（-2^31）；
最大值是 2,147,483,647（2^31 - 1）；
一般地整型变量默认为 int 类型；
默认值是 0 ；
例子：int a = 100000, int b = -200000。

long：
long 数据类型是 64 位、有符号的以二进制补码表示的整数；
最小值是 -9,223,372,036,854,775,808（-2^63）；
最大值是 9,223,372,036,854,775,807（2^63 -1）；
这种类型主要使用在需要比较大整数的系统上；
默认值是 0L；
例子： long a = 100000L，Long b = -200000L。
"L"理论上不分大小写，但是若写成"l"容易与数字"1"混淆，不容易分辩。所以最好大写。

float：
float 数据类型是单精度、32位、符合IEEE 754标准的浮点数；
float 在储存大型浮点数组的时候可节省内存空间；
默认值是 0.0f；
浮点数不能用来表示精确的值，如货币；
例子：float f1 = 234.5f。

double：
double 数据类型是双精度、64 位、符合IEEE 754标准的浮点数；
浮点数的默认类型为double类型；
double类型同样不能表示精确的值，如货币；
默认值是 0.0d；
例子：double d1 = 123.4。

boolean：
boolean数据类型表示一位的信息；
只有两个取值：true 和 false；
这种类型只作为一种标志来记录 true/false 情况；
默认值是 false；
例子：boolean one = true。

char：
char类型是一个单一的 16 位 Unicode 字符；
最小值是 \u0000（即为0）；
最大值是 \uffff（即为65,535）；
char 数据类型可以储存任何字符；
例子：char letter = 'A';。

各自的包装类：
Integer、Long、Byte、Double、Float、Short
```
②引用类型
在Java中，引用类型的变量非常类似于C/C++的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个特定的类型，比如 Animal、Cat等。变量一旦声明后，类型就不能被改变了。

对象、数组都是引用数据类型。所有引用类型的默认值都是null。

**go**
1. 基本数据类型
```
①布尔型： bool （默认值为false）
Go 语言支持整型和浮点型数字，并且原生支持复数
②整型：int8，byte，int16，int，uint，uintptr等
③浮点型：float32、float64（默认）
复数类型：complex64（两个float32组成），complex128（两个float64组成，这个为复数默认值）
④字符串：string
⑤字符类型：rune 等同于 uint32
⑥错误类型：error
⑦派生类型：指针类型（Pointer），数组类型（array），结构化类型(struct)，Channel 类型，函数类型，切片类型，接口类型（interface），Map 类型
```

如果需要在不同的数值类型间进行数值运算或者比较操作，那么就必须进行类型转换，通常是将类型转换为最大的类型以防止精度丢失，类型转换采用 type(value)的方式进行。
若需要进行缩小尺寸的类型转换，我们就需要自定义向下转换函数
比如 int 与 uint8的转换
```go
func IntToUint8(a int)(uint8,error)  {
   if 0<=a && a<= math.MaxUint8{
      return uint8(a),nil
   }
   return 0,fmt.Errorf("%d is out of the uint8 range",a)
}
```
2. 指针类型

使用指针能让我们控制变量的生命周期，不受作用域的影响，另外变量在传递过程中成本最小化，且可以轻易的修改变量的内容，而不是对复制的值进行操作。指针是一个变量，这个变量实际上是保存了另一个变量的内存地址，任何被指针保存了内存地址的变量都可以通过指针来修改内容。指针的传递非常廉价。

在使用指针前，我们需要明白两个操作符的含义
①操作符& : 当作二元操作符时，是按位与操作；当作一元操作符时，是返回该变量的内存地址。
②操作符* :   当作二元操作符时，是相乘的操作；当作一元操作符（解引用操作符）时，是返回该指针指向的变量的值，其实就是解除变量的指针引用，返回该变量的值。

指针的创建与使用，可以看下面的代码实例
```go
func main() {
   a := 3
   p := &a //这里是获取变量a的内存地址，并将其赋值给变量p
   fmt.Printf("a的值为 %v, a的指针是 %v ，p指向的变量的值为 %v\n",a,p,*p)
}
-----output-----
a的值为 3, a的指针是 0xc042060080 ，p指向的变量的值为 3
```


其实*p和变量a的值是相等的，两者可以交换着使用，两者都与同一块内存地址相关联，任意一个变量进行修改操作都会影响到另一个变量的值，但是若变量p被赋值其他变量的指针就不行了。




#### 枚举

**go**
由于Go语言并不支持Enum 关键字，所以使用 const 关键字来定义枚举

```go
func main() {
   const (
      Sunday = iota
      Monday
      Tuesday
      Wednesday
      Thursday
      Firday
      Saturday
   )
   fmt.Println(Sunday,Monday,Tuesday,Wednesday,Thursday,Firday,Saturday)
}
----output----
0 1 2 3 4 5 6
```

**Java**
```java
class Date {
   enum FreshJuiceSize{ Sunday,Monday,Tuesday,Wednesday,Thursday,Firday,Saturday }
   FreshJuiceSize size;
}


public class DateTest {
   public static void main(String []args){
      Date date = new Date();
      date.size = Date.FreshJuiceSize.Monday  ;
   }
}
```

#### 循环结构与条件语句

**Java**
```java
while 循环
while( 布尔表达式 ) { //循环内容 }

do…while 循环
do {
       //代码语句
}while(布尔表达式);


for 循环
for(初始化; 布尔表达式; 更新) { 
//代码语句 
}

增强 for 循环
for(声明语句 : 表达式) { 
//代码句子 
}

if(布尔表达式) { 
//如果布尔表达式为true将执行的语句 
}

if(布尔表达式){ 
    //如果布尔表达式的值为true 
}else{ 
    //如果布尔表达式的值为false 
}

switch(expression){ 
case value : 
    //语句 
    break; //可选 
    case value : 
    //语句 break; //可选 
    //你可以有任意数量的case语句 
    default : //可选 
    //语句 
}

break 关键字
break 主要用在循环语句或者 switch 语句中，用来跳出整个语句块。
break 跳出最里层的循环，并且继续执行该循环下面的语句。

continue 关键字
continue 适用于任何循环控制结构中。作用是让程序立刻跳转到下一次循环的迭代。
在 for 循环中，continue 语句使程序立即跳转到更新语句。
在 while 或者 do…while 循环中，程序立即跳转到布尔表达式的判断语句。
```

**go**

Go语言支持以下几种流程控制语句
条件语句：关键字为 if，else 和else if
选择语句：关键字为switch，case和select（在channel中使用）
循环语句：关键字为 for 和 range
跳转语句：关键字 goto

```go
条件语句： if else 和 else if
func main() {
   demo :=example(2)
   fmt.Println(demo)
}

func example( x int) int  {
   if x == 0 { //不需要将 x==0 括起来，左花括号必须与if在同一行，所有if中的花括号必须存在
      return 1
   }else {
      return x
   }
}


注：if语句允许在if里面声明变量，但是这个变量的作用域只在该条件逻辑块内。

选择语句： 不用break结尾，go语言默认每个case最后都带有break
func main() {
   var i string = "3"
   switch i {
   case "1":
      fmt.Println("这是1")
   case "2":
      fmt.Println("这是2")
   case "3":
      fallthrough //强制跳到下一个case，必须存在下一个case或者default，否则报错
   case "4":
      fmt.Println("这是4")
   }
}


上面的switch 后面的表达式不是必须的，因此上面的可以修改为：
func main() {
   var i int = 3
   switch  {
   case i==1:
      fmt.Println("这是1")
   case i==2:
      fmt.Println("这是2")
   case i==3:
      fallthrough
   case i==4:
      fmt.Println("这是4")
   }
}



循环语句 ：for 和range
Go 只有一种循环结构——`for` 循环。
func main() {
   nums := [10]int{1,2,3,4,5,6,7,8,9,10}
   for a,b:=range nums{ //这里的a只索引下标，b指索引下标对应的元素值
      fmt.Println(a,b)
   }
}

在Go语言的for循环中也支持使用break，continue来控制循环，break是跳出当前循环，continue是跳出本次循环。Go语言中break有个更为高级的功能：跳转到指定标签
```

#### 数组，集合，map
**Java 数组**
```java
//数组：数组是储存在堆上的对象，可以保存多个同类型变量
//定义：用来存储固定大小的同类型元素。

//声明数组：int[] arrayInt

//创建数组：
//方式一
// 数组大小 
int size = 10; 
// 定义数组 
double[] myList = new double[size];

//方式二
double[] myList= {1.1, 1.2, ..., 1.10};

//数组索引从 0 开始，所以索引值从 0 到 arrayRefVar.length-1。

//多维数组
//多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数//组，其每一个元素都是一个一维数组，例如：
String str[][] = new String[3][4];  //表示 3行4列的数组

```
**Java 集合**
```java
import java.util.*;

public class Test{
   public static void main(String[] args) {
      List<String> list=new ArrayList<String>();
      list.add("Hello");
      list.add("World");
      list.add("HAHAHAHA");
      //第一种遍历方法使用foreach遍历List
      for (String str : list) {            //也可以改写for(int i=0;i<list.size();i++)这种形式
         System.out.println(str);
      }
      
      //第二种遍历，把链表变为数组相关的内容进行遍历
      String[] strArray=new String[list.size()];
      list.toArray(strArray);
      for(int i=0;i<strArray.length;i++) //这里也可以改写为  foreach(String str:strArray)这种形式
      {
         System.out.println(strArray[i]);
      }
      
      //第三种遍历 使用迭代器进行相关遍历
      Iterator<String> ite=list.iterator();
      while(ite.hasNext())//判断下一个元素之后有值
      {
         System.out.println(ite.next());
      }
   }
}
```
**Java map**
```java
import java.util.*;

public class Test{
   public static void main(String[] args) {
      Map<String, String> map = new HashMap<String, String>();
      map.put("1", "value1");
      map.put("2", "value2");
      map.put("3", "value3");
      
      //第一种：普遍使用，二次取值
      System.out.println("通过Map.keySet遍历key和value：");
      for (String key : map.keySet()) {
         System.out.println("key= "+ key + " and value= " + map.get(key));
      }
      
      //第二种
      System.out.println("通过Map.entrySet使用iterator遍历key和value：");
      Iterator<Map.Entry<String, String>> it = map.entrySet().iterator();
      while (it.hasNext()) {
         Map.Entry<String, String> entry = it.next();
         System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
      }
      
      //第三种：推荐，尤其是容量大时
      System.out.println("通过Map.entrySet遍历key和value");
      for (Map.Entry<String, String> entry : map.entrySet()) {
         System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
      }
      
      //第四种
      System.out.println("通过Map.values()遍历所有的value，但不能遍历key");
      for (String v : map.values()) {
         System.out.println("value= " + v);
      }
   }
}
```

Java集合的相关对比

![](C:\Users\MagicBook\Desktop\Image2.png)

**go 数组**
Go语言中的数组是定长的同一类型数据的集合，数组索引是从0开始的。
数组有以下几种创建方式

````go
var balance [10] float32 // 声明一个叫 balance的 10个元素的float32 数组
var balance = [5]float32{1000.0, 2000.0, 3000.4, 7000.0, 5000.0} //数组初始化
var balance = [...]float32{1000.0, 2000.0, 3000.4, 7000.0, 5000.0} // 忽略 [] 中的数字不设置数组大小，Go 语言会根据元素的个数自动设置数组的大小
````
以下是一些特殊数组
````go
[2*N] struct {x,y int32} //复杂类型数组
[1000]* float64  //指针数组，可以使用make创建，防止未初始化空间带来的影响
[3][5]int  //二维数组
[2][3][5]float64 // 等同于 [2]([3][5]float64)
````

当创建数组时，若没有被显示的初始化或者只是部分初始化，那么Go语言会自动的把数组其他的项都初始化为0（元素类型默认值）

获取数组长度，使用len函数；获取数组容量大小，使用cap函数，由于数组长度不可变，因此数组的容量等于长度。
````go
len(arr) == cap(arr)


访问数组
使用 len 遍历
for i := 0; i < len(arr); i++ {
   fmt.Printf("%c", arr[i])
}

使用 range 遍历，有两个返回值，第一个是 元素的数组下标，第二个是元素的值
for _, v := range arr{
      fmt.Printf("%c", v)
 }
````


**go 切片**
可以自动扩容但容量固定，弥补数组的长度在定义后无法再次修改，在函数体内无法对外部的数组内部结构进行修改的缺点。
数组切片的数据结构可以抽象为以下3个变量：
①一个指向原生数组的指针
②数组切片中的元素个数
③数组切片已分配的存储空间

数组与切片都可以使用下面所给出的语法进行切片
````go
s[n]                     //切片s中索引为n的项
s[n:m]                 //从切片s的索引位置 n 到 m-1 处所获得的切片                 
s[n:]                    //从切片s的索引位置 n 到len(s)-1处所获得的切片
s[:m]                   //从切片s的索引位置 0 到 m-1 处所获得的切片
s[:]                      //切片s的索引位置0到len(s)-1处所获得的切片
cap(s)                 //获得切片的容量：总是>= len(s)
len(s)                  //获得切片包含元素的个数：总是<= cap(s) 
s[:cap(s)]            //增加切片s的长度到其容量，如果长度小于等于容量的话

注：s == s[:n]+s[n:] //n为整型，0<=n<=len(s)
````

创建数组切片有以下几种方式
````go
①基于数组创建数组切片
var myArray [10]int = [10]int{1,2,3,4,5}
var mySlice []int = myArray[:5] //前五个元素创建数组切片
var mySlice []int = myArray[:] // 所有元素创建数组切片


②直接创建数组切片
mySlice :=make([]int,5,10) //创建元素初始值为0，初始元素个数即长度为5（必须设定），预留10个元素的存储容量（可以不设定，默认跟初始元素相等），空间容量大于等于初始元素个数
mySlice := []int{1,2,3,4,5}


③基于数组切片创建数组切片（指向同一个隐藏数组）
func main() {
   mySlice1 := []int{1,2,3,4,5} //容量与长度相同
   mySlice2 := mySlice1[:3]
   fmt.Println(mySlice2)
}

只要mySlice2选择的范围 mySlice1[:n] 这个n不超过 cap(mySlice1) 的值即可，自动补充0
````
当创建一个切片时，它会创建一个隐藏的初始化为零值的数组，然后返回引用该隐藏数组的切片。该隐藏数组也是固定长度的，该长度始终等于切片的容量。比如下图所示的切片x，基于切片x创建的切片y

![](C:\Users\MagicBook\Desktop\Image3.png)

**go map**
Go语言中的 映射（map）是一种内置的数据结构，保存键值对的无序的集合，容量只受机器内存的限制。
对于映射中所有的键规定是唯一的且必须是支持 == 和 != 操作符类型的。所以不能是 function,slice,map

哪怕使用同样的顺序保存键值对，每次迭代时的顺序都可能不一样，因为映射的实现使用了散列表。

映射的创建方式有以下几种：
````go
func main() {
   map1 := make(map[string]string)  // map1:  map[]
   map2 := make(map[string]string,5) // map2:  map[]
   map3 := map[string]string{"num1":"num1","num2":"num2"} // map3:  map[num1:num1 num2:num2]
   map4 := map[string]string{}  //  map4:  map[]
}
````

使用range迭代映射，这里range返回的就是键值对，而不是索引和值
````go
func main() {
   MyBooks := make( map[string]string)
   MyBooks["Golang"] = "Gin"
   MyBooks["Java"] = "Spring"
   for k,v := range MyBooks {
      fmt.Println("k: ",k," v: ",v)
   }
}
-----output-----
k:  Golang  v:  Gin
k:  Java  v:  Spring
````

**go 标准容器**
类似于Java的集合：list，map，set等，Go语言中也提供了类似的标准容器，在标准包container包含了conatiner/list，container/heap，container/ring三种标准容器。


（1）conatiner/list 容器
list是一个双向的链表，可以添加类型不一的元素进来
在conatiner/list源码包中提供了相关的示例，比如下面这个示例
````go
package list_test

import (
   "container/list"
   "fmt"
)

func Example() {
   // 创建一个新list并在其中放入一些数字。
   l := list.New()
   e4 := l.PushBack(4)
   e1 := l.PushFront(1)
   l.InsertBefore(3, e4)
   l.InsertAfter(2, e1)

   // Iterate through list and print its contents.
   for e := l.Front(); e != nil; e = e.Next() {
      fmt.Println(e.Value)
   }
````

（2）conatiner/ ring 容器
关于ring 容器的函数说明与结构如下所示：

```go
// Ring是循环列表或循环的元素。
type Ring struct {
    Value interface{} // 类型为interface{}，因此可以接受任意类型
}

// 创建一个长度为n的环形链表
func New(n int) *Ring

// 针对环形链表中的每一个元素x进行f(x)操作
func (r *Ring) Do(f func(interface{}))

// 获取环形链表长度
func (r *Ring) Len() int

// 如果r和s在同一环形链表中，则删除r和s之间的元素
// 被删除的元素组成一个新的环形链表，返回值为该环形链表的指针（即删除前，r->Next()表示的元素）
// 如果r和s不在同一个环形链表中，则将s插入到r后面，返回值为 插入s后，s最后一个元素的下一个元素（即插入前，r->Next()表示的元素）
func (r *Ring) Link(s *Ring) *Ring

// 移动 n % r.Len() 个位置，n正负均可
func (r *Ring) Move(n int) *Ring

// 返回下一个元素
func (r *Ring) Next() *Ring

// 返回前一个元素
func (r *Ring) Prev() *Ring

// 删除r后面的 n % r.Len() 个元素
func (r *Ring) Unlink(n int) *Ring
```

（3）conatiner/ heap 容器
conatiner/ heap 容器仅仅提供了最小堆的操作，然后由我们自己实现堆的数据结构（必须满足heap定义的接口），再利用heap包提供了一个heap.Interface接口做桥梁跟堆的操作搭上关系。

堆数据结构满足的接口定义：
```go
type Interface interface {
   sort.Interface
   Push(x interface{}) // 将x添加为元素Len（）
   Pop() interface{}   // 移除并返回元素的Len() - 1
}
```
```go
而 sort.Interface 的接口定义如下：
type Interface interface {
   // Len is the number of elements in the collection.
   Len() int
   // Less reports whether the element with
   // index i should sort before the element with index j.
   Less(i, j int) bool
   // Swap swaps the elements with indexes i and j.
   Swap(i, j int)
}
```

也就是说，如果我们让堆的数据结构与heap提供的堆操作搭上关系，就必须实现上面的五个方法。

heap包中还提供了下面几个函数的实现
```go
//必须先初始化堆，然后才能使用任何堆操作。 Init对于堆不变量是幂等的，并且可以在堆不变量可能被无效时被调用。
//其复杂度为O（n），其中n = h.Len（）。
func Init(h Interface)

// Push将元素x推送到堆上。 复杂度为O（log（n）），其中n = h.Len（）。
func Push(h Interface, x interface{})

// Pop从堆中删除最小元素（根据Less）并返回它。 复杂度为O（log（n）），其中n = h.Len（）。
//相当于Remove（h，0）。
func Pop(h Interface) interface{} 

// Remove从堆中删除索引i处的元素。
//复杂度为O（log（n）），其中n = h.Len（）。
func Remove(h Interface, i int)

//修复在索引i处的元素更改其值后重新建立堆排序。
//在索引i处更改元素的值，然后调用Fix，相当于调用Remove（h，i），然后调用新值，相当于便宜。
//复杂度为O（log（n）），其中n = h.Len（）。
func Fix(h Interface, i int)

func up(h Interface, j int) 

func down(h Interface, i0, n int) bool
```
#### 处理异常
**Java**
```java
int execute(){
   throw new RuntimeException(”msg”); // 有错误
   return 0;    // 无错误
}
// 处理
try{
      int code = execute();
      }catch(Exception e){
      // TODO 异常情况如何处理
}
```

**go**
```go
func Execute() (int , error) {
      return 1,error.New(“msg”) // 有错误
      return 0 // 无错误
      }
// 处理
      if code,err=c.Execute();err!=nil {
      // TODO 异常情况如何处理
}
```

#### 继承，抽象，多态，接口
**Java**
1. 继承

继承可以使用 extends 和 implements 这两个关键字来实现继承，而且所有的类都是继承于 java.lang.Object，当一个类没有继承的两个关键字，则默认继承object（这个类在 java.lang 包中，所以不需要 import）祖先类。

继承： 子类继承父类的特征和行为，使得子类对象（实例）具有父类的实例域和方法，或子类从父类继承方法，使得子类具有父类相同的行为。

```java
/**
* 创建一个类：动物类
*/
public class Animal {
   //实例变量
   int age;
   int weight;
   int heigh;
   String name;
   //动物类公共的方法
   public void hungry(){
      System.out.println("我是父类");
   }
   public void sleeping(){
      System.out.println("我是父类");
   }
   public void barking(){
      System.out.println("我是父类");
   }
}
//创建一个 猫 类
class Cat extends Animal{
   String color;
   String  name;
   //构造方法
   public Cat(){}
   public Cat(String color,String name){
      System.out.println("小猫的名字是："+name+" 颜色是： "+color);
   }
   public void hungry(){
      System.out.println("我是子类");
   }
}

public class Main {
    public static void main(String[] args) {
       Cat myCat = new Cat();
       myCat.color = "白色";
       myCat.name = "丸子";
       myCat.hungry();
    }
}
---output ---
我是子类
```

关于继承的说明：

![](C:\Users\MagicBook\Desktop\Image4.png)



继承的特性
子类拥有父类非 private 的属性、方法。
子类可以拥有自己的属性和方法，即子类可以对父类进行扩展。
子类可以用自己的方式实现父类的方法。

2 抽象类

在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，并不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。

相对于普通的类：不能实例化对象之外，类的其它功能依然存在，成员变量、成员方法和构造方法的访问方式和普通类一样。由于抽象类不能实例化对象，所以抽象类必须被继承，才能被使用。
抽象类中可以有具体的方法或者抽象方法。变量与方法（抽象方法外）可以是任何类型的。

在Java中使用 abstract class 定义抽象类
```java
public abstract class Employee
{
   private String name;
   private String address;
   private int number;
   public Employee(String name, String address, int number)
   {
      System.out.println("Constructing an Employee");
      this.name = name;
      this.address = address;
      this.number = number;
   }
   public double computePay()
   {
      System.out.println("Inside Employee computePay");
      return 0.0;
   }
   public void mailCheck()
   {
      System.out.println("Mailing a check to " + this.name
            + " " + this.address);
   }
   public String toString()
   {
      return name + " " + address + " " + number;
   }
   public String getName()
   {
      return name;
   }
   public String getAddress()
   {
      return address;
   }
   public void setAddress(String newAddress)
   {
      address = newAddress;
   }
   public int getNumber()
   {
      return number;
   }
}
```
若直接实例化该抽象类，就报错
```java
public class AbstractDemo
{
   public static void main(String [] args)
   {
      /* 以下是不允许的，会引发错误 */
      Employee e = new Employee("George W.", "Houston, TX", 43);
      
      System.out.println("\n Call mailCheck using Employee reference--");
      e.mailCheck();
   }
}

----报如下错误---
Employee.java:46: Employee is abstract; cannot be instantiated
```

需要先继承，然后通过子类实例化
```java
public class Salary extends Employee
{
   private double salary; //Annual salary
   public Salary(String name, String address, int number, double
         salary)
   {
      super(name, address, number);
      setSalary(salary);
   }
   public void mailCheck()
   {
      System.out.println("Within mailCheck of Salary class ");
      System.out.println("Mailing check to " + getName()
            + " with salary " + salary);
   }
   public double getSalary()
   {
      return salary;
   }
   public void setSalary(double newSalary)
   {
      if(newSalary >= 0.0)
      {
         salary = newSalary;
      }
   }
   public double computePay()
   {
      System.out.println("Computing salary pay for " + getName());
      return salary/52;
   }
}

public class AbstractDemo
{
   public static void main(String [] args)
   {
      Salary s = new Salary("Mohd Mohtashim", "Ambehta, UP", 3, 3600.00);
      Employee e = new Salary("John Adams", "Boston, MA", 2, 2400.00);
      
      System.out.println("Call mailCheck using Salary reference --");
      s.mailCheck();
      
      System.out.println("\n Call mailCheck using Employee reference--");
      e.mailCheck();
   }
}
```

3. 抽象方法

如果你想设计这样一个类，该类包含一个特别的成员方法，该方法的具体实现由它的子类确定，那么你可以在父类中声明该方法为抽象方法。
Abstract 关键字同样可以用来声明抽象方法，抽象方法只包含一个方法名，而没有方法体。
抽象方法没有定义，方法名后面直接跟一个分号，而不是花括号。

```java
public abstract class Employee
{
   //私有属性
   private String name;
   private String address;
   private int number;
   //抽象方法
   public abstract double computePay();
   
   //其余代码
}

public class Salary extends Employee
{
   private double salary; // Annual salary
   
   public double computePay()
   {
      System.out.println("Computing salary pay for " + getName());
      return salary/52;
   }
   
   //其余代码
}
```

继承抽象方法的子类必须重写该方法。否则，该子类也必须声明为抽象类。最终，必须有子类实现该抽象方法，否则，从最初的父类到最终的子类都不能用来实例化对象。

4. 多态

多态： 多态性是对象多种表现形式的体现。
现实中，比如我们按下 F1 键这个动作：
如果当前在 Flash 界面下弹出的就是 AS 3 的帮助文档；
如果当前在 Word 下弹出的就是 Word 帮助；
在 Windows 下弹出的就是 Windows 帮助和支持。
同一个事件发生在不同的对象上会产生不同的结果。

多态的优点
1. 消除类型之间的耦合关系
2. 可替换性
3. 可扩充性
4. 接口性
5. 灵活性
6. 简化性

多态存在的三个必要条件
继承
重写
父类引用指向子类对象


```java
public class Test {
   public static void main(String[] args) {
      show(new Cat());  // 以 Cat 对象调用 show 方法
      show(new Dog());  // 以 Dog 对象调用 show 方法
      
      Animal a = new Cat();  // 向上转型  
      a.eat();               // 调用的是 Cat 的 eat
      Cat c = (Cat)a;        // 向下转型  
      c.work();        // 调用的是 Cat 的 work
   }
   
   public static void show(Animal a)  {
      a.eat();
      // 类型判断
      if (a instanceof Cat)  {  // 猫做的事情
         Cat c = (Cat)a;
         c.work();
      } else if (a instanceof Dog) { // 狗做的事情
         Dog c = (Dog)a;
         c.work();
      }
   }
}

abstract class Animal {
   abstract void eat();
}

class Cat extends Animal {
   public void eat() {
      System.out.println("吃鱼");
   }
   public void work() {
      System.out.println("抓老鼠");
   }
}


class Dog extends Animal {
   public void eat() {
      System.out.println("吃骨头");
   }
   public void work() {
      System.out.println("看家");
   }
}

---output---
吃鱼
抓老鼠
吃骨头
看家
吃鱼
抓老鼠
```



5. 接口

接口： 是抽象方法的集合，接口通常以interface来声明。 接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。类描述对象的属性和方法。接口则包含类要实现的方法。 除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。 接口无法被实例化，但是可以被实现。一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类。 另外，在 Java 中，接口类型可用来声明一个变量，他们可以成为一个空指针，或是被绑定在一个以此接口实现的对象。

特点：
一个接口可以有多个方法。
接口文件保存在 .java 结尾的文件中，文件名使用接口名。
接口的字节码文件保存在 .class 结尾的文件中。
接口相应的字节码文件必须在与包名称相匹配的目录结构中。
接口不能用于实例化对象。
接口没有构造方法。
接口中所有的方法必须是抽象方法。
接口不能包含成员变量，除了 static 和 final 变量。
接口不是被类继承了，而是要被类实现。
接口支持多继承。
接口中所有的方法与变量都会被指定为 public。
方法会被隐式的指定为 public abstract，变量会被隐式的指定为 public static final 变量

抽象类和接口的区别
1. 抽象类中的方法可以有方法体，就是能实现方法的具体功能，但是接口中的方法不行。
2. 抽象类中的成员变量可以是各种类型的，而接口中的成员变量只能是 public static final 类型的。
3. 接口中不能含有静态代码块以及静态方法(用 static 修饰的方法)，而抽象类是可以有静态代码块和静态方法。
4. 一个类只能继承一个抽象类，而一个类却可以实现多个接口。

声明一个动物类接口
```java
interface Animal {
   public static final String name = "丸子";
   public void eat();
   public void travel();
}

//子类实现接口中的所有方法，否则该子类为抽象类
public class MammalInt implements Animal{
   
   public void eat(){
      System.out.println("Mammal eats");
   }
   
   public void travel(){
      System.out.println("Mammal travels");
   }
   
   public int noOfLegs(){
      return 0;
   }
   
   public static void main(String args[]){
      MammalInt m = new MammalInt();
      m.eat();
      m.travel();
   }
}
```

Java只能单继承，但是可以多实现（接口的多继承）
```java
public interface Sports

public interface Event

public interface Hockey extends Sports, Event
```

**go**
1. 接口
```go
package main

import "fmt"

type Animal interface {
   eat() string
}
type Cat struct {
}
type Dog struct {
}

//cat 接收者
func (c Cat) eat() string {
   return "吃鱼"
}
func (c Cat) work() string {
   return "抓老鼠"
}

//cat 接收者
func (c Dog) eat() string {
   return "吃骨头"
}

func (c Dog) work() string {
   return "看家"
}

func main() {
    var animal Animal
    animal = new(cat)
    fmt.Println(anima.eat())
    animal = new(dog)
    fmt.Println(anima.eat())
}

---output---
吃鱼
```

2. 使用组合实现伪继承
```go
package main

import "fmt"

type Parent struct {
   //父类属性
   name string
   age int
   sex string
}
//父类方法
func (fu *Parent)play(){
   fmt.Println("我是父亲，这是我的play方法！")
}
//父类方法
func(fu *Parent)playson(){
   fmt.Println("我是父亲，这是我的playson方法！")
}

type Child struct {
   //子类属性
   Parent
   knowleage string
}

//子类方法重写父类方法
func (son *Child)play(){
   fmt.Println("我是儿子，这是我的play方法")
}

func main() {
   parent := new(Parent)
   parent.play() //我是父亲，这是我的play方法！
   parent.playson() //我是父亲，这是我的playson方法！
   child := new(Child)
   child.play() //我是儿子，这是我的play方法
   //子类方法继承父类方法
   child.playson() //我是父亲，这是我的playson方法！
}
```
3. 多态
```go
package main

import "fmt"

type Animal interface {
   eat() string
}
type Cat struct {
}
type Dog struct {
}

//cat 接收者
func (c Cat) eat() string {
   return "吃鱼"
}
func (c Cat) work() string {
   return "抓老鼠"
}

//cat 接收者
func (c Dog) eat() string {
   return "吃骨头"
}

func (c Dog) work() string {
   return "看家"
}

func main() {
   fmt.Println(Factory("cat"))
   fmt.Println(Factory("dog"))
}

func Factory(name string) string {
   switch name {
   case "dog":
      return Dog{}.eat()
   case "cat":
      return Cat{}.eat()
   default:
      panic("No such animal")
   }
}
```

#### 重载，重写

```java
//重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。 发生在继承中
class Animal{
   public void move(){
      System.out.println("动物可以移动");
   }
}

class Dog extends Animal{
   public void move(){
      System.out.println("狗可以跑和走");
   }
}

public class TestDog{
   public static void main(String args[]){
      Animal a = new Animal(); // Animal 对象
      Animal b = new Dog(); // Dog 对象
      
      a.move();// 执行 Animal 类的方法
      
      b.move();//执行 Dog 类的方法
   }
}
---output---
动物可以移动
狗可以跑和走
```

```java
重载(overloading) 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同
每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。
最常用的地方就是构造器的重载。

public class Overloading {
   public int test(){
      System.out.println("test1");
      return 1;
   }
   
   public void test(int a){
      System.out.println("test2");
   }
   
   //以下两个参数类型顺序不同
   public String test(int a,String s){
      System.out.println("test3");
      return "returntest3";
   }
   
   public String test(String s,int a){
      System.out.println("test4");
      return "returntest4";
   }
   
   public static void main(String[] args){
      Overloading o = new Overloading();
      System.out.println(o.test());
      o.test(1);
      System.out.println(o.test(1,"test3"));
      System.out.println(o.test("test4",1));
   }
}
```

![](C:\Users\MagicBook\Desktop\Image5.png)

**go 重载**

类似于Java中的继承，子类继承并重写父类的方法，Go语言也提供了这样的实现。

interface

```go

```


垃圾回收


并发

