# REACT RAILS NEWS

**This is a hackernews-like news listing website developed with Ruby on Rails and React.**

## System dependencies

- Rails 5.2.3
- Ruby 2.5.1p57
- React 16.9.0

## Gems used

- mysql2: For using mysql as database adapter
- Figaro: to implement environment variables in order to protect private data/credentials

## Configuration steps:

- Run command `bundle install`
- To configure figaro run command `bundle exec figaro install`
- Rename config/application.yml.copy to config/applcation.yml and add necessary configuration values.
- Run command `rails db:migrate`
