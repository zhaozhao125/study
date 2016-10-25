/*
 *封装查询对象组件，需要jquery支持
 *创建_SearchUtil对象，并设置webappcode、channelcode、pageSize
 *设置listener(key)key参数为时间类型，'END'为查询结束,'START'为查询开始
 *设置show(data)进行展示处理，data列表中对象格式为{'infoid':infoid,'channelcode':channelcode,'title':title,'url':url,'content':content,'pubtime':pubtime}
 *查询前设置keyword，执行search
 *
 *对象内提供方法：search新查询、prePage上一页、nextPage下一页、firstPage首页、lastPage末页、gotoPage(i)翻到i页
 *提供参数:totalPage:总页数、pageIndex当前页数、
 *调用范例：
 *
var searchUtil = new _SearchUtil();
searchUtil.webappcode="A01";
searchUtil.channelcode="";
searchUtil.pageSize=30;
searchUtil.listener=function(key){
	if("START"==key){
	
	}else if("END"==key){
	
	}
}
searchUtil.toshow=function(data){
	var sdiv=$(".list_bg2");
	var htmlcode = new Array();
	htmlcode.push("<ul class=\"news_list3\"> <h6><font class=\"blue_tab2 yello\">查询结果</font></h6>");
	if(data && data!=null && data.length>0){
		for(var i=0;i<data.length;i++){
			htmlcode.push("<li title='"+data[i].title+"' ><span class='dat'>"+data[i].pubtime.substring(2,10)+"</span><a href='"+data[i].url+"' target='_blank' >"+data[i].title+"</a></li>");
		}
		htmlcode.push("<div class='manu' >当前第"+searchUtil.pageIndex+"/"+searchUtil.totalPage+"页&nbsp;&nbsp;<a  onclick=\"searchUtil.firstPage()\" >首页</a>&nbsp;&nbsp;<a  onclick=\"searchUtil.prePage()\" >上一页</a>&nbsp;&nbsp;<a  onclick=\"searchUtil.nextPage()\" >下一页</a>&nbsp;&nbsp;<a  onclick=\"searchUtil.lastPage()\" >末页</a></div>");
	}else{
		htmlcode.push("<li>未查询到结果</li>");
	}
	htmlcode.push("</ul>");
	sdiv.html(htmlcode.join(""));
}//end show
//查询按钮点击事件
function yjt_search(){
	if("请输入关键词"!=document.getElementById("search_key").value){
		searchUtil.keyword=document.getElementById("search_key").value;
		searchUtil.search();
	}else{
		alert("请输入查询关键词！");
	}
}
 *
*/
//查询对象
function _SearchUtil() {
  //获得用户选择的站点编码
  this.webappcode=null;//站点
  this.channelcode=null;//栏目
  this.fields="content;title";//查询范围
  this.pageSize=20;//每页记录个数
  this.pageIndex=1;//当前页码
  this.totalPage=0;
  this.keyword="";
  this.base_url="/cms/searcher/search.action?";
  //开始查询、结束查询监听器
  this.listener=function(key){
	if("END"==key){
		/***开启或置灰下一页按钮 end***/	
	    /***如果为第一页，则“上一页” 按钮置灰 begin***/
		//解锁查询按钮
  	}else if("START"==key){
		/* 上页、下页、查询按钮 加锁 */
  	}
  };
  //展示方法
  this.toshow=function(robj){
  //{'infoid':infoid,'channelcode':channelcode,'title':title,'url':url,'content':content,'pubtime':pubtime}
	
	};
}
//异步调用方法
_SearchUtil.prototype.getData=function(geturl,callback_fn,parm){
	$.ajax({ 
	    url:geturl, 
	    type:'get',
	    dataType:'jsonp',//这里可以不写，但千万别写text或者html!!! 
	    jsonp:"jsoncallback",
	    timeout:31000,
        error: function(req, txt, err) {
            alert('请求错误!');
        },
        success: function(data){ 
	     callback_fn(data,parm);
	    }
	 });
}
//_searchUtil.search(); 查询处理
_SearchUtil.prototype.search = function () {
	if(!this.webappcode || !this.webappcode==null){
		alert("参数错误！请检查站点栏目参数！");
	}
	if(this.keyword=="" || this.keyword==null){
		alert("请输入关键词!");
		return;
	}
  this.pageIndex=1;
  if(this.listener){
  	this.listener("START");
  }
  this.createSearchRequest();
  
}//end of search

//_searchUtil.firstPage(); 第一页处理
_SearchUtil.prototype.firstPage = function () {
  if( this.pageIndex<=1){
    alert("已经是第一页！");
    return;
  }//end of if
  this.pageIndex=1;
  this.createSearchRequest();
}//end of prePage

//_searchUtil.lastPage(); 末页处理
_SearchUtil.prototype.lastPage = function () {
  if( this.pageIndex>=this.totalPage){
    alert("已经是末页！");
    return;
  }//end of if
  this.pageIndex=this.totalPage;
  this.createSearchRequest();
}//end of prePage

//_searchUtil.prePage(); 上一页处理
_SearchUtil.prototype.prePage = function () {
  if(this.pageIndex<=1){
    alert("已经是第一页！");
    return;
  }//end of if
  this.pageIndex--;
  this.createSearchRequest();
}//end of prePage

//_searchUtil.nextPage(); 下一页处理
_SearchUtil.prototype.nextPage = function () {
  if(this.pageIndex>=this.totalPage){
    alert("已经是末页！");
    return;
  }
  this.pageIndex++;
  this.createSearchRequest();
}//end of nextPage

_SearchUtil.prototype.gotoPage = function (j) {
  if(j>this.totalPage || j<1){
    alert("页码错误！必须大于1小于或等于最大页码！");
    return;
  }
  this.pageIndex=j;//当前页码
  this.createSearchRequest();
}//end of gotoPage

//_searchUtil.createSearchRequest();
_SearchUtil.prototype.createSearchRequest = function () {
  var geturl = this.base_url;
	geturl += "pageSize=" + this.pageSize;
	geturl += "&pageIndex=" + this.pageIndex;
	geturl += "&webappcode=" + this.webappcode;
	geturl += "&channelcode=" + this.channelcode;
	geturl += "&fields=" + this.fields;
	geturl += "&keyword=" + encodeURIComponent(encodeURIComponent(this.keyword));

	geturl += "&ajaxdate=" + new Date();
	
	this.getData(geturl,this.searchResult,this);

}//end of createSearchRequest
//创建详细页面 _searchUtil.searchResult();
_SearchUtil.prototype.searchResult = function (jsonData,searchutil) {
	var status=0;
	try{
		if(jsonData.status != ""){
    		status  = jsonData.status;
    	}
		var pageIndex  = parseInt(jsonData.pageIndex);
    	var keyword  = decodeURIComponent(jsonData.keyword);
    	var sumSize  = parseInt(jsonData.sumSize); 			
	    var totalPage  = parseInt(jsonData.totalPage); 
	    _searchUtil.pageIndex=pageIndex;
	    _searchUtil.totalPage=totalPage;
	}catch(e){
		
	}
	//搜索出错 
	if('0'==status) {
		try{
	    	msg  = jsonData.msg;
	    	if(msg.indexOf("io.FileNotFoundException")>-1 && msg.indexOf("org.apache.lucene.store.FSDirectory@")>-1){
	    		msg="索引尚未创建!";
	    	}
	    	alert(msg);			
		}catch (e) {
			//alert(e.message);
		}//end of try/catch
	}else{//搜索成功
		var resultResultArray = new Array();
		try{
		  for (i = 0; i < jsonData.articles.length; i++) {
	    	var url  = jsonData.articles[i].url; 
	    	var title  = decodeURIComponent(jsonData.articles[i].title); 				
	    	var content  = decodeURIComponent(jsonData.articles[i].content);
	    	var infoid  = jsonData.articles[i].infoid; 
	    	var channelcode  = jsonData.articles[i].channelcode; 
	    	var pubtime  = jsonData.articles[i].pubtime; 
			resultResultArray.push({'infoid':infoid,'channelcode':channelcode,'title':title,'url':url,'content':content,'pubtime':pubtime});
	      }//end of result for
		  searchutil.toshow(resultResultArray);
		  resultResultArray=null;
		}catch (e) {
			alert(e.message);
		}
	}
	if(searchutil.listener){
		searchutil.listener("END");
	}
}//end of searchResult