import { all } from 'redux-saga/effects';
import { listenSignInSagaAction } from './SagaActionList/ActionSagaList';

export function * rootSaga() {
    // getTaskAPI duoc dispacth ben button de rootSaga co the catch duoc
    yield all([
        listenSignInSagaAction(),
    ])
}