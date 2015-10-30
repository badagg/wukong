require.config({
	baseUrl:"js/",
	paths:{
		"jquery":"libs/jquery-1.9.1.min",
		"widget":"plugins/widget",
		"dialog":"plugins/dialog"
	}
})


require(['dialog'],function(dialog){
	dialog.config("#myDialog",{
		mask:false,
		onSubmit:function(){
			console.log("提交时回调...打开其他的弹框");
			dialog.popup("#aaa");
		},
		onClose:function(){
			console.log("close");
		}
	})
})