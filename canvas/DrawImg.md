> # 获得需要绘制的图片 #

1.  context.drawImage(img,x,y);
2.  drawImage(img,x,y,width,height);
3.  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

    string img
    所要绘制的图片资源

    number sx
    源图像的矩形选择框的左上角 x 坐标

    number sy
    源图像的矩形选择框的左上角 y 坐标

    number sWidth
    源图像的矩形选择框的宽度

    number sHeight
    源图像的矩形选择框的高度

    number dx
    图像的左上角在目标 canvas 上 x 轴的位置

    number dy
    图像的左上角在目标 canvas 上 y 轴的位置

    number dWidth
    在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放

    number dHeight
    在目标画布上绘制图像的高度，允许对绘制的图像进行缩放

    ```html
    <!DOCTYPE html>
    <html>
    <body>

    <p>要使用的图片：</p>

    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554352625564&di=d219d2763ac33acd6d663f8ee6458512&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170714%2Fafb51e2dccfa46f19d8e919d5a426d07_th.jpg" alt="tulip" id="tulip" style="margin-left:0px;" />

    <p>Canvas:</p>

    <canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
    Your browser does not support the HTML5 canvas tag.
    </canvas>

    <script>
    document.getElementById("tulip").onload=function(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("tulip");
    ctx.drawImage(img,0,0,300,350,20,20,50,50);
    };
    </script>

    </body>
    </html>
    ```