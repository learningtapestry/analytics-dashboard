import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react';
import Overview from './Overview.js';
import UserHistory from './UserHistory.js';
import VisitsByPage from './VisitsByPage.js';

class App extends Component {
  render() {
    return (
      <div>
        <Overview/>
        <UserHistory/>
        <VisitsByPage/>
      </div>
    )
  }
}

export default App;
