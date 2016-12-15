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
	var imgurl = 'http://o6uda1nl0.bkt.clouddn.com/';//内网；
	//var imgurl = 'http://7xrr05.com1.z0.glb.clouddn.com/';//外网

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
			var icon;
			switch(data.status){
				case 1: status = '待发货'; icon = 'http://og20zwqwb.bkt.clouddn.com/order_1.png'; break;
				case 2: status = '待收货'; icon = 'http://og20zwqwb.bkt.clouddn.com/order_2.png'; break;
				case 3: status = '已完成'; icon = 'http://og20zwqwb.bkt.clouddn.com/order_3.png'; break;
			}
			//状态
			$('.status').html(status);
			$('.banner').children('img').attr('src',icon);
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
			//卖家姓名
			$('.nickname').eq(0).html(data.seller.nickname);
			//卖家icon
			$('.tImgBox').children('img').attr('src',imgurl+data.seller.icon);
			//订单商品信息
			var num = 0;
			$.each(data.payGoodsInfo,function(i){
				var html = '<div class="details">'+
								'<span class="dImgBox"><img src="'+imgurl+data.payGoodsInfo[i].image+'" alt="" /></span>'+
								'<div class="info">'+
									'<p class="goodsInfo">'+data.payGoodsInfo[i].name+'</p>'+
									'<p class="size">规格：'+data.payGoodsInfo[i].size+'</p>'+
								'</div>'+
								'<i class="price">￥'+data.payGoodsInfo[i].price+'</i>'+
								'<i class="num">×'+data.payGoodsInfo[i].num+'</i>'+
							'</div>'
				$('.orderGoods').append(html);
				num += data.payGoodsInfo[i].num
			})
			//console.log(num);
			//商品总数
			$('.number').html(num);
			//订单总金额
			$('.amount').html(data.amount/100)
			//订单编号
			$('.order_number').children('span').html(data.orderId);
			var time =new Date(data.createTime); 
			var year = time.getFullYear();
			var month = time.getMonth()+1;
			var day = time.getDate();
			var hour = time.getHours();
			var min = time.getMinutes();
			var sec = time.getSeconds();
			//下单时间
			var ordertime = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
			$('.order_time').children('span').html(ordertime);
		}//success
		
	});
})
