require.config({
	baseUrl:"./js",
	paths:{
		"jquery":"libs/jquery-1.9.1.min"
	}
})

require(['jquery','plugins/scrollto'],function($,st){
	$("#ddd").click(function(){
		st.to(500);
	})
	st.config("#aaa",{
		onScrolled:function(){
			console.log('scrolled..');
		}
	})
})