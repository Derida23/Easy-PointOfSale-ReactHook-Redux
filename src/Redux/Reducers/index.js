import {combineReducers} from 'redux';

import redAuth from './redAuth';
import redProduct from './redProduct';
const appReducer = combineReducers ({

  redAuth,
  redProduct

});

export default appReducer;
