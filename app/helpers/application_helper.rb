module ApplicationHelper

  def current_user_obj
    current_user ? UserSerializer.new(current_user) : nil
  end
end
