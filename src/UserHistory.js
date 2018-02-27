import './UserHistory.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import camelCaseKeys from 'camelcase-keys';

class UserHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      history: []
    }
  }

  onUserSearchKeyDown(evt) {
    if(evt.key === 'Enter') {
      this.fetchUserHistory();
    }
  }

  fetchUserHistory() {
    const user = document.querySelector('.user-search').value;

    fetch(this.props.server + '/data/user_history?user=' + user).
      then(response => {
        return response.json();
      }).
      then(camelCaseKeys).
      then(json => {
        this.setState({
          history: json
        });
      }).
      catch(() => {
        console.error('Failed to fetch analytics data from server');
      });
  }

  renderHistory() {
    if(this.state.history.length > 0) {
      return (
        <table>
          <tbody>
            {this.state.history.map((entry, i) => {
              return (
                <tr key={i}>
                  <td>{entry.url}</td>
                  <td>{entry.dateVisited}</td>
                  <td>{entry.timeActive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    else {
      return 'No history found for that user';
    }
  }

  render() {
    return (
      <div className="user-history panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">User history:</h1>
        </div>

        <div className="panel-body">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-default"
                type="button"
                onClick={this.fetchUserHistory.bind(this)}>

                Search
              </button>
            </span>
            <input type="text"
              className="user-search form-control"
              placeholder="Username" onKeyDown={this.onUserSearchKeyDown.bind(this)}/>
          </div>

          <div className="history">
            {this.renderHistory()}
          </div>
        </div>
      </div>
    );
  }
}

UserHistory.propTypes = {
  server: PropTypes.string.isRequired
};

export default UserHistory;
