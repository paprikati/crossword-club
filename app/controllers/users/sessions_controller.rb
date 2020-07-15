# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    puts 'in create method'
    @user = User.find_by_email(user_params[:email])
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render json: @user
    else
      invalid_login_attempt
    end
  end

  # DELETE /resource/sign_out
  def destroy
    sign_out(@user)
    render :json=> {:success=>true}
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: 'invalid login attempt'}, status: :unprocessable_entity
  end

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
