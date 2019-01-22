$(function(){
    var count = $('.slide_wrapper').find('.slide_pic').length;
    var index = 1;
    var count2 = 2;
    var index2 = 1;
    var timer;
    var timer2;
    // console.log($('.slide_wrapper').find('img').first().attr('src'))
    var firstSrc = $('.slide_wrapper').find('img').first().attr('src');
    var lastSrc = $('.slide_wrapper').find('img').last().attr('src');
    
    var firstLi = $("<li class='slide_pic'><a href='javascript:;'><img src='"+lastSrc+"'></a></li>");
    // console.log($('.slide_wrapper').find('div').first())
    firstLi.insertBefore($('.slide_wrapper').find('.slide_pic').first());

    var lastLi = $("<li class='slide_pic'><a href='javascript:;'><img src='"+firstSrc+"'></a></li>")
    lastLi.insertAfter($('.slide_wrapper').find('.slide_pic').last());

    var firstli = $("<li><span>热门</span>卫生间都不流行装柜子了，现在流行装柜子</li>");
    firstli.insertAfter($('.news_ul').find('li').last());
    var lastli = $("<li><span>热门</span>皮肤起皮失水状态，三步选保湿让肌肤更加干燥</li>");
    lastli.insertBefore($('.news_ul').find('li').first());

    openAutoSlide();
    openAutoSlide2();


    function openAutoSlide() {
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            beActive($('.slide_btn').eq(index - 1));
            // console.log(index-1)
            next_pic();
        }, 3000)
    }

    next_pic = function () {
        openTransition();
        index++;
        goslide();
        if (index > count) {
            index = 1;
            beActive($('.slide_btn').eq(index - 1));

            setTimeout(function () {
                closeTransition();
                goslide();
            }, 800)
        } else {
            beActive($('.slide_btn').eq(index - 1));

        }
    }

    perv_pic = function() {
        openTransition();
        index--;
        goslide();
        if (index < 1) {
            index = count;
            beActive($('.slide_btn').eq(index - 1));

            setTimeout(function () {
                closeTransition();
                goslide();
            }, 800)
        } else {
            beActive($('.slide_btn').eq(index - 1));

        }
    }

    function openAutoSlide2() {
        if (timer2) {
            clearInterval(timer2);
        }
        timer2 = setInterval(function () {
            next_li();
        }, 2500)
    }

    next_li = function(){
        openTransition();
        index2++;
        goli();
        if(index2>count2){
            index2 = 1;
            setTimeout(function(){
                closeTransition();
                goli();
            },800)
        }
        else{
            return
        }
    }


    function closeAutoSlide() {
        clearInterval(timer);
        setTimeout(function () {
            openAutoSlide();
        }, 6000)
    }

    function openTransition() {
        $('.slide_wrapper').stop().css({
            'transition': 'all 500ms ease-in-out'
        })
        $('.news_ul').stop().css({
            'transition': 'all 500ms ease-in-out'
        })
    }

    function closeTransition() {
        $('.slide_wrapper').stop().css({
            'transition': 'none'
        });
        $('.news_ul').stop().css({
            'transition': 'none'
        })
    }

    function goslide() {
        $('.slide_wrapper').css({
            'transform': 'translateX(' + index * -100+'%'+')'
        });
    }


    function goli(){
        $('.news_ul').css({
            'transform':'translate3d(0,'+index2*-1.2+'rem,0)'
        })
    }

    function beActive(Nbtn) {
        Nbtn.siblings().removeClass('slide_active')
        Nbtn.addClass("slide_active");

    }


    // 动态创建点
    for (var i = 0; i < count; i++) {
        var newbtn = $("<i class='slide_btn'></i>");
        // console.log(newbtn)
        newbtn.appendTo($('.slide_num'));
    }
    $('.slide_btn').eq(0).addClass('slide_active');

    // console.log($('.slide_num i')[1])

    $('.slide_num i').each(function (i, e) {
        // console.log(e)

        e.addEventListener('mouseenter', function () {
            closeAutoSlide();
            openTransition();
            index = i + 1;
            goslide();
            beActive($('.slide_btn').eq(index - 1));
        })

    });


    // 计时
    function d(e) {
        return e < 10 ? "0" + e : "" + e
    }
    setInterval(function () {
        var e;
        e = new Date(2019, 1, 1, 0, 0) - new Date, hour = minute = second = dayBase = hourBase = minuteBase = secondBase = 0, dayBase = 864e5, hourBase = 36e5, minuteBase = 6e4, secondBase = 1e3, Math.floor(e / dayBase), hour = Math.floor(e % dayBase / hourBase), minute = Math.floor(e % dayBase % hourBase / minuteBase), second = Math.floor(e % dayBase % hourBase % minuteBase / secondBase), $(".clock_hour").text(d(hour)), $(".clock_minute").text(d(minute)), $(".clock_second").text(d(second))
    }, 1e3);

    // 获取距离上边的值，并且头部搜索框显示相应颜色
    $(document).scroll(function(){
        var top = $(document).scrollTop();
        if(top>5){
            $('.search').css({'background-color':'#e43130'});
        }
        if(top<5){
            $('.search').css({'background-color':'transparent'});
        }

    })
    

    var firstX = 0,firstY = 0,endX = 0,endY = 0;//初始化坐标值
    var $slide = $('.slide_list');
    $slide.bind("touchstart",function(e){
    firstX = e.targetTouches[0].clientX;
    firstY = e.targetTouches[0].clientY;
    })
    $slide.bind("touchend",function(e){
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    moveX = endX - firstX;//判断左右
    moveY = endY - firstY;//判断上下
    if(Math.abs(moveX) > 60 || Math.abs(moveY) > 60){//判断是滑动，不是点击
        if(Math.abs(moveX) > Math.abs(moveY)){
            /*判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下*/
            moveX > 0 ? perv_pic() : next_pic();
            if(timer){
                clearInterval(timer);
            }
        }
        if(moveY == 0|| moveX == 0){
            timer = setInterval(function () {
                beActive($('.slide_btn').eq(index - 1));
                next_pic();
            }, 3000)
        }
    }
})











})