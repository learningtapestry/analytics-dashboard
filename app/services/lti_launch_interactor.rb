# frozen_string_literal: true

class LtiLaunchInteractor < BaseInteractor
  NO_SUCH_CONSUMER = 'NO_SUCH_CONSUMER'
  NONCE_ALREADY_USED = 'NONCE_ALREADY_USED'
  SIGNATURE_INVALID = 'SIGNATURE_INVALID'
  TIMESTAMP_TOO_OLD = 'TIMESTAMP_TOO_OLD'
  TIMESTAMP_WINDOW = 60 * 5

  def initialize(params)
    super(params)
  end

  def call
    verify_timestamp
    verify_consumer
    verify_nonce
    verify_oauth_signature
  end

  private

  def verify_timestamp
    time_diff = Time.now.to_i - @params[:oauth_timestamp].to_i

    raise LtiError, TIMESTAMP_TOO_OLD if time_diff > TIMESTAMP_WINDOW
  end

  def verify_consumer
    consumer = LtiConsumer.find_by(key: @params[:oauth_consumer_key])

    raise LtiError, NO_SUCH_CONSUMER if consumer.nil?
  end

  def verify_nonce
    already_used = LtiNonce.already_used?(
      @params[:oauth_consumer_key],
      @params[:oauth_nonce]
    )

    raise LtiError, NONCE_ALREADY_USED if already_used
  end

  def verify_oauth_signature
    consumer = LtiConsumer.find_by(key: @params[:oauth_consumer_key])

    authenticator = IMS::LTI::Services::MessageAuthenticator.new(
      @params[:request_url],
      @params[:request_parameters],
      consumer.secret
    )

    raise LtiError, SIGNATURE_INVALID unless authenticator.valid_signature?
  end
end
