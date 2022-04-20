import { all } from 'redux-saga/effects';
import { listenDeleteUser, listenSignInSagaAction, listenSignUp } from './SagaActionList/ActionSagaList';
import { listenCreateNewTask, listenDeleteComment, listenGetAllPrioritySaga, listengetAllTaskStatus, listenGetTaskDetailById, listenGetTaskTypeSaga, listenUpdateComment, listenUpdatePrjectTaskToAPI, listenUpdateTaskStatus, listenUploadComment } from './SagaActionList/ActionTaskSagaList';
import {  listenGetAllProjectCategories,listenCreateProjectAuthorize, listenGetAllProjects, 
    listenUpdateProject, listenDeleteProject, listenGetAllMembers, listenAssignMemberToProject, listenDeleteMemberFromProject, 
    listenGetProjectInfo } from './SagaActionList/JiraActionSagaList';

export function * rootSaga() {
    // getTaskAPI duoc dispacth ben button de rootSaga co the catch duoc
    yield all([
        listenSignInSagaAction(),
        listenSignUp(),
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
        listenUpdatePrjectTaskToAPI(),
        listenUploadComment(),
        listenDeleteComment(),
        listenUpdateComment(),
        listenDeleteUser()
    ])
}