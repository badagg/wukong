define(["jquery"],function($){
	function Widget(){
		this.defaults = {};
		this.handlers = {};
		this.roleType = "swk-";
		this.role = "role";
		this.roles = $(document).find("["+this.role+"]");
	}
	Widget.prototype = {
		on:function(type,handler){
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
		},
		/*TIME OUT*/
		timeout:function(fun,time){
			if(!time) time = 0;
			var sto = setTimeout(function(){
				clearTimeout(sto);
				fun();
			},time)
		},
		/*GET ATTR*/
		getAt:function(id,name){
			var the = $(id)[0];
			var at = $(id).attr(name);
			if(the[name] != undefined){
				return the[name];
			}else if(at){
				if(at == "false") at = false;
				if(at == "true") at = true;
				return at;
			}else{
				return this.defaults[name];
			}
		},
		/*CONFIG*/
		config:function(ids,obj){
			var idArr = ids.split(",");
			for(var j=0; j < idArr.length;j++){
				for( var i in obj){
					$(idArr[j])[0][i] = obj[i];
				}
			}
			this.render();
			return this;
		},
		renderUI:function(){},
		bindUI:function(){},
		render:function(){
			this.renderUI();
			this.bindUI();
		}
	}

	return {
		Widget:Widget
	}
})