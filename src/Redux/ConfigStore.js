import {applyMiddleware, combineReducers, createStore} from 'redux';
// import reduxThunk from 'redux-thunk';
// import { appStateReducer } from './reducers/appStateReducer';

import { LoginStateReducer } from './ReduxReducer/LoginReducer';

import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './Saga/rootSaga';
import {HistoryStateReducer } from './ReduxReducer/HistoryReducer';
import { UserStateReducer } from './ReduxReducer/UserReducer';
// import { loadingStateReducer } from './reducers/loadingStateReducer';

// Configure redux Saga;
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    // state here
    LoginStateReducer,
    HistoryStateReducer,
    UserStateReducer
    // loadingState: loadingStateReducer
})



const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga)

export default store;