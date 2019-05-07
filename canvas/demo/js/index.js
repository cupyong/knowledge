/**
 @type {HTMLCanvasElement}
 */
draw()
// drawRrc()
// drawQuadratic()
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.fillStyle = "#FFA500";
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 6, 0, Math.PI * 2, true);  // 右眼
        ctx.strokeStyle = "#FFA500";
        ctx.stroke();
    }
}
function drawRrc() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, 20*(Math.PI/180),false); // 绘制  控制方向false 顺时针 ,true 逆时针 
        ctx.stroke()
    }
}
function drawQuadratic() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
   
    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.fillStyle = "orange";
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.quadraticCurveTo(125,100,125,62.5);
    ctx.quadraticCurveTo(125,25,75,25);

    ctx.stroke();
     }
   }