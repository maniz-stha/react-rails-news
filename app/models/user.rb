class User < ApplicationRecord
    has_many :news
    has_many :comments
    
    has_secure_password
    validates :username, presence: true, uniqueness: true, length: { in: 3..20 }
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true, length: { minimum: 6 }, confirmation: true
    validates :password_confirmation, presence: true
end
