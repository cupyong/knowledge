> # 样式,颜色 #


 ## 颜色 ##

+ fillStyle = color  --> 填充颜色
+ strokeStyle = color --> 描边颜色
+ globalAlpha= 0.2  -->透明度

    ```js
    ctx.fillStyle = "orange";
    ctx.fillStyle = "#FFA500";
    ctx.fillStyle = "rgb(255,165,0)";
    ctx.fillStyle = "rgba(255,165,0,1)";    
    ```


## 线 ##

+ lineWidth = value 设置线条宽度。
+ lineCap = type 设置线条末端样式。(butt，round 和 square。默认是 butt。)

    ```js
    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.lineCap="butt";
    ctx.moveTo(20,20);
    ctx.lineTo(200,20);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap="round";
    ctx.moveTo(20,40);
    ctx.lineTo(200,40);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap="square";
    ctx.moveTo(20,60);
    ctx.lineTo(200,60);
    ctx.stroke();
    ```
+ lineJoin = type 设定线条与线条间接合处的样式。
    ```js
    ctx.beginPath();
    ctx.lineJoin="round";
    ctx.moveTo(20,20);
    ctx.lineTo(100,50);
    ctx.lineTo(20,100);
    ctx.stroke();
    ```
+ miterLimit = value 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
        ```js
        ctx.lineWidth=10;
        ctx.lineJoin="miter";
        ctx.miterLimit=5;
        ctx.moveTo(20,20);
        ctx.lineTo(50,27);
        ctx.lineTo(20,34);
        ctx.stroke();
        ```
+ getLineDash() 返回一个包含当前虚线样式，长度为非负偶数的数组。
    ```js
    ctx.setLineDash([1,2 ]);
    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    ```
+ setLineDash(segments)  设置当前虚线样式。


+ lineDashOffset = value 设置虚线样式的起始偏移量。

```js
var ctx = document.getElementById('canvas').getContext('2d');
var offset = 0;

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10,10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```


#### 渐变  ####
+ createLinearGradient(x1, y1, x2, y2) createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
    ```js
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");

        var grd=ctx.createLinearGradient(0,0,170,0);
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"white");

        ctx.fillStyle=grd;
        ctx.fillRect(20,20,150,100);
    ```
+ createRadialGradient(x1, y1, r1, x2, y2, r2) createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

        ```js
            var c=document.getElementById("myCanvas");
            var ctx=c.getContext("2d");

            var grd=ctx.createRadialGradient(75,50,5,90,60,100);
            grd.addColorStop(0,"red");
            grd.addColorStop(1,"white");

            // Fill with gradient
            ctx.fillStyle=grd;
            ctx.fillRect(10,10,150,100);
        ```


#### 图案样式 ####


+ createPattern(image, type) 该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。 createPattern() 方法在指定的方向内重复指定的元素。元素可以是图片、视频，或者其他 canvas 元素。被重复的元素可用于绘制/填充矩形、圆形或线条等等。

    ```js
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("lamp");
    var pat=ctx.createPattern(img,"repeat");
    ctx.rect(0,0,150,100);
    ctx.fillStyle=pat;
    ctx.fill();
    ```


#### Shadows ####

+ shadowColor 	设置或返回用于阴影的颜色
+ shadowBlur 	设置或返回用于阴影的模糊级别
+ shadowOffsetX 	设置或返回阴影距形状的水平距离
+ shadowOffsetY 	设置或返回阴影距形状的垂直距离

    ```js
     var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.shadowBlur=10;
    ctx.shadowOffsetY=20;
    ctx.shadowColor="black";
    ctx.fillStyle="blue";
    ctx.fillRect(20,20,100,80);
    ```