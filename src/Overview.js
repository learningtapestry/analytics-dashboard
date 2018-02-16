import React, { Component } from 'react';
import camelCaseKeys from 'camelcase-keys';

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalVisitCount: null,
      mostRecentVisit: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const analyticsUrl = 'http://localhost:8080';

    const request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      var response = camelCaseKeys(request.response);

      this.setState({
        totalVisitCount: response.totalVisitCount,
        mostRecentVisitDate: response.mostRecentVisitDate
      });
    });

    request.addEventListener('error', () => {
      console.error('Failed to fetch analytics data from server');
    });

    request.responseType = 'json';
    request.open('GET', analyticsUrl + '/data/overview');
    request.send();
  }

  render() {
    return (
      <div className="overview panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Overview:</h1>
        </div>

        <div className="panel-body">
          <p>
            Total visits:
            <span className="total-visit-count"> {this.state.totalVisitCount}</span>
          </p>
          <p>
            Most recent visit:
            <span className="most-recent-visit"> {this.state.mostRecentVisitDate}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Overview;
