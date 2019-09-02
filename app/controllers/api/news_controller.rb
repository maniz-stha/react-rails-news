class Api::NewsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authorize_request, except: [:index, :show, :search]

    Page_size = 30
    
    # get all news to be displayed on the feeds
    def index
        #pagination parameters
        page_size = params[:page_size] ? params[:page_size].to_i : Page_size
        page = params[:page] ? params[:page].to_i : 1
        offset = page_size*(page - 1)
        @news = News.limit(page_size).offset(offset).order('created_at desc').includes(:user, :comments)

        if @news.blank?
            render json: {status: "FEED_EMPTY", message: "No news feeds", data: {}}, status: :ok
        else
            news_data = []
            # format likes, comments and user for each news
            @news.each do |news|
                news_data << {news: news, comments: news.comments.count, likes: liked_user_id(news), user: news.user.username}
            end
            render json: {status: "SUCCESS", message: "List of news feeds", data: news_data}, status: :ok
        end
    end

    def show
        @news = News.find(params[:id])
        if @news.blank?
            render json: {errors: "News item not found."}, status: :not_found
        else
            news_data = {
                news: @news, 
                comments: @news.comments.as_json(:include => {user: {only: [:username]}}), 
                likes: liked_user_id(@news), 
                user: @news.user
            }
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

    #search on news feed by title or source
    def search
        search_term = "%#{params[:term].downcase}%"
        @news = News.order('created_at desc')
        .includes(:user, :comments)
        .where("LOWER(title) LIKE ? OR LOWER(source) LIKE ?", search_term, search_term)
        if @news.blank?
            render json: {status: "FEED_EMPTY", message: "No news feeds", data: {}}, status: :ok
        else
            news_data = []
            # format likes, comments and user for each news
            @news.each do |news|
                news_data << {news: news, comments: news.comments.count, likes: liked_user_id(news), user: news.user.username}
            end
            render json: {status: "SUCCESS", message: "List of news feeds", data: news_data}, status: :ok
        end
    end

    private
    def news_params
        params.permit(:title, :link, :source, :user_id)
    end

    def news_update_params
        params.permit(:title, :link, :source)
    end

    #returns id of all user that liked the news
    def liked_user_id(news)
        user_ids = {}
        news.likes.each do |like|
            user_ids[like.id] = like.user_id
        end
        return user_ids
    end
end
