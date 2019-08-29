class News < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :link, presence: true
  validates :source, presence: true
  validates :user, presence: true
end
