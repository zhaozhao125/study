//初始化本脚本加入的部分页面元素样式
document.write("<style type=\"text/css\">#newstag_DownloadVertifyDiv {position:absolute;left:50%;margin-left:-110px;width:220px;height:110px;background-color:#eaeaea;display:none}</style>");
//模板编辑器tag按钮，需此方法支持
function getObject(name){return document.getElementById(name);}
//替换宽度样式
$(document).ready(function(){
	var screen_width = window.screen.width;
	var screen_width_id = "w980";
	if(screen_width>1280){
		screen_width_id = "w1200";
	}else{
		screen_width_id = "w980";
	}
	//替换页面中的宽度样式
	$(".w980").removeClass("w980").addClass(screen_width_id);
	$(".w1200").removeClass("w1200").addClass(screen_width_id);
});

//必须jquery支持！
function TagObject(){
	//this.ajaxPvURL="http://192.168.104.163/pvs/pv?format=json&jsoncallback=?";
	this.ajaxPvURL="http://cms.czbanbantong.com:8080/pvs/pv";
	this.managerURL="http://cms.czbanbantong.com:8080/cms";
	//下载地址列表，下载时将随机使用其中一个
	this.downloadIPArry=[this.managerURL+"/StreamDownload.jsp",this.managerURL+"/StreamDownload.jsp"];
	this.clickShowid=null;
	this.page=new Array();
}
var newstag= new TagObject();
//栏目Json数据结果
TagObject.prototype.ChannelJsonListTemp=null;
//上页信息
TagObject.prototype.PreviousInfo = function(){};
//下页信息
TagObject.prototype.NextInfo = function(){};

try{
	TagObject.prototype.Browser = {
		version: (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
		safari: /webkit/i.test(navigator.userAgent.toLowerCase()) && !this.chrome,
		opera: /opera/i.test(navigator.userAgent.toLowerCase()),
		firefox:/firefox/i.test(navigator.userAgent.toLowerCase()),
		ie: /msie/i.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase()),
		mozilla: /mozilla/i.test(navigator.userAgent.toLowerCase()) && !/(compatible|webkit)/.test(navigator.userAgent.toLowerCase()) && !this.chrome,
		chrome: /chrome/i.test(navigator.userAgent.toLowerCase()) && /webkit/i.test(navigator.userAgent.toLowerCase()) && /mozilla/i.test(navigator.userAgent.toLowerCase())
	}
}catch(e){}

//记录cookie
TagObject.prototype.cookieWriter = function(name,   value,   hours){ 
	try{
		var expire = "";
		if(hours   !=   null){    
			expire = new Date((new Date()).getTime() + hours * 3600000);    
			expire = ";   expires=" + expire.toGMTString();    
		}
		document.cookie = name + "=" + escape(value) + expire;
	}catch(e){}
}
//读取cookie
TagObject.prototype.cookieReader = function(name){ 
	try{   
		var cookieValue = null;    
		var search = name   +   "=";    
		if(document.cookie.length > 0){      
			offset = document.cookie.indexOf(search);    
			if(offset != -1){      
				offset += search.length;
				end = document.cookie.indexOf(";",offset);
			if(end == -1){
				end = document.cookie.length;
			}
			cookieValue = unescape(document.cookie.substring(offset,end));
			}
		}
		return cookieValue;
	}catch(e){} 
}
//http://192.168.104.163/pvs/pv?m=3&cid=A04001&iid=1298277514434792
/*
http://ip:port/pvs/pv?m=3&wid=&cid=&iid=
参数说明：
m接口类型
wid站点ID
cid频道ID
iid信息ID
pv浏览量
返回格式：
{"_id":" A49001_4500000000118763","pv":100," td_pv":20}
*/
//点击率ajax回调方法
TagObject.prototype.CountAndShowClickCallBack=function(data){
	try{
		/*if(data==null || "null"==data){
			$.getJSON(newstag.ajaxPvURL,{m:'1',wid:newstag.webcode,cid:newstag.channelcode,iid:newstag.infoid,type:'news',pv:1},function(obj){return;});
			document.getElementById(newstag.clickShowid).innerHTML="1";
		}else{
				if(data.result=='-1' || data.error){
					document.getElementById(newstag.clickShowid).innerHTML="";
				}else{
				//var infoid=data._id;
				var pv=data.pv;
				//var td_pv=data.td_pv;
				     document.getElementById(newstag.clickShowid).innerHTML=pv;
				}
		}*/
		if(data.result=='-1' || data.error){
			document.getElementById(newstag.clickShowid).innerHTML="";
		}else{
			var pv=data.pv;
			document.getElementById(newstag.clickShowid).innerHTML=pv;
		}
	}catch(e){
		//alert(e);
	}
}
//var newstag= {ajaxPvURL:"http://192.168.104.163/pvs/pv?format=json&jsoncallback=?",downloadIPArry:["/download.jsp"],clickShowid:""};
//浏览数显示处理方法
TagObject.prototype.countAndShowClick=function(showid){
	try{
		 newstag.clickShowid=showid;
		 $.getJSON(newstag.ajaxPvURL+"?jsoncallback=?",{m:'3',wid:newstag.webcode,cid:newstag.channelcode,iid:newstag.infoid,type:'news',code:Math.random()},newstag.CountAndShowClickCallBack);
	}catch(e){
		//alert(e);
	}
}
//转向查询页
TagObject.prototype.gotoSearch=function(webappcode,pagetype){
	if(pagetype=="new"){
		open(newstag.managerURL+"/search.jsp?webappcode="+webappcode);
	}else{
		window.location.href=newstag.managerURL+"/search.jsp?webappcode="+webappcode;
	}
}
//获取频道点击数
TagObject.prototype.showChannelClick=function(showid){
	try{
		 newstag.clickShowid=showid;
		 $.getJSON(newstag.ajaxPvURL,{m:'4',wid:newstag.webcode,cid:newstag.channelcode,code:Math.random()},newstag.showChannelClickCallBack);
	}catch(e){
		//alert(e);
	}
}
//频道点击数回调方法
  TagObject.prototype.showChannelClickCallBack=function(data){
	try{
		/*if(data==null || "null"==data){
			document.getElementById(newstag.clickShowid).innerHTML="1";
			$.getJSON(newstag.ajaxPvURL,{m:'1',wid:newstag.webcode,cid:newstag.channelcode,iid:'0000000000000000',type:'news',pv:1},function(obj){return;});
		}else{
			//var infoid=data._id;
			var pv=data.pv;
			//var td_pv=data.td_pv;
			document.getElementById(newstag.clickShowid).innerHTML=pv;
		}*/
		
		var pv=data.pv;
		document.getElementById(newstag.clickShowid).innerHTML=pv;
		
	}catch(e){
		//alert(e);
	}
}
//获取首页点击数
TagObject.prototype.showIndexClick=function(showid){
	try{
		 newstag.clickShowid=showid;
		 $.getJSON(newstag.ajaxPvURL,{m:'2',wid:newstag.webcode,code:Math.random()},newstag.showIndexClickCallBack);
	}catch(e){
		//alert(e);
	}
}
//首页点击数回调方法
TagObject.prototype.showIndexClickCallBack=function(data){
	try{
		if(data==null || "null"==data){
			document.getElementById(newstag.clickShowid).innerHTML="";
		}else{
			//var infoid=data._id;
			var pv=data.pv;
			//var td_pv=data.td_pv;
			document.getElementById(newstag.clickShowid).innerHTML=pv;
		}
	}catch(e){
		//alert(e);
	}
}
//滚图效果调用,参数：显示位置ID,数据数组，宽，高，文字高，打开方式
TagObject.prototype.showFlashPic=function(id,data,focus_width,focus_height,text_height,opentype){
	try{
		var tardiv = document.getElementById(id);
		var swf_height = focus_height+text_height;
		if(tardiv!=null && data.length>0){
			var picarr	=new Array();
			var linkarr	=new Array();
			var textarr	=new Array();
			for(var i=0;i<data.length;i++){
				//加入escape方法转义，避免URL中包含&或者|关键字
				picarr.push(escape(data[i].pic));
				linkarr.push(escape(data[i].url));
				textarr.push(data[i].title);
			}
			var picstr=picarr.join("|");
			var linkstr=linkarr.join("|");
			var textstr=textarr.join("|");
			picarr=null;
			linkarr=null;
			textarr=null;
			var objstrarr=new Array();
			objstrarr.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">');
			objstrarr.push('<param name="allowScriptAccess" value="sameDomain">');
			objstrarr.push('<param name="movie" value="/inc/flash/pixviewer.swf">');
			objstrarr.push('<param name="quality" value="high">');
			objstrarr.push('<param name="bgcolor" value="#cccccc">');
			objstrarr.push('<param name="menu" value="false">');
			objstrarr.push('<param name=wmode value="opaque">');
			objstrarr.push('<param name="FlashVars" value="pics='+picstr+'&links='+linkstr+'&texts='+textstr+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'">');
			objstrarr.push('<embed src="/A01/inc/flash/pixviewer.swf" wmode="opaque" FlashVars="pics='+picstr+'&links='+linkstr+'&texts='+textstr+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'" menu="false" bgcolor="#cccccc" quality="high" width="'+ focus_width +'" height="'+ swf_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
			objstrarr.push('</object>');
			var objstr = objstrarr.join('\r\n');
			tardiv.innerHTML=objstr;
			objstrarr = null;
		}
	}catch(e){
		//alert("picflasherror"+e);
	}
}
//子频道链接处理方法
//ifshowParent是否显示父栏目
//channellist栏目列表对象
TagObject.prototype.showchildlink=function(channellist,ifshowParent,listIcon){
	try{
		if(!listIcon || listIcon==null){
			listIcon="";
		}
		if(channellist && channellist.length){
			document.write("<ul>");
			for(var i=0;i<channellist.length;i++){
				var channel = channellist[i];
				var tempcode = "";
				if(!channel.isroot){
					if(ifshowParent=="1"){
						tempcode = "&nbsp;&nbsp;";
					}
					document.write("<li>");
					document.write(tempcode+listIcon+"<a href='"+channel.url+"' target='_blank' >"+channel.name+"</a>");
					document.write("</li>");
				}else{
					if(ifshowParent=="1"){
						document.write("<li>");
						document.write(tempcode+listIcon+"<a href='"+channel.url+"' target='_blank' >"+channel.name+"</a>");
						document.write("</li>");
					}
				}
			}
			document.write("</ul>");
		}
	}catch(e){}
}
//多页选页处理
TagObject.prototype.showPageSelLink=function(){
	try{
	var htmlarr = new Array();
	htmlarr.push("<select onchange='newstag.selPageLink(this.value)' >");
	if(this.page.pageurl && this.page.totailpage && this.page.pageno && this.page.infocount && this.page.channelmaxpage){
		for(var i=1;i<=this.page.totailpage;i++){
			if(i>this.page.channelmaxpage){
				htmlarr.push("<option value=\""+i+"\" >更多</option>");
				break;
			}else{
				if(this.page.pageno==i){
					htmlarr.push("<option value=\""+i+"\" selected=\"true\" >"+i+"</option>");
				}else{
					htmlarr.push("<option value=\""+i+"\" >"+i+"</option>");
				}
			}
		}
	}
	htmlarr.push("</select>");
	document.write(htmlarr.join(""));
	}catch(e){}
}
//选择分页
TagObject.prototype.selPageLink=function(svalue){
	try{
		var pindex= this.page.pageurl.indexOf("list_1.html");
		if(pindex>=0){
			if(svalue>this.page.channelmaxpage){
				window.location.href=newstag.page.historypageurl;
			}else{
				window.location.href=this.page.pageurl.substring(0,pindex)+"list_"+svalue+".html";
			}
		}else{
			pindex= this.page.pageurl.indexOf("preview.jsp?");
			//不判断地址url
			pindex=1;
			if(pindex>=0){
				if(svalue>this.page.channelmaxpage){
					window.location.href=newstag.page.historypageurl;
				}else{
					window.location.href=this.page.pageurl.replace("pageno=1","pageno="+svalue);
				}
			}
		}
	}catch(e){alert(e);}
}
//信息分页处理
TagObject.prototype.showInfoPageNav=function(infopage_total,infonowpage){
	try{
		var htmlarr = new Array();
		var ifpreview = false;
		if(statictype=='1'){
			ifpreview = true;
		}
		//上一页
		if(infonowpage<=1){
			htmlarr.push("上一页");
		}else if(infonowpage==2){
			if(ifpreview){
				htmlarr.push("<a href='"+url+"' >上一页</a>");
			}else{
				htmlarr.push("<a href='"+newstag.infoid+".html' >上一页</a>");
			}
		}else if(infonowpage>2){
			if(ifpreview){
				htmlarr.push("<a href='"+url.replace("spageno=1","spageno="+(infonowpage-1))+"' >上一页</a>");
			}else{
				htmlarr.push("<a href='"+newstag.infoid+"_"+(infonowpage-1)+".html' >上一页</a>");
			}
		}
		//下一页
		if(infonowpage>=infopage_total){
			htmlarr.push("下一页");
		}else{
			if(ifpreview){
				htmlarr.push("<a href='"+url.replace("spageno=1","spageno="+(infonowpage+1))+"' >下一页</a>");
			}else{
				htmlarr.push("<a href='"+newstag.infoid+"_"+(infonowpage+1)+".html' >下一页</a>");
			}
		}
		document.write(htmlarr.join("&nbsp;"));
	}catch(e){}
}
//视频播放处理
TagObject.prototype.showVideo=function(fileurl,width,height,autoplay){
	try{
		if( !width || width=="0"){
			width="100%";
		}
		var playerCodeArray = new Array();
		if(newstag.Browser.ie){
			playerCodeArray.push('<object id="myPlayer" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="'+width+'" height="'+height+'">');
			playerCodeArray.push('<param name="URL" value="'+fileurl+'">');
			if('1'==autoplay){
				playerCodeArray.push('<param name="autoStart" value="1">');
			}
			playerCodeArray.push('<param name="balance" value="0"><param name="currentPosition" value="0"><param name="fullScreen" value="0">');
			playerCodeArray.push('<param name="playCount" value="1"><param name="rate" value="1"><param name="currentMarker" value="0"><param name="invokeURLs" value="-1">');
			playerCodeArray.push('<param name="volume" value="50"><param name="mute" value="0"><param name="stretchToFit" value="-1"><param name="windowlessVideo" value="0">');
			playerCodeArray.push('<param name="enabled" value="-1"><param name="enableContextMenu" value="0"><param name="SAMIStyle" value><param name="enableErrorDialogs" value="0">');
			playerCodeArray.push('</object>');
		}else if(newstag.Browser.chrome){
			
			playerCodeArray.push('<video id="myVideo" controls poster="/inc/images/video1.jpg" width="'+width+'" height="'+height+'" >');
			playerCodeArray.push('<source src="'+fileurl+'" />');
			if('1'==autoplay){
				//playerCodeArray.push('<param name="autoStart" value="1">');
			}
			playerCodeArray.push('</video>');
		}
		document.write(playerCodeArray.join(""));
	}catch(e){}
}
//文件下载处理方法
TagObject.prototype.showDownloadFile=function(filepath,filetext,classname){
	try{
		//随机获取一个下载地址
		//newstag.downloadFile
		//newstag.downloadText
		//newstag.downloadClass
		var randomvalue=Math.random();
		var arrindex = Math.round( (randomvalue*newstag.downloadIPArry.length) );
		if(arrindex==0){
			arrindex = newstag.downloadIPArry.length;
		}

		var htmlcode = new Array();
		var url = newstag.downloadIPArry[arrindex-1];
		htmlcode.push("<a class='"+classname+"' href='#' onclick='document.getElementById(\"newstag_DownloadVertifyDiv\").style.display=\"inline\";return false;' >"+filetext+"</a>");
		htmlcode.push('<div id="newstag_DownloadVertifyDiv" >');
		htmlcode.push("<img src='"+newstag.managerURL+"/vertifyCode.jsp?name=down' border='0' />");
		htmlcode.push('<form name="vertifyForm" action="'+url+'" method="post" onsubmit="return newstag.goDownload()" >');
		htmlcode.push("<span>请输入上图中下载验证码：</span><br/>");
		htmlcode.push('<input type="hidden" name="filepath" value="'+filepath+'" >');
		htmlcode.push('<input type="text" name="verifyCode" value="" maxLength="4"><br/>');
		htmlcode.push('<input type="submit" value="提交" ><input type="button" value="取消" onclick="document.getElementById(\'newstag_DownloadVertifyDiv\').style.display=\'none\'" ></form></div>');
		
		document.write(htmlcode.join(""));
		htmlcode=null;
	}catch(e){
		//alert("脚本异常！下载处理失败，请联系管理员！"+e);
	}
}
TagObject.prototype.goDownload=function(){
	try{
		if(window.vertifyForm.verifyCode.value!=null && window.vertifyForm.verifyCode.value.length>3 ){
			document.getElementById("newstag_DownloadVertifyDiv").style.display="none";
			return true;
		}else{
			alert("请输入4位验证码！");
			return false;
		}
	}catch(e){
			alert("脚本异常！下载处理失败，请联系管理员！"+e);
	}
}
/*
 *信息上页标签处理
 *页面将写入newstag.PreviousInfo对象
 *包含属性infolink(地址)/infoid/topic/contentType/filepath/outfile/affixpath
 *
 */
TagObject.prototype.InfoPreviousPage=function(){
	try{
		if(newstag.PreviousInfo.infolink && newstag.PreviousInfo.topic){
			document.write("<a href='"+newstag.PreviousInfo.infolink+"' >"+newstag.PreviousInfo.topic+"</a>");
		}else{
			this.getInfoPageByJson(newstag.channelcode,newstag.infoid,0);
		}
	}catch(e){
		//alert(e);
	} 
} 

/*
 *信息下页标签处理
 *页面将写入newstag.NextInfo对象
 *包含属性infolink(地址)/infoid/topic/contentType/filepath/outfile/affixpath
 *
 */
TagObject.prototype.InfoNextPage=function(){
	try{
		if(newstag.NextInfo.infolink && newstag.NextInfo.topic){
			document.write("<a href='"+newstag.NextInfo.infolink+"' >"+newstag.NextInfo.topic+"</a>");
		}else{
			this.getInfoPageByJson(newstag.channelcode,newstag.infoid,1);
		}
	}catch(e){
		//alert(e);
	} 
} 
/*
 *信息上下页备用处理，支持方法，用于处理channelJson结果，并写入页面。
 *通过json数据文件获取上下页信息并显示
 *result异步获取的栏目结果,infoid信息id,type获取类型(0:上页、1:下页)
*/
TagObject.prototype.getInfoPageByJsonList=function(result,infoid,type){
				var templink = null;
				var getflag=0;
				var arr = jQuery.makeArray($(result.infosList));
				 //arr.reverse(); 使用数组翻转函数
				for(var i=0;i<arr.length;i++){
					if(arr[i].infoid == infoid){
						if(1==type){
							if(templink!=null && templink){
								$("#infoPageType_"+type).html(templink);
							}
							return false;
						}
					}
					if(arr[i].contenttype=="HTML"){
						templink='<a href="'+arr[i].filepath+'"  >'+arr[i].topic+'</a>';
					}else if(arr[i].contenttype=="SURL"){
						templink='<a href="'+arr[i].infourl+'"  >'+arr[i].topic+'</a>';
					}else if(arr[i].contenttype=="FILE"){
						templink='<a href="'+arr[i].outfiles+'"  >'+arr[i].topic+'</a>';
					}
					if(getflag==1){
						if(templink!=null && templink){
							$("#infoPageType_"+type).html(templink);
						}
						return false;
					}
					if(arr[i].infoid==infoid){
						if(0==type){
							getflag=1;
						}
					}
					//防止查找时间过长
					if(i>200 && getflag==0){
						return false;
					}
				}
				/*$(result.infosList).each(function(num){
					if($(this).attr("infoid")==infoid){
						if(0==type){
							if(templink!=null && templink){
								$("#infoPageType_"+type).html(templink);
							}
							return false;
						}
					}
					if($(this).attr("contenttype")=="HTML"){
						templink='<a href="'+$(this).attr("filepath")+'"  >'+$(this).attr("topic")+'</a>';
					}else if($(this).attr("contenttype")=="SURL"){
						templink='<a href="'+$(this).attr("infourl")+'"  >'+$(this).attr("topic")+'</a>';
					}else if($(this).attr("contenttype")=="FILE"){
						templink='<a href="'+$(this).attr("outfiles")+'"  >'+$(this).attr("topic")+'</a>';
					}
					if(getflag==1){
						if(templink!=null && templink){
							$("#infoPageType_"+type).html(templink);
						}
						return false;
					}
					if($(this).attr("infoid")==infoid){
						if(1==type){
							getflag=1;
						}
					}
					//防止查找时间过长
					if(num>200 && getflag==0){
						return false;
					}
				});*/
}
/*
 *信息上下页备用处理(通过读取Json文件获取，最多查找50条，防止执行过长)
 *channelcode栏目编码,infoid信息id,type获取类型(0:上页、1:下页)
 */
TagObject.prototype.getInfoPageByJson=function(channelcode,infoid,type){
	try{
		if(!infoid || infoid==null || (type!=0 && type!=1) ){
			return;
		}
		document.write("<span id='infoPageType_"+type+"'></span>");
		var url = "";
		if(newstag.ChannelJsonListTemp!=null){
				newstag.getInfoPageByJsonList(newstag.ChannelJsonListTemp,infoid,type);
		}
		if(channelcode && channelcode!=null){
			for(var i=1;i<=(channelcode.length/3);i++){
				url=url+"/"+channelcode.substring(0,(3*i))
			}
			$.getScript(url+"/list.json",function(result){
				var data = eval('('+"infolist"+channelcode+')');
				newstag.ChannelJsonListTemp=data;
				newstag.getInfoPageByJsonList(data,infoid,type);
			});
			/*$.getJSON(url+"/list.json",function(result){
				newstag.ChannelJsonListTemp=result;
				newstag.getInfoPageByJsonList(result,infoid,type);
			});*/
		}
	}catch(e){
		//alert(e);
	} 
}

//提交投票信息
function voteSubmit(showid,votetype,id,showres){
	var optvotes = "";
	$("input[name^='v"+id+"']:checked").each(function(num){
		if(num == 0){
			optvotes = optvotes + $(this).val();
		}else{
			optvotes = optvotes +","+ $(this).val();
		}
	});
	if(optvotes == ""){
		alert("请先选择投票项！");
	}else{
		$.getJSON(newstag.managerURL+"/interface/vote.action?jsoncallback=?",{"voteId":id,"optvotes":optvotes}, function(jobj){
			if(jobj.message.substring(0,2)=="ok"){
				alert("投票成功!");
				if(showres=="true"){
					newstag.showVoteResult(showid,votetype,id);
				}
			}else{
				try{
	    		alert("投票失败!"+jobj.message.substring(jobj.message.indexOf(",")));
	    		}catch(e){alert("投票失败!");}
			}
		});
	}
	return false;
}

//重置投票信息
function voteReset(){
	$("input[name^='v']:checked").each(function(num){
		$(this).attr("checked",false);
	});
}

/*
投票显示支持处理
供VoteTagMark调度
*/
TagObject.prototype.showVote=function(showid,voteid,showres){
	var votediv=document.getElementById(showid);
	if(votediv){
	$.getJSON(newstag.managerURL+"/interface/voteinfo.action?jsoncallback=?",{"voteId":voteid}, function(jobj){
		if(jobj.message.substring(0,2)!="ok"){
			votedivinnerHTML("投票初始化失败！异常信息："+jobj.message);
			return;
		}
		var tvote = jobj.data;
		var voteType = "radio";
		if(tvote.voteType==1){
			voteType = "checkbox";
		}
		try{
		var voteHtml=new Array();
		if(tvote.linkurl!=null && tvote.linkurl!="" && tvote.linkurl!="null" ){
			voteHtml.push("<h2><a target='_blank' href='"+tvote.linkurl+"' >"+tvote.title+"</a></h2>");
		}else{
			voteHtml.push("<h2>"+tvote.title+"</h2>");
		}
		if(tvote.picture!=null && tvote.picture!="" && tvote.picture!="null" ){
			voteHtml.push("<img border='0' src='/tempfiles/"+tvote.picture+"' />");
		}
		voteHtml.push('<ul>');
		for(var i =0;i<tvote.optionlist.length;i++){
			var showCode=tvote.optionlist[i].title;
			if(tvote.optionlist[i].picture!=null && tvote.optionlist[i].picture!=""){
				showCode="<img border='0' src='/tempfiles/"+tvote.optionlist[i].picture+"' />"+showCode;
			}
			if(tvote.optionlist[i].linkurl!=null && tvote.optionlist[i].linkurl!=""){
				showCode="<a href='"+tvote.optionlist[i].linkurl+"' >"+showCode+"</a>";
			}
			voteHtml.push('<li><input type="'+voteType+'" name="v'+tvote.id+'" value="'+tvote.optionlist[i].id+'" >'+showCode+'</li>');
		}
		voteHtml.push("</ul><hr/>");
		voteHtml.push('<center><input type="button" onclick="return voteSubmit(\''+showid+'\',\'vote\',\''+voteid+'\',\''+showres+'\')" value="提交" />&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" onclick="voteReset()" value="重置" /></center>');
		votediv.innerHTML=voteHtml.join("");
		voteHtml = null;
		}catch(e){
			votediv.innerHTML="投票加载失败！未预期的处理异常！";
		}
	});
	}
}

/*
投票组显示支持处理
供VoteTagMark调度
*/
TagObject.prototype.showVoteGroup=function(showid,groupid,showres){
	var votediv=document.getElementById(showid);
	if(votediv){
	$.getJSON(newstag.managerURL+"/interface/votegroupinfo.action?jsoncallback=?",{"groupId":groupid}, function(jobj){
		if(jobj.message.substring(0,2)!="ok"){
			votedivinnerHTML("投票初始化失败！异常信息："+jobj.message);
			return;
		}
		var tgroup = jobj.data;
		try{
		var voteHtml=new Array();
		if(tgroup.linkurl!=null && tgroup.linkurl!="" && tgroup.linkurl!="null" ){
			voteHtml.push("<h1><a target='_blank' href='"+tgroup.linkurl+"' >"+tgroup.title+"</a></h1>");
		}else{
			voteHtml.push("<h1>"+tgroup.title+"</h1>");
		}
		voteHtml.push("<hr/>");
		if(tgroup.votelist!=null && tgroup.votelist.length && tgroup.votelist.length>0){
		for(var vi=0;vi<tgroup.votelist.length;vi++){
			var tvote = tgroup.votelist[vi];
			if(tvote.linkurl!=null && tvote.linkurl!="" && tvote.linkurl!="null" ){
				voteHtml.push("<h2><a target='_blank' href='"+tvote.linkurl+"' >"+tvote.title+"</a></h2>");
			}else{
				voteHtml.push("<h2>"+tvote.title+"</h2>");
			}
			if(tvote.picture!=null && tvote.picture!="" && tvote.picture!="null" ){
				voteHtml.push("<img border='0' src='/tempfiles/"+tvote.picture+"' />");
			}
			var voteType = "radio";
			if(tvote.voteType==1){
				voteType = "checkbox";
			}
			voteHtml.push("<ul>");
			for(var i =0;i<tvote.optionlist.length;i++){
				var showCode=tvote.optionlist[i].title;
				if(tvote.optionlist[i].picture!=null && tvote.optionlist[i].picture!=""){
					showCode="<img border='0' src='/tempfiles/"+tvote.optionlist[i].picture+"' />"+showCode;
				}
				if(tvote.optionlist[i].linkurl!=null && tvote.optionlist[i].linkurl!=""){
					showCode="<a href='"+tvote.optionlist[i].linkurl+"' >"+showCode+"</a>";
				}
				voteHtml.push('<li><input type="'+voteType+'" name="v'+tvote.id+'" value="'+tvote.optionlist[i].id+'" >'+showCode+'</li>');
			}
			voteHtml.push("</ul><hr/>");
			tvote=null;
		}
		}
		voteHtml.push('<center><input type="button" onclick="return voteSubmit(\''+showid+'\',\'group\',\''+groupid+'\',\''+showres+'\')" value="提交" />&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" onclick="voteReset()" value="重置" /></center>');
		votediv.innerHTML=voteHtml.join("");
		voteHtml = null;
		}catch(e){
			votediv.innerHTML="投票加载失败！未预期的处理异常！";
		}
	});
	}
}
/*
投票标签支持处理
在需要显示投票的位置加入
newstag.VoteTagMark("vote"/"group",id,是否查看结果);
*/
TagObject.prototype.VoteTagMark=function(votetype,id,showres){
	randomDivId = (id+Math.random(id)+"").replace(".","");
	document.write("<div id='"+randomDivId+"' >&nbsp;</div>");
	if(votetype=="group"){
		this.showVoteGroup(randomDivId,id,showres);
	}else if(votetype=="vote"){
		this.showVote(randomDivId,id,showres);
	}
}
/*
投票结果显示处理
在需要显示投票的位置加入
newstag.VoteTagMark(显示位置id,"vote"/"group",投票或投票组id);
*/
TagObject.prototype.showVoteResult=function(showid,votetype,id){
	var votediv=document.getElementById(showid);
	if(!votediv || !votediv.innerHTML ){
		alert("参数异常！");
		return;
	}
	var voteid = null;
	var groupid = null;
	if(votetype=="group"){
		groupid = id;
		voteid = "";
	}else if(votetype=="vote"){
		voteid = id;
		groupid = "";
	}else{
		alert("参数异常！");
		return;
	}
	$.getJSON(newstag.managerURL+"/interface/voteResult.action?jsoncallback=?",{"groupId":groupid,"voteId":voteid}, function(jobj){
		if(jobj.message.substring(0,2)!="ok"){
			votediv.innerHTML("执行失败！异常信息："+jobj.message);
			return;
		}
		var votelist=jobj.data;
		var voteHtml = new Array();
		for(var vi=0;vi<votelist.length;vi++){
			var tvote = votelist[vi];
			if(tvote.linkurl!=null && tvote.linkurl!="" && tvote.linkurl!="null" ){
				voteHtml.push("<h2><a target='_blank' href='"+tvote.linkurl+"' >"+tvote.title+"</a></h2>");
			}else{
				voteHtml.push("<h2>"+tvote.title+"</h2>");
			}
			if(tvote.picture!=null && tvote.picture!="" && tvote.picture!="null" ){
				voteHtml.push("<img border='0' src='/tempfiles/"+tvote.picture+"' />");
			}
			var voteType = "radio";
			if(tvote.voteType==1){
				voteType = "checkbox";
			}
			voteHtml.push("<ul>");
			for(var i =0;i<tvote.optionlist.length;i++){
				var showCode=tvote.optionlist[i].title;
				if(tvote.optionlist[i].picture!=null && tvote.optionlist[i].picture!=""){
					showCode="<img border='0' src='/tempfiles/"+tvote.optionlist[i].picture+"' />"+showCode;
				}
				if(tvote.optionlist[i].linkurl!=null && tvote.optionlist[i].linkurl!=""){
					showCode="<a href='"+tvote.optionlist[i].linkurl+"' >"+showCode+"</a>";
				}
				voteHtml.push('<li>'+tvote.optionlist[i].votesNumber+"&nbsp;|&nbsp;"+showCode+'</li>');
			}
			voteHtml.push("</ul><hr/>");
			tvote=null;
		}
		votediv.innerHTML=voteHtml.join("");
		voteHtml = null;
	});
}