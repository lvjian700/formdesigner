Timepicker for Twitter Bootstrap 2.x
------------------------------------

A simple timepicker component for Twitter Bootstrap.

Add Frame Time Support
---

Html:	
	
	<div class="input-append bootstrap-timepicker-component controls">
		<input id="videoTimeLength" class="input-small timepicker-default" type="text"
			value="10:11:10:01">
		<span class="add-on"><i class="icon-time"></i></span>
	</div>

JavaScript:	

	$('#videoTimeLength').timepicker({
		showSeconds: true,
		showFrames: true,
		fps: 25, 
		frameStep: 5,
		showMeridian: false,
		defaultTime: 'value'
	});


Documentation
=============

Read the <a href="http://jdewit.github.com/bootstrap-timepicker">documentation</a>.
