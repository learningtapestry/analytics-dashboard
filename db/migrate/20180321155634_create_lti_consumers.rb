class CreateLtiConsumers < ActiveRecord::Migration[5.1]
  def change
    create_table :lti_consumers do |t|
      t.string :name, null: false
      t.string :key, null: false
      t.string :encrypted_secret, null: false
      t.string :encrypted_secret_iv, null: false

      t.timestamps
    end
  end
end
