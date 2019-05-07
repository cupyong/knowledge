<h2>快速浏览API</h2>

<h4>快速入门</h4>
>canvas是一个可以使用脚本(通常为JavaScript)来绘制图形的 HTML 元素.例如,它可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画.[打个样](https://www.html5tricks.com/16-html5-canvas-animation.html)

```html
<html>
  <head>
    <title>Canvas tutorial</title>
    
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
          var ctx = canvas.getContext('2d');
              ctx.beginPath();
              ctx.moveTo(75, 50);
              ctx.lineTo(100, 75);
              ctx.lineTo(120, 25);
              ctx.fill();
      }
    </script>
  </body>
</html>
```

