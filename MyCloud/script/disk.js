/*
 *  disk.js
 *
 *	written by Menghao, 2015/9/15
 *
 *	包括下列函数
 *  Init()	--  初始化页面
 *	AddFolder()	--  新建文件夹功能
 *	DeleteFolder()	--删除文件夹功能
 *	UploadFile()	--上传文件功能
 *	DownloadFile()	--下载文件功能
 *	DeleteFile()	--删除文件功能
 *	RenameFolder()	--重命名文件夹
 *	ShowFile()	--显示主页面
 *	reset()	--重置弹窗参数
 *	judgeLiEmpty()	--判断文件夹列表是否为空
 */

$(document).ready(function(){
	Init();
	AddFolder();
});

//初始化页面
function Init(){
	//侧边栏初始化
	$.ajax({
		url: "./php/sider.php?callback=jsonpCallback",  
		dataType:"jsonp",
		success: function(result) {  
			if(result.length>0){
				var index = 0; 
				while(index < result.length){
					$_li = $("<li><a href=\"#\">" + result[index]["name"] + "</a></li>");
					$_li.attr("sqlid",result[index]["id"]);
					var $_ul = $("li.nav-sidebar-add");
					$_li.insertBefore($_ul);
					index ++;
				}
			}
	    }})
	.then(
		//显示主页面
	   	function(){
	   		var $_li = $("ul.nav-sidebar>li:nth-child(2)");
	   		ShowFile($_li);
		},
	   	function(){})
	.then(
		//侧边栏按键事件委托
	    function(){
	    	var $_ul =$("ul.nav-sidebar");
	    	$_ul.on("click","li",function(e){
	    		if($(this).attr("sqlid")){
	    			ShowFile($(this));
	    		}
	    	});
	    },
	    function(){})
	.then(
		//页面主要按键初始化
		RenameFolder(),
		function(){})
	.then(
		DeleteFolder(),
		function(){})
	.then(
		UploadFile(),
		function(){}
		);
}

//新建文件夹按键
function AddFolder(){
	$("#prompt").on('click', function () {
		reset();
		alertify.prompt("输入文件名", function (e, str) {
			if (e) {
				$_li = $("<li><a href=\"#\">" + str + "</a></li>");
				$.ajax({
					url: "./php/NewFolder.php?callback=jsonpCallback",  
					data: {folderName:str},
					dataType:"jsonp",
					success: function(result) {  
						if(result.length>0){
							$_li.attr("sqlid",result[0]["id"]);
						}
	   			 }});
				//将新建文件夹添加到页面，并跳转到该目录下
				$_li.insertBefore($("li.nav-sidebar-add"));
				alertify.success(str + "创建成功" );
				$newLi = $("ul.nav-sidebar>li");
				ShowFile($("ul.nav-sidebar>li:nth-child(" + ($newLi.length-1) + ")"));
			} else {
				alertify.error("取消");
			}
		}, "新建文件夹");
		return false;
	});
}

//删除文件夹
function DeleteFolder(){
	$("p button.sidebar-delete").on('click', function () {
		//判断是否还有文件夹
		if(judgeLiEmpty()){
			return;
		}
		reset();
		alertify.confirm("确认删除文件夹？", function (e) {
			if (e) {
				var $id = $("h1.page-header").attr("sqlid");
				$.ajax({
				url: "./php/DeleteFolder.php?callback=jsonpCallback",  
				data: {id:$id},
				dataType:"jsonp",
				success: function(result) {  
				$("ul.nav-sidebar li[sqlid=" + $id + "]").remove();
				//判断是否还有文件夹
				if($("ul.nav-sidebar>li").children().length !=2){
					ShowFile($("ul.nav-sidebar>li:nth-child(2)"));
				}	
				else{
					$("tbody").empty();
					$("h1.page-header").text("没有文件夹了QAQ");
				}				
  			 		}});
				alertify.success("删除 OK");
			} else {
				alertify.error("取消");
			}
		});
		return false;
	});
}

//上传功能
function UploadFile(){
	$("#id_upload").on("click",function(){
		$('#file_upload').uploadify('upload','*');
	});

	$("#cancel_upload").on("click",function(){
		$('#file_upload').uploadify('cancel','*')
	});

	//初始化数组，存储已经上传的图片名
	var img_id_upload=new Array();
	var i=0;//初始化数组下标
	$(function() {
	    $('#file_upload').uploadify({
	    	'auto'     : false,//关闭自动上传
	    	'removeTimeout' : 1,//文件队列上传完成1秒后删除
	        'swf'      : 'uploadify.swf',
	        'uploader' : 'uploadify.php',
	        'method'   : 'post',//方法，服务端可以用$_POST数组获取数据
			'buttonText' : '选择文件',//设置按钮文本
	        'multi'    : true,//允许同时上传多张图片
	        'uploadLimit' : 10,//一次最多只允许上传10张图片
	        'onUploadStart': function(file){
	        	var $id = $("h1.page-header").attr("sqlid");
	        	$('#file_upload').uploadify('settings', 'formData', {'id':$id});
	        },
	        'onUploadSuccess' : function(file, data, response) {//每次成功上传后执行的回调函数
				   ShowFile($("ul.nav-sidebar li[sqlid=" + $("h1.page-header").attr("sqlid") + "]"));
	        },
	        'onQueueComplete' : function(queueData) {//上传队列全部完成后执行的回调函数
	        }  
	    });
	});
	
}

//请求服务器下载文件
function DownloadFile(_folderid,_fileid){
	window.location.href = "./php/DownLoadFile.php?id=" + _folderid + "&fileid=" + _fileid; 

//	$.ajax({
//		url: "./php/DownLoadFile.php?callback=jsonpCallback",  
//		data: {id:_folderid,fileid:_fileid},
//		dataType:"jsonp",
//		success: function(result) {  
//			window.location.href = result[0]["url"];
 //		}});
}

//删除文件
function DeleteFile(_folderid,_fileid){
	reset();
	alertify.confirm("确认删除该文件？", function (e) {
		if (e) {
			var $id = _folderid;
			$.ajax({
			url: "./php/DeleteFile.php?callback=jsonpCallback",  
			data: {id:_folderid,fileid:_fileid},
			dataType:"jsonp",
			success: function(result) {  	
				$("tr:has(button.btn-danger[fileid='" + _fileid + "'])").remove();			
	 		}});
			alertify.success("删除 OK");
		} else {
			alertify.error("取消");
		}
	});
	return false;
}

//文件夹重命名
function RenameFolder(){
	$("p button.btn-default").on('click', function () {
		if(judgeLiEmpty()){
			return;
		}

		reset();
		
		var $_header = $("h1.page-header");
		alertify.prompt("输入文件名", function (e, str) {
			if (e) {
				var $id = $_header.attr("sqlid");
				$.ajax({
					url: "./php/RenameFolder.php?callback=jsonpCallback",  
					data: {id:$id,folderName:str},
					dataType:"jsonp",
					success: function(result) {  
						$_header.text(str);
						$("ul.nav-sidebar li[sqlid=" + $id + "]").children("a").text(str);
	   			 }});
				alertify.success(str + "修改成功" );
			} else {
				alertify.error("取消");
			}
		}, $_header.text());
		return false;
	});
}

//显示主页面文件列表
function ShowFile(folderLi){
	//设置H1标签，添加sqlid属性识别该页面所述文件夹
	var index = 0;
	var $id = folderLi.attr("sqlid");
	var $_header = $("h1.page-header");
	$_header.text(folderLi.children("a").text());
	$_header.attr("sqlid",$id);

	//文件列表
	$("tbody").empty();

	$.ajax({
		url: "./php/FileName.php?callback=jsonpCallback",  
		data: {folderid:$id},
		dataType:"jsonp",
		success: function(result) {  
			//显示表格
			$_tbody = $("tbody");
			if(result != null){
				while(index < result.length){
					$("<tr></tr>")
					.append("<td>" + index + "</td>")
					.append("<td>" + result[index]["name"] + "</td>")
					.append("<td><button type='button' class='btn btn-sm btn-success' fileid=" + result[index]["id"] + ">下载</button></td>")
					.append("<td><button type='button' class='btn btn-sm btn-danger' fileid=" + result[index]["id"] + ">删除</button></td>")
					.appendTo($_tbody);
					index++;
				}
			}
			else{
				$_tbody.empty();
			}
	    }})
	.then(
		//删除文件按钮绑定
		function(){
			var $btn = $("td button.btn-danger");
			if($btn.length > 0 ){
				$btn.on("click",function(){
					  DeleteFile($("h1.page-header").attr("sqlid"),$(this).attr("fileid"));
				});
			}
		},
		function(){}
	)
	.then(
		//下载文件按钮绑定
		function(){
			var $btn = $("td button.btn-success");
			if($btn.length > 0 ){
				$btn.on("click",function(){
					  DownloadFile($("h1.page-header").attr("sqlid"),$(this).attr("fileid"));
				});
			}
		},
		function(){}
		);
}

//关于弹窗的reset
function reset () {
	alertify.set({
		labels : {
			ok     : "确定",
			cancel : "取消"
		},
		delay : 5000,
		buttonReverse : false,
		buttonFocus   : "ok"
	});
}

//判断是否还有文件夹
function judgeLiEmpty(){
	if($("ul.nav-sidebar").children().length == 2 ){
		return true;
	}
	else{
		return false;
	}
}