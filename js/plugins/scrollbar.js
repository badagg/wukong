define(['jquery','plugins/widget','mousewheel'],function($,wg){
	function Scrollbar(){
		this.render();
	}
	Scrollbar.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-scrollbar",
		defaults:{
			scrollx:true,
			scrolly:true,
			delta:10,
			xto:0,
			yto:0,
			onScrollY:null,
			onScrollX:null,
			onBeginY:null,
			onBeginX:null,
			onEndY:null,
			onEndX:null
		},
		bindUI:function(){
			var _this = this;
			_this.roles.each(function(){
				if($(this).attr(_this.role) == _this.roleType){
					_this.updata($(this));
				}
			})
		},
		updata:function(id){
			var _this = this;
			var sb = $(id)[0];
			var sw = 0,sh = 0; //容器的宽高
			var cw = 0,ch = 0; //内容的宽高
			var bw = 0,bh = 0; //滚动块的宽高
			var yMax = 0; //Y轴可滚动的最大值
			var xMax = 0; //X轴可滚动的最大值
			
			if(!sb.flag){
				sb.contentDiv = $("<div class='swk-scrollbar-content' style='position:absolute'><div>");
				sb.contentDiv.html($(id).html());
				$(id).html("").append(sb.contentDiv);
				
				sb.barX = $("<div class='swk-scrollbar x-axis' axis='x'><div></div></div>");
				sb.barX.appendTo($(id));
				
				sb.barY = $("<div class='swk-scrollbar y-axis' axis='y'><div></div></div>");
				sb.barY.appendTo($(id));
			}

			sw = $(id).width();
			sh = $(id).height();
			cw = sb.contentDiv.width();
			ch = sb.contentDiv.height();
			
			bw = sw*sw/cw;
			xMax = sw - bw;
			
			bh = sh*sh/ch;
			yMax = sh - bh;
			
			//滑块显示隐藏
			if(_this.getAt(id,"scrollx") && cw > sw){
				sb.barX.show().find("div").css("width",bw);
			}else{
				sb.barX.hide();
			}
			if(_this.getAt(id,"scrolly") && ch > sh){
				sb.barY.show().find("div").css("height",bh);
			}else{
				sb.barY.hide();
			}
			
			$(id).find(".swk-scrollbar").each(function(){
				var bar = $(this).find("div");
				var the = bar[0];
				the.axis = $(this).attr("axis");
				the.disX = 0;
				the.disY = 0;
				
				bar.off("mousedown").on("mousedown",function(e){
					the.disX = e.clientX - bar.position().left;
					the.disY = e.clientY - bar.position().top;
					
					$(document).off("mousemove").on("mousemove",function(e){
						if(the.axis == "x"){
							var ex = e.clientX - the.disX;
							uiMoveX(ex);
						}
						
						if(the.axis == "y"){
							var ey = e.clientY - the.disY;
							uiMoveY(ey);
						}
					})

					$(document).off("mouseup").on("mouseup",function(e){
						$(document).off("mousemove");
						$(document).off("mouseup");
					})

					return false;
				})
				
				function uiMoveY(y){
					if(y < 0){
						y = 0;
						if(sb.onBeginY) sb.onBeginY();
					}
					if(y > yMax){
						y = yMax;
						if(sb.onEndY) sb.onEndY();
					}
					bar.css({top:y});
					sb.contentDiv.css({top:-y/yMax*(ch-sh)});
					if(sb.onScrollY) sb.onScrollY(y);
				}
				
				function uiMoveX(x){
					if(x < 0){
						x = 0;
						if(sb.onBeginX) sb.onBeginX();
					}
					if(x > xMax){
						x = xMax;
						if(sb.onEndX) sb.onEndX();
					}
					bar.css({left:x});
					sb.contentDiv.css({left:-x/xMax*(cw-sw)});
					if(sb.onScrollX) sb.onScrollX(x);
				}
				
				//支持滚动
				$(id).off("mousewheel").on("mousewheel",function(e){
					if(the.axis == "y"){
						var targetY = bar.position().top - e.deltaY * _this.getAt(id,"delta");
						uiMoveY(targetY);
					}
					e.preventDefault();
				})
				
				//初始滚动条位置
				if(the.axis == "y" && !sb.flag){
					var yto = parseInt(_this.getAt(id,"yto"));
					if(yto<yMax) uiMoveY(yto);
				}
				if(the.axis == "x" && !sb.flag){
					var xto = parseInt(_this.getAt(id,"xto"));
					if(xto<xMax) uiMoveX(xto);
				}
				
				//阻止滚动块事件冒泡
				bar.off("click").on("click",function(e){
					e.stopPropagation();
					return false;
				})
				
				//点击定位滚动条
				$(this).off("click").on("click",function(e){
					if(the.axis == "x") uiMoveX((e.clientX - $(this).offset().left) - bw/2);
					if(the.axis == "y") uiMoveY((e.clientY - $(this).offset().top) - bh/2);
				})
				
			})
			
			sb.flag = true;
		}
	})

	return new Scrollbar();
})