require.config({
	baseUrl:"js/",
	paths:{
		"jquery":"libs/jquery-1.9.1.min",
		"mousewheel":"libs/mousewheel",
		"widget":"plugins/widget",
		"scrollbar":"plugins/scrollbar"
	}
})

require(['jquery','scrollbar'],function($,sb){
	var dest = 30;
	$("#btn1").click(function(){
		$(".pic").css({"width":$(".pic").width()+dest});
		sb.updata("#sBar");
	})
	
	$("#btn2").click(function(){
		$(".pic").css({"height":$(".pic").height()+dest});
		sb.updata("#sBar");
	})
	
	$("#btn3").click(function(){
		$("#sBar").css({"width":$("#sBar").width()+dest});
		sb.updata("#sBar");
	})
	
	$("#btn4").click(function(){
		$("#sBar").css({"height":$("#sBar").height()+dest});
		sb.updata("#sBar");
	})
	
	sb.config("#sBar",{
		onScrollY:function(y){
			//console.log(y);
		},
		onBeginY:function(){
			console.log("beginY...")
		},
		onEndY:function(){
			console.log("endY...")
		}
	})
})