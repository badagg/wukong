require.config({
	baseUrl:"./js",
	paths:{
		"jquery":"libs/jquery-1.9.1.min"
	}
})

require(['plugins/cutover'],function(co){
	co.config("#myCutover",{
		onCutover:function(i){
			console.log(i);
		}
	})
})