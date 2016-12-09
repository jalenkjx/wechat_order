require.config({
	//指定静态文件跟目录
	baseUrl : "./js/",
	//别名
	//给一个模块定义别名
	paths : {
		//会在  baseUrl 下面去查找
		jquery : "jquery.min",
		swiper : "swiper.min",
		LAreaData1:"LAreaData1",
		LArea:"LArea",
		pingpp:"pingpp"
	},
	//兼容   把非模块化的js文件模块化
	//把不是以 define 格式的 js 做兼容处理
	shim:{
		jquery:{
			deps:[], //循环依赖，先不管
			//返回 jquery 暴露的全局对象
			exports:"window.jQuery"
		},
		swiper : {
			deps : ["jquery"], //依赖 jquery
			exports : "Swiper" //返回的对象
		},
		LArea : {
			deps : [], 
			exports : "LArea" //返回的对象
		},
		LAreaData1 : {
			deps : [], 
			exports : "LAreaData1" //返回的对象
		},
		pingpp :{
			deps : [],
			exports : "pingpp"
		}
	}
});
