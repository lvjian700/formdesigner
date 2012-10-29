require 'sinatra'


set :public_folder, File.dirname(__FILE__) + '/public'
set :layout_engine => :erb, :layout => :layout


get '/' do
    erb :index
end
