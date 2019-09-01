class Api::LikesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authorize_request

    def create
        @like = Like.new(like_params)
        if @like.save
            render json: {status: "SUCCESS", message: "News liked", data: @like}, status: :created
        else
           get_errors @like 
        end
    end

    def destroy
        @like = Like.find(params[:id])
        if @like.blank?
            render json: {errors: "News hasn't been liked."}, status: :not_found
        else
            if @like.destroy
                render json: {status: "SUCCESS", message: "News like removed", data: ""}, status: :ok
            else
                render json: {errors: "Cannot unlike."}, status: :bad_request
            end
        end
    end

    private def like_params
        params.permit(:news_id, :user_id)
    end
end
