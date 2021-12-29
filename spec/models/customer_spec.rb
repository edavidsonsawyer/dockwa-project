require 'rails_helper'

describe Customer do
  it 'creates when valid' do
    customer = Customer.new({
      first_name: "First",
      last_name: "last",
      email: "valid@email.com"
    })
    expect(customer).to be_valid
  end

  it 'fails on invalid email' do
    customer = Customer.new({
      first_name: "Bad",
      last_name: "Email",
      email: "invalidemail"
    })
    expect(customer).to be_invalid
  end
end