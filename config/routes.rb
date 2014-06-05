Rails.application.routes.draw do

  root "pages#index"

  Page.all.each do |page|
    get page.path => "pages##{page.action}"
  end

  resources :drawings
  resources :tasks

end
