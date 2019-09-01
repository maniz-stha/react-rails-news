class Api::NewsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authorize_request, except: [:index, :show]

    Page_size = 30
    
    # get all news to be displayed on the feeds
    def index
        page_size = params[:page_size] ? params[:page_size].to_i : Page_size
        page = params[:page] ? params[:page].to_i : 1
        offset = page_size*(page - 1)
        @news = News.limit(page_size).offset(offset).order('created_at desc').includes(:user, :comments)

        if @news.blank?
            render json: {status: "FEED_EMPTY", message: "No news feeds", data: {}}, status: :ok
        else
            news_data = []
            @news.each_with_index do |news, index|
                news_data << {news: news, comments: news.comments.count, likes: news.likes.count, user: news.user.username}
            end
            render json: {status: "SUCCESS", message: "List of news feeds", data: news_data}, status: :ok
        end
    end

    def show
        @news = News.find(params[:id])
        if @news.blank?
            render json: {errors: "News item not found."}, status: :not_found
        else
            news_data = {news: @news, comments: @news.comments, likes: @news.likes.count, user: @news.user}
            render json: {status: "SUCCESS", message: "News data for edit", data: news_data}, status: :ok
        end
    end

    def create
        @news = News.new(news_params)

        if @news.save
            render json: {status: "SUCCESS", message: "News item added", data: @news}, status: :created
        else
           get_errors @news 
        end
    end

    def update
        @news =  News.find(params[:id])
        updated = @news.update(news_update_params)
        if updated
            render json: {status: "SUCCESS", message: "News item updated", data: updated}, status: :ok
        else
            get_errors @news 
        end
    end

    def destroy
        @news = News.find(params[:id])
        if @news.blank?
            render json: {errors: "News item not found."}, status: :not_found
        else
            if @news.destroy
                render json: {status: "SUCCESS", message: "News item deleted", data: ""}, status: :ok
            else
                render json: {errors: "Cannot delete post."}, status: :bad_request
            end
        end
    end

    private
    def news_params
        params.permit(:title, :link, :source, :user_id)
    end

    def news_update_params
        params.permit(:title, :link, :source)
    end

end
