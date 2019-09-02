# REACT RAILS NEWS

**This is a hackernews-like news listing website developed with Ruby on Rails and React.**

## System dependencies

- Rails 5.2.3
- Ruby 2.5.1p57
- React 16.9.0

## Gems used

- pg: For using postgresql as database adapter
- Figaro: to implement environment variables in order to protect private data/credentials
- bcrypt: for encrypting user password
- jwt: for generating json web tokens so that user from frontend can make api calls

## NPM Packages

- create-react-app for react app installation
- react-redux for state management
- axios for making api requests
- jwt-decode to decode the json web tokens
- moment and react-moment for datetime manipulations
- classnames for adding classes to elements based on some conditions
- redux-thunk for redux middleware to write action creators that return a function instead of an action

## Configuration steps

- Run command `bundle install`
- To configure figaro run command `bundle exec figaro install`
- Rename config/application.yml.copy to config/applcation.yml and add necessary configuration values.
- Run command `rails db:migrate`
- Run rails app via command `rails s`
- Run react app via command `npm run frontend-start`

## Application description

- On visiting the [app](https://react-rails-news-app.herokuapp.com/), the homepage will display the list of news. This can also be accessed through the link /feeds
- News item will contain title, news source, username of news submitter.
- User can like and comment when logged in. No of. likes and comments are visible.
- New delete/edit action is available if the news item is created by the currently logged in user.
- On clicking on comment, user will be taken to comments page, that displays the news item as well as a comment box to add new comment and a list of all comments for the news item.
- comment can be deleted if added by currently logged in user.
- User functionalities such as register, login, logout are available.

## Extra notes

- The app is hosted in Heroku and can be accessed [here](https://react-rails-news-app.herokuapp.com/).
- The react app is served statically through rails application in production.
- The react codes is added under _app/frontend_ folder.
