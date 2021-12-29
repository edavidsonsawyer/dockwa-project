require 'rails_helper'

describe Vehicle do
  it 'creates when valid' do
    customer = Customer.new({
      first_name: "First",
      last_name: "last",
      email: "valid@email.com"
    })
    vehicle = Vehicle.new({
      vehicle_type: "tugboat",
      name: "Scuffy",
      length: "2",
      customer: customer
    })
    expect(vehicle).to be_valid
  end
end