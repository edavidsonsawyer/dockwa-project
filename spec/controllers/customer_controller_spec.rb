require 'rails_helper'

describe CustomersController do
  before(:example) do
    create_mock_customer
  end
  describe 'json' do
    it 'returns a list of customers' do
      get :index
      json = JSON.parse(response.body)
      expect(json[0]).to include({
        "first_name"=>"first",
        "last_name"=>"last", 
        "email"=>"valid@email.com"})
        vehicles = json[0]["vehicles"][0]
      expect(vehicles).to include({
        "id"=>1, 
        "customer_id"=>1, 
        "vehicle_type"=>"tugboat", 
        "name"=>"Scuffy", 
        "length"=>"2"})
    end
  end

  def create_mock_customer
    customer = Customer.create!({
      first_name: "first",
      last_name: "last",
      email: "valid@email.com"
      })
      Vehicle.create!({
        vehicle_type: "tugboat", 
        name: "Scuffy", 
        length: 2, 
        customer:customer
        })
    end
  end