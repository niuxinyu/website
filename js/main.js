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

// $(document).ready(function(){
// 	$('.head').trigger('click')
// })


window.onload = function(){
// 	document.onmousedown=function(e){
// 		console.log(e)
//     if(event.button==2){
//         event.returnValue=false;	
//         alert("右键被禁止啦！");
//     }
// }

	

   // 禁止img拖拽
	for(i in document.images)document.images[i].ondragstart=function(){return false;};
	var isPC=IsPC();
	if(isPC){


	   // 这里执行的是PC端的代码；
	   //  先这么加着
		$('body').addClass('complete');
		$('#loading').animate({height:0},'noraml','linear')
		$('#loading-center').fadeOut('1000');

	var $flag = true;
	var $$flag = true;
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
					if($$flag){
						$$flag = false;
						audio.play()
					}
				}
				if(this.activeIndex==2){
					 $(".circleChart#0").circleChart({
							size: 300,
							value: 80,
							text: 0,
							startAngle:-20,
							color:"#4285F4",
							onDraw: function(el, circle) {
								circle.text(Math.round(circle.value) + "%");
								// console.log(el);
								}
							});

							$(".circleChart#1").circleChart({
								size: 300,
								value: 75,
								text: 0,
								color:"#EA4335",
								startAngle:-20,
								onDraw: function(el, circle) {
									circle.text(Math.round(circle.value) + "%");
								}
							});

							$(".circleChart#2").circleChart({
								size: 300,
								value: 60,
								text: 0,
								color:"#FBBC05",
								startAngle:-20,
								onDraw: function(el, circle) {
									circle.text(Math.round(circle.value) + "%");
								}
							});

							$(".circleChart#3").circleChart({
								size: 300,
								value: 70,
								text: 0,
								color:"#34A853",
								startAngle:-20,
								onDraw: function(el, circle) {
									circle.text(Math.round(circle.value) + "%");
								}
							});
				}
				
				if(this.activeIndex==3){
				$('.slide_con').addClass('fadeInLeft');
				var i=-1;
				$(".demo_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
					   $this.addClass("b_to_t");
					   },200*i);
					}
					});	
						if($flag){
							// 设置技能页面幻灯片
						
						$flag = false;
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
						};}


				}

				if(this.activeIndex==4){
					$('.contact_me').addClass('fadeInLeft');
				}

			}
		}
	
	});

											
						
					



	$('#pc .slide_pics li').hover(function() {
		$(this).find('img').css({"transform":"scale(1.3,1.3)"});
		$(this).find('span').css({"opacity":"1","transform":"scale(1.2,1.2)"});
		
	}, function() {
		$(this).find('img').css({"transform":"scale(1,1)"});

		$(this).find('span').css({"opacity":"0.3","transform":"scale(1,1)"});
		
	});

	// 设置音乐
	var audio = new Audio();
	audio.src = "http://www.ytmp3.cn/down/53996.mp3";
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
	}
	audio.onpause = function () {
		$(".music_player").removeClass("music_playing");
		// $(".head").css("background-color", "#000")
		$(".head").css({backgroundColor:'#000'});  //注意这里需要将-去掉，后边的字母需要大写

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

	// 首页焦点图文字设置不可以选中
	$('.wel_info span:last').siblings().css({userSelect:"none"})

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
		$(this).next('span').css({opacity:1,display:'block'})
	}, function() {
		$(this).next('span').css({opacity:0,diplay:'block'})
	});

	



	// 设置手机端
	var slides = [{src: 'images/100.jpg'}, {src: 'images/200.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'},{src: 'images/500.jpg'}, {src: 'images/a1.png'}, {src: 'images/a2.png'}, {src: 'images/600.jpg'}]
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
	
	
	setUp()


	var h = window.innerHeight;
	console.log(h)
	var a = $('.mobile_skills_head').offset().top
	console.log(a)
	// 判断滑动距离
	// var a = $('.mobile_about_me_head').offset().top - w

	$(document).bind("scroll", function(){
		
		var top = $(this).scrollTop(); // 当前窗口的滚动距离
	

		if(top>0){
			$('.mobile_about_me_head').addClass('mobile_about_me_head_p');
		}
		if(top>10){
			$('.mobile_skills_head').addClass('mobile_skills_head_p')
		}
		if(top>380){
			$('.html').addClass('html_open')
		}
		if(top>500){
			$('.css').addClass('css_open')
		}
		if(top>600){
			$('.js').addClass('js_open')
		}
		if(top>720){
			$('.jq').addClass('jq_open')
		}
		if(top>870){
			$('.demo_head').addClass('demo_head_p')
		}
		});


		 $('.mobile_head h2').delay(300).animate({opacity:1},400,function(){
			$('.mobile_head p:nth-of-type(1)').animate({opacity:1},400,function(){
				$('.mobile_head p:nth-of-type(2)').animate({opacity:1},300,function(){
					$('.mobile_head p:nth-of-type(3)').animate({opacity:1},300,function(){
						$('.mobile_head p:nth-of-type(4)').animate({opacity:1},300)
					})
				})
			})
		})

		
	}
	else{
	   //这里执行的是移动端的代码；
	  	$("#body").on({
		    touchstart: function(e){
		        longClick=0;//设置初始为0
		        timeOutEvent = setTimeout(function(){
		          	return		 //长按执行
		            longClick=1;//假如长按，则设置为1
		        },500);
		    },
		    touchmove: function(e){
		        clearTimeout(timeOutEvent);
		        timeOutEvent = 0;
		        e.preventDefault();
		    },
		    touchend: function(e){
		        clearTimeout(timeOutEvent);
		        if(timeOutEvent!=0 && longClick==0){//点击
		           return
		        }
		        return false;
		    }
		});

	  // 	var $body = document.getElementById('body');
	  // 	$body.addEventListener('contextmenu', function(e){
	  //   e.preventDefault();
	  // });

		document.body.addEventListener("touchstart", function () {})
	   	var $$$flag = true;
		$('body').addClass('complete');
		$('#loading').animate({height:0},'noraml','linear',function(){
			$('#up_icon').addClass('up_icon')
		});
		$('#loading-center').fadeOut('1000');


		$(window).bind("scroll", function(){ 
		var top = $(this).scrollTop(); // 当前窗口的滚动距离
		// console.log(top);
		
		if(top>0){
			$('.mobile_about_me_head').addClass('mobile_about_me_head_p');
			if($$$flag){
				$$$flag = false;
				audio.play()
			}
			
		}
		if(top>140){
			$('.mobile_skills_head').addClass('mobile_skills_head_p')
		}
		if(top>720){
			$('.html').addClass('html_open')
		}
		if(top>780){
			$('.css').addClass('css_open')
		}
		if(top>870){
			$('.js').addClass('js_open')
		}
		if(top>950){
			$('.jq').addClass('jq_open')
		}
		if(top>1060){
			$('.demo_head').addClass('demo_head_p');
		}
		});

		// 设置移动端字体淡入
		$('.mobile_head h2').delay(300).animate({opacity:1},400,function(){
			$('.mobile_head p:nth-of-type(1)').animate({opacity:1},400,function(){
				$('.mobile_head p:nth-of-type(2)').animate({opacity:1},300,function(){
					$('.mobile_head p:nth-of-type(3)').animate({opacity:1},300,function(){
						$('.mobile_head p:nth-of-type(4)').animate({opacity:1},300)
					})
				})
			})
		})


		// 设置音乐
	var audio = new Audio();
	audio.src = "http://www.ytmp3.cn/down/53996.mp3";
	audio.loop = "loop";
	audio.preload = "none";
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
		$('.music_control').css({opacity:0.5})
	}
	audio.onpause = function () {
		$(".music_player").removeClass("music_playing");
		// $(".head").css("background-color", "#000")
		$(".head").css({backgroundColor:'#000'});  //注意这里需要将-去掉，后边的字母需要大写
		$(".head").removeClass("rainbow")
		$('.music_control').css({opacity:0.5})
	};



	 // 手机端
	$('.contact_me').find('img').hover(function() {
		$(this).next('span').css({opacity:1,display:'block'})
	}, function() {
		$(this).next('span').css({opacity:0,display:'none'})
	});
	



	var slides = [{src: 'images/100.jpg'}, {src: 'images/200.jpg'}, {src: 'images/300.jpg'}, {src: 'images/400.jpg'},{src: 'images/500.jpg'}, {src: 'images/a1.png'}, {src: 'images/a2.png'}, {src: 'images/600.jpg'}]
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
	setUp();


	$('#up_icon').click(function(){
		$('html,body').animate({'scrollTop':0},800)
	})


	}
};







