class CreateGridsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :grids do |t|
      t.text :layout # we are storing this as a json encoded string - no need for jsonb as the db doesn't need to know about the contents of this.

      t.timestamps
    end

    add_index(:grids, [:layout], unique: true)

  end
end
