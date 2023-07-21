import {combineReducers, createStore} from 'redux';
import variabelReducer from './reducer/variableReducer';
import resultReducer from './reducer/resultReducer';
import patientReducer from './reducer/patientReducer';

const rootReducer = combineReducers({
  variabelReducer: variabelReducer,
  resultReducer: resultReducer,
  patientReducer: patientReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
