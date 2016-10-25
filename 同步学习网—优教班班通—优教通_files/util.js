//-------------------------------工具js------------------------------
function UtilObj(){};
//定义工具页面接口
var util = new UtilObj();

//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

//获取cookie
function getcookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}

//非空判断
UtilObj.prototype.isBlank=function(tStr){
	//非undefined
	if(typeof(tStr)=="undefined"){
		return true;
	}
	//非null
	if(tStr==null){
		return true;
	}
	//非空字符串
	if(typeof(tStr)=="string" && tStr.replace(/(^\s*)|(\s*$)/g, "").length==0){
		return true;
	}
	return false;
}

//通用跨域异步调用
UtilObj.prototype.getRemoteJson= function (sys,icode,param,callbackhander){
	if(this.isBlank(param)){
		param="jsoncallback=?";
	}else{
		param=param+"&jsoncallback=?";
	}
	var tempUrl=sysconfig[sys]+interface_config[icode];
	var andFlag="&";
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.getJSON("http://"+tempUrl+andFlag+param,callbackhander);
}

//通用可设置编码的跨域异步调用
UtilObj.prototype.getCharsetRemoteJson= function (sys,icode,param,charset,callbackhander){
	var andFlag="&";
	var tempUrl=sysconfig[sys]+interface_config[icode];
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.ajax({
		url:"http://"+tempUrl+andFlag+param,
		type:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		scriptCharset:charset,  
		success:function(rdata){
			callbackhander(rdata);
		}
	});
}

//根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示
function getSfxs(obj){
	//读取cookie中地区、学段、年级、角色值
	var localAreaCode = this.getcookie("localAreaCode").replaceAll("\"","");
	var schoolStage = this.getcookie("schoolStage").replaceAll("\"",""); 
	var gradeCode = this.getcookie("gradeCode").replaceAll("\"","");
	var usertype = this.getcookie("usertype").replaceAll("\"","");
	//根据扩展字段配置表，获取各扩展字段代表的意思获取扩展字段数据,这里需要判断扩展字段是否为空，为空则表示全部
	//-----------调用判断字符串是否为空-------
	//代表地区
	if(!util.isBlank(obj.attr("a1")) && !util.isBlank(localAreaCode)){
		var attr_a1 = ","+obj.attr("a1")+",";
		if(attr_a1.indexOf(","+localAreaCode+",")<0){
			return false;
		}
	}
	//代表学段
	if(!util.isBlank(obj.attr("a2")) && !util.isBlank(schoolStage) && schoolStage != "\"\""){
		var attr_a2 = obj.attr("a2");
		if(attr_a2.length>schoolStage.length){
			var schoolStages = schoolStage.split(",");
			var sfcz = true;
			for(var i=0;i<schoolStages.length;i++){
				if(attr_a2.indexOf(schoolStages[i])<0){
					sfcz = false;
				}
			}
			if(!sfcz){
				return false;
			}
		}else{
			var attr_a2s = attr_a2.split(",");
			var sfcz = true;
			for(var i=0;i<attr_a2s.length;i++){
				if(schoolStage.indexOf(attr_a2s[i])<0){
					sfcz = false;
				}
			}
			if(!sfcz){
				return false;
			}
		}
		
	}
	//代表年级
	if(!util.isBlank(obj.attr("a3")) && !util.isBlank(gradeCode) && gradeCode != "\"\""){
		var attr_a3 = obj.attr("a3");
		if(attr_a3.length>gradeCode.length){
			var gradeCodes = gradeCode.split(",");
			var sfcz = true;
			for(var i=0;i<gradeCodes.length;i++){
				if(attr_a3.indexOf(gradeCodes[i])<0){
					sfcz = false;
				}
			}
			if(!sfcz){
				return false;
			}
		}else{
			var attr_a3s = attr_a3.split(",");
			var sfcz = true;
			for(var i=0;i<attr_a3s.length;i++){
				if(gradeCode.indexOf(attr_a3s[i])<0){
					sfcz = false;
				}
			}
			if(!sfcz){
				return false;
			}
		}
	}
	//代表角色 这里需要对教师进行特殊判读，2和3都代表教师
	if(!util.isBlank(obj.attr("a4")) && !util.isBlank(usertype)){
		var attr_a4 = obj.attr("a4");
		if(usertype == 2 || usertype == 3){
			if(!(attr_a4.indexOf("2")>=0 || attr_a4.indexOf("3")>=0)){
				return false;
			}
		}else{
			if(attr_a4.indexOf(usertype)<0){
				return false;
			}
		}
	}
	return true;
}

//获取CMS数据方法,统一返回title,desc,url,pic,tag,type,time,mark,a9,a10
UtilObj.prototype.getCMSData= function(icode,param,rlength,callbackhander){
	$.getScript("http://"+sysconfig["CMS"]+interface_config[icode],function(){ 
		var result = eval('('+"infolist"+interface_config[icode].split("/")[interface_config[icode].split("/").length-2]+')'); 
		if(result.infosList){
			var rdata = new Array();
			var rnum=0;
			$(result.infosList).each(function(num){
				if(rnum>=rlength){
					return;
				}
				//根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示;若不用改判断可以去掉。
				var sfxs = getSfxs($(this));
				if(!sfxs){
					return true; //跳出本次循环
				}
				var url=null;
				if($(this).attr("contenttype")=="HTML"){
					url="http://"+sysconfig["CMS"]+$(this).attr("filepath");
				}else if($(this).attr("contenttype")=="SURL"){
					url=$(this).attr("infourl");
				}
				var img=null;
				if(typeof($(this).attr("abbrevpic"))!="undefined" && $(this).attr("abbrevpic")!="null"){
					img="http://"+sysconfig["CMS"]+$(this).attr("abbrevpic");
				}
				rdata.push({"id":$(this).attr("infoid"),"title":$(this).attr("topic"),"desc":$(this).attr("description"),"url":url,"pic":img,"time":$(this).attr("pubtime"),"tag":$(this).attr("tag"),"type":$(this).attr("contenttype"),"mark":"","a9":$(this).attr("a9"),"a10":$(this).attr("a10")});
				rnum++;
			});
			callbackhander(rdata);
		}
	});
}

//CMS通用处理(替换~url~,~text~,~img~,~target~)
//显示位置id,接口编号,显示个数,展示方式(0html,其他append),展示模板(自动替换上述标签内容)
UtilObj.prototype.getCommonCMS=function (showid,icode,ilength,type,templete){
	if(util.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
		util.getCMSData(icode,null,ilength,function(data){
		if(data.length==0){return false;}else{
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var codeStr=(templete.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~img~",tdata.pic).replaceAll("~text~",tdata.title).replaceAll("~target~",target));
				if(type==0){
					$("#"+showid).html(codeStr);
				}else{
					$("#"+showid).append(codeStr);
				}
			}
			return true;
		}
	});
}