# frozen_string_literal: true

require 'test_helper'

class LtiControllerTest < ActionDispatch::IntegrationTest
  # rubocop:disable Metrics/MethodLength
  def setup
    @params = {
      oauth_consumer_key: 'abc',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Time.now.to_i,
      oauth_nonce: 'aj5d34C5qKtbpODnne3Ob50bKRoJ9zYzNPlUQ2q4',
      oauth_version: '1.0',
      context_id: '364f8830c08b91500741262f85629c7bc0b5a4ba',
      context_label: 'TestCourse1',
      context_title: 'TestCourse1',
      custom_canvas_enrollment_state: 'active',
      ext_roles: 'urn:lti:instrole:ims/lis/Administrator,' \
        'urn:lti:instrole:ims/lis/Instructor,' \
        'urn:lti:role:ims/lis/Instructor,' \
        'urn:lti:sysrole:ims/lis/SysAdmin,' \
        'urn:lti:sysrole:ims/lis/User',
      launch_presentation_document_target: 'iframe',
      launch_presentation_locale: 'en',
      launch_presentation_return_url: 'http://192.168.1.2/courses/1/modules',
      lti_message_type: 'basic-lti-launch-request',
      lti_version: 'LTI-1p0',
      oauth_callback: 'about:blank',
      resource_link_id: 'f9bd682c7e3484be224329884732c768b0ecc925',
      resource_link_title: 'Analytics Dashboard',
      roles: 'Instructor,urn:lti:instrole:ims/lis/Administrator',
      tool_consumer_info_product_family_code: 'canvas',
      tool_consumer_info_version: 'cloud',
      tool_consumer_instance_contact_email: 'notifications@',
      tool_consumer_instance_guid: '347bdbad81454c6f9ba0b6a433b9c2132253b3b8.127.0.0.2',
      tool_consumer_instance_name: 'UserName LastName',
      user_id: '8d7c3fd900ba9dd8b5cfd29a418744ff73b36990',
      oauth_signature: 'NsAOJzRMlmtsmnAnNtbtUlD5j7c='
    }
  end
  # rubocop:enable Metrics/MethodLength

  test 'should fail due to nonexistent consumer' do
    LtiConsumer.where(key: 'abc').delete_all

    post '/lti_launch', params: @params
    parsed = JSON.parse(@response.body)

    assert_response :forbidden
    assert_equal true, parsed.key?('error')
    assert_equal LtiLaunchInteractor::NO_SUCH_CONSUMER, parsed['error']
  end

  test 'should fail due to old oauth timestamp' do
    @params[:oauth_timestamp] = '1463491111'

    post '/lti_launch', params: @params
    parsed = JSON.parse(@response.body)

    assert_response :forbidden
    assert_equal LtiLaunchInteractor::TIMESTAMP_TOO_OLD, parsed['error']
  end

  test 'should fail oauth signature verification' do
    # this launch will fail because the params above come from a canvas request
    # which originated from a different url than the test request we're
    # performing now, so the signatures will be different

    post '/lti_launch', params: @params
    parsed = JSON.parse(@response.body)

    assert_response :forbidden
    assert_equal LtiLaunchInteractor::SIGNATURE_INVALID, parsed['error']
  end
end
