# MyCloud
Program For FEX Interview

关于该项目的一些记录

MyCLoud简介
本项目实现了管理本地文件夹及文件的功能。
对于文件夹，实现了新建文件夹，删除文件夹，文件夹重命名功能
对于文件，实现了上传文件，删除文件，下载文件，并对相同名字文件进行重命名的功能。

目前该项目还能实现网盘功能，将文件存储在服务器，并进行对应管理。
http://localhost/Mycloud/index.html

技术情况
前端
jQuery，BootStrap实现样式布局，Alertify.js实现弹窗效果，Uploadify.js实现上传效果。

后台
Apache + PHP实现存储文件，查询数据库，下载文件等业务逻辑功能。

数据库
MySQL5.5数据进行存储。

实现过程
1、选择题目一，在线网盘。进行项目规划，针对所需要实现的文件管理功能选择需要的技术。前端选择较为熟悉的jQuery和BootStrap，并了解到提示窗和上传都有许多插件可以实现；后端方面，虽然PHP并不太熟练，但是同寝室的有同学是后端方向，熟悉PHP技术，因此就算遇到技术上的困难也可以很快得到帮助，借这个机会还能够学习PHP，因此后端选择PHP+MySQL。

2、搭建PHP+MySQL环境。

3、建立script,stylesheet,index.html,disk.html,disk.js等文件/文件夹，搭建总体架构。

4、使用jQuery，BootStrap实现前端布局，在disk.js里预定义所需要实现的函数，如AddFolder()，RenameFolder()等。后端创建数据库及表，字段，后端预先建立RenameFolder.php, NewFolder.php等文件，规定好传递数据的格式。

5、实现功能，在实现重命名文件时，引入Alertify.js；在实现上传文件时，引入Uploadify.js。通过Github/官网的文档快速学习使用。在实现下载功能时，遇到了第一个较大的技术困难[1]。

6、大体功能实现后，将其转移至服务器进行部署测试，遇到乱码问题[2]。

7、进行优化，提高使用体验。如对重命名文件的处理，新建文件夹后跳转到该目录下，删除文件夹后跳转到第一个目录，没有文件夹时主页面按钮无效等。代码优化，清除多余语句，注释，减少DOM操作，提高效率等。

8、对遇到的困难和应用到新的技术做总结和备份，以便以后再次使用。

遇到的技术问题
[1]下载功能实现
一开始是通过php返回文件的url，再直接请求url进行实现。这种方法会暴露文件地址，造成安全隐患，同时，对于某些浏览器，直接请求url会直接打开该文件而不是下载。因此考虑换一种实现方式。

之后了解到，纯js无法实现该功能，需要借助后台对HTTP header的Content-Disposition和Content-Type进行设置，由于我之前对此并不了解，一个人捣鼓了近两个小时，仍然没有解决，因此向舍友求助。

舍友通过查阅资料和之前的经验将其解决，向我解释原理，使我对http头的内容和浏览器对Response的操作有更深理解。

在浏览器接收返回信息时，一直无法接收文件数据，而通过直接运行php却可以下载文件。查阅jQuery中.ajax的文档后发现，.ajax回调函数接收的类型只有Json，XML等，并不包括其他文件类型， 因此放弃使用.ajax就能解决问题。最终实现文件下载的功能。

[2]乱码问题
带中文的文件在传输/存储中产生乱码的情况。通过查阅资料，通过以下方法解决：

1 使用无BOM的编码方式。

2 前端，后台，数据库统一使用utf-8编码，包括PHP里mysql_query("set names utf8;")，MySQL里设置utf9_general_ci等。

并对背后的原理进行一定了解。
