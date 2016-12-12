define(['jquery'],function($){
	function check(){
		$('#logIn').click(function(){
				
				//获取手机号和密码
				var phoneNum = $('#phoneNumber').val();
				var pwd = $('#pwd').val();
				if( phoneNum=='' | pwd == ''){
					alert('请输入用户名与密码')
				}else{
						//检测终端是安卓或ios
					var client_id;
					var client_secret;
		            var u = navigator.userAgent;
		            //console.log(u);
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					//console.log(isiOS);
					if(isAndroid){
						client_id = '302a7d556175264c7e5b326827497349';
						client_secret = '4770414c283a20347c7b553650425773';
					}else{
						client_id = '5e572e694e4d61763b567059273a4d3d';
						//client_id = '6725063e575b34ea1f6da9c444d54e14';
						//client_secret = 'd1cb90b357cf6ba3d494cb5795565b4e';
						client_secret = '316457735c4055642744596b302e2151';
					}
					//代理跨域
					$.ajax({
						url:'http://192.168.199.127/zzht/oauth/token',
						//url:'http://service.myzhenzhen.com/zzht/oauth/token',
						type:'post',
						data:{
							"grant_type":"password",
							"client_id":client_id,
							"client_secret":client_secret,
							"username":phoneNum,
							"password":pwd
						},
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						error:function(res){
							console.log(res.responseJSON.error_description);
							if(res.responseJSON.error_description=="The user is not found"){
								alert('该用户未注册，请先注册');
							}
							if(res.responseJSON.error_description=="code:22013,message:`Error.Incorrect password.`"){
								alert('密码输入错误');
							}
						},
						success:function(res){
							//存储access_token;
							//console.log(res)
							$(this).css('background','#858585');
							$(this).attr('disabled','disabled');
							$(this).val('正在登录...');
							window.localStorage.setItem('access_token', res.access_token);
							var token = window.localStorage.getItem('access_token');
							console.log(token);
							//window.location.href = "order.html";
							$.ajax({ 
								type: "post", 
								dataType: 'json',
								//crossDomain:true,
								//url: "http://service.myzhenzhen.com/zzht/v1/api/users/getUserByLoginName", 
								url: "http://192.168.199.127/zzht/v1/api/users/getUserByLoginName", 
								
								data:{
									  'loginName':phoneNum,
									  'thirdType':' '
									},
								headers : {
									'Authorization': 'Bearer '+token,
									'Content-Type': 'application/x-www-form-urlencoded'
								},
							    complete: function (res) {
							      //console.log(res.responseJSON.user);
							      //获取用户的登录信息
							      var buyerInfo = JSON.parse(res.responseJSON.user);
							      console.log(buyerInfo);
							      //存储买家id
							      window.localStorage.setItem('userId',buyerInfo.userId);
							      window.location.href = './order_list.html';
							    }
							});
						}
					})//获取access_token的post请求;

				}//else
				

			})//click
		}
		
	
	
	return check();
})

