Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  get 'home/index'
  root to: "home#index"

  resource :grids
  resource :crosswords

end
