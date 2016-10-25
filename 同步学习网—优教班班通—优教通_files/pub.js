/************************************
purpose      : 禁止右键
************************************/
//document.oncontextmenu=noRightMenu
function noRightMenu(){
  window.event.returnValue=false
}

/************************************
Method       : trim()
purpose      : 先将全角空格替换为半角空格，然后除去字符串头尾的空格。
parameters   :
return value : 除去头尾空格的字符串
用法：
  var tmpStr = "abc ";
  tmpStr = tmpStr.trim();
************************************/
String.prototype.trim = function()
{
   return this.replace(/　/g, " ").replace(/(^\s*)|(\s*$)/g, "");
}

/************************************
Method       : fucCheckNUM(NUM)
purpose      : 检查字符串中是否有非数字字符。
parameters   : 待查字符串
return value : 0－有非数字字符；1-全是数字
************************************/
function fucCheckNUM(NUM) {
   var  re=/^(-|\+)?\d+(\.\d+)?$/;
   if(!re.test(NUM)){return 0}else{return 1;}
}

/************************************
Method       : operate(url,target)
purpose      : 打开url指定的页面。
parameters   : url-待打开的页面地址；target-显示方式
return value :
************************************/
function operate(url,target)
{
  window.open(url,target);
}

/************************************
Method       : trim(strInput)
purpose      : 除去字符串头尾的空格。
parameters   :
return value : 除去头尾空格的字符串
************************************/
function  trim(strInput)
{
      var iLoop=0;
      var iLoop2=-1;
      var strChr;
      //if(strValue == null)
      if((strInput == null)||(strInput == "<NULL>"))
              return "";
      if(strInput)
      {
              for(iLoop=0;iLoop<strInput.length-1;iLoop++)
              {
                      strChr=strInput.charAt(iLoop);
                      if(strChr!=' ')
                              break;
              }
              for(iLoop2=strInput.length-1;iLoop2>=0;iLoop2--)
              {
                      strChr=strInput.charAt(iLoop2);
                      if(strChr!=' ')
                              break;
              }
      }

      if(iLoop<=iLoop2)
      {
              return strInput.substring(iLoop,iLoop2+1);
      }
      else
      {
              return "";
      }
}

/************************************
Method       : checkChar()
purpose      : 禁止非法字符的输入，可扩展，后面带非法字符数组。
parameters   :
return value :
************************************/
function checkChar()
{
      var iKey = event.keyCode;
      if (iKey==222) {return false;}  //非法字符"'"
}

/************************************
Method       : checkNum()
purpose      : 禁止非数字的输入。
parameters   :
return value :
************************************/
function checkNum()
{
    var iKey = event.keyCode;

    if ((iKey==8) ||(iKey==46) ||(iKey==190)) {
        return true;}  //--delete or space keydown
    if (event.keyCode==13)
    {
        event.keyCode = 9;
        return true;
    }
    if ((iKey<48) || ((iKey>57)&&(iKey<96)) || (iKey>105)) 	{return false;}  //非数字
}

/************************************
Method       : pasteNum()
purpose      : 禁止非数字的拷贝。
parameters   :
return value :
************************************/
function pasteNum(){
  clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))
}

/************************************
Method       : text_trim( str, methods )
purpose      : 有条件的去除空格。
parameters   : str－待处理字符串
               methods－处理字符串的方式
                 "LEFT"-除去字符串头部空格
                 "RIGHT"-除去字符串尾部空格
                 "BOTH"-除去字符串头尾空格
return value : 安条件除去了空格的字符串
************************************/
function text_trim( str, methods ){

      var s;

      var len = str.length;

      if ( str == "" ) return str;



      if ( methods.toLowerCase() == "left" || methods.toLowerCase() == "both" ){

              for ( var j = 0; j < str.length; j++ ) {

                      s = str.substring(j, j+1);

                      if ( s == " " || s == "　"){

                              str = str.substr( j+1, str.length-1 );

                              j--;

                      }else

                              break;

              }

      }



      if ( methods.toLowerCase() == "right" || methods.toLowerCase() == "both" ){

              for ( var j = str.length; j > 0; j-- ) {

                      s = str.substring(j-1, j);

                      if ( s == " " || s == "　"){

                              str = str.substr( 0, j-1 );

                      }else break;

              }

      }

      return str;
}

/************************************
Method       : len()
purpose      : 计算中英文混合字符串的长度。
parameters   :
return value : 字符串长度，一个汉字是两个字符
用法：
  var tmpStr = "abc字符串";
  alert(tmpStr.len());
************************************/
String.prototype.len=function()
{
  return this.replace(/[^\x00-\xff]/g,"**").length;
}

/************************************
Method       : checkInput(formObject)
purpose      : 对字符，数字，日期输入进行检查。
parameters   : form表单对象
return value : true or false 验证成功返回true
用法：
  if (checkInput(form)){
    form.submit();
  }
************************************/
function checkInput(formObject)
{
  try
  {
    var l_childs = formObject.elements;
    var l_child;//input 对象
    var l_isNull;//是否可以为空
    var l_label;//出错后显示的名字
    var l_kind;//类型date,number,email
    var l_name;
    var l_value;
    var l_Decima;
    var l_FieldType;
    var l_init;
    var l_length;
    var l_type;
    var permitedENchars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890-_";
    for(var i=0;i<l_childs.length;i++)
    {
      l_child = l_childs[i];
      if(l_child.nodeName.toLowerCase() == "input" && l_child.type=="file"&&l_child.kind!=null&&!(l_child.kind.indexOf(".")==-1))
      {
        isNull = l_child.isnull;
        l_label = l_child.label;
        l_kind = l_child.kind;
        l_value = l_child.value.toLowerCase();
        if(isNull != null){ //isnull属性为null时表示不需要验证
          if(isNull == "false" && l_value == "")
          {
	    alert(l_label+",必须选择文件");
            return false;
  	  }
	  expand_name = l_value.substring(l_value.lastIndexOf("."));
	  if(l_kind.indexOf(expand_name)==-1){
	    alert("文件类型错误");
            return false;
	  }
        }
      }
      if(l_child.nodeName.toLowerCase() == "textarea")
      {
	var length = l_child.maxlength;
	isNull = l_child.isnull;
	if(isNull == null)
          isNull = "";
	var innerText = l_child.innerText;
	l_label = l_child.label;
	if(l_label == null)
          l_label = "";
	if(innerText == null)
          innerText = "";
	if(isNull == "false" && innerText == "")
	{
	  alert("\"" + l_label + "\""+"内容不能为空" + "!");
          l_child.focus();
	  return false;
	}
	if(length != null)
	{
	  if(innerText.len() > length)
          {
            alert("\"" + l_label + "\"" +"最多只能输入"+length + "个字符(" + length/2 + "个汉字)!");
            l_child.focus();
            return false;
          }
	}
      }
      if(l_child.nodeName.toLowerCase() == "select")
      {
        l_kind = l_child.kind;
	if(l_kind == null)
          l_kind = "";
	isNull = l_child.isnull;
	if(isNull == null)
          isNull = "";
	l_label = l_child.label;
	if(l_label == null)
          l_label = "";
        l_value = l_child.value;
        if (l_value == null)
          l_value = "";
	if (l_kind == "list")
	{
	  if(isNull == "false" && l_value == "")
	  {
	    alert("\"" + l_label + "\""+"为必选项！");
	    return false;
	  }
	}
	if (l_kind == "emptybox")
	{
	  if(isNull == "false" && l_child.options.length == 0)
	  {
	    alert("必须选择\"" + l_label + "\"！");
	    return false;
	  }
	}
      }
      if(l_child.nodeName.toLowerCase() == "input" && l_child.type!="file")
      {
	l_name = l_child.name;
	l_isNull = l_child.isnull;
	l_label = l_child.label;
	l_kind = l_child.kind;
	l_value = l_child.value;
	l_Decima = l_child.Decima
	l_FieldType = l_child.FieldType
	l_init = l_child.init;
        l_length = l_child.maxLength;
        l_type = l_child.type;
	if(l_label == null && l_kind == null)
          continue;//不检查
	if(l_label == null)
          label = "";
	if (l_kind != "desc")
	  if (hasDenieSyntax(l_value, l_label)){
            l_child.focus();
            return false;
	  }
	if(l_kind != "string_en3")
	{
	  if(!prohibitBacklash(l_value))return false;
	}
	if(l_isNull == "false" && l_value == "")
	{
	  alert("\"" + l_label + "\"" + "不能为空！");
	  l_child.focus();
	  return false;
	}
	if(l_value.length > 0)//检查输入是否都是空格
	{
	  l_value = l_value.trim();
	  l_child.value = l_value;
          if(l_value.length == 0)
          {
            alert("\"" + l_label + "\"" +"不能全是空格！");
            l_child.focus();
            return false;
          }
        }
	if(l_length != null && l_value.length > 0)
	{
	  if(l_value.len() > l_length)
          {
            alert("\"" + l_label + "\"" +"最多只能输入"+l_length + "个字符(" + l_length/2 + "个汉字)!");
            l_child.focus();
            return false;
          }
	}
        if (l_kind == "number")
	{
	  l_value = l_value.trim();
	  l_child.value = l_value;
          if(fucCheckNUM(l_value) == 0)
          {
            alert("\"" + l_label + "\"" +"必须是数字！");
            l_child.focus();
            return false;
          }
	}
        if (l_type != null)
	{
	  if (l_type.toLowerCase() == "password" && l_value.length > 0)
          {
            l_value = l_value.trim();
	    l_child.value = l_value;
            if(!isAlphanumeric(l_value))
            {
              alert("\"" + l_label + "\"" +"必须是英文字符或数字！");
              l_child.focus();
              return false;
            }
	  }
	}
        if (l_kind == "english" && l_value.length > 0)
	{
	  l_value = l_value.trim();
	  l_child.value = l_value;
          if(!isEnglish(l_value))
          {
            alert("\"" + l_label + "\"" +"必须是英文字母！");
            l_child.focus();
            return false;
          }
	}

	if(l_kind == "uppercase")
	{
	  for (var loop=0; loop<l_value.length; loop++)
          {
            var Char = l_value.charAt(loop);
            if ((Char < "A" || Char > "Z")){
              alert("\"" + l_label + "\"" +"必须为大写英文字母！");
              l_child.focus();
              return false;
            }
          }
        }

	//使用模式匹配，检查日期输入
        if(l_value != null && l_value.length > 0)
        {
          if(l_kind == "string_en")
          {
            for(loop=0;loop<l_value.length;loop++)
            {
              var char = l_value.charAt(loop);
              if(permitedENchars.indexOf(""+char) < 0)
              {
                alert(l_label+",内容只能是字母或数字");
                l_child.focus();
                return false;
              }
            }
          }
          else if(l_kind == "string_en1")//可以有空格
          {
            for(var loop=0;loop<l_value.length;loop++)
            {
              var char = l_value.charAt(loop);
              if((permitedENchars+" ").indexOf(""+char) < 0)
              {
                alert(l_label+",内容必须在["+permitedENchars+"]内");
                l_child.focus();
                return false;
              }
            }
          }
          else if(l_kind == "string_en2")//不允许有\和空格
          {
            if(l_value.indexOf("\\") >= 0)
            {
              alert(l_label+",内容不能有\\字符");
              l_child.focus();
              return false;
            }
            for(var i=0;i<l_value.length;i++)
            {
              var char = l_value.charAt(i);
              if((permitedENchars).indexOf(""+char) < 0)
              {
                alert(l_label+",内容必须在["+permitedENchars+"]内");
                l_child.focus();
                return false;
              }
            }
          }
          else if(l_kind == "string_en3")//限制反斜杠
          {
          }
          else if(l_kind == "string_xml")//限制特殊字符
          {
            var ret = xmlInputCheck(l_value);
            if(ret == false)
            {
              l_child.focus();
              return false;
            }
          }
          else if(l_kind == "date")
          {
            var reg = /^([1-9](\d{3}))-([0-1]\d)-([0-3]\d)$/ig;
            var r = l_value.match(reg);
            if(r == null)
            {
              alert("\"" + l_label + "\"" +"必须是yyyy-mm-dd格式，yyyy,mm,dd必须由数字组成！\n例如：2004-01-01");
              l_child.focus();
              return false;
            }
            else
            {
              var l_month = RegExp.$3;
              if(l_month == "00")
              {
                alert("\"" + l_label + "\"" +"月份不能是00！");
                l_child.focus();
                return false;
              }
              else if(l_month > 12)
              {
                alert("\"" + l_label + "\"" +"月份不能大于12！");
                return false;
              }
              else
              {
                l_month = eval(l_month)-1;
              }
              var l_date = new Date(RegExp.$1,l_month,RegExp.$4);
              if(l_date.getDate() != RegExp.$4)
              {
                alert("\"" + l_label + "\"" +"异常，日期\"" + l_value + "\"不存在，请检查。");
                l_child.focus();
                return false;
              }
              if(l_date.getMonth() != l_month)
              {
                alert("\"" + l_label + "\"" +"月份异常，格式必须是：yyyy-mm-dd！");
                l_child.focus();
                return false;
              }
            }
          }
          else if(l_kind == "int")
          {
            var reg = /^(\d+)$/;
            var r = l_value.match(reg);
            var reg1 = /^-(\d+)$/;
            var r1 = l_value.match(reg1);
            if(r == null && r1 == null)
            {
              alert("\"" + l_label + "\"" +"必须是整数！");
              l_child.focus();
              return false;
            }
          }
          else if(l_kind == "float")
          {
            var reg = /^(\d+)\.(\d+)$/;
            var reg1 = /^(\d+)$/;
            var r = l_value.match(reg);
            var r1 = l_value.match(reg1);
            if(r == null && r1 == null)
            {
              alert("\"" + l_label + "\"" +"必须是数字！");
              l_child.focus();
              return false;
            }
            else
            {
              var l_maxLength = l_child.maxLength;//浮点数长度
              var l_inputDecimalLength = (""+RegExp.$2).length;//用户输入的小数长度
              var l_decimalLength = l_child.decimalLength;//规定输入的小数最长长度
              var l_inputIntLength = (""+RegExp.$1).length;//用户输入的整数长度
              if(l_inputDecimalLength != null && l_decimalLength != null && l_maxLength != null)
              {
                if(l_inputDecimalLength > l_decimalLength)
                {
                  alert("\"" + l_label + "\"" +"小数位数不能大于"+l_decimalLength+"!");
                  l_child.focus();
                  return false;
                }
                var l_intLength = l_maxLength-l_decimalLength-1;//规定输入的整数最长长度
                if(l_inputIntLength > l_intLength)
                {
                  alert("\"" + l_label + "\"" +"整数位数不能大于"+l_intLength+"!");
                  l_child.focus();
                  return false;
                }
              }
            }
          }
          else if(l_kind == "currency")
          {
            var reg = /^(\d+)\.(\d+)$/;
            var reg1 = /^(\d+)$/;
            var r = l_value.match(reg);
            var r1 = l_value.match(reg1);
            if(r == null && r1 == null)
            {
              alert("\"" + l_label + "\"" +"必须是数字！");
              l_child.focus();
              return false;
            }
            var t = l_value.trim().replace(/([-+]?[0-9]+\.?[0-9]{0,4})/,"");
            if(t.length != 0){
              alert("\"" + l_label + "\"" +" 的值必须是一个货币型的数值，\n 整数位最长9位，小数位最长2位！");
              return false;
            }
          }
          else if(l_kind == "email")
          {
            //var reg = /^(\w+)@(\w+)\.(\w+)$/;
            var reg = /^(\w+)@(\w+)\.((\w+)(\.{0,1}))*$/;
            var r = l_value.match(reg);
            if(r == null)
            {
              alert("\"" + l_label + "\"" +"必须符合电子邮件的规范输入！，如xxx@yyyy.zzz");
              l_child.focus();
              return false;
            }
          }
          else if(l_kind == "tel")//电话
          {
            var reg = /^(((\d+)-)*)((\d+)+)$/;
            var r = l_value.match(reg);
            if(r == null)
            {
              alert("\"" + l_label + "\"" +"必须符合电话号码的规范输入，如010-11111111-111");
              l_child.focus();
              return false;
            }
          }
        }
        if(l_Decima == "DecimaLength")
        {
          if(l_child.value!=0 && l_child.value>6)
          {
            alert("小数位 最大尺寸不能超过6 \n 请重新输入【小数位】");
            return false;
          }
        }
        if(l_FieldType == "NUMBER"){
          if(l_child.value==0){
            alert("请输入【字段长度】！\n  \n注意：不能超过13位");
            return false;
          }else{
            if(l_child.value>13){
              alert("数值型 字段位数不能超过13位！！\n  \n请重新输入【长度】");
              return false;
            }
          }
        }else if(l_FieldType == "VARCHAR2"){
          if(l_child.value==0){
            alert("请输入【字段长度】！\n \n 注意：不能超过255字节");
            return false;
          }else{
            if(l_child.value>254){
              alert("文本型 字段不能超过254个字符！！");
              return false;
            }
          }
        }
        if(l_init == "init"){
          if(l_childs.FieldType.value == "NUMBER"){
            if(l_childs.FieldLength.value==0){
              alert("请输入【字段长度】！\n  \n注意：不能超过13位");
              return false;
            }else{
              if(l_childs.FieldLength.value>13){
                alert("数值型 字段长度不能超过13位！！\n  \n请重新输入【长度】");
                return false;
              }
            }
          }else if(l_childs.FieldType.value == "VARCHAR2"){
            if(l_childs.FieldLength.value==0){
              alert("请输入【字段长度】！\n \n 注意：不能超过255字节");
              return false;
            }else{
              if(l_childs.FieldLength.value>254){
                alert("文本型 字段不能超过254个字符！！\n \n     请重新输入【长度】");
                return false;
              }
            }
          }
        }
      }
    }
  }
  catch(ex){alert(ex.description);return false;}
  return true;
}

/************************************
Method       : validateInputIfHasProhibitedChar(valueString)
purpose      : 检查输入是否有敏感字符，如',等。
parameters   : 待检查字符串
return value : true or false 不包含敏感字符返回true
************************************/
function validateInputIfHasProhibitedChar(valueString)
{
  if(valueString == null)return true;
  if(valueString.indexOf("'") >= 0)
  {
    alert("输入不能包括英文的字符'");
    return false;
  }
  return true;
}

/************************************
Method       : prohibitBacklash(valueString)
purpose      : 限制反斜杠。
parameters   : 待检查字符串
return value : true or false 不包含反斜杠返回true
************************************/
function prohibitBacklash(valueString)
{
  if(valueString.indexOf("\\") >= 0)
  {
    alert("输入不能包括英文的字符\\");
    return false;
  }
  return true;
}

/************************************
Method       : hasDenieSyntax(s,label)
purpose      : 检查非法字符。
parameters   : s－待检查字符串
               label－检查项名称，出现在提示信息中
return value : true or false 不包含反斜杠返回true
************************************/
function hasDenieSyntax(s,label){
  for(i=0;i<s.length;i++){
    var n;
    n = s.charAt(i);
    if(n=="'" || n=="\"" || n=="<" || n==">" || n=='%'){
      alert("\"" + label + "\"" + "中不能含有"+"< > ' \" %"+"等非法字符。");
      return true;
    }
  }
  return false;
}

/************************************
Method       : isAlphanumeric( checkobj)
purpose      : 检查是否全是字母和数字。
parameters   : s－待检查字符串
return value : true or false 全是字母和数字返回true
************************************/
function isAlphanumeric( checkobj)
{
  var checkOK = "0123456789-_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var checkStr = checkobj;
  var allValid = true;
  var decPoints = 0;

  for (i = 0;  i < checkStr.length;  i++)
  {
    ch = checkStr.charAt(i);
    for (j = 0;  j < checkOK.length;  j++)
      if (ch == checkOK.charAt(j))
        break;
    if (j == checkOK.length)
    {
      allValid = false;
      break;
    }
  }
  return (allValid)
}

/************************************
Method       : isEnglish( checkobj)
purpose      : 检查是否全是英文字母。
parameters   : s－待检查字符串
return value : true or false 全是英文字母返回true
************************************/
function isEnglish( checkobj)
{
  var checkOK = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var checkStr = checkobj;
  var allValid = true;
  var decPoints = 0;

  for (i = 0;  i < checkStr.length;  i++)
  {
    ch = checkStr.charAt(i);
    for (j = 0;  j < checkOK.length;  j++)
      if (ch == checkOK.charAt(j))
        break;
    if (j == checkOK.length)
    {
      allValid = false;
      break;
    }
  }
  return (allValid)
}
/************************************
Method       : openwin(url,windowName,width,height,overFlow)
purpose      : 打开一个新的窗口
parameters   : pagename – 页面名称
               target – 打开窗口位置，为空时打开一个新窗口
               width–窗口宽度
               heigth– 窗口高度。
               sizeable–窗口大小是否可以调整( 0 – 不可调整 ; 1 – 可以调整 )。
return value :
************************************/
function openwin(url,windowName,width,height,sizeable)
{
    var screenWidth  = document.body.offsetWidth-50;//window.screen.width;
    var screenHeight  = document.body.offsetHeight;//window.screen.height;
    var newWindowTop = (screenHeight-height)/2;
    var newWindowLeft = (screenWidth-width)/2;
    window.open(url,windowName,"top="+newWindowTop+",left="+newWindowLeft+",width="+width+",height="+height+",status=no,toolbar=no,menubar=no,scrollbars=no,location=no,resizable="+sizeable,"false");
}

/************************************
Method       : selectedadd(sourceobj,aimobj)
purpose      : 多选框选择列表项
parameters   : sourceobj – 源列表
               aimobj – 选择结果列表
return value :
************************************/
function selectedadd(sourceobj,aimobj)
{
j=aimobj.length;
for (i=0;i<sourceobj.length;i++)
{
	if(sourceobj.options[i].selected)
	{
		existed = false;
		for (k=0; k < j; k ++)
		{
			if (aimobj.options[k].value == sourceobj.options[i].value)
			{
				existed = true;
				break;
			}
		}
		if (!existed)
		{
			aimobj.options[j] = new Option(sourceobj.options[i].text,sourceobj.options[i].value);
			j++;
		}
	 }
 }
}

/************************************
Method       : alladd(sourceobj,aimobj)
purpose      : 多选框选择全部列表项
parameters   : sourceobj – 源列表
               aimobj – 选择结果列表
return value :
************************************/
function alladd(sourceobj,aimobj)
{
	allremove(aimobj);
	j=aimobj.length;
	for (i=0;i<sourceobj.length;i++)
	{
		aimobj.options[j]=new Option(sourceobj.options[i].text,sourceobj.options[i].value);
		j++;
	}
}

/************************************
Method       : allremove(removeobj)
purpose      : 移除所有选择列表项
parameters   : removeobj – 选择结果列表
return value :
************************************/
function allremove(removeobj)
{
  removeobj.length = 0;
}

/************************************
Method       : selectedremove(removeobj)
purpose      : 移除选定的选择列表项
parameters   : removeobj – 选择结果列表
return value :
************************************/
function selectedremove(removeobj)
{
	for (i=0;i<removeobj.length;i++)
	{
		if(removeobj.options[i].selected)
		{
			removeobj.options[i] = null;
			i--;
		}
	}
}

/************************************
Method       : openDateDialog(objectID)
purpose      : 打开一个日期选择窗口
parameters   : objectID – 日期输入框ID
return value :
************************************/
function openDateDialog(objectID) {
    var dateObject = eval("document.all." + objectID);
    var sURL = "/hzcms/scheme/js/calendar.htm" ;
    var nDialogWidth = 300;
    var nDialogHeight = 240;
    var nLeft = (window.screen.availWidth-nDialogWidth)/2;
    var nTop = (window.screen.availHeight-nDialogHeight)/2;
    var sFeatures = "dialogLeft:"+nLeft+"px;dialogTop:"+nTop+"px;dialogHeight:"+nDialogHeight+"px;dialogWidth:"+nDialogWidth+"px;help:no;status:no";
    var sReturnVal = window.showModalDialog(sURL,window,sFeatures);
    if (('undefined' != typeof(sReturnVal)) && (sReturnVal.length >1) )
    {
       dateObject.value = sReturnVal;
    }
}

/************************************
purpose      : 设置cookie，以下为cookie相关的操作
************************************/
function setCookie(name,value,expiry,path,domain,secure){
	var nameString = name + "=" + value;
	var expiryString = (expiry == null) ? "" : " ;expires = "+ expiry.toGMTString();
	var pathString = (path == null) ? "" : " ;path = "+ path;
	var domainString = (path == null) ? "" : " ;domain = "+ domain;
	var secureString = (secure) ?";secure" :"";
	document.cookie = nameString + expiryString + pathString + domainString + secureString;
}

function getCookie (name) {
	var CookieFound = false;
	var start = 0;
	var end = 0;
	var CookieString = document.cookie;
	var i = 0;

	while (i <= CookieString.length) {
		start = i ;
		end = start + name.length;
		if (CookieString.substring(start, end) == name){
			CookieFound = true;
			break;
		}
		i++;
	}

	if (CookieFound){
		start = end + 1;
		end = CookieString.indexOf(";",start);
		if (end < start)
			end = CookieString.length;
		return unescape(CookieString.substring(start, end));
	}
	return "";
}

function deleteCookie(name){
	var expires = new Date();
	expires.setTime (expires.getTime() - 1);

	setCookie( name , "Delete Cookie", expires,null,null,false);
}
/**
* 数据库查询的cookie校验，如果允许查询这写入新的cookie并执行查询，否则提示用户不要频繁查询
*/
    function checkcookie(interval)
    {
         var cookiename = "querytime";

     	 var cookievalue = getCookie(cookiename);

         var date = new Date();
         var curtime = date.getTime();
         var testtime = (curtime-interval*1000);

		 if(testtime > cookievalue)
		 {
//			alert("继续查询");

			//设置过期时间
			date.setTime(date.getTime() + 100000);
            setCookie(cookiename,curtime,date,null,null,false);
            return true;
		 }
		 else
		 {
		 	alert("请不要频繁查询！");
		 	return false;
		 }
    }

/**
* 计数器的cookie校验，
*/
    function checkCounterCookie(interval)
    {
         var cookiename = "indexcounter";

     	 var cookievalue = getCookie(cookiename);

         var date = new Date();
         var curtime = date.getTime();
         var testtime = (curtime-interval*1000);

		 if(testtime > cookievalue)
		 {
			//设置过期时间
			date.setTime(date.getTime() + 100000);
            setCookie(cookiename,curtime,date,null,null,false);
            return true;
		 }
		 else
		 {
		 	return false;
		 }
    }