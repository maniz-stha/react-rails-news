class News < ApplicationRecord
  belongs_to :user
  has_many :comments, :dependent => :delete_all
  has_many :likes, :dependent => :delete_all
  validates :title, presence: true
  validates :link, presence: true, format: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
  validates :source, presence: true
  validates :user, presence: true
end
