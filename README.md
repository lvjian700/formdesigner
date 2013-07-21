#FormDesigner
---

给公司其他项目开发的表单设计器。现在将项目整理出来，供学习用。	
提供如下技术的sample演示:	

* backbone
* requirejs 模块化js
* jasmine 做TDD
* 如何使用backbone做MV模型开发。

###如何使用

注意: 建议使用19寸以上的显示器来查看这个项目。 1280分辨率的笔记本会显示不全。	

最简化使用，依赖ruby环境:	

	git clone https://github.com/lvjian700/formdesigner.git
	cd formdesigner
	bundle install
	ruby app.rb -o 0.0.0.0 -p 4000	
	
访问如下地址:

1. <http://localhost:4000/> : 这里演示拖拽field如何实现
2. <http://localhost:4000/index.html> : 表单设计器的主页面
3. <http://localhost:4000/test.html> : jasmine bdd测试运行页面	


###项目结构说明:	

* bin: 开发过程中用node.js写的脚本工具。主要是[less2css.js][1]
* node\_src(废弃): 之前打算用node.js运行jasmine测试，之后放弃
* __public__: 对应java web项目中的war目录，由于项目刚开始用sinatrarb提供web环境，所以名称public
	* __assets__: 依赖前端库存放地，使用bower在这个目录下安装开发库。
	* css: 基本样式，base.css从 less/base.less编译而成
	* forms: 初期的演示代码，仅演示拖拽效果的实现。
	* __less__: 样式写这里
	* __rspec(重点)__: 项目的jasmine测试代码， 在public/test.html中引用
	* __rsrc(重点)__: 项目前端核心代码
	* src(废弃): 使用requirejs模块化前的代码, 这部分代码可以看old.html
	* spec(废弃): 使用requirejs模块化前的测试代码
* sql: 提供数据初始化的脚本
* src: java代码目录
* views(废弃): erb文件目录(废弃) 


###Java环境下全启动	

1. clone项目:	

	git clone https://github.com/lvjian700/formdesigner.git		

2. 创建本地数据库, 项目提供sql, oracle, mysql驱动
3. 修改数据库配置:
	1. src/resources/hibernate.cfg.xml
	2. src/resources/config/jdbc.properties
4. 生成数据库&运行项目:	

	cd formdesigner
	ant dbcreate
	ant run	
	
5. 访问首页	

http://localhost:8000	

###项目依赖前端库说明	

所有依赖库都在public/assets/commponents目录下, 这里仅对一些特殊的进行说明:	

* jasmine: js中的BBD测试库
* text: 为requirejs提供text文件加载,一般用来异步加载模板
* labjs: 异步加载script, 在没用requirejs之前用到了这个库，正式版未使用
* moment: 做日期处理
* select2: 非常优秀的choosen组件	

###参考资料	

* Backbone书: <http://addyosmani.github.io/backbone-fundamentals/>
* Tusplus上的backbone教程: <http://net.tutsplus.com/tutorials/javascript-ajax/building-a-scalable-app-with-backbone-js/>
* jasmine文档: <http://pivotal.github.io/jasmine/>
* backbone文档: <http://backbonejs.org/>
* underscore文档: <http://underscorejs.org/>	


[1]: http://witcheryne.iteye.com/blog/1871683 "使用node.js简化less编译"

