
window.addEventListener('load',function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter',function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave',function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_l.click();
        },2000);
    });
    // var ul = document.querySelector('picg');
    // 动态生成 小圆圈 
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // ul.children.length  得到li的个数 生成对应的小圆圈
    for(var i = 0; i < ul.children.length ; i++ ) {
        var li = document.createElement('li');  // 创建 li
        li.setAttribute('data-index',i);  // 创建自定义属性 方便 做引导
        ol.appendChild(li); // 在ol里面添加 li
        // 小圆圈排他思想
        li.addEventListener('click',function() {
            for(var i = 0; i < ol.children.length ; i++ ) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击图片 移动图片 做移动的是 ul
            // ul 移动的距离 小圆圈的索引号 乘以 图片的宽度  值 是负值
            var index = this.getAttribute('data-index');  // 利用上面的自定义属性得到索引号 
            // 点击了某个 li 就把这个li的索引号 给num 
            num = index;
            // 点击了某个 li 就把这个li的索引号 给cricle
            circle = index;
            var ulWidth =  -(index * focusWidth); // 盒子该走的像素位置
            animate(ul,ulWidth);
        });
    }
    ol.children[0].className = 'current';
    // 6. 克隆第一个li 放到最后面 方便做无缝链接
        var lis = ul.children[0].cloneNode(true);
        ul.appendChild(lis);
    // 7.点击右侧,图片滚动一张
    var num = 0;  // 记录图片每次右平移的次数
    var circle = 0; // 记录小圆圈的位置
    var flag = true
    arrow_l.addEventListener('click',function() {
        if(flag) {
            flag = false;
              // 走到最后复制的那一个li,把ul 快速复原left 改为0
        if(num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
            num++;
         animate(ul, -num * focusWidth ,function() {
             flag = true;
         });
         circle++;
        // 8.  当 circle == ol.children.length 说明走到了最后克隆二点图片了 需要复原为0;
        //  if(circle == ol.children.length) {
        //      circle = 0;
        //  }
         circle = circle == ol.children.length ? circle = 0 : circle;
        //  调用函数
         cricleChage();
        }
    });

    // 左侧按钮
    arrow_r.addEventListener('click',function() {
      if(flag) {
          flag = false;
            // 走到最后复制的那一个li,把ul 快速复原left 改为0
        if(num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focus.offsetWidth + 'px';
        }
        num--;
         animate(ul, -num * focusWidth,function() {
             flag = true;
         });
         circle--;
        // 8.  当 circle < 0 说明是第一张图片 则小圆圈改为第四个-
        //  if(circle < 0) {
        //      circle = ol.children.length-1;
        //  }
         circle = circle < 0 ? ol.children.length-1 : circle;
         // 调用函数
         cricleChage();
      }
    });
    function cricleChage() {
        //  先清除其余的小圆圈点 的current
        for(var i = 0;i < ol.children.length; i++ ) {
            ol.children[i].className = '';
        }
       //  留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 10. 自动播放 
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_l.click();
    },2000);
});

$(function() {
    // 点击小li 不要执行页面滚动事件 页面滚动事件里面的 li 的背景选中 添加current_1
    // 节流阀  互斥锁
    var flag = true;
    $(window).scroll(function() {

        if($(document).scrollTop() >= $(".recom").offset().top) {
            $(".fixedtool").fadeIn();
        }else {
            $(".fixedtool").fadeOut();
        }
        if(flag) {
            $(".floor .w").each(function(i,ele) {
            if($(document).scrollTop() >= $(ele).offset().top) {
                // console.log(i);
                $(".fixedtool li").eq(i).addClass("current_1").siblings().removeClass();
            }
        });
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        // 每次点击小li 计算需要页面去往的位置
        // 选出对应索引号的内容区的盒子 计算它的 .offset().top;
        // var current = $(".floor .w").eq($(this).index()).offset().top;
        $(this).addClass("current_1").siblings().removeClass();
        $("body, html").stop().animate({
            scrollTop: $(".floor .w").eq($(this).index()).offset().top
        },function() {
            flag = true;
        });
    });
});
