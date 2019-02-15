window.onload = function() {
	var aSpanw = $('.W_jTong_zhong_d1').find('span').outerWidth(true);
	$('.WL').css('width', aSpanw * 3);
	var timer = setInterval(Tab, 1000)

	function Tab() {
		$('.WL').animate({
			'left': -aSpanw
		}, 7000, 'linear', function() {
			$(this).css('left', 0);
		})
	};
	$('.content').scroll(function() {
		if($('.content').scrollTop() > 500) {
			$('.W_hui').fadeIn();
		} else {
			$('.W_hui').hide();
		}
	});
	$('.W_hui').bind('click', function() {
		$('.content').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
	//	购物车个数
	$('.badge').text($('.W_car_nr_ul').find('li').length);
	//	购物车加减
	//存单价
	var Djia;
	var sum = 0; //累加
	var heji = 0; //合计
	//	已选
	$('.W_car_nr_ul').find('li').each(function() {
		sum = sum + parseInt($(this).find('.W_car_nr_right_p2 span').text());
		heji = heji + parseFloat($(this).find('.W_car_nr_right_s1 span').text());
		$('.W_jspan2').find('i').text(heji)
		$('.W_jspan1').find('i').text(sum);
	});
	$('.w_jiajian').each(function() {
		$(this).find('span').eq(0).click(function() {
			var Djia = parseFloat($(this).parent().prev().children('span').data('jia'));
			var text = parseInt($(this).next().text());
			if(text == 1) {
				return false;
			} else {
				$(this).next().text(--text);
				$('.W_jspan1').find('i').text(--sum);
			}
			$(this).parent().prev().children('span').find('span').text(Math.floor(Djia * text * 100) / 100);
			$(this).parent().prev().children('p').find('span').text(text);
			heji = heji - Djia;
			$('.W_jspan2').find('i').text(Math.floor(heji * 100) / 100);
			return false;
		});
		$(this).find('span').eq(2).click(function() {
			$('.W_jspan1').find('i').text(++sum);
			var text = parseInt($(this).prev().text());
			var Djia = parseFloat($(this).parent().prev().children('span').data('jia'));
			$(this).prev().text(++text);
			$(this).parent().prev().children('p').find('span').text(text);
			$(this).parent().prev().children('span').find('span').text(Math.floor(Djia * text * 100) / 100);
			heji = heji + Djia;
			$('.W_jspan2').find('i').text(Math.floor(heji * 100) / 100);
			return false;
		})
	});
	//	删除
	$('.W_car_nr_S').bind('click', function() {
		$(this).parents('li').remove();
		//	购物车个数
		$('.badge').text($('.W_car_nr_ul').find('li').length);
		//无商品时候的样式
		if($('.W_car_nr_ul').find('li').length == 0) {
			$('.W_car_box').show();
		};
		//		已选
		sum = sum - parseInt($(this).next().next().children('p').find('span').text());
		$('.W_jspan1').find('i').text(sum);
		//		合计
		heji = heji - parseFloat($(this).next().next().children('span').find('span').text());
		$('.W_jspan2').find('i').text(Math.floor(heji * 100) / 100);
		return false;
	});

	var v = 0;
	var li_length = $('.W_car_nr_ul').find('li').length;
	var bb = 0;//对的图片数量
	$('.W_car_nr_ul').find('li').bind('click', function() {
		if($('.W_car_nr_ul li').find('.W_car_nr_left img').eq($(this).index()).attr('src') == 'img/W_budui.png') {
			bb++;
			if(bb == li_length) {
				$('.W_js_d1').find('img').attr('src', 'img/W_dui.png');
			};
		} else {
			bb--;
		}
		if($(this).find('.W_car_nr_left img').attr('src') == 'img/W_budui.png') {
			$(this).find('.W_car_nr_left img').attr('src', 'img/W_dui.png');
		} else {
			$(this).find('.W_car_nr_left img').attr('src', 'img/W_budui.png');
			$('.W_js_d1').find('img').attr('src', 'img/W_budui.png');
		};
		return false;
	});

	//	全选
	$('.W_js_left,.W_js_span').bind('click', function() {
		$('.W_js_d1').find('img').attr('src', 'img/W_dui.png');
		$('.W_car_nr_ul li .W_car_nr_left').find('img').attr('src', 'img/W_dui.png');
	});
	//无商品时候的样式
	if($('.W_car_nr_ul').find('li').length == 0) {
		$('.W_car_box').show();
	};
	
	//我的佣金
	$('.withdrawals').on('click',function(){
		$('.nr-parent').hide();
		$('.chong-box').show();
	});
	
//	我的二维码
	
	$('.er-box').find('img').on('touchstart',function() {
		timer=setTimeout(function(){
			alert('长按');
		},1000)
	});
	
	$('.er-box').find('img').on('touchend',function() {
		clearTimeout(timer);
	})
	
//我的余额
	$('.w-zhichu').on('click',function(){
		$('.nr-parent').hide();
		$('.W-yue-parent').show();
	})

//我的优惠券	

	$('.w-you-ul').find('li').on('click',function() {
		$('.w-you-ul').find('li').children('.w-you-box-zhong2 ').css("background","transparent");
		$('.w-you-ul').find('li').find('.w-you-left-t span').css('background','#cbcbcb');
		$('.w-you-ul').find('li').find('.w-you-li-d1-right p').css('color','#8a8a8a');
		$('.w-you-ul').find('li').find('.w-you-li-d1-right a').css({'color':'#b9b9b9','background':'url(./img/juan_anniu1.png) no-repeat','background-size':'100% 100%'})
		$('.w-you-ul').find('li').find('.w-you-li-d1-right time').css('color','#bababa');
		$('.w-you-ul').find('li').find('.w-you-li-d1-left').css('border-color','#dedede');
		$('.w-you-ul').find('li').css('border-color','#d4d4d4');
		$(this).children('.w-you-box-zhong2 ').css("background","rgba(253,128,132,.6)");
		$(this).find('.w-you-left-t span').css('background','#e76367');
		$(this).find('.w-you-li-d1-right p').css('color','#bd3337');
		$(this).find('.w-you-li-d1-right a').css({'color':'#d34b50','background':'url(./img/juan_anniu2.png) no-repeat','background-size':'100% 100%'})
		$(this).find('.w-you-li-d1-right time').css('color','#dedede');
		$(this).find('.w-you-li-d1-left').css('border-color','#e76367');
		$(this).css('border-color','#e76367');
	});

	//地址管理
	$('.w-di-nr-ul').find('li').on('click',function() {
		$('.w-di-nr-ul').find('li').css('background','#fff');
		$(this).css('background','#f0ffe2');
		return false;
	});
	
	$('.w-di-right-img1').find('img').on('click',function() {
		$(this).parents('li').remove();
		return false;
	});
	
//	$('.w-di-right-img2').find('img').on('click',function() {
//		$(this).parents('li').remove();
//		return false;
//	})
	

	//个人中心链接

	$('.W_yue_ul').find('li').eq(0).on('click', function() {
		window.location.href = 'Balance.html';
	});
	$('.W_yue_ul').find('li').eq(1).on('click', function() {
		window.location.href = 'my-commission.html';
	});
	$('.W_yue_ul').find('li').eq(2).on('click', function() {
		window.location.href = 'recommender.html';
	});
	$('.W_yue_ul').find('li').eq(5).on('click', function() {
		window.location.href = 'collection.html';
	});
	$('.W_yue_ul').find('li').eq(6).on('click', function() {
		window.location.href = 'coupon.html';
	});
	$('.W_yue_ul').find('li').eq(7).on('click', function() {
		window.location.href = 'address-management.html';
	});
	
	
	
}