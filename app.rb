#encoding=utf-8
require 'sinatra'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/public'
set :layout_engine => :erb, :layout => :layout

templatePath = File.dirname(__FILE__) + '/public/rsrc/templates/news_config.txt'
file = File.open(templatePath, 'r')
content = file.read
file.close

config = {:configGuid => '1111111111111111111111', :configName => "新闻配置", :configValue => content, :orderNum => 4, :preceptName => "测试组www"}
json_config = config.to_json

get '/' do
    erb :index
end

post '/configs/post.action' do 
	guid = params[:guid]
	puts "url parameter :guid = #{guid}"
	content= params[:content]
	puts "content:"
	puts content

	'success'
end

get '/configs/list.action' do 
    "[#{json_config}]"
end

get '/configs/get.action' do 
    puts "get config by id: #{params[:guid]}"
  guid = params[:guid]

  content_type :json
  "{\"body\": #{json_config } }"
end
