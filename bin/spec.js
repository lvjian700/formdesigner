#!/usr/local/bin/node
var exec = require('child_process').exec,
    path = require('path')

var public_dir = path.join(__dirname, "..", "public");
var specs_dir = path.join(public_dir, 'specs');

var cmd = ['jasmine-node --color ', specs_dir].join('');

exec(cmd, {encoding: 'utf-8'}, 
	function(error, stdout, stderr) {
		if(error !== null) {
			console.log(error);
			return;
		}
		console.log(stdout);
	});
