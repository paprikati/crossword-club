class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :crossword_count

  def crossword_count
    Crossword.where(owner: object).count
  end
end