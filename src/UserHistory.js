import React, { Component } from 'react';

import './UserHistory.css';

class UserHistory extends Component {
  render() {
    return (
      <div className="user-history panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">User history:</h1>
        </div>

        <div className="panel-body">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                Search
              </button>
            </span>
            <input type="text"
              className="user-search form-control"
              placeholder="Username"/>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHistory;
