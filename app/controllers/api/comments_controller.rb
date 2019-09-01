class Api::CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authorize_request, except: [:index]

    #get all comments for a news
    def index
        @comments = Comment.all
        render json: {status: "SUCCESS", message: "Comments listing", count: @comments.count, data: @comments}, status: :ok
    end

    def show
        @comment = Comment.find(params[:id])
        if @comment.blank?
            render json: {errors: "Comment not found."}, status: :not_found
        else
            render json: {status: "SUCCESS", message: "Comment data for edit", data: @comment}, status: :ok
        end
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: {status: "SUCCESS", message: "New comment added", data: @comment.as_json(:include => {user: {only: [:username]}})}, status: :created
        else
           get_errors @comment 
        end
    end

    def update
        @comment =  Comment.find(params[:id])
        updated = @comment.update(comment_update_params)
        if updated
            render json: {status: "SUCCESS", message: "Comment updated", data: updated}, status: :ok
        else
            get_errors @comment 
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment.blank?
            render json: {errors: "Comment not found."}, status: :not_found
        else
            if @comment.destroy
                render json: {status: "SUCCESS", message: "Comment deleted", data: ""}, status: :ok
            else
                render json: {errors: "Cannot delete comment."}, status: :bad_request
            end
        end
    end

    private def comment_params
        params.permit(:news_id, :user_id, :comment)
    end

    def comment_update_params
        params.permit(:comment)
    end

end
