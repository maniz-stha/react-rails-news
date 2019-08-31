class Comment < ApplicationRecord
  belongs_to :news
  belongs_to :user

  validates :news, presence: true
  validates :user, presence: true
  validates :comment, presence: true
end
