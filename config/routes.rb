Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    root 'news#index'

    # user routes
    resources :users, param: :username
    post '/users/register', to: 'users#register'
    post '/users/login', to: 'users#login'

    #news routes
    resources :news, except: [:new, :edit] do
      #nested comments routes
      resources :comments
    end
  end
end
