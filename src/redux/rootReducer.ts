import { combineReducers } from 'redux';
import authReducer from './authReducer';
import offerReducer from './offerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  offers: offerReducer,
});

export default rootReducer;
