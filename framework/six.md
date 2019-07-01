

#####前端单页面 


```js
 (function () {
    var app = new  Framework('app'); 
    app.start()
})(window)


function Framework(id) { 
    this.elementId = document.getElementById(id);
    this.start = function () {
        this.elementId.innerHTML =`<a href='https://www.baidu.com/'>adsasd</a>`
    };
}
```

###### 第二步 提前路由

```js


var element ={
    user:`<a href="#ad">ad</a>`,
    ad:`<a href="#user">user</a>`,
}
function Framework(id) { //构造函数模式
    this.elementId = document.getElementById(id);
    this.start = function () {
        this.elementId.innerHTML = `<a href="#user">bbb</a>`
    };
    this.routerList = {}
    this.router = function (path, element) {
        this.routerList[path] = element
    }
}
(function () {
    var app = new Framework('app');
    app.router('/user',element.user)
    app.router('/ad',element.ad)
    app.start()
})(window)
```

######第三步 根据不同的路由处理不同的函数

```Js


var element ={
    'user':`<a href="#ad">ad</a>`,
    'ad':`<a href="#user">user</a>`,
}

function Framework(id) { //构造函数模式
    this.elementId = document.getElementById(id);
    this.start = function () {
        var  path= this.GetPath()
        this.elementId.innerHTML = this.routerList[path]
    };
    this.routerList = {}
    this.router = function (path, element) {
        this.routerList[path] = element
    }
    this.GetPath=function(){
        var str = location.href
        var num = str.indexOf("#");
        str = str.substr(num + 1);
        return str;
    }
}

(function () {
    var app = new Framework('app');
    app.router('user',element.user)
    app.router('ad',element.ad)
    app.start()
})(window)
```

