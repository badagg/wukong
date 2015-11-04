define(['jquery','plugins/widget'],function($,wg){
	function Countdown(){
		this.render();
	}
	Countdown.prototype = $.extend({},new wg.Widget(),{
		roleType:"swk-countdown",
		defaults:{
			startTime:null,
			endTime:null,
			onCountdown:null,
			onEnd:null
		},
		bindUI:function(){
			var the = this;
			the.roles.each(function(){
				if($(this).attr(the.role) == the.roleType){
					var stime = the.getAt($(this),"startTime");
					var etime = the.getAt($(this),"endTime");
					if(!etime || !stime) return;

					var ds = etime.toString().replace(/-/g, '/');
					var ds2 = stime.toString().replace(/-/g, '/');
					$(this)[0].dest = new Date(ds).getTime() - new Date(ds2).getTime();

					the.start($(this));
				}
			})
		},
		cdTime:function(id){
			var the = $(id)[0];
			var c = the.dest;
	        var hour = Math.floor(c / 3600000);
	        c -= hour * 3600000;
	        var fen = Math.floor(c / 60000);
	        c -= fen * 60000;
	        var miao = Math.floor(c / 1000);
			var tian = Math.floor(hour / 24);
			var shi = hour%24;
			
			var t0 = tian < 10 ? "0" + tian : tian;
	        var t1 = shi < 10 ? "0" + shi : shi;
	        var t2 = fen < 10 ? "0" + fen : fen;
	        var t3 = miao < 10 ? "0" + miao : miao;
			
			if(the.onCountdown) {
				var timeObj = {day:t0,hour:t1,minute:t2,second:t3};
				the.onCountdown(timeObj);
				this.fire("countdown",timeObj);
			}
			if(the.dest <=0 ) {
				this.stop(id);
				if(the.onEnd) {
					the.onEnd();
					this.fire("end");
				}
			}
			
			the.dest -= 1000;
		},
		start:function(id){
			var the = $(id)[0];
			var _this = this;
			_this.stop(id);
			if(the.dest > 0){
				the.timer = setInterval(function(){
					_this.cdTime(id);
				},1000);
			}
		},
		//暂停倒计时
		stop:function(id){
			if($(id)[0].timer) clearInterval($(id)[0].timer);
		}
	})

	return new Countdown();
})