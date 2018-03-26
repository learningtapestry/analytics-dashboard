# frozen_string_literal: true

class LtiConsumer < ApplicationRecord
  attr_encrypted :secret,
    key: Rails.env.production? ?
      ENV['LTI_CONSUMER_ENCRYPTION_KEY'] :
      'efff4cceceb8e9e765f84fe2e8ebe9e9',
    encode_iv: Rails.env.production?
end
