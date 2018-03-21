class LtiController < ApplicationController
  def launch
    authenticator = IMS::LTI::Services::MessageAuthenticator.new(request.url, request.request_parameters, shared_secret)

    # check if the signature is valid
    return false unless authenticator.valid_signature?

    # check if `params['oauth_nonce']` has already been used

    # check if the message is too old
    return false if DateTime.strptime(request.request_parameters['oauth_timestamp'],'%s') < 5.minutes.ago
  end
end
