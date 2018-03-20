Rails.application.routes.draw do
  root 'dashboard#show'

  devise_for :users
end
