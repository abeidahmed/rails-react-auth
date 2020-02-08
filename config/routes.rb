Rails.application.routes.draw do
  # Login user
  resources :sessions, only: [:create]
  # Register user
  resources :registrations, only: [:create]
  # Logout user
  delete :logout, to: "sessions#logged_out"
  # Login user
  get :logged_in, to: "sessions#logged_in"
  # Root path
  root to: "static_pages#home"
  # Contact page (demo)
  get "/contact", to: "static_pages#contact"
end
