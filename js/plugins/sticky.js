define(['jquery','plugins/widget'],function($,wg){
	function Sticky(){
		this.render();
	}
	Sticky.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-sticky",
		defaults:{
			top:0,
			bottom:0,
			onScroll:null,
			onFiexd:null,
			unFiexd:null
		},
		bindUI:function(){
			var _this = this;
			_this.roles.each(function(){
				if($(this).attr(_this.role) == _this.roleType){
					locate($(this));
				}
			})

			function locate(id){
				var the = $(id);
				var top = parseInt(_this.getAt(id,"top"));
				var stat = null;
				var left = $(id).offset().left;
				var eh = the.offset().top;
				var bottom = _this.getAt(id,"bottom") || 0;
				var th = $(id).height();
				var flag = false;
				$(window).scroll(function(){
					goScroll();
				})
				function goScroll(){
					var sh = $(this).scrollTop();
					if(!flag) eh = the.offset().top;
					var bot = (parseInt(bottom) >= 0) ? bottom : $(bottom).offset().top - th - top;
					if(sh > eh-top){
						if(!stat){
							flag = true;
							stat = $("<div></div>")
							stat.css({"visibility":"hidden"}).addClass($(id)[0].className);
							//stat = the.clone().css("visibility","hidden");
							stat.insertAfter($(id));
							the.css({position:"fixed",top:top,left:left,width:$(id).width()});
							if(the[0].onFiexd) the[0].onFiexd();
						}
						if(bot != 0 && bot > top+th){
							if(sh > bot){
								the.css({position:"absolute",top:bot});
							}else{
								the.css({position:"fixed",top:top});
							}
						}
					}else{
						if(stat){
							the.removeAttr("style");
							stat.remove();
							stat = null;
							flag = false;
							if(the[0].unFiexd) the[0].unFiexd();
						}
					}
					if(the[0].onScroll) the[0].onScroll(sh,the.offset().top);
				}
				goScroll();
			}
		}
	})
	
	return new Sticky();
})