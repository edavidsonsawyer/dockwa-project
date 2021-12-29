Rails.application.routes.draw do
  resources :customers, only: [:index]
  get 'api/customers' => 'customers#index'
end
