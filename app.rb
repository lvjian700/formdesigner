require 'sinatra'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/public'
set :layout_engine => :erb, :layout => :layout


get '/' do
    erb :index
end

get '/plain/configs/:guid' do 
	templatePath = File.dirname(__FILE__) + '/public/rsrc/templates/news_config.txt'
	puts templatePath

	file = File.open(templatePath, 'r')
	content = file.read
	file.close
	
	ret = { :content => content }

	content_type :json

	ret.to_json
end
