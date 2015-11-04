define(['jquery','plugins/widget'],function($,wg){
	function Cutover(){
		this.ycp = "swk-cutover-prev";
		this.ycn = "swk-cutover-next";
		this.yct = "swk-cutover-trigger";
		this.prevs = $(document).find("["+this.ycp+"]");
		this.nexts = $(document).find("["+this.ycn+"]");
		this.trigs = $(document).find("["+this.yct+"]");
		
		this.render();
	}
	Cutover.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-cutover",
		defaults:{
			interval:5000,
			auto:false,
			delay:0,
			mouseEvent:"mouseover",
			effect:"visible",
			activeClass:"select",
			onCutover:null,
			onLast:null,
			onFirst:null
		},
		bindUI:function(){
			var the = this;
			the.prevs.each(function(){
				$(this).off("click").on("click",function(){
					the.prev($(this).attr(the.ycp));
				})
			})
			
			the.nexts.each(function(){
				$(this).off("click").on("click",function(){
					the.next($(this).attr(the.ycn));
				})
			})
			

			the.trigs.each(function(){
				var lis = $(this).children();
				var id = $(this).attr(the.yct);
				var eType = the.getAt(id,"mouseEvent");
				var _delay = (eType == "mouseover" || eType == "mouseenter") ? the.getAt(id,"delay") : 0;
				var dtimer = 0;
				lis.off(eType).on(eType,function(){
					var _index = $(this).index();
					var idIndex = $(id)[0].index || 0;
					$(id)[0].dire = (_index > idIndex) ? true:false;

					clearTimeout(dtimer);
					dtimer = setTimeout(function(){
						clearTimeout(dtimer);
						the.go(id,_index);
					},_delay)
				})
			})

			the.roles.each(function(){
				if($(this).attr(the.role) == the.roleType){
					//var id = "#"+$(this).attr("id");
					the.go($(this),0);//初始轮播内容

					//判断鼠标是否在感应区
					$(this).on("mouseenter",function(){
						clearInterval($(this)[0].timer);
					})
					$(this).on("mouseleave",function(){
						the.start($(this));
					})
				}
			})
		},
		prev:function(id){
			var the = $(id)[0];
			var count = $(id).children().length;
			if(!the.index) the.index = 0;
			the.index--;
			if(the.index < 0 ) the.index = count-1;
			the.dire = false;
			this.go(id,the.index);
		},
		next:function(id){
			var the = $(id)[0];
			var count = $(id).children().length;
			if(!the.index) the.index = 0;
			the.index++;
			if(the.index > count-1) the.index=0;
			the.dire = true;
			this.go(id,the.index);
		},
		go:function(id,n){
			var lis = $(id).children();
			var the = $(id)[0];
			
			if(!the.currentFlag){
				the.currentFlag = true;
				the.currentIndex = -1;
			}
			if(the.currentIndex == n) return;//当前状态不可点
			
			switch(this.getAt(id,"effect")){
				case "scrollx":
					var dw = $(id).width();
					if(the.dire){
						lis.eq(n).css({left:dw}).stop().animate({left:0}).siblings().stop().animate({left:-dw});
					}else{
						lis.eq(n).css({left:-dw}).stop().animate({left:0}).siblings().stop().animate({left:dw});
					}
				break;
				case "scrolly":
					var dh = $(id).height();
					if(the.dire){
						lis.eq(n).css({top:dh}).stop().animate({top:0}).siblings().stop().animate({top:-dh});
					}else{
						lis.eq(n).css({top:-dh}).stop().animate({top:0}).siblings().stop().animate({top:dh});
					}
				break;
				case "fade":
					lis.eq(n).css({zIndex:1}).stop().animate({opacity:1}).siblings().css({zIndex:0}).stop().animate({opacity:0});
				break;
				default:
					lis.eq(n).show().siblings().hide();
				break;
			}
			
			the.index = the.currentIndex = n;
			
			var cla = this.getAt(id,"activeClass");
			var _this = this;
			this.trigs.each(function(){
				var str = String($(this).attr(_this.yct));
				var id2 = str.substring(1,str.length);
				if(id2 == $(id).attr("id")){
					$(this).children().eq(n).addClass(cla).siblings().removeClass(cla);
				}
			})
			
			this.start(id);
			
			//处理回调函数
			var count = $(id).children().length;
			//当切换时
			if(the.onCutover) {
				the.onCutover(n);
				this.fire("cutover",n);
			}
			//当切换到第一个时
			if(the.onFirst && n==0) {
				the.onFirst();
				this.fire("first");
			}
			//当切换到最后一个时
			if(the.onLast && n==count) {
				the.onLast();
				this.fire("last");
			}
		},
		//自动播放
		start:function(id){
			var the = this;
			if(the.getAt(id,"auto")){
				clearInterval($(id)[0].timer);
				$(id)[0].timer = setInterval(function(){
					the.next(id);
				},the.getAt(id,"interval"));
			}
		},
		//停止自动播放
		stop:function(id){
			clearInterval($(id)[0].timer);
		}
	})
	
	return new Cutover();
})