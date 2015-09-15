<?php
/*
2015/9/15
sider  所有文件夹和文件夹对应id
*/

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("disky", $con);
mysql_query("set names utf8;");
$result = mysql_query("SELECT * from folder");

while($row = mysql_fetch_array($result)){
	$list[] = array('id' => $row['id'],'name' => $row['name']);
}

//返回Json格式的id和name
$_result = json_encode($list);
$callback=$_GET['callback'];  
echo $callback."(".$_result.")"; 

mysql_close($con);


?>