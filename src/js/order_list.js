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

	var userId = window.localStorage.getItem('userId');
	var token = window.localStorage.getItem('access_token');
	var imgurl = 'http://o6uda1nl0.bkt.clouddn.com/';//内网；
	//var imgurl = 'http://7xrr05.com1.z0.glb.clouddn.com/';//外网

	//保留两位小数，没有小数自动补0；
	function toDecimal(x) { 
	      var f = parseFloat(x); 
	      if (isNaN(f)) { 
	        return false; 
	      } 
	      var f = Math.round(x*100)/100; 
	      var s = f.toString(); 
	      var rs = s.indexOf('.'); 
	      if (rs < 0) { 
	        rs = s.length; 
	        s += '.'; 
	      } 
	      while (s.length <= rs + 2) { 
	        s += '0'; 
	      } 
	      return s; 
	    } 
	    //全部订单接口；
	$.ajax({
		url:api+"v1/api/shop/orders/"+userId+"?type=0&start=0&amount=20",
		type:"get",
		headers:{
			Authorization:'Bearer '+token
		},
		success:function(res){
			var data = res.datas;
			console.log(data);
			
			$.each(data, function(i) {
				var status = data[i].status;
				var statusHtml;
				switch(status){
					case 1:statusHtml = '待发货';break;
					case 2:statusHtml = '待收货';break;
					case 3:statusHtml = '已完成';break;
				}
				var price = toDecimal(data[i].payGoodsInfo[0].price);
				var html = '<div class = "order" data-id="'+data[i].orderId+'">'+
								'<div class="title">'+
									'<span class="tImgBox"><img src="'+imgurl+data[i].seller.icon+'" style="width:100%; border-radius:50%;"/></span><span>'+data[i].seller.nickname+'</span><i class="status">'+statusHtml+'</i>'+
								'</div>'+
								'<div class="details">'+
									'<span class="dImgBox"><img src="'+imgurl+data[i].payGoodsInfo[0].image+'" alt="" /></span>'+
									'<div class="info">'+
										'<p class="goodsInfo">'+data[i].payGoodsInfo[0].name+'</p>'+
										'<p class="size">规格：'+data[i].payGoodsInfo[0].size+'</p>'+
									'</div>'+
									'<i class="price">￥'+price+'</i>'+
									'<i class="num">×'+data[i].payGoodsInfo[0].num+'</i>'+
								'</div>'+
								'<div class="balance">共'+
									'<span class="number">'+data[i].payGoodsInfo[0].num+'</span>件商品，实付款￥<i class="amount">'+data[i].amount/100+'</i>'+
								'</div>'
							'</div>';
				if(status == 1){
					
					//console.log(data[i].status);
					$('.toBeShipped').append(html);

				}else if(status == 2){
					//console.log(data[i].status);
					$('.ReceiptOfGoods').append(html);

				}else if(status == 3){
					//console.log(data[i].status);
					$('.finish').append(html);
	
				}
			});//$.each
			
			$('li','nav').on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
				switch($(this).index()){
					case 0:
						$('.toBeShipped').css('display','block').siblings().css('display','block');
						break;
					case 1:
						$('.toBeShipped').css('display','block').siblings().css('display','none');
						break;
					case 2:
						$('.ReceiptOfGoods').css('display','block').siblings().css('display','none');
						break;
					case 3:
						$('.finish').css('display','block').siblings().css('display','none');
						break;
					
				}
			})
			$('.order').on('click',function(){
				var orderId = ($(this).attr('data-id'));
				window.localStorage.setItem('orderId',orderId);
				window.location.href = './order_detail.html';
			})
		}//success
	})
})
