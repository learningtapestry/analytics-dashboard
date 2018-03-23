# frozen_string_literal: true

class LtiController < ApplicationController
  protect_from_forgery with: :null_session

  def launch
    begin
      LtiLaunchInteractor.call(interactor_params)
    rescue LtiError => e
      render json: { error: e }, status: :forbidden
      return
    ensure
      LtiNonce.store(
        params[:oauth_consumer_key],
        params[:oauth_nonce],
        params[:oauth_timestamp]
      )
    end

    render(plain: 'Launch successful')
  end

  def interactor_params
    {
      oauth_timestamp: params[:oauth_timestamp],
      oauth_consumer_key: params[:oauth_consumer_key],
      oauth_nonce: params[:oauth_nonce],
      request_url: request.url,
      request_parameters: request.request_parameters
    }
  end
end
