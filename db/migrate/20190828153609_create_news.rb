class CreateNews < ActiveRecord::Migration[5.2]
  def change
    create_table :news do |t|
      t.text :title
      t.text :link
      t.string :source
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
