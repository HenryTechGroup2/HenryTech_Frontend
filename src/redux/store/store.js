import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducerFetch } from '../reducer/reducerFetch';
import reducerCar from '../reducer/reducerCar';
const reducer = combineReducers({
  reducerFetch,
  reducerCar,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
