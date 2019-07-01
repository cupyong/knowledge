

#####第四步 点击时候也要初始化页面(提取出来path) 


```js


var element ={
    'user':`<a href="#ad">ad</a>`,
    'ad':`<a href="#user">user</a>`,
}


function Framework(id) { //构造函数模式
    this.elementId = document.getElementById(id);
    this.GetPath=function(){
        var str = location.href
        var num = str.indexOf("#");
        str = str.substr(num + 1);
        return str;
    }
    this.path= this.GetPath()
    this.start = function () {
        this.elementId.innerHTML = this.routerList[this.path]
    };
    this.routerList = {}
    this.router = function (path, element) {
        this.routerList[path] = element
    }
}

(function () {
    var app = new Framework('app');
    app.router('user',element.user)
    app.router('ad',element.ad)
    app.start()
})(window)
```

###### 第五步

```js



function Framework(id) { //构造函数模式
    this.elementId = document.getElementById(id);
    this.GetPath=function(){
        var str = location.href
        var num = str.indexOf("#");
        str = str.substr(num + 1);
        return str;
    }
    this.path= this.GetPath()
    this.start = function () {
        if(this.routerList[this.path]){
            this.elementId.innerHTML = this.routerList[this.path].render()
        }else{
            this.elementId.innerHTML = '404'
        }
    };
    this.routerList = {}
    this.router = function (path, m) {
        this.routerList[path] = new m(this.Link)
    }
    this.Link=function(path){
        this.path= path
        this.start()
    }
}
var element ={
    'user':function(Link){
        this.render=function(){
            return `<a href="#ad" onClick="javascript:app.Link('ad')" >ad</a>`
        }
    },
    'ad':function(){
        this.render=function(){
            return `<a href="#ad" onClick="javascript:app.Link('user')" >user</a>`
        }
    },
}
var app = new Framework('app');
app.router('user',element.user)
app.router('ad',element.ad)
app.start()

```

