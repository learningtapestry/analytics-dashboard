import './ServerSelector.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServerSelector extends Component {
  constructor(props) {
    super(props);

    this.onServerMenuChange = this.onServerMenuChange.bind(this);
  }

  onServerMenuChange() {
  }

  render() {
    return (
      <div className="server-selector panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Analytics Server:</h1>
        </div>

        <div className="panel-body">
          <select name="server-menu"
            className="form-control"
            value={this.props.server}
            onChange={this.onServerMenuChange}>

            <option value="https://localhost:8080">
              Localhost
            </option>
            <option value="https://cobra.analytics.qa.c66.me">
              Development
            </option>
            <option value="https://pelican.analytics-606785.staging.c66.me">
              Staging
            </option>
            <option value="https://hare.analytics-257436.c66.me">
              Production
            </option>
          </select>
        </div>
      </div>
    );
  }
}

ServerSelector.propTypes = {
  server: PropTypes.string.isRequired
};

export default ServerSelector;
