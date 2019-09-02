class Api::UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authorize_request, only: [:show] 
    
    def index
        users = User.select(select_params)
        render json: {status: "SUCCESS",  message: "Users listing", data: users}, status: :ok
    end

    def register
        params = user_params
        params[:email] = params[:email].downcase
        
        user = User.new(params)

        if user.save
            render json: {status: "SUCCESS", message: "User registered", data: user}, status: :created
        else 
            get_errors user
        end
    end


    #login using username of email
    def login
        # render json: login_params.inspect
        params = login_params
        if !check_login_params.empty?
            render json: check_login_params, status: :bad_request
            return
        end
        user = User.find_by("email = ? OR username = ?", params[:identity].downcase, params[:identity])
        if user
            # user found, authenticate
            if user.authenticate(params[:password])
                #set expiry to 2 hours
                time = Time.now + 2.hours.to_i
                user_data = {id: user.id, username: user.username, name: user.name, email: user.email}
                token = JsonWebToken.encode(user_data, time)
                render json: {status: "SUCCESS", message: "User logged in", token: token}, status: :ok
            else
                render json: {password: "Incorrect password"}, status: :bad_request
            end
        else
            #no user found
            render json: {identity: "Username/email not found"}, status: :not_found
        end
    end

    def show
        @user = User.select(select_params).find_by_username(params[:username])
        if @user
            render json: {status: "SUCCESS", message: "User data", data: @user}, status: :ok
        else
            #no user found
            render json: {error: "User not found"}, status: :not_found
        end
    end

    # parameters for user registration
    private def user_params
        params.permit(:username, :name, :email, :password, :password_confirmation)
    end

    # Paramters for user login
    # identity: allows username or email
    def login_params
        params.permit(:identity, :password)
    end

    #define attributes to be selected
    def select_params
        [:id, :username, :name, :email]
    end

    def check_login_params
        errors = {}
        if params[:identity] == ""
            errors[:identity] = "Enter username or email address."
        end
        if params[:password] == "" 
            errors[:password] = "Enter password."
        end
        return errors
    end
end
