Rails.application.routes.draw do
  root 'home#index'
  resources :customers, only: [:index]
  get 'api/customers' => 'customers#index'
end
