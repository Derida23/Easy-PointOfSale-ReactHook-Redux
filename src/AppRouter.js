import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './Component/Main/Login'
import SignUp from './Component/Main/SignUp'
import Dashboard from './Component/Main/Dashboard'

import {Provider} from 'react-redux';
import store from './Redux/store';

const AppRouter = () => (
  <Provider store={store}>
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
  </Provider>
)

export default AppRouter;
