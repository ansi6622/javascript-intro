Rails.application.routes.draw do

  root "pages#index"

  get "/01-hello-world-inline" => "pages#01_hello_world_inline"
  get "/02-hello-world-script-tag" => "pages#02_hello_world_script_tag"
  get "/03-hello-world-external-script" => "pages#03_hello_world_external_script"
  get "/04-dom" => "pages#04_dom"

end
