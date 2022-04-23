import {applyMiddleware, combineReducers, createStore} from 'redux';
// import reduxThunk from 'redux-thunk';
// import { appStateReducer } from './reducers/appStateReducer';

import { LoginStateReducer } from './ReduxReducer/LoginReducer';

import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './Saga/rootSaga';
import {HistoryStateReducer } from './ReduxReducer/HistoryReducer';
import { UserStateReducer } from './ReduxReducer/UserReducer';
import {JiraProjectStateReducer} from './ReduxReducer/JiraProjectReducer';
// import { loadingStateReducer } from './reducers/loadingStateReducer';
import { LoadingStateReducer } from './ReduxReducer/LoadingReducer';
import { ProjectManagementStateReducer } from './ReduxReducer/ProjectManagementReducer';
import {ModalStateReducer} from "./ReduxReducer/ModalReducer"
import { ProjectStateReducer } from './ReduxReducer/ProjectReducer';
import { TaskTypeStateReducer } from './ReduxReducer/TaskTypeReducer';
import { PriorityStateReducer } from './ReduxReducer/PriorityReducer';
import { TaskStatusStateReducer } from './ReduxReducer/TaskStatusReducer';
import { TaskStateReducer } from './ReduxReducer/TaskReducer';
import { TableLoadingState } from './ReduxReducer/TableLoadingReducer';

// Configure redux Saga;
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    // state here
    LoginStateReducer,
    HistoryStateReducer,
    UserStateReducer,
    JiraProjectStateReducer,
    LoadingStateReducer,
    ProjectManagementStateReducer,
    ModalStateReducer,
    ProjectStateReducer,
    TaskTypeStateReducer,
    PriorityStateReducer,
    TaskStatusStateReducer,
    TaskStateReducer,
    TableLoadingState,
    // loadingState: loadingStateReducer
})



const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga)

export default store;