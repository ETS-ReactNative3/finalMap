import { combineReducers } from 'redux'

import ParentFormReducer from './ParentFormReducer.js'
export default combineReducers({
  ParentsForm: ParentFormReducer;

});
