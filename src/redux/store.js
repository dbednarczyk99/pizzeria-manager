import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tablesRedux';

const subreducers = {
    tables: tablesReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

console.log("Initial State: ", initialState);

export default store;