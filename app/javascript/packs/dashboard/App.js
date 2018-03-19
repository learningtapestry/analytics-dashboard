import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react';
import ServerSelector from './ServerSelector.js';
import Overview from './Overview.js';
import UserHistory from './UserHistory.js';
import VisitsByPage from './VisitsByPage.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      server: 'http://localhost:8080'
    };

    this.onServerChange = this.onServerChange.bind(this);
  }

  onServerChange(server) {
    this.setState({
      server: server
    });
  }

  render() {
    return (
      <div>
        <ServerSelector server={this.state.server}
          onServerChange={this.onServerChange}/>
        <Overview server={this.state.server}/>
        <UserHistory server={this.state.server}/>
        <VisitsByPage server={this.state.server}/>
      </div>
    )
  }
}

export default App;
