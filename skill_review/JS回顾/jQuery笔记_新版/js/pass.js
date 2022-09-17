$(document).ready(function(){
	const changeText = function (el, text, color){
		el.text(text).css('color',color);
	};
	$('.input-2').keyup(function(){
		let len = this.value.length;
		const pbText = $('.form-2 .progress-bar_text');
		if(len === 0){
			$('.form-2 .progress-bar_text').each(function(){
				$(this).removeClass('avtive')
			});
			changeText(pbText,'请输入密码')
		}
		else if(len >0 && len <= 4){
			$('.form-2 .progress-bar_item-1').addClass('active');
			$('.form-2 .progress-bar_item-2').removeClass('active');
			$('.form-2 .progress-bar_item-3').removeClass('active');
			changeText(pbText,'低级')
		}
		else if(len >4 && len <= 8){
			$('.form-2 .progress-bar_item-2').addClass('active');
			$('.form-2 .progress-bar_item-3').removeClass('active');
			changeText(pbText,'中等强度')
		}
		else{
			$('.form-2 .progress-bar_item').each(function(){
				$(this).addClass('active');
			});
			changeText(pbText,'高强度')
		}
	});
	
	
	
	
	
});