	//选择角色点击事件
	$(".tab a").click(function(){
		$(this).siblings().removeClass();
		$(this).addClass("sel");
		$(".mt20").removeClass("qk2");
		$(".greenBtn").hide();	
		//登录角色
		$("#loginUsertype").attr("value",$(this).attr("id"));
		//重置用户选择学生/家长
		$("#username").attr("value","");
		//调用选择账号接口
		$("#roleDiv").attr("phonenum","");
		getRoles(); 
		//刷新验证码
		$(".yanz").find("img").eq(0).click();
	})
	//处理注册按钮
	$(".tab a:eq(0)").click(function(){
		if(showRegedit == "0"){
			$(".mt20").removeClass("qk2");
			$(".greenBtn").hide();
		}else{
			$(".mt20").addClass("qk2");
			$(".greenBtn").show();
		}
	})
	$(".tab a:eq(1)").click(function(){
		if(showRegedit == "0"){
			$(".mt20").removeClass("qk2");
			$(".greenBtn").hide();
		}else{
			$(".mt20").addClass("qk2");
			$(".greenBtn").show();
		}
	})
	
	function focuss(t){
		var a=$(t).val();
		var d=$(t).attr("def");
		if(typeof(d)=="undefined" || d==null){
			d="";
		}
		if (a ==d){
			$(t).val("");
		};
		$(t).css('color','#333');
		$(t).parent().removeClass();
		$(t).parent().addClass("bor_hover");	
	}
		
	function blurr(t){
		var c=$(t).attr('id');
		var d=$(t).attr("def");
		var a=$(t).val();
		if(typeof(d)=="undefined" || d==null){
			d="";
		}
		if (a ==''){
			$(t).val(d);
		}
		$(t).css('color','#aaa');
		$(t).parent().removeClass();
		$(t).parent().addClass("bor");	
	}
		
/*返回顶部按钮*/
(function($) {
$.scrollBtn = function(options) {
var opts = $.extend({}, $.scrollBtn.defaults, options);
var $scrollBtn = $('<div></div>').css({
bottom: opts.bottom + 'px',
right: opts.right + 'px'
}).addClass('scroll-up')
.attr('title', opts.title)

.click(function() {
$('html, body').animate({scrollTop: 0}, opts.duration);
}).appendTo('body');

$(window).bind('scroll', function() {
var scrollTop = $(document).scrollTop(),
viewHeight = $(window).height();
//alert(scrollTop);
//alert(viewHeight);

if(scrollTop <= opts.showScale) {
if($scrollBtn.is(':visible'))
$scrollBtn.fadeOut(500);
} else {
if($scrollBtn.is(':hidden')) 
$scrollBtn.fadeIn(500);
}

if(isIE6()) {
var top = viewHeight + scrollTop - $scrollBtn.outerHeight() - opts.bottom;
$scrollBtn.css('top', top + 'px');
}
});

function isIE6() {
if($.browser.msie) {
if($.browser.version == '6.0') return true;
}
}
};
 
/**

* -params 

*  -showScale: scroll down how much to show the scrollup button

*  -right: to right of scrollable container 

*  -bottom: to bottom of scrollable container 

*/

$.scrollBtn.defaults = {
showScale: 100,  
right:10,
bottom:10,
duration:200,
title:'返回顶部'
}
})(jQuery);


$.scrollBtn({
showScale: 200,
bottom:20,
right:20
});


