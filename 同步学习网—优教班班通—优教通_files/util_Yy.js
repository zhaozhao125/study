
var _util = new util_YyObj();

function util_YyObj(){};

//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

//判断是否为空
util_YyObj.prototype.isBlank = function(tStr){
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

/* 读取cookie中需要用到的参数以备使用
 * username、usertype、schoolStage、defaultStage
 * schoolId、gradeCode、classId、studentId
 * localAreaCode、schoolAreaCode、telNumber
 * yjtURL_系统标示
 */
util_YyObj.prototype.getcookie = function(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null&&arr!="") return unescape(arr[2]);
	return "";
}

/*
 * 链接格式：("~yjtURL_pls~/cms/interface.jsp?readfile\=/A01/A01051/A01051002/list.json&username=~username~&usertype=~usertype~"）
 * 链接替换方法
 * 1、从cookie中获取地区编码以及其他代替换的参数
 * 2、获取优教通支持全国运营配置文件中的传递过来链接域名编码对应的域名
 * 3、对参数以及域名进行替换，返回替换后的链接
 * 
 */
util_YyObj.prototype.getReplaceInfoUrl = function(infourll){
	//从cookie中获取需要的数据
	var localAreaCode = this.getcookie("localAreaCode");
	var username = this.getcookie("username");
	var usertype = this.getcookie("usertype");
	var schoolStage = this.getcookie("schoolStage");
	var schoolId = this.getcookie("schoolId");
	var defaultStage = this.getcookie("defaultStage");
	var gradeCode = this.getcookie("gradeCode");
	var classId = this.getcookie("classId");
	var studentId = this.getcookie("studentId");
	var schoolAreaCode = this.getcookie("schoolAreaCode");
	var telNumber = this.getcookie("telNumber");
        var ut=this.getcookie("ut");
    var areacode = this.getcookie("areacode");
	//通过正则匹配获取链接中域名参数名
	var reg = "\~yjtURL_[a-z]{3,8}\~";
	var url_temp = infourll.match(reg);
	if(this.isBlank(url_temp)){ //没有找到匹配项
		return false;
	}else{
		var ym_temp = url_temp[0].split("_")[1];
		var ym = ym_temp.substr(0,ym_temp.length-1);
		var ym = mapObj[localAreaCode][ym];
		if(this.isBlank(ym)){ //配置文件中没有找到相应的域名
			return false;
		}else{
			infourll = infourll.replaceAll(url_temp[0],ym).replaceAll("~localAreaCode~",localAreaCode).replaceAll("~username~",username).replaceAll("~usertype~",usertype).replaceAll("~schoolStage~",schoolStage).replaceAll("~schoolId~",schoolId).replaceAll("~defaultStage~",defaultStage).replaceAll("~gradeCode~",gradeCode).replaceAll("~classId~",classId).replaceAll("~studentId~",studentId).replaceAll("~schoolAreaCode~",schoolAreaCode).replaceAll("~telNumber~",telNumber).replaceAll("~areacode~",areacode).replaceAll("~ut~",ut);
		}
	}
	return infourll;
}

//根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示
util_YyObj.prototype.getSfxs = function(obj){
	//读取cookie中地区、学段、年级、角色值
	var localAreaCode = this.getcookie("localAreaCode").replaceAll("\"","");;
	var schoolStage = this.getcookie("schoolStage").replaceAll("\"","");; 
	var gradeCode = this.getcookie("gradeCode").replaceAll("\"","");;
	var usertype = this.getcookie("usertype").replaceAll("\"","");;
	//根据扩展字段配置表，获取各扩展字段代表的意思获取扩展字段数据,这里需要判断扩展字段是否为空，为空则表示全部
	//-----------调用判断字符串是否为空-------
	//代表地区
	if(!this.isBlank(obj.a1) && !_util.isBlank(localAreaCode)){
		var attr_a1 = ","+obj.a1+",";
		if(attr_a1.indexOf(","+localAreaCode+",")<0){
			return false;
		}
	}
	//代表学段
	if(!this.isBlank(obj.a2) && !_util.isBlank(schoolStage)){
		var attr_a2 = obj.a2;
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
	if(!this.isBlank(obj.a3) && !_util.isBlank(gradeCode)){
		var attr_a3 = obj.a3;
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
	if(!this.isBlank(obj.a4) && !_util.isBlank(usertype)){
		var attr_a4 = obj.a4;
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