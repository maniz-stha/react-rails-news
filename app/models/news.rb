class News < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :link, presence: true, format: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
  validates :source, presence: true
  validates :user, presence: true
end