class ApplicationController < ActionController::Base
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
          @decoded = JsonWebToken.decode(header)
          @current_user = User.find(@decoded[:id])
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :not_found
        rescue JWT::DecodeError => e
          render json: { errors: "Invalid access token." }, status: :unauthorized
        end
      end


    #get formatted error from validation errors
    def get_errors(model)
      errors = {}
      model.errors.each do |attr, full_messages|
        message = model.errors[attr][0]
        errors[attr] = model.errors.full_message(attr, message)
      end
      render status: :bad_request, json: errors
  end
end
