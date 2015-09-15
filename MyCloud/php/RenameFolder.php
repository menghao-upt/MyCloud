<?php
/*
2015/9/15
RenameFolder  文件夹重命名
*/

//获得文件夹id和原文件名
$_folderId = $_GET['id'];
$_folderName = $_GET['folderName'];

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("disky", $con);
mysql_query("set names utf8;");
$result = mysql_query("UPDATE folder SET name ='". $_folderName ."' WHERE id = '".$_folderId."'");

$list[] = array('result' => $result);

$_result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$_result.")"; 

mysql_close($con);

?>