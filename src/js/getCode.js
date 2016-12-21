define(['jquery','param'],function($){
	//var api = 'http://192.168.199.127/zzht/'
	//var api = 'http://zhenzhen.s1.natapp.cc/zzht/'
	//var api = 'http://service.myzhenzhen.com/zzht/'
	
		$('#phoneNum').on('blur',function(){
			if($('#phoneNum').val()!=''){
				$('#getCheckCode').removeAttr('disabled');
				$('#getCheckCode').removeClass('btn-disabled');
			}
		});
		$('#phoneNum').on('keypress',function(){
			if($(this).val().length>=10){
				$('#getCheckCode').removeAttr('disabled');
				$('#getCheckCode').removeClass('btn-disabled');
			}else{
				$('#getCheckCode').attr('disabled');
				$('#getCheckCode').addClass('btn-disabled');
			}
		});
		//监听
		monitor($('#getCheckCode'));
		$('#getCheckCode').click(function(){
			window.localStorage.setItem('phone',$('#phoneNum').val())
			countDown($('#getCheckCode'), getCode);
			//console.log($(this));
			$(this).attr('disabled','disabled');
			setTimeout(function(){
				$('#getCheckCode').removeAttr('disabled');
			},60000)
		});
		function getCode(){
			$.ajax({
				url:api+'v1/api/verifycode/quickSend',//获取验证码接口
				data:{
					phoneNumber:$('#phoneNum').val()
				},
				type:'post',
	
				complete:function(res){
				}
			})
		}
		
		
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
			client_secret = '316457735c4055642744596b302e2151';
		}
		//获取ip地址
		var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	        $.getJSON(url, function (data) {
	           window.localStorage.setItem('ip',data.Ip);
	        });
	    var ip = window.localStorage.getItem('ip');
		$('.sure').on('click',function(){
			
			var pass = $('#checktext').val();
			var username = $('#phoneNum').val();
			if(pass==''|username==''){
				$('.alert').eq(0).children('p').html('请输入正确的手机号和验证码');
					$('.alert').css('display','block');
					$('.alert_sure').on('click',function(){
						$('.alert').css('display','none');
					})
			}else if(!$('#agree').is(':checked')){
				$('.alert').eq(0).children('p').html('请同意《真真海淘用户服务协议》');
					$('.alert').css('display','block');
					$('.alert_sure').on('click',function(){
						$('.alert').css('display','none');
					})
			}else{
				$('.sure').html('正在登录');
				$.ajax({
					url:api+'oauth/token',
					data:{
						"username":'phoneCode##86##'+username+'##'+ip,
						"password":pass,
						"grant_type":"password",
						"client_id":client_id,
						"client_secret":client_secret,
					},
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					},
					type:'post',
					error:function(res){
						console.log(res);
						//var err = JSON.parse(res.responseJSON.error_description);
						//console.log(err);
						console.log(res.status);
						var status = res.status;
						if(status == 401){
							$('.alert').eq(0).children('p').html('验证码错误，请重新输入');
							$('.alert').css('display','block');
							$('.alert_sure').on('click',function(){
								$('.alert').css('display','none');
							})
						}
					},
					success:function(res){
						console.log(res.access_token);
						window.localStorage.setItem('access_token',res.access_token);
						var token = window.localStorage.getItem('access_token');
						$.ajax({ 
							type: "post",
							//crossDomain:true,
							//url: "http://service.myzhenzhen.com/zzht/v1/api/users/getUserByLoginName", 
							url: api+"v1/api/users/getUserByLoginName", 
							data:{
								  'loginName':username,
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
				});
			}
		});
	
	//防止页面刷新倒计时失效
	/**
	 *
	 *   获取验证码按钮
	 */
	function monitor(obj) {
	    var LocalDelay = getLocalDelay();
	    var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
	    if (timeLine > LocalDelay.delay) {
	        console.log("过期");
	    } else {
	        _delay = LocalDelay.delay - timeLine;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (_delay > 1) {
	                _delay--;
	                obj.text(_delay);
	                setLocalDelay(_delay);
	            } else {
	                clearInterval(timer);
	                obj.text("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	    }
	};
	
	//倒计时效果
	/**
	 *
	 * @param {Object} obj 获取验证码按钮
	 * @param {Function} callback  获取验证码接口函数
	 */
	function countDown(obj, callback) {
	    if (obj.html() == "获取验证码") {
	        var _delay = 60;
	        var delay = _delay;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (delay > 1) {
	                delay--;
	                obj.text(delay);
	                setLocalDelay(delay);
	            } else {
	                clearInterval(timer);
	                obj.html("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	
	        callback();
	    } else {
	        return false;
	    }
	}
	
	//设置setLocalDelay
	function setLocalDelay(delay) {
	    //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
	    localStorage.setItem("delay_" + location.href, delay);
	    localStorage.setItem("time_" + location.href, new Date().getTime());
	}
	
	//getLocalDelay()
	function getLocalDelay() {
	    var LocalDelay = {};
	    LocalDelay.delay = localStorage.getItem("delay_" + location.href);
	    LocalDelay.time = localStorage.getItem("time_" + location.href);
	    return LocalDelay;
	}

	
});
