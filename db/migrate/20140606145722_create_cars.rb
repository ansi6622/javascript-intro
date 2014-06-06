class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :description

      t.timestamps
    end
  end
end
