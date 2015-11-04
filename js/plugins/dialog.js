define(['jquery','plugins/widget'],function($,wg){
	function Dialog(){
		this.currentDialog = "";
		this.ydp = "swk-dialog-popup";
		this.ydd = "swk-dialog-dismiss";
		this.yds = "swk-dialog-submit";
		this.popups = $(document).find("["+this.ydp+"]");
		this.dms = $(document).find("["+this.ydd+"]");
		this.smt = $(document).find("["+this.yds+"]");

		this.render();
	}
	
	Dialog.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-dialog",
		defaults:{
			mask:true,
			esc:true,
			delay:0,
			onClose:null,
			onOpen:null,
			onSubmit:null
		},
		bindUI:function(){
			var the = this;
			//绑定弹出按钮
			the.popups.each(function(){
				$(this).off("click").on("click",function(){
					the.popup($(this).attr(the.ydp));
				})
			})
			//绑定关闭按钮
			the.dms.each(function(){
				$(this).off("click").on("click",function(){
					the.dismiss($(this).attr(the.ydd));
				})
			})
			
			//绑定提交按钮
			the.smt.each(function(){
				$(this).off("click").on("click",function(){
					the.submit($(this).attr(the.yds));
				})
			})
			
			//初始化弹框位置
			the.roles.each(function(){
				if($(this).attr(the.role) == the.roleType){
					var dest = $(this).width() / 2;
					$(this).css({marginLeft:-dest});
				}
			})

			//ESC键盘事件
			var keyboardEsc = function(){
				$(document).on("keydown",function(e){
					try{
						if(e.keyCode == "27" && the.getAt(the.currentDialog,"esc")){
							the.dismiss(the.currentDialog);
						}
					}catch(e){}
				})
			}();
		},
		delayRun:function(id){
			var the = this;
			if(the.getAt(id,"delay") != 0){
				clearTimeout($(id)[0].timer);
				$(id)[0].timer = setTimeout(function(){
					clearTimeout($(id)[0].timer);
					the.dismiss(id);
				},the.getAt(id,"delay"))
			}
		},
		popup:function(id){
			var the = this;
			if(the.getAt(id,"mask") && !$(id)[0].mc){
				$(id)[0].mc = $("<div class='swk_dialog_mask'></div>");
				$(id)[0].mc.appendTo($("body"));
				the.timeout(function(){
					$(id)[0].mc.addClass("fade");
				})

				$(id)[0].mc.off("click").on("click",function(){
					the.dismiss(id);
				})
			}
			the.currentDialog = id;
			$(id).show();
			the.timeout(function(){
				$(id).css({opacity:1,top:"10%"})
			})
			if($(id)[0].onOpen) $(id)[0].onOpen();
			
			the.delayRun(id);

			this.fire("open");
		},
		dismiss:function(id){
			var the = this;
			clearTimeout($(id)[0].timer);
			$(id).css({opacity:0,top:0});
			if($(id)[0].mc) $(id)[0].mc.css({opacity:0});
			the.timeout(function(){
				$(id).hide();
				if($(id)[0].mc) {
					$(id)[0].mc.remove();
					$(id)[0].mc = null;
				}
				if($(id)[0].onClose) $(id)[0].onClose();
			},300)
			this.fire("close");
		},
		submit:function(id){
			if($(id)[0].onSubmit) $(id)[0].onSubmit();
			this.dismiss(id);
			this.fire("submit");
		}
	})

	return new Dialog();

})
