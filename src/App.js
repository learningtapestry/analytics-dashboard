import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react';
import ServerSelector from './ServerSelector.js';
import Overview from './Overview.js';
import UserHistory from './UserHistory.js';
import VisitsByPage from './VisitsByPage.js';

class App extends Component {
  render() {
    return (
      <div>
        <ServerSelector/>
        <Overview/>
        <UserHistory/>
        <VisitsByPage/>
      </div>
    )
  }
}

export default App;
