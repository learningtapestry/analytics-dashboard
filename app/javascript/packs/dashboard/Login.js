import './Login.css'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const redirectUri = 'http://localhost:3001/dashboard';

    const oauth2Endpoint = 'http://localhost:3000/oauth2/authorize?' +
      'response_type=code&' +
      'client_id=abc123&' +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      'scope=photos&state=1234zyx';

    return (
      <div className="login panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Login with selected server:</h1>
        </div>

        <div className="panel-body">
          <div className="input-group">
            <button type="button" className='btn btn-default'>
              <a href={oauth2Endpoint}>OAuth Login</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  server: PropTypes.string.isRequired
};

export default Login;
