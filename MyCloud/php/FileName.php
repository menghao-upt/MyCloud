<?php
/*
2015/9/15
FileName  查询文件名
*/
$_folderId = $_GET['folderid'];

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("disky", $con);
mysql_query("set names utf8;");
$result = mysql_query("SELECT * from file where folderid = '".$_folderId."'");

while($row = mysql_fetch_array($result)){
	$list[] = array('id' => $row['id'],'name' => $row['name']);
}

//返回Json格式的文件名和id
$_result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$_result.")"; 

mysql_close($con);

?>