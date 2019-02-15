$(function(){
	
//	var a=0;
	$('.W-to-right').on('click',function() {
		$('.W-to').remove();
		$('.W-gu').css('margin-top','0');
		$('.W-tese').css('margin-top','0');
	});
	
//	菜单点击li
	var index1=null;
	$('.W-gu li').on('click',function() {
		$('.W-tese').hide();
		$('.W-gu li').find('span').hide();
		$('.W-gu li').css('background','#f2f2f2')
		$('.W-tese').eq($(this).index()).show();
		$('.W-gu li').find('span').eq($(this).index()).show();
		$(this).css('background','#fff');
	
	});
	
	var jiji=0,
		zong=0;
	$('.W-nav-right').on('click',function() {
		$('.nav-none').show();
		$('.W-xing,.W-zhe,.W-car').hide();
	});
	$('.W-tese').each(function(index) {
		$(this).find('.W-te-nr3').each(function(index2) {
			$(this).find('.W-jia').on('click',function(){
					zong=0;
				$('.W-nav').find('span').text(++jiji);
				var sum=parseInt($('.W-gu ul li').eq(index).find('p').text());
				var text=parseInt($(this).prevAll('.W-shu').text());
				$('.W-gu ul li').eq(index).find('p').text(++sum);
				$('.W-gu ul li p').eq(index).show().text();
				$(this).prevAll('.W-jian').css('opacity','1');
				$(this).prevAll('.W-shu').css('opacity',1);
				$('.nav-none').hide();
				$('.W-xing').show();
				$(this).prevAll('.W-shu').text(++text);
				
				$('.W-tese').find('.zhi em').each(function(i) {
					var value=parseFloat($(this).text().replace(/[^0-9]/ig,"")*parseInt($(this).parent().next().find('.W-shu').text()));
					zong+=value;
				});
				$('.W-nav-div2 span').eq(1).find('em').text(zong);
				var aa=zong*0.85;
				$('.W-nav-div2 span').eq(0).find('em').text(aa.toFixed(2));//折扣 85
				return false;
			});
			
			$(this).find('.W-jian').on('click',function(index3) {
				var text=parseInt($(this).nextAll('.W-shu').text());
				var sum=parseInt($('.W-gu ul li').eq(index).find('p').text());
				zong=0;
				--sum;
				if(text<1){
					$(this).css('opacity','0');
					$(this).next('.W-shu').css('opacity',0);
					$('.W-nav').find('span').text(jiji);
					return false;
				}else{
					$(this).nextAll('.W-shu').text(--text);		
				};
				
				if(sum==0) {
					$('.W-gu ul li p').eq(index).text(sum);
					$('.W-gu ul li').eq(index).find('p').hide();
				}else{
					$('.W-gu ul li p').eq(index).text(sum);
				};
				
				if(jiji==0){
					$('.W-nav').find('span').text(jiji);
				}else{
					$('.W-nav').find('span').text(--jiji);
				};
				
				$('.W-tese').find('.zhi em').each(function(i) {
					var value=parseFloat($(this).text().replace(/[^0-9]/ig,"")*parseInt($(this).parent().next().find('.W-shu').text()));
					zong+=value;
				});
				$('.W-nav-div2 span').eq(1).find('em').text(zong);
				var aa=zong*0.85;
				$('.W-nav-div2 span').eq(0).find('em').text(aa.toFixed(2));//折扣 85
				return false;
				
			});
		});
	});
	
	$('.W-nav').on('click',function() {
		$('.W-car,.W-zhe').show();
		
	});
	
	$('.W-delete').on('click',function() {
		$('.W-car,.W-zhe').hide();
		$('.W-jian').css('opacity',0);
		$('.W-gu ul li p').text(0).hide();
		$('.W-te-nr3').find('.W-shu').text(0).css('opacity','0');
		$('.W-nav').find('span').text(0);
	})
	
})
