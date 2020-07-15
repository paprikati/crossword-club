class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  private

  # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(user)
    '/'
  end
end
