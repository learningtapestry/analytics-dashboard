import './VisitsByPage.css';

import React, { Component } from 'react';
import * as d3 from 'd3';

class VisitsByPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRange: 'day',
      visitsByPage: null
    };
  }

  componentDidMount() {
    this.fetchData(this.state.timeRange);
  }

  componentDidUpdate() {
    this.renderBarChart(this.state.visitsByPage);
  }

  fetchData(timeRange) {
    const analyticsUrl = 'http://localhost:8080';

    fetch(analyticsUrl + '/data/visits_by_page?range=' + timeRange).
      then(response => {
        return response.json();
      }).
      then(json => {
        this.setState({
          visitsByPage: json
        });
      }).
      catch(() => {
        console.error('Failed to fetch analytics data from server');
      });
  }

  widthFactor(visitsByPage) {
    const mostVisitedPage = Object.entries(visitsByPage).reduce((acc, current) => {
      return current[1] > acc[1] ? current : acc;
    });

    return (document.querySelector('.visits-by-page').clientWidth - 20) /
      mostVisitedPage[1];
  }

  renderBarChart(visitsByPage) {
    document.querySelector('.page-chart').innerHTML = null;

    if(Object.keys(visitsByPage).length === 0) {
      return;
    }

    const urls = Object.keys(visitsByPage);

    const widthFactor = this.widthFactor(visitsByPage);

    const bar = d3.
      select('.page-chart').
      selectAll('div').
      data(urls).
      enter().
      append('div').
      style('width', function(url) {
        return (widthFactor * visitsByPage[url]) + 'px';
      });

    bar.
      append('span').
      classed('url', true).
      text(function(url) {
        return url;
      });

    bar.
      append('span').
      classed('count', true).
      text(function(url) {
        return visitsByPage[url];
      });
  }

  onTimeRangeButtonClick(timeRange) {
    this.setState({
      timeRange
    });

    this.fetchData(timeRange);
  }

  render() {
    const btnClass = 'btn btn-default ';

    return (
      <div className="visits-by-page panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title">Visits by page:</h1>
        </div>

        <div className="panel-body">
          <div className="btn-group" role="group">
            <button type="button"
              className={btnClass + (this.state.timeRange === 'day' ? 'active' : null)}
              onClick={this.onTimeRangeButtonClick.bind(this, 'day')}>

              1 day
            </button>
            <button type="button"
              className={btnClass + (this.state.timeRange === 'week' ? 'active' : null)}
              onClick={this.onTimeRangeButtonClick.bind(this, 'week')}>

              7 days
            </button>
            <button type="button"
              className={btnClass + (this.state.timeRange === 'month' ? 'active' : null)}
              onClick={this.onTimeRangeButtonClick.bind(this, 'month')}>

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
