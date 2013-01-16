##formbuilder loader
---

将forms扔到项目的war/目录下，该目录为formdesigner的发布目录。	

### 安装和配置

####安装	

	<link rel="stylesheet" href="base.css" type="text/css" media="screen" charset="utf-8">
	<!-- your code here.... -->
	<!-- ... -->

	<!-- install javascript below -->
	<script src="formbuilder.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8">
		fb.config({
			base: ''
		});
		fb.load($('#form'), 'news');
	</script>

####配置	
	
	fb.config({
		base: ''
	});

* base,  用来配置项目的跟路径，资源加载会以__base__为基准,	

比如http://[ip]:[port]/news 则配置如下:	

	fb.config({
		base: '/news'
	});




