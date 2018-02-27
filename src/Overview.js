import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  componentDidUpdate(prevProps) {
    if(prevProps.server != this.props.server) {
      this.fetchData();
    }
  }

  fetchData() {
    fetch(this.props.server + '/data/overview').
      then(response => {
        return response.json();
      }).
      then(camelCaseKeys).
      then(json => {
        this.setState({
          totalVisitCount: json.totalVisitCount,
          mostRecentVisitDate: json.mostRecentVisitDate
        });
      }).
      catch(() => {
        this.setState({
          totalVisitCount: 'N/A',
          mostRecentVisitDate: 'N/A'
        });
      });
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

Overview.propTypes = {
  server: PropTypes.string.isRequired
};

export default Overview;
