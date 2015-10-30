define(['jquery','widget'],function($,wg){
	function Scrollto(){
		this.render();
	}
	Scrollto.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-scrollto",
		defaults:{
			to:0,
			speed:500,
			onScrolled:null
		},
		bindUI:function(){
			var the = this;
			the.roles.each(function(){
				if($(this).attr(the.role) == the.roleType){
					$(this).off("click").on("click",function(){
						var val = the.getAt($(this),"to");
						var speed = the.getAt($(this),"speed");
						the.to(val,speed,$(this));
					})
				}
			})
		},
		to:function(v,s,e){
			var dest = 0;
			if(v == "top"){
				dest = 0;	
			}else if(v == "bottom") {
				dest = $(document).height();
			}else{
				dest = v;
			}
			if(!s) s = this.defaults.speed;
			$('body').stop().animate({scrollTop:dest},parseInt(s),function(){
				if(e && $(e)[0].onScrolled) $(e)[0].onScrolled();
			});
		}
	})
	
	return new Scrollto();
})