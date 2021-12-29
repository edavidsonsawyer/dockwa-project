class Customer < ApplicationRecord
  has_many :vehicles

  validates :email, presence: true, uniqueness: true, case_sensitive: false, format: { with: URI::MailTo::EMAIL_REGEXP }
end
