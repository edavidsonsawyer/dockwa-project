class CustomersController < ApplicationController
  def index
    render json: customers_list
  end

  private
  def customers_list
    Customer.all.to_json(:include => :vehicles)
  end
end