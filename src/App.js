import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import GraphResult from './pages/GraphResult'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/graph" component={GraphResult} />
      </Switch>
    </Router>
    
  );
}

export default App;
