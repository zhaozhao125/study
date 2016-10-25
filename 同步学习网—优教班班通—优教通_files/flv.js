// Show Hide Poll
function showpoll() {
	p=document.getElementById('poll');
	pf=document.getElementById('pollform');
	pr=document.getElementById('pollresult');
	tks=document.getElementById('thanks');
	bp=document.getElementById('btnpoll');
	if(pf.style.display=='block' || pr.style.display=='block' || tks.style.display=='block') {
		pr.style.display='none';
		pf.style.display='none';
		tks.style.display='none';
		p.className='down';
	}
	else {
		pf.style.display='block';
		pr.style.display='none';
		tks.style.display='none';
		p.className='up';
	}
}
function showform() {
	pf.style.display='block';
	tks.style.display='none';
	pr.style.display='none';
}
function showresult() {
	pf.style.display='none';
	tks.style.display='none';
	pr.style.display='block';
}
function hidepoll() {
	pf.style.display='none';
	pr.style.display='none';
	tks.style.display='none';
}

function WriteFlash(flash,_width,_height) {
	document.writeln("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" width=\"" + _width + "\" height=\"" + _height + "\">");
	document.writeln("  <param name=\"movie\" value=\"" + flash + "\" />");
	document.writeln("  <param name=\"quality\" value=\"high\" />");
	document.writeln("  <param name=\"wmode\" value=\"transparent\" />");
	document.writeln("  <embed src=\"" + flash + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"" + _width + "\" height=\"" + _height + "\" wmode=\"transparent\"></embed>");
	document.writeln("</object>");
}
function PlayFlash(flash,_width,_height) {
	document.writeln("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=\"" + _width + "\" height=\"" + _height + "\" id=\"fullscreen\" align=\"middle\">");
	document.writeln("  <param name=\"allowScriptAccess\" value=\"sameDomain\" />");
	document.writeln("  <param name=\"movie\" value=\"/movieplayer.swf\" />");
	document.writeln("  <param name=\"quality\" value=\"high\" />");
	document.writeln("  <param name=\"salign\" value=\"mc\" />");
	document.writeln("  <param name=\"bgColor\" value=\"#ffffff\" />");
	document.writeln("  <param NAME=FlashVars VALUE=\"vidpath=" + flash + "\" />");
	document.writeln("  <embed src=\"/movieplayer.swf\" FlashVars=\"vidpath=" + flash + "\" quality=\"high\" salign=\"mc\" bgcolor=\"#ffffff\" width=\"" + _width + "\" height=\"" + _height + "\" name=\"fullscreen\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
	document.writeln("</object>");
}
	//图片显示的缩放比例(低IE版本不支持style="zoom:30%")
	function showImage(image,validWidth,validHeight)
	{
		var img = new Image();
		img.src = image.src;
		var zoom = validWidth * 100 / img.width;
		if(zoom > validHeight * 100 / img.height)
			zoom = validHeight * 100 / img.height;
		zoom = zoom > 100 ? 100 : zoom;
		image.width = parseInt(img.width * zoom / 100, 10);
		image.height = parseInt(img.height * zoom / 100, 10);
	}

//window.onload = fixed;
function fixed(){
	var righth=document.getElementById("side");
	var righthp=righth.scrollHeight;
	var midh=document.getElementById("content");
	var midhp=midh.scrollHeight;
	if (righthp>midhp)
	{
		midh.style.height=righthp+"px";
	}
	else righth.style.height=midhp+"px";
}