<?php
/*
2015/9/15
DownLoadFile  下载文件
*/

$_folderId = $_GET['id'];
$_fileId = $_GET{'fileid'};

$con = mysql_connect("rds328u02462b00w7316.mysql.rds.aliyuncs.com","sniffles","22222222");
if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("disky", $con);
mysql_query("set names utf8;");
$result = mysql_query("SELECT * from file where folderid = '".$_folderId."' AND id = '".$_fileId."'");

while($row = mysql_fetch_array($result)){
	$list[] = array('url' => $row['url'].$row['name']);
	$url = $row['url'];
	$name = $row['name'];
}
	
$downfile = "../".$url.$name;
$filename = basename($downfile); 
$filename_info = explode('.', $filename); 
$fileext = $filename_info[count($filename_info)-1]; 

//设置header头，覆盖浏览器直接打开的操作
header('Content-type: application/x-'.$fileext); 
header('Content-Disposition: attachment; filename='.$filename);
echo file_get_contents($downfile);

mysql_close($con);

?>