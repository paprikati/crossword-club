require 'json'

class Grid < ApplicationRecord
  validates :layout, presence: true, uniqueness: true
  validate :valid_layout_shape

  private

  def valid_layout_shape
    layout_arr = JSON.parse(layout)
    num_rows = layout_arr.length
    layout_arr.each do |row|
      if row.max && row.max > num_rows
        errors.add(:layout, :invalid_shape)
      end
    end
  end
end
