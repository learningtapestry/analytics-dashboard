# frozen_string_literal: true

class LtiNonce < ApplicationRecord
  OLDEST_NONCE_TIMESTAMP = 60 * 60 * 24

  NONCE_ALREADY_USED = 'NONCE_ALREADY_USED'
  NONCE_OK = 'NONCE_OK'

  def self.verify(key, value)
    request_count = LtiNonce.
      where(lti_consumer_key: key).
      where(value: value).
      where('created_at < ?', 30.minutes.ago).
      count

    return NONCE_ALREADY_USED if request_count.positive?

    NONCE_OK
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
