class ApplicationController < ActionController::Base
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
          @decoded = JsonWebToken.decode(header)
          @current_user = User.find(@decoded[:user_id])
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :not_found
        rescue JWT::DecodeError => e
          render json: { errors: "Invalid access token." }, status: :unauthorized
        end
      end
end
