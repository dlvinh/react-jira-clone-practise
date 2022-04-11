import { all } from 'redux-saga/effects';
import { listenSignInSagaAction } from './SagaActionList/ActionSagaList';
import { listenCreateNewTask, listenGetAllPrioritySaga, listengetAllTaskStatus, listenGetTaskDetailById, listenGetTaskTypeSaga, listenUpdateTaskStatus } from './SagaActionList/ActionTaskSagaList';
import {  listenGetAllProjectCategories,listenCreateProjectAuthorize, listenGetAllProjects, 
    listenUpdateProject, listenDeleteProject, listenGetAllMembers, listenAssignMemberToProject, listenDeleteMemberFromProject, 
    listenGetProjectInfo } from './SagaActionList/JiraActionSagaList';

export function * rootSaga() {
    // getTaskAPI duoc dispacth ben button de rootSaga co the catch duoc
    yield all([
        listenSignInSagaAction(),
        listenGetAllProjectCategories(),
        // listenCreateProject(),
        listenCreateProjectAuthorize(),
        listenGetAllProjects(),
        listenUpdateProject(),
        listenDeleteProject(),
        listenGetAllMembers(),
        listenAssignMemberToProject(),
        listenDeleteMemberFromProject(),
        listenGetProjectInfo(),
        listenGetTaskTypeSaga(),
        listenGetAllPrioritySaga(),
        listenCreateNewTask(),
        listengetAllTaskStatus(),
        listenGetTaskDetailById(),
        listenUpdateTaskStatus(),
    ])
}