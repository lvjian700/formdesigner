#!/usr/local/bin/node
var exec = require('child_process').exec,
    path = require('path'),
	fs = require('fs')

var public_dir = path.join(__dirname, "..", "public");
var output_dir = path.join(public_dir, 'rsrc', 'templates');

var newsfile = path.join(output_dir, 'news_tmpls.js');
var topicsfile = path.join(output_dir, 'topics_tmpls.js');

var news="0,NewsTitle,标题,0,0,100,1,1;1,SubTitle,标题别名,1,0,50,0,1;2,EstimateLength,拟播长度,1,1,50,0,1;3,CreatMethod,稿件体裁,2,0,25,0,1;4,NewsSource,来源,2,1,25,0,1;5,NewsType,类别,2,2,25,0,1;6,NewsRemark,备注,3,0,50,0,1;7,NewsKeyword,关键字,3,1,50,0,1;8,EstimatePage,专栏,4,0,25,0,1;9,BatMan,通讯员,4,1,25,0,1;10,ProgramName,节目名称,4,2,25,0,1;11,ProgramCode,节目代码,4,3,25,0,1;12,VideoLength,视频长度,5,0,25,0,1;13,BroadLength,口播长度,5,1,25,0,1;14,WordsLength,文字长度,5,2,25,0,1;15,GuestMan,特约记者,5,3,25,0,1;16,Camerist,摄像员,6,0,25,0,1;17,EstimateColumn,拟播栏目,6,1,25,0,1;18,NewsLevel,稿件类别,6,2,25,0,1;19,IsSpecial,文稿类型,6,3,25,0,1;20,Creater,创建人,7,0,25,0,1;21,OwnColumn,所属栏目,7,1,25,0,1;22,CreateTime,创建时间,7,2,25,0,1;23,ModifyTime,修改时间,7,3,25,0,1;24,DubMan,配音员,8,0,25,0,1;25,BroadSpeed,语速,8,1,25,0,1;26,SaveFloder,保存位置,9,0,25,0,0;27,TaskTime,采访时间,10,0,100,0,0;28,TaskPlace,采访地点,11,0,100,0,0;29,NewsGrade,重要性,12,0,100,0,0;30,NewsLanguage,语言,13,0,100,0,0;31,NewsContent,内容,14,0,100,0,0;32,BroadType,播出类别,15,0,100,0,0;33,Editor,剪辑员,16,0,100,0,0;34,Driver,司机,17,0,100,0,0;35,Assistant,其他人员,18,0,100,0,0;36,EstimateTime,拟播时间,19,0,100,0,0;37,EstimateLength,拟播长度,20,0,100,0,0;38,IsBaoPian,报片,21,0,100,0,0;39,IsBaoBo,报播,22,0,100,0,0;40,NewsState,文稿状态,23,0,100,0,0;41,VideoState,视频状态,24,0,100,0,0;42,BaoBoColumn,报播栏目,25,0,100,0,0;43,Modifier,修改人,26,0,100,0,0;";

var topics="0,TaskTitle,标题,0,0,100,1,0;1,TaskRemark,备注,1,0,50,0,1;2,TaskKeyword,关键字,1,1,50,0,1;3,ProgramCode,节目代码,2,0,50,0,1;4,ProgramName,节目名称,2,1,50,0,1;5,LeaveTime,出发时间,3,0,50,1,1;6,TaskType,类型,3,2,25,0,1;7,ArriveTime,到达时间,3,2,25,0,1;8,Camerist,摄像员,4,2,25,1,1;9,IsSpecial,专题标识,4,2,25,0,1;10,CreateTime,创建时间,5,1,25,0,1;11,Reporter,记者,5,1,25,0,1;12,ContactTel,联系电话,5,2,50,0,1;13,EstimateDate,拟播日期,6,1,25,1,1;14,EstimateLength,拟播长度,6,3,25,1,1;15,TaskPlace,地点,7,0,100,0,1;16,TaskGrade,等级grade,8,0,25,0,1;17,TaskLevel,等级,8,1,25,0,1;18,Creater,创建人,9,0,25,0,0;19,OwnColumn,所属栏目,10,0,25,0,0;20,ModifyTime,修改时间,100,0,100,0,0;21,TaskContent,内容,100,0,100,0,0;22,GuestMan,特约记者,100,0,100,0,0;23,BatMan,通讯员,100,0,100,0,0;24,Driver,司机,100,0,100,0,0;25,OtherMan,扩展,100,0,100,0,0;26,Assistant,其他人员,100,0,100,0,0;27,EstimateColumn,拟播栏目,100,0,100,0,0;28,TaskState,状态,100,0,100,0,0;";

function parse2Fields (plain) {
	var parts = plain.split(';');
	parts.pop();

	return parts;
}

function parse2Item(text) {
	var p = text.split(',');
	var required = p[6] == '1';
	var used = p[7] == '1';

	return {
		index: parseInt(p[0]),
		name: p[1],
		label: p[2],
		rowIndex: parseInt(p[3]),
		columnIndex: parseInt(p[4]),
		width: parseInt(p[5]),
		required: required,
		used: used
	}
}

function toDefault(text) {
	var fields = parse2Fields(text);
	
	var ret = [];
	
	for (var i=0; i < fields.length; i++) {
		var json = parse2Item(fields[i]);
		
		ret.push({
			label: json.label,
			name: json.name
		});
	};
	
	return ret;
}

function writeToFile (dir, data) {
	fs.writeFile(dir, data, function(error) {
		if(error) throw error;
		console.log('write file success.');
	})
}

console.log('Generate All Config file.');
console.log('The outout folder:');
console.log(output_dir);

console.log('generate news tmpls...');
var newsData = toDefault(news);
var newsString = JSON.stringify(newsData);

console.log('write to file:' + newsfile);
console.log(newsString);
writeToFile(newsfile, newsString);

console.log('generate topics tmpls...');
var topicsData = toDefault(topics);
var topicsString = JSON.stringify(topicsData);

console.log('write to file:' + topicsfile);
console.log(topicsString);
writeToFile(topicsfile, topicsString);