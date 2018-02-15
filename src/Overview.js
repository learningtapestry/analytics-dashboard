import React, { Component } from 'react';

class Overview extends Component {
  render() {
    const analyticsUrl = 'http://localhost:8080';

    const request = new XMLHttpRequest();

    request.addEventListener('load', function() {
      console.log('The transfer is complete.');
    });

    request.addEventListener('error', function() {
      console.error('Failed to fetch analytics data from server');
    });

    request.open('GET', analyticsUrl + '/data/overview');
    request.send();

    return (
      <div className="total-visits panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Total visits:</h1>
        </div>

        <div className="panel-body">
          <p>Total visits: <span className="total-visit-count"></span></p>
          <p>Most recent visit: <span className="most-recent-visit"></span></p>
        </div>
      </div>
    );
  }
}

export default Overview;
