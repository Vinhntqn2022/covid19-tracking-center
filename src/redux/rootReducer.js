import { combineReducers } from 'redux';
import { GlobalReducer } from './slices/globalSlice';
import { AuthReducer } from './slices/authSlice';

const rootReducer = combineReducers({
  GlobalReducer,
  AuthReducer,
});
export default rootReducer;
