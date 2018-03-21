Rails.application.routes.draw do
  root to: 'dashboard#show'

  post '/lti_launch', to: 'lti#launch'

  devise_for :users
end
