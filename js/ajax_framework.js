function ajaxLoadP2W(method,URL,data,displayId){
					var ajax = null;
					if (window.ActiveXObject){
							ajax = new ActiveXObject ("Microsoft.XMLHTTP");
					}
					else if (window.XMLHttpRequest){
							ajax = new XMLHttpRequest();
					}
					else {
							alert("Your browser doesn't  support Ajax");
							return;
					}
					method = method.toLowerCase();
					//-------------------
					var reg = /\?/;
					if (reg.test(URL)) {
						URL += "&";
					} else {
						URL += "?";
					}
					//-------------------
					URL += "&dummy=" + (new Date()).getTime();
					if (method.toLowerCase() == "get") {
							URL += "&" + data;
							data = null;
					}
					
					ajax.open(method, URL);
					
					if (method.toLowerCase() == "post") {
								ajax.setRequestHeader(
									"Content-Type","application/x-www-form-urlencoded");
					}
					
					ajax.onreadystatechange = function() {
							if (ajax.readyState==4 && ajax.status==200){
									var  ctype = ajax.getResponseHeader("Content-Type");
									ctype = ctype.toLowerCase();
									
									ajaxCallback(ctype, displayId, ajax.responseText);
									
									delete ajax;
									ajax = null;
							}
					}
					
					ajax.send(data);
}

function ajaxCallback(contentType, displayId, responseText) {
			if (contentType.match("text/javascript")) {
						eval (responseText);
			}
			else {
						var el = document.getElementById(displayId);
						el.innerHTML = responseText;
			}
}

function getFormData(form_name_or_id){
			var frm = document.forms[form_name_or_id];
			if (frm==null) {
						alert("form not found");
						return;
			}
			
			var data = "";
			var num_el = frm.elements.length;
			for (i=0;i<num_el;i++){
						var el = frm.elements[i];
						if (el.name =="" && el.id ==""){
									continue;
						}

						var param_name = "";
						if (el.name != ""){
								param_name = el.name;
						}
						else if (el.id != ""){
								param_name = el.id;
						}
						
						var t = frm.elements[i].type;
						var value = "";
						if (t=="text" || t=="password" || t=="hidden" || t=="textarea"){
								value = encodeURI(el.value);
						}
						else if (t=="radio" || t=="checkbox"){
								if (el.checked){
										value = encodeURI(el.value);
								}
								else {
										continue;
								}
						}
						else if (t=="select-one"){
								value = encodeURI(el.options[el.selectedIndex].value);
						}
						else if (t=="select-once"){
								value = encodeURI(el.options[el.selectedIndex].value);
						}
						else if (t=="select-multiple"){
								for (j=0; j<el.length;j++){
										if (el.options[j].selected){
												if (data != ""){
																data += "&";
												}
												data += param_name + "=";
												data += encodeURI(select.options[j].value);
										}
								}
								
								continue;
						}
						
						if (data != ""){
								data += "&";
						}
						
						data +=  param_name + "=" + value;
				}//end for
				
				return  data;
}
function OverList(el){
		el.style.backgroundColor = '#6666FF';
		el.style.cursor = 'pointer';
		el.style.color = '#FFFFFF';
}
function OutList(el){
		el.style.backgroundColor = '#DDFF95';
		el.style.color = '#0066CC';
}
function OutList_yellow(el){
		el.style.backgroundColor = '#FFFF66';
		el.style.color = '#0066CC';
}
function getPosition(obj)
{
	var x=obj.offsetLeft;
	var y=obj.offsetTop;
	var curobj=obj;
	while(curobj=curobj.offsetParent)
		{
		x+=curobj.offsetLeft;
		y+=curobj.offsetTop;
		}
	return [x,y];
}
function ShowPopupP2W(id_show,id_position,xx,yy){
						var el_box = document.getElementById(id_show);
						var btn = document.getElementById(id_position);
						var xy=getPosition(btn);
						var x=xy[0]-xx;
						var y=xy[1]-yy;
						//el_box.style.left = x+"px";
						//el_box.style.top = y+"px";
						el_box.innerHTML = '<div id="loading_p2w"></div>';
                                                ShowLoading_p2w("loading_p2w");
						document.getElementById(id_show).style.display = 'block';
}
function ClosePopupP2W(id_close){
						document.getElementById(id_close).style.display = 'none';
}
function ShowLoading_p2w(showID){
						var loading_p2w = document.getElementById('loading_p2w');
						loading_p2w.innerHTML = "<img src='images/global/loading.gif'>"; 
						loading_p2w.style.display='block';
}
function CloseLoading_p2w(){
						var loading_p2w = document.getElementById('loading_p2w');
						loading_p2w.innerHTML = ""; 
						loading_p2w.style.display='none';
}
function PopupMenu(id_name){
	var el_box = document.getElementById("popup_box_menu");
	var btn=document.getElementById(id_name);
	var xy=getPosition(btn);
	var x=xy[0]+1;
	var y=xy[1]+18;
	el_box.style.left = x+"px";
	el_box.style.top = y+"px";
	var el_msg = document.getElementById("popup_menu");
	//el_msg.innerHTML = "Loading...";
	loadPopup();	
	el_box.style.display = 'block';
}
function hidePopupMenu(){
	var el_box = document.getElementById("popup_box_menu");
	el_box.style.display = 'none';
}
function MM_findObj_P2W(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj_P2W(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_preloadImages_P2W() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages_P2W.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore_P2W() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_swapImage_P2W() { //v3.0
  var i,j=0,x,a=MM_swapImage_P2W.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj_P2W(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function  Track_P2W(id_name){
			var  rs = document.getElementById(id_name);
				 rs.style.background = "#d8e3ef";
}
			
function  Untrack_P2W(id_name){
			var  rs_id = document.getElementById(id_name);
					rs_id.style.background = "#ffffff";
}