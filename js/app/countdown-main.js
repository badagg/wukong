require.config({
	baseUrl:"js/",
	paths:{
		"jquery":"libs/jquery-1.9.1.min",
		"widget":"plugins/widget",
		"countdown":"plugins/countdown"
	}
})

require(['countdown'],function(cd){
	cd.config(".cd1",{
		onCountdown:function(time){
			$(".cd1").text(time.day+"天"+time.hour+"时"+time.minute+"分"+time.second+"秒")
		},
		onEnd:function(){
			$(".cd1").text("time over...");
		}
	})
	
	cd.config(".cd2",{
		onCountdown:function(time){
			$(".cd2").text(time.day+"天"+time.hour+"时"+time.minute+"分"+time.second+"秒")
		}
	})
})