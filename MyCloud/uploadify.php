<?php
/*
Uploadify 后台处理 Demo
Author:POOY
Date:2012-12-26
uploadify 后台处理 ：http://www.pooy.net/uploadify-houtai.html
*/

//设置上传目录
$path = "uploads/".$_POST['id']."/";	
$_folderid = $_POST['id'];

if (!empty($_FILES)) {
	
	//得到上传的临时文件流
	$tempFile = $_FILES['Filedata']['tmp_name'];
	
	//允许的文件后缀
	$fileTypes = array('jpg','jpeg','gif','png'); 
	
	$_fileName = $_FILES["Filedata"]["name"];
	
	$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }
	mysql_select_db("disky", $con);
	mysql_query("set names utf8;");
	
	$count = 0;
	$_count = 0;
	$result = mysql_query("SELECT id FROM file WHERE name = '".$_fileName."' AND folderid ='".$_folderid."'");
	$row = mysql_fetch_array($result);
	if($row['id'])
	{
		$count = $count + 1 ;
		$_count++;
	}
	
	if($_count != 0){
		$arr  = explode('.',$_fileName);
	}
	
	while($count > 0){
		$_fileName = $arr[0]."(".$_count.").".$arr[1];
		$result = mysql_query("SELECT id FROM file WHERE name = '".$_fileName."' AND folderid ='".$_folderid."'");
		$count = 0;
		$row = mysql_fetch_array($result);
		if($row['id'])
		{
			$count++;
			$_count++;
		}
	}
	
	//得到文件原名
	$fileName = iconv("UTF-8","GB2312",$_fileName);
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	//接受动态传值
	$files=$_POST['typeCode'];
	
	//最后保存服务器地址
	if(!is_dir($path))
	   mkdir($path);
	if (move_uploaded_file($tempFile, $path.$fileName)){
		
		if($_count == 0){
			$result = mysql_query("INSERT INTO file (name,folderid,url) VALUES ('".$_fileName."','".$_POST['id']."','".$path."')");
		}
		else{
			$result = mysql_query("INSERT INTO file (name,folderid,url) VALUES ('".$_fileName."','".$_POST['id']."','".$path."')");
		}
			
		while($row = mysql_fetch_array($result))
		{
			$list[] = array('id' => mysql_insert_id());
		}
		$result = json_encode($list);
		$callback=$_GET['callback'];  
		//echo $_POST['id']."||||".$fileName."||||".$path."||||||";
		echo $callback."(".$result.")"; 
		mysql_close($con);
	
	}else{
		echo $fileName."上传失败！";
	}
	
}
?>