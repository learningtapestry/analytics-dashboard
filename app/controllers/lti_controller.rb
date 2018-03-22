# frozen_string_literal: true

class LtiController < ApplicationController
  protect_from_forgery with: :null_session

  SIGNATURE_INVALID = 'SIGNATURE_INVALID'
  TIMESTAMP_TOO_OLD = 'TIMESTAMP_TOO_OLD'
  TIMESTAMP_WINDOW = 60 * 5

  # rubocop:disable Metrics/AbcSize
  def launch
    begin
      verify_timestamp
      verify_consumer
      verify_nonce
      verify_oauth_signature
    rescue StandardError => e
      render json: { error: e }, status: :forbidden
      return
    ensure
      LtiNonce.store(
        params[:oauth_consumer_key],
        params[:oauth_nonce],
        params[:oauth_timestamp]
      )
    end

    # reset_session

    # session[:user] = params[:ext_user_username].to_s
    # session[:alias] = params[:custom_alias].to_s
    # session[:lti_consumer_key] = params[:oauth_consumer_key].to_s

    # cookies[:alias] = session[:alias]

    # render(file: tool.url, layout: false)
  end
  # rubocop:enable Metrics/AbcSize

  def verify_timestamp
    time_diff = Time.now.to_i - params[:oauth_timestamp].to_i

    raise TIMESTAMP_TOO_OLD if time_diff > TIMESTAMP_WINDOW
  end

  def verify_consumer
    consumer = LtiConsumer.find_by(key: params[:oauth_consumer_key])

    raise LtiConsumer::NO_SUCH_CONSUMER if consumer.nil?
  end

  def verify_nonce
    status = LtiNonce.verify(
      params[:oauth_consumer_key],
      params[:oauth_nonce]
    )

    raise status if status != LtiNonce::NONCE_OK
  end

  def verify_oauth_signature
    consumer = LtiConsumer.find_by(key: params[:oauth_consumer_key])

    authenticator = IMS::LTI::Services::MessageAuthenticator.new(
      request.url,
      request.request_parameters,
      consumer.secret
    )

    # check if the signature is valid
    raise SIGNATURE_INVALID unless authenticator.valid_signature?
  end
end
