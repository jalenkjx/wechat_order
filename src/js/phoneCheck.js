var winWidth = window.innerWidth;
var fontSize = winWidth/750*100;
var html = document.documentElement;
html.style.fontSize = fontSize + "px";
window.onresize = function(){
	var winWidth = window.innerWidth;
	var fontSize = winWidth/750*100;
	var html = document.documentElement;
	html.style.fontSize = fontSize + "px";
}
require(['jquery','getCode'],function($,getCode){
//	var phone = window.localStorage.getItem('phone');
//	$('#phoneNum').val(phone);
//	if(phone!=''){
//		$('#getCheckCode').removeAttr('disabled');
//		$('#getCheckCode').removeClass('btn-disabled');
//	}
	$('.label').children('span').eq(0).click(function(e){
		//阻止冒泡
		e.stopPropagation();
		//console.log($('.label').children('input').is(':checked'));
		//判断复选框是否选中
		if($(this).siblings('input').is(':checked')){
			$(this).addClass('false');
		}
		else{
			$(this).removeClass('false');
		}
	});
	//var goods_id = window.localStorage.getItem('goods_id');
//	$('.back').on('click',function(){
//		window.location.href = './details.html?goods_id='+goods_id;
//	})
	
});
