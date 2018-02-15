import './VisitsByPage.css';

import React, { Component } from 'react';

class VisitsByPage extends Component {
  render() {
    return (
      <div className="visits-by-page panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Visits by page:</h1>
        </div>

        <div className="panel-body">
          <div className="btn-group" role="group">
            <button type="button" id="day-button" className="btn btn-default active">
              1 day
            </button>
            <button type="button" id="week-button" className="btn btn-default">
              7 days
            </button>
            <button type="button" id="month-button" className="btn btn-default">
              30 days
            </button>
          </div>
        </div>

        <div className="page-chart"></div>
      </div>
    );
  }
}

export default VisitsByPage;
