---
layout: post
title: 'Tutorial: Adding a Flash file inside an ExtJS 4 Component'
author: Loiane
comments: false
date: 2012-07-23 01:07:32
tags:
    - ExtJS 4
    - Flash
image: /assets/images/assets/extjs4-flash-video-loiane-01.png
category: sencha    
---
Today we are going to learn how to add a flash file (_**.swf**_) inside an ExtJS 4 Component.

First, let&#8217;s check out what we are going to implement:

What we are going to need for this example:

  * ExtJS 4 SDK
  * A flash file
  * SWFObject library

The first thing to do is to create the project structure. Unzip the **_SWFObject_** lib inside the project and also add the flash file you want to display inside the project directory as well (mine is called airballoon). I also unziped the ExtJS 4 SDK inside the directory and created a file named _**index.html**_. When everything is ready, this is how it is going to look like:

<img src="/assets/images/assets/extjs4-flash-video-loiane-01.png">

Finally, inside the _**index.html**_ file we are going to add the following content:

```html
<html>
<head>
	<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript" src="swfobject/swfobject.js"></script>
</head>
<body>
	<script type="text/javascript">
	Ext.onReady(function(){
		var win = Ext.widget('window', {
		    title: "Flash animation inside an ExtJS 4 Component!",
		    layout: 'fit',
		    width: 700,
		    height: 500,
		    resizable: true,
		    items: {
		        xtype: 'flash',
		        url: 'airballoon/AIRBALLOON.swf'
		    }
		});
		win.show();
	});
	</script>
</body>    
</html>
```

The flash animation will be displayed inside an ExtJS 4 Window.The class _**Ext.flash.Component**_ (_xtype_: ‘_flash_’) does all the &#8216;magic&#8217; we need, and in the config _**url**_ you just need to add the full path to the flash file(**.swf**).

## Source code

> <i class="mdi mdi-github-circle mdi-24px"></i>  Source code available [on GitHub](https://github.com/loiane/extjs4-flash-video)

Happy Coding!