import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  parentFormRequest: ['data'],
  parentFormSuccess: ['payload'],
  parentFormFailure: null
})

export const ParentFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstName: '',
  FamilyName: '',
  PhoneNumber: '',
  ChildName:'',
  Age: '',
  address: '',
  SocailSecurityNumber: '',
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ParentFormSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARENT_FORM_REQUEST]: request,
  [Types.PARENT_FORM_SUCCESS]: success,
  [Types.PARENT_FORM_FAILURE]: failure
})
