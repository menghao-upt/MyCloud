<?php
/*
2015/9/15
NewFolder  新建文件夹
*/

//获得文件夹名字
$_folderName = $_GET['folderName'];

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");

if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("disky", $con);
mysql_query("set names utf8;");
mysql_query("INSERT INTO folder (name) VALUES ('".$_folderName."')");

//新建文件夹
mkdir("../uploads/".mysql_insert_id());

//返回Json格式新建文件夹的id
$list[] = array('id' => mysql_insert_id());
$result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$result.")"; 
mysql_close($con);
?>