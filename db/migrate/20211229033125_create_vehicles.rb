class CreateVehicles < ActiveRecord::Migration[6.0]
  def change
    create_table :vehicles do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :vehicle_type
      t.string :name
      t.string :length
      t.timestamps
    end
  end
end
