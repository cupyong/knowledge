

## 基础动画



#### 基本步骤

1. **清空 canvas**

   除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 `clearRect` 方法。

2. **保存canvas状态**

   如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下

3. **绘制动画图形**

   这一步才是重绘动画帧。

4. **恢复 canvas 状态**

   如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。



#### 操作动画 Controlling an animation

​	在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常，我们仅仅在脚本执行结束后才能看见结果，比如说，在 for 循环里面做完成动画是不太可能的。

因此， 为了实现动画，我们需要一些可以定时执行重绘的方法。有两种方法可以实现这样的动画操控。首先可以通过 `setInterval` 和 `setTimeout` 方法来控制在设定的时间点上执行重绘。



setInterval(func,delay)    一直执行 

setTimeout(func,delay)  执行一次

requestAnimationFrame(callback)

