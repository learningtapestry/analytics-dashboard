# frozen_string_literal: true

class CreateLtiNonces < ActiveRecord::Migration[5.1]
  def change
    create_table :lti_nonces do |t|
      t.string :lti_consumer_key
      t.string :value
      t.integer :timestamp, :limit => 8

      t.timestamps
    end
  end
end
