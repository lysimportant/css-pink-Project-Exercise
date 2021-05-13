 // 简单的动画函数obj 目标对象 target 目标位置
 function animate(obj , target,callback) {
    // callback = function callback(){} 调用是 callback();
    // 不断的点击按钮，这个元素会越来越快，因为开的定时器太多了
    // 解决的方案 让定时器只执行一个  先清除以前的定时器不让它累加执行 只保留当前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值 
        // var step = Math.ceil((target - obj.offsetLeft) / 10 );
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if(obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if(callback) {
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加的定值 改为慢慢变小的值 步长公式：(目标值 - 现在的位置) / 10 
        obj.style.left = obj.offsetLeft + step + 'px';                
      },5);
}