this.preloadIm=function(){
	var b=new Array;
	$("a.preview").each(function(){
		$(this).attr("tempPath");
	});
	return b
};
this.imagePreview=function(d,c){
	offX=25;
	offY=30;
	c=c==undefined?"a.preview":c;
	$(c).hover(function(e){
		$("body").append("<div id='preview' class='previewShowWindow'><img id='pi' src='images/loadingAnimation.gif' alt='Now Loading' /></div>");
		var m=$(this).attr("tempPath");
		$("#pi").attr("src",m);
		var o=$("#preview").width();
		var p=$("#preview").height();
		var a=$(window).width()+$(window).scrollLeft();
		var l=$(window).height()+$(window).scrollTop();
		var n;
		var b;
		if((e.pageX+offX+o)>a){
			n=e.pageX-(o+offX)+"px"
		}else{
			n=e.pageX+offX+"px"
		}if((e.pageY+offY+p)>l){
			b=l-(p+offY)+"px"
		}else{
			b=e.pageY+offY+"px"
		}
			$("#preview").css("top",b).css("left",n).fadeIn("fast")
		},function(){
			$("#preview").remove()
	});

	$(c).mousemove(function(e){
		var m=$("#preview").width();
		var n=$("#preview").height();
		var a=$(window).width()+$(window).scrollLeft();
		var k=$(window).height()+$(window).scrollTop();
		var l;
		var b;
		if((e.pageX+offX+m)>a){
			l=e.pageX-(m+offX)+"px"
		}else{
			l=e.pageX+offX+"px"
		}if((e.pageY+offY+n)>k){
			b=k-(n+offY)+"px"
		}else{
			b=e.pageY+offY+"px"
		}
		$("#preview").css("top",b).css("left",l)
	})
};

//添加文件
function attachFile(fileInput,fileName,divId){
	  var parent=$('#'+divId);//获取父元素
	  var div=document.createElement("div");//创建一个div容器用于包含input file
	  var x=parseInt(Math.random()*(80-1))+1;
	  var divName=fileName+x.toString();//随机div容器的名称
	  div.name=divName;
	  div.id=divName;
	  var aElement=document.createElement("input"); //创建input
	  aElement.name=fileName;
	  aElement.id=fileName;
	  aElement.type="file";//设置类型为file
	  aElement.setAttribute("style","height:25px;width:80%;");
	  aElement.onchange = function() {
		  isConfirm(aElement);
	  }
	  var delBtn=document.createElement("img");//再创建一个用于删除input file的Button
	  delBtn.src="../images/icons/delete.png";
	  delBtn.setAttribute("style","width:16px;height:16px;vertical-align: top;cursor:pointer;");
	  delBtn.onclick=function(){ 
		  deleteFile(divName);
	  }//为button设置onclick方法
	  div.appendChild(aElement);//将input file加入div容器
	  div.appendChild(delBtn);//将删除按钮加入div容器
	  $('#'+divId).append(div);//将div容器加入父元素
	  
}

//删除文件
function deleteFile(id){
	$('#'+id).remove();
}

function isConfirm(obj)
{
	var filePathName = obj.value;
	if(filePathName == ""){
		return;	
	}
	if(!filePathName.IsExist())
	{
        alert("该文件已存在！");
        obj.value="";
        obj.outerHTML=obj.outerHTML;
        return;
	}
}

String.prototype.IsExist = function()
{
	//判断是否存在
	var inputs = document.getElementsByTagName("input");
    var count = 0;
	
    for(var i=0;i<inputs.length;i++)
    {
        if(this==inputs[i].value)
        {
			count++;
        }
    }  
	if(count>1)
	{
		return false;
	}
	return true;
}