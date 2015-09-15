<?php
/*
2015/9/15
DeleteFile  删除文件
*/

//获取文件id和文件夹id
$_folderId = $_GET['id'];
$_fileId = $_GET{'fileid'};

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("disky", $con);
mysql_query("set names utf8;");

$result = mysql_query("DELETE FROM file WHERE id = '".$_fileId."' AND folderid = '".$_folderId."'");

$list[] = array('result' => 1);

$_result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$_result.")"; 

mysql_close($con);

?>