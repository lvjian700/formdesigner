#!/usr/local/bin/node
var exec = require('child_process').exec,
    path = require('path')

var public_dir = path.join(__dirname, "..", "public");

var less_dir = path.join(public_dir, "less", "base.less");
var css_dir = path.join(public_dir, "css", "base.css");

var cmd = ['lessc ', less_dir, ' > ', css_dir].join('');

console.log(cmd);
exec(cmd, {encoding: 'utf-8'}, 
	function(error, stdout, stderr) {
		if(error !== null) {
			console.log(error);
			return;
		}
		console.log(stdout);
	});
