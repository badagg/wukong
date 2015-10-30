require.config({
	baseUrl:"js/",
	paths:{
		"jquery":"libs/jquery-1.9.1.min",
		"widget":"plugins/widget",
		"cutover":"plugins/cutover"
	}
})

require(['cutover'],function(co){
	co.config("#myCutover",{
		onCutover:function(i){
			console.log(i);
		}
	})
})