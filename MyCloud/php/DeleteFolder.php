<?php
/*
2015/9/15
DeleteFolder 删除文件夹
*/

//获取文件夹id
$_folderId = $_GET['id'];

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("disky", $con);
mysql_query("set names utf8;");
$result = mysql_query("DELETE FROM folder WHERE id = '".$_folderId."'");

$list[] = array('result' => $result);

$_result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$_result.")"; 

mysql_close($con);

?>