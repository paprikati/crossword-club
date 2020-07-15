class CreateCrosswords < ActiveRecord::Migration[6.0]
  def change
    create_table :crosswords do |t|
      t.string :title
      t.boolean :published
      t.jsonb :clues
      t.jsonb :values
      t.jsonb :grid
      t.integer :owner

      t.timestamps
    end
  end
end
