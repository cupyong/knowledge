# 简单介绍一下js  在es5   以及es6之后的面向地向的写法
<h4>es5</h4>
```js
/**
 *
 * @param {string} name 
 * @param {number} age 
 * 
 */

function Person(name,age){
    this.name = name
    this.age = age
    this.say=function(){
        alert(this.name)
    }
}

var p1 = new Person('刘德华',19)
p1.say()

function Boy(name,age) {
    Person.call(this,name,age)  // 传递参数 借用模式
}
Boy.prototype = new Person() //继承方法

var b1 = new Boy('周星驰',89)
b1.say()
```

<h4>es6</h4>
```js
class Person {
    constructor(name,age){
        this.name = name
        this.age = age
    }
    say(){
        alert(this.name)
    }
}

let p1 = new Person('李德华',19)
p1.say()

//继承
class Boy extends Person{
    constructor(name,age){
        super(name,age) 
    }
}

let b1 = new Boy("张三丰",299)
b1.say()
```


