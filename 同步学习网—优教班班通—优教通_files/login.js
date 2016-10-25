//保存cookie(name-名称，value-取值，expires-期限，path-cookie路径，domain-cookie的Domain,secure-是否需要保密传送)
function saveCookie(name,value,expires,path,domain,secure){  
  var strCookie = name + "=" + value;  
    if(expires){  
      //计算Cookie的期限,   参数为天数  
      var curTime = new Date();  
      curTime.setTime(curTime.getTime() + expires*24*60*60*1000);  
      strCookie += "; expires=" + curTime.toGMTString();  
    }  
    //Cookie的路径  
    strCookie += (path) ? "; path=" + path : "";    
    //Cookie的Domain  
      strCookie   +=     (domain)   ?   ";   domain="   +   domain   :   "";  
      //   是否需要保密传送,为一个布尔值  
      strCookie   +=     (secure)   ?   ";   secure"   :   "";  
      document.cookie   =   strCookie;  
}
//获取cookle
function getcookle(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!=""){
    		return unescape(arr[2]);
    	}
    	return "";
}

//当输入为手机号的时候，调用选择用户多账号接口，显示该手机号角色绑定的多个账号
function clearusername(){
	if($("#inputname").attr("value").length!=11){
		$("#roleDiv").css("display","none"); //隐藏角色框
	}else{
		getRoles(); //调用选择账号接口
	}
	$("#username").attr("value","");
	$("#changename").html("");
}
//多账号时选择账号
function getRoles(flag){
	try{
	//自适应宽度及高度
	//document.body.clientWidth
	var allwidth = document.body.clientWidth;
	var phoneNum=$("#inputname").attr("value");
	var allwidth = document.body.clientWidth;
	if(allwidth>1024){
		var wn = (allwidth-1014)/2+800;
		//$("#roleDiv").css("left",wn+"px");
	}else if(allwidth>970){
		var wn = 798-(1014-allwidth)/2;
		//$("#roleDiv").css("left",wn+"px");
	}else{
		//$("#roleDiv").css("left","780px");
	}
	var Xp = $('#inputname').offset().top;
	if(Xp && Xp>100 && Xp<300){
		Xp=Xp+20;
	}
	//$("#roleDiv").css("top",Xp+"px");
	}catch(e){}
	var loginUsertype = "";
	if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		$("#loginUsertype").attr("value","teacher");
		loginUsertype = "teacher";
	}else{
		loginUsertype = $("#loginUsertype").val();
	}
	if(phoneNum!=$("#roleDiv").attr("phonenum")){
		util.getCharsetRemoteJson("SSO","SSO.203","q="+phoneNum+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+loginUsertype,"gbk",function(result){
			if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
					$("#roleList").html("");
					if(result){
						for(var num=0;num<result.length;num++){
							if(num%2==0){
								$("#roleList").append('<li class="ac_even" style="width:130px;height:22px;line-height:22px;margin-bottom:0px;"  onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_even\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}else{
								$("#roleList").append('<li class="ac_odd" style="width:130px;height:22px;line-height:22px;margin-bottom:0px;" onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_odd\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}
						}
						if(result.length>0){
							if($("#roleList li").length>0){
								$("#roleList").attr("height",(result.length * 22));
								$("#roleDiv").css("display","block");
							}else{
								$("#roleDiv").css("display","none");
							}
						}else{
							$("#roleDiv").css("display","none");
							alertNoRole(flag);
						}
					}
					$("#roleDiv").attr("phonenum",phoneNum);
				}
			}
		});
	}else{
		if($("#roleList li").length>0){
			$("#roleList").attr("height",($("#roleList li").length * 22));
			$("#roleDiv").css("display","block");
		}else{
			$("#roleDiv").css("display","none");
			alertNoRole(flag);
		}
	}
}
function selRole(sobj){
	try{
	$("#username").attr("value",$(sobj).attr("roleid"));
	$("#changename").html($(sobj).text());
	$("#roleDiv").css("display","none");
	$(document).unbind("click");
	}catch(e){alert(e);}
}
//提示无角色可选择
function alertNoRole(flag){
	if(flag){
		$("#getrolemsg").show();
		window.setTimeout("$('#getrolemsg').hide(200);",1000);
	}
}
//登录
function tologin(){
	if($("#inputname").val().replace(/\s+/g,"")=="请输入账号/手机号" || $("#inputname").val().replace(/\s+/g,"")==""){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '用户名不能为空，请输入您的用户名！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      window.setTimeout(function(){ $("#inputname").focus();},80);
			      return true;
				}
		});
		return;
	}else if($("#pwd").val().replace(/\s+/g,"")==""){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '密码不能为空，请输入您的密码！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
				  window.setTimeout(function(){ $("#pwd").focus();},80);
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      return true;
				}
				});
		return;
	}else if($("#validateCode").val().replace(/\s+/g,"")=="" || $("#validateCode").val().replace(/\s+/g,"") == "验证码"){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '验证码不能为空，请输入您的验证码！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
				  window.setTimeout(function(){  $("#validateCode").focus();},80);
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      return true;
				}
				});
		return;
	}
	if($("#savepass").attr("checked")){
 		saveCookie("pwd",$("#pwd").val(),1000);
 		saveCookie("savepass",1,1000);
	}else{
 		saveCookie("pwd","",1000);
 		saveCookie("savepass",0,1000);
	}
	//登录置为不可用
	$("#loginbuttion").attr("disabled","disabled");
	$("#inputname").attr("value",$("#inputname").val().replace(/\s+/g,""));
	if($("#username").val()=="")$("#username").attr("value",$("#inputname").val());
	saveCookie("inputname",escape(encodeURI($("#inputname").val().replace(/\s+/g,""))),1000);
	saveCookie("username",escape(encodeURI($("#username").val().replace(/\s+/g,""))),1000);
	if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		$("#loginUsertype").attr("value","teacher");
		saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}else{
		saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}
	$("#loginForm").attr("action","http://"+sysconfig.SSO+"/sso/ssoAuth");
	$("#loginForm").submit();
}

//获取焦点图信息，幷在页面展示
function getLoginfocusImg(icode){
	var temp_tp = "<li id=\"~liid~\" style=\"display: block;\"><a target=\"~target~\" id=\"~aid~\" href=\"~href~\"><span id=\"~spid~\" style=\"background:url(~pic~) no-repeat center center\"></span></a></li>";
	var temp_an = "<div class=\"~sel~\" id=\"~did~\" onclick=\"changeflash(~num~)\"></div>";
	util.getCMSData(icode,null,20,function(data){
		var counter_tp = "";
		var counter_an = "";
		numbers = data.length;
		for(var i=0;i<data.length;i++){
			//图片
			var liid = "flash"+(i+1);
			var aid = "bga"+(i+1);
			var spid = "bg"+(i+1);
			//按钮
			var did = "f"+(i+1);
			var num = i+1;
			var sel = "";
			if(i==0){
				sel = "dq";
			}else{
				sel = "no";
			}
			var tdata = data[i];
			var pic = tdata.pic;
			var target = "_blank";
			var url=tdata.url;
			if(url == "#"){
				url="javascript:;"
				target="";
			}
			counter_tp = counter_tp + temp_tp.replaceAll("~liid~",liid).replaceAll("~target~",target).replaceAll("~aid~",aid).replaceAll("~href~",url).replaceAll("~spid~",spid).replaceAll("~pic~",pic);
			counter_an = counter_an + temp_an.replaceAll("~sel~",sel).replaceAll("~did~",did).replaceAll("~num~",num);
		}
		$("#tp").html(counter_tp);
		$("#an").html(counter_an);
		timer_tick();
	});
}