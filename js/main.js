function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };



window.onload = function(){
	var isPC=IsPC();
	if(isPC){
	   // 这里执行的是PC端的代码；
	   //  先这么加着

		$('body').addClass('complete');
	    // $('#loading').remove();
	    $('#loading').fadeOut('600');
	    $('#loading-center').fadeOut('600');



	var swiper = new Swiper('#pc', {
		direction: 'vertical',
		slidesPerView: 1,
		// spaceBetween: 30, 这个他妈的是给每页底部加margin-bottm的
		mousewheel: true,
		pagination: {
		el: '.swiper-pagination',
		clickable: true,
		},

		speed:800,
		simulateTouch: false,//禁用触摸
		on: {
			slideChangeTransitionStart: function () {
				if (this.activeIndex == 0) {
					$(".head").css("height", "100px");
				} else {
					$(".head").css("height", "70px")
					// alert(this.activeIndex)  可以显示当前页面的索引值
				}
				if(this.activeIndex == 1){
					$('.swiper-slide').removeClass('moving').eq(this.activeIndex).addClass('moving');
				
				}
				if(this.activeIndex == 2){
					// $(".skill_title h1").after("<div class='title_en'><h2>· SKILLS ·</h2></div>");
					// $(".title_en").animate({width:"130px"},800,function(){
					// $(".title_en h2").slideDown(400);
					$(".skill_list_content").addClass("skill_scale");
				// });
				}
				if(this.activeIndex==0||this.activeIndex==1||this.activeIndex==3||this.activeIndex==4||this.activeIndex==5||this.activeIndex==6){
				$(".title_en").remove();
				}
				if(this.activeIndex==3){
				$('.slide_con').addClass('slide_con_scale');
				// $("#demo_content h1").after("<div class='title_en'><h2>· Demo ·</h2></div>");
				// $(".title_en").animate({width:"130px"},800,function(){
				// 	$(".title_en h2").slideDown(400);
				// });	
				var i=-1;
				$(".demo_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
					   $this.addClass("b_to_t");
					   },200*i);
					}
					})
				}
				if(this.activeIndex==4){
					$('.contact_me').addClass('fadeInLeft');
				}

			}

		}
	});



	// 设置音乐
	var audio = new Audio();
	audio.src = "http://www.ytmp3.cn/down/36522.mp3";
	audio.loop = "loop";
	audio.preload = "auto";
	 $(".music_player").click(function() {
		 if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	 });
	audio.onplay = function () {
		$(".music_player").addClass("music_playing");
		// $(".head").css("background-color", "transparent")
		$(".head").css({backgroundColor:'transparent'});

		$(".head").addClass("rainbow")
	}
	audio.onpause = function () {
		$(".music_player").removeClass("music_playing");
		// $(".head").css("background-color", "#000")
		$(".head").css({backgroundColor:'#000'});  //注意这里需要将-去掉，后边的字母需要大写

		$(".head").removeClass("rainbow")
	};




	// 首页焦点图设置
	var mouse = {
				X: 0,
				Y: 0,
				CX: 0,
				CY: 0,
			},
			block = {
				X: mouse.X,
				Y: mouse.Y,
				CX: mouse.CX,
				CY: mouse.CY,
			};
		$('.js-tilt-container').on('mousemove', function(e) {
			mouse.X = (e.pageX - $(this).offset().left) - $('.js-tilt-container').width() / 2;
			mouse.Y = (e.pageY - $(this).offset().top) - $('.js-tilt-container').height() / 2
		});

		$('.js-tilt-container').on('mouseleave', function(e) {
			mouse.X = mouse.CX;
			mouse.Y = mouse.CY
		});

		setInterval(function() {
			block.CY += (mouse.Y - block.CY) / 12;
			block.CX += (mouse.X - block.CX) / 12;
			// $('.js-tilt-container .light').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)');
			$('.image-shadow').css({
				transform: 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
			})
		}, 20);

	$('.box').on('mouseenter', function(){
		$('.image-shadow').css({boxShadow:'0 0 30px 5px #000'});
		$('.image-shadow').addClass('in');
	});

	$('.box').on('mouseleave', function(){
		$('.image-shadow').css({boxShadow:'0 0 0 0 '});
	});

	// 技能文字
	$(".skill_icon").click(function(){
		$(".skill_int").each(function(){
			if($(this).is(":visible")){
				$(this).slideUp(200);
				$(this).prev().removeClass("skill_flag_scale");
			}
		});
		if($(this).siblings(".skill_int").is(":hidden")){
			$(this).siblings(".skill_int").slideDown(400);
			$(this).siblings(".skill_flag").addClass("skill_flag_scale");
		}else{
			$(this).siblings(".skill_int").slideUp(200);
			$(this).siblings(".skill_flag").removeClass("skill_flag_scale");
		}
	});

	// 联系方式上边的文字
	$('#pc_but').find('span').hover(function() {
		// console.log($(this).index())
		var a=1;
		$(this).parent().next().children().eq($(this).index()).css({opacity:1}).siblings().css({opacity:0});
		// $(this).eq($(this).index()).after('<p class="about_me">关于我</p>');

	}, function() {
		$(this).parent().next().children().css({opacity:0});
		// $('p').remove()  鬼畜
	});

	// 电脑端
	$('.contact_').find('img').hover(function() {
		$(this).next('span').css({opacity:1})
	}, function() {
		$(this).next('span').css({opacity:0})
	});


	// 手机端
	$('.contact_me').find('img').hover(function() {
		$(this).next('span').css({opacity:1})
	}, function() {
		$(this).next('span').css({opacity:0})
	});


	// 设置技能页面幻灯片
	var $li = $('.slide_pics li');
	// alert($li.length);

	var $nowli = 0;
	var $nextli = 0;
	var $len = $li.length;

	var timer = null;



	$li.not(':first').css({left:800}); //除了第一张之外的所有幻灯片都放在右隐藏
	// 先处理底部的点,动态创建点
	$li.each(function(index){
		var $sli = $('<li>'+(index+1)+'</li>');
		if(index==0){
			$sli.addClass('active');
		}
		$sli.appendTo('.points')

	});

	// 先做点的动画
	$points = $('.points li');
	// alert($points.length)
	$points.click(function(){
		$nextli = $(this).index();

		if($nextli==$nowli){  //在执行move函数之前先判断按钮是否相同
			return;
		}

		move();

		$(this).addClass('active').siblings().removeClass('active');
	});


	$prev = $('.prev');
	$next = $('.next');
	$prev.click(function(){
		$nextli--;  //因为nowli是时刻被nextli赋值的，所以如果使用的是nowli的话就会导致一个bug
		//也就是nowli刚在这里-1.,在执行到下边的时候又被nextli重新赋值，所以页面会卡在一页不能动
		move();
		$points.eq($nextli).addClass('active').siblings().removeClass('active');
	});

	$next.click(function(){
		$nextli++;
		move();
		$points.eq($nextli).addClass('active').siblings().removeClass('active');

	});



	$('.slide_con').mouseenter(function() {
		clearInterval(timer);
	});

	$('.slide_con').mouseleave(function() {
		timer = setInterval(autoplay,4000);
	});


	timer = setInterval(autoplay,4000);
	function autoplay(){
		$nextli++;
		move();
		$points.eq($nextli).addClass('active').siblings().removeClass('active');
	};



	function move(){

		if($nextli<0){
			$nextli = $len-1;
			$nowli = 0;
			$li.eq($nextli).css({left:-800});
			$li.eq($nowli).stop().animate({left:800});
			$li.eq($nextli).stop().animate({left:0});
			$nowli = $nextli;
			return;

		}

		if($nextli>$len-1){
			$nextli = 0;
			$nowli = $len-1;
			$li.eq($nextli).css({left:800});
			$li.eq($nowli).stop().animate({left:-800});
			$li.eq($nextli).stop().animate({left:0});
			$nowli  = $nextli;
			return;


		}

		if($nextli>$nowli){
			$li.eq($nextli).css({left:800});
			$li.eq($nowli).stop().animate({left:-800});
			$li.eq($nextli).stop().animate({left:0});  //这句话和下边的那句话都可以提出来
		}

		else{
			$li.eq($nextli).css({left:-800});
			$li.eq($nowli).stop().animate({left:800});
			$li.eq($nextli).stop().animate({left:0});
		}

		// 将nextli赋值给nowli，因为执行完这个if之后，nextli需要改变
		$nowli = $nextli;

	};



	// 设置手机端
	var slides = [{src: 'images/100.jpg'}, {src: 'images/200.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'},{src: 'images/500.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'}, {src: 'images/500.jpg'}]
	var jR3DCarousel;
	var carouselProps =  {
			 		  width: 400, 				
					  height: 222, 				
					  slideLayout : 'fill',  
					  animation: 'slide3D', 		
					  animationCurve: 'ease',
					  animationDuration: 700,
					  animationInterval: 1000,
					  //slideClass: 'jR3DCarouselCustomSlide', log
					  autoplay: false,
					  // onSlideShow: show,		
					  navigation: 'circles',	
					  slides: slides 			
						  
				}
	function setUp(){
 		jR3DCarousel = $('.jR3DCarouselGallery').jR3DCarousel(carouselProps);

		$('.settings').html('<pre>$(".jR3DCarouselGallery").jR3DCarousel('+JSON.stringify(carouselProps, null, 4)+')</pre>');		
		
	}
	// function show(slide){
	// 	console.log("Slide shown: ", slide.find('img').attr('src'))
	// }
	$('.carousel-props input').change(function(){
		if(isNaN(this.value))
			carouselProps[this.name] = this.value || null; 
		else
			carouselProps[this.name] = Number(this.value) || null; 
		
		for(var i = 0; i < 999; i++)
	     clearInterval(i);
		$('.jR3DCarouselGallery').empty();
		setUp();
		jR3DCarousel.showNextSlide();
	})
	
	$('[name=slides]').change(function(){
		carouselProps[this.name] = getSlides(this.value); 
		for (var i = 0; i < 999; i++)
	     clearInterval(i);
		$('.jR3DCarouselGallery').empty();
		setUp();
		jR3DCarousel.showNextSlide();		
	});
	
	// function getSlides(no){
	// 	slides = [];
	// 	for ( var i = 0; i < no; i++) {
	// 		slides.push({src: 'https://unsplash.it/'+Math.floor(1366-Math.random()*200)+''+Math.floor(768+Math.random()*200)})
	// 	}
	// 	return slides;
	// }
	
	//carouselProps.slides = getSlides(7);
	setUp()




	}
	else{
	   //这里执行的是移动端的代码；
	   	$('body').addClass('complete');
	    $('#loading').remove();


	    // 设置音乐
	var audio = new Audio();
	audio.src = "http://www.ytmp3.cn/down/36522.mp3";
	audio.loop = "loop";
	audio.preload = "auto";
	 $(".music_player").click(function() {
		 if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	 });


	 // 手机端
	$('.contact_me').find('img').hover(function() {
		$(this).next('span').css({opacity:1})
	}, function() {
		$(this).next('span').css({opacity:0})
	});
	



	var slides = [{src: 'images/100.jpg'}, {src: 'images/200.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'},{src: 'images/500.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'}, {src: 'images/500.jpg'}]
	var jR3DCarousel;
	var carouselProps =  {
			 		  width: 400, 				
					  height: 222, 				
					  slideLayout : 'fill',  
					  animation: 'slide3D', 		
					  animationCurve: 'ease',
					  animationDuration: 700,
					  animationInterval: 1000,
					  //slideClass: 'jR3DCarouselCustomSlide', log
					  autoplay: false,
					  // onSlideShow: show,		
					  navigation: 'circles',	
					  slides: slides 			
						  
				}
	function setUp(){
 		jR3DCarousel = $('.jR3DCarouselGallery').jR3DCarousel(carouselProps);

		$('.settings').html('<pre>$(".jR3DCarouselGallery").jR3DCarousel('+JSON.stringify(carouselProps, null, 4)+')</pre>');		
		
	}
	// function show(slide){
	// 	console.log("Slide shown: ", slide.find('img').attr('src'))
	// }
	$('.carousel-props input').change(function(){
		if(isNaN(this.value))
			carouselProps[this.name] = this.value || null; 
		else
			carouselProps[this.name] = Number(this.value) || null; 
		
		for(var i = 0; i < 999; i++)
	     clearInterval(i);
		$('.jR3DCarouselGallery').empty();
		setUp();
		jR3DCarousel.showNextSlide();
	})
	
	$('[name=slides]').change(function(){
		carouselProps[this.name] = getSlides(this.value); 
		for (var i = 0; i < 999; i++)
	     clearInterval(i);
		$('.jR3DCarouselGallery').empty();
		setUp();
		jR3DCarousel.showNextSlide();		
	});
	
	// function getSlides(no){
	// 	slides = [];
	// 	for ( var i = 0; i < no; i++) {
	// 		slides.push({src: 'https://unsplash.it/'+Math.floor(1366-Math.random()*200)+''+Math.floor(768+Math.random()*200)})
	// 	}
	// 	return slides;
	// }
	
	//carouselProps.slides = getSlides(7);
	setUp()


	}
};



















