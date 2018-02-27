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
  }

  render() {
    return (
      <div>
        <ServerSelector server={this.state.server}/>
        <Overview server={this.state.server}/>
        <UserHistory server={this.state.server}/>
        <VisitsByPage server={this.state.server}/>
      </div>
    )
  }
}

export default App;
