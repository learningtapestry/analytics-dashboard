# frozen_string_literal: true

class LtiNonce < ApplicationRecord
  OLDEST_NONCE_TIMESTAMP = 60 * 60 * 24

  def self.already_used?(key, value)
    request_count = LtiNonce.
      where(lti_consumer_key: key).
      where(value: value).
      where('created_at < ?', 30.minutes.ago).
      count

    request_count.positive?
  end

  def self.store(key, value, timestamp)
    trim(key)

    LtiNonce.create(
      lti_consumer_key: key,
      value: value,
      timestamp: timestamp.to_i
    )
  end

  def self.trim(key)
    LtiNonce.
      where(lti_consumer_key: key).
      where('timestamp < ?', Time.now.to_i - OLDEST_NONCE_TIMESTAMP).
      order(:timestamp).
      destroy_all
  end
end
