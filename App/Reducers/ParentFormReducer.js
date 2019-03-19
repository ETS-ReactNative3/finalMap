//import actions from actions

import {
  Parent_Creat
} from '../actions/types';

const INITIAL_STATE = {
  
  ChildName: '',
  PhoneNumber: '',
  SocailSecurityNumber: '',
  Address: '',
  Job: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Parent_Creat:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
