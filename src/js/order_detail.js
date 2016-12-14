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
require(['jquery'],function($){
	var api = 'http://zhenzhen.s1.natapp.cc/zzht/'
	//var api = 'http://192.168.199.127/zzht/'
	//var api = 'http://service.myzhenzhen.com/zzht/'
	var orderId = window.localStorage.getItem('orderId');
	var token = window.localStorage.getItem('access_token');
	console.log(orderId);
	$.ajax({
		type:"get",
		url:api+'v1/api/shop/order/'+orderId,
		headers:{
			'Authorization': 'Bearer '+token
		},
		success:function(res){
			console.log(res.datas);
			var data = res.datas
			var status;
			switch(data.status){
				case 1: status = '待发货'; break;
				case 2: status = '待收货'; break;
				case 3: status = '已完成'; break;
			}
			//状态
			$('.status').html(status);
			//联系人
			$('.consignee').eq(0).html(data.consignee);
			//手机号
			var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
			var tel = data.mobile.replace(reg, "$1****$3");
			$('.mobile').eq(0).html(tel);
			//身份证
			$('.idno').eq(0).html(data.idno);
			//邮编
			$('.postcode').eq(0).html(data.postcode);
			//收货地址
			$('.address').eq(0).html(data.address);
			//
		}
		
	});
})
