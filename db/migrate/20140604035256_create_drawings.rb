class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.string :description
      t.text :points
    end
  end
end
