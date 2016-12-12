
//rem
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

require([
			'jquery',//jquery依赖
			//'rem',//设计稿处理
			'loginAjax'//给后台发送请求
			],
			function($,loginAjax){	
				//点击切换密码状态
				$('.eye').click(function(){
					$(this).toggleClass('switch');
					$(this).prev().toggleClass('pwd');
					if($('#pwd').hasClass('pwd')){
						$('#pwd').attr('type','password');
					}else{
						$('#pwd').attr('type','text');
					}
				});
				
			});