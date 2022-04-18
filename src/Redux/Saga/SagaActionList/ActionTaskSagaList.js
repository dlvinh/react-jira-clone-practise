import { call, delaydrs, fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { TaskCallingApi, taskCallingApi } from '../../../Services/TaskCallingApi';
import { openNotification } from '../../../utilities/Notification';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { CHANGE_STATUS, CLOSE_DRAWER, CREATE_NEW_TASK, GET_ALL_PROJECTS, 
    DELETE_COMMENT,
    GET_ALL_TASK_STATUS, GET_ALL_USERS, GET_PRIORITY_LIST, GET_PROJECT_INFO_BY_ID, GET_TASK_DETAIL_BY_ID, GET_TASK_TYPE, REMOVE_ASSIGNESS, STORE_ALL_TASK_STATUS, STORE_ALL_USERS, STORE_PRIORITY_LIST, STORE_TASK_DETAIL, STORE_TASK_TYPE, UPDATE_ASSIGNESS, UPDATE_DESCRIPTION, UPDATE_DESCRIPTION_TO_API, UPDATE_ESTIMATE_TIME, UPDATE_PRIORITY, UPDATE_STATUS, UPDATE_STATUS_TO_API, UPDATE_TASK_TO_API, UPLOAD_COMMENT, UPDATE_COMMENT } from '../../ReduxTypeList/typeList';
// ========== GET TASK TYPE ==========
export function* getTaskTypeSaga() {

    yield console.log("Getting task type");
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.getTaskTypeService();
        })
        if (status === STATUS_SUCCESS) {
            //console.log("task type", data.content);
            yield put({
                type: STORE_TASK_TYPE,
                taskList: data.content
            })
        }

    } catch (error) {
        console.error(error);
    }
}
export function* listenGetTaskTypeSaga() {
    yield takeLatest(GET_TASK_TYPE, getTaskTypeSaga);
}

// ========== GET TASK PRIORITY ==========
export function* getAllPrioritySaga() {
    yield console.log("Getting priority ....");
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.getTaskPriorityService();
        })
        if (status === STATUS_SUCCESS) {
            //console.log("task priority", data.content);
            yield put({
                type: STORE_PRIORITY_LIST,
                priorityList: data.content
            })
        }

    } catch (error) {
        console.error(error);
    }
}
export function* listenGetAllPrioritySaga() {
    yield takeLatest(GET_PRIORITY_LIST, getAllPrioritySaga)
}

// ========== GET TASK STATUS ===========
export function* getAllTaskStatus() {
    yield console.log("Getting status ....");
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.getTaskStatusService();
        })
        if (status === STATUS_SUCCESS) {
            //console.log("task status", data.content);
            yield put({
                type: STORE_ALL_TASK_STATUS,
                taskStatus: data.content
            })
        }

    } catch (error) {
        console.error(error);
    }
}
export function* listengetAllTaskStatus() {
    yield takeLatest(GET_ALL_TASK_STATUS, getAllTaskStatus)
}


// ========== CREATE NEW TASK ==========
export function* createNewTask(action) {
    yield console.log("Creating new task ....", action.newTask);
    yield put({ type: "IS_LOADING" });
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.createTaskService(action.newTask);
        })
        if (status === STATUS_SUCCESS) {
            openNotification("success", "top", "Create Successful !!!");
            yield put({
                type: CLOSE_DRAWER
            })
            yield put({
                type: GET_PROJECT_INFO_BY_ID,
                projectId: action.newTask.projectId
            })
        }
    } catch (error) {
        console.error(error);
        openNotification("error", "top", "Create Fail !!!");
    }
    yield put({ type: "NO_LOADING" })
}
export function* listenCreateNewTask() {
    yield takeLatest(CREATE_NEW_TASK, createNewTask)
}


// ============= GET TASK DETAIL BY ID ============
export function* getTaskDetailById(action) {
    yield console.log(`Saga - getting task ${action.id} detail`);
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.getTaskDetailByIdService(action.id)
        })
        if (status === STATUS_SUCCESS) {
            yield console.log(data.content);
            yield put({
                type: STORE_TASK_DETAIL,
                task: data.content
            })
        }
    } catch (error) {
        yield console.log(error)
    }
}
export function* listenGetTaskDetailById() {
    yield takeLatest(GET_TASK_DETAIL_BY_ID, getTaskDetailById);
}

//========= UPDATE STATUS TASK ========
export function* updateTaskStatus(action) {
    yield console.log(`Saga-update task ${action}`);
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.updateTaskStatus(action.newStatus);
        })
        if (status === STATUS_SUCCESS) {
            //console.log("STATUS UPDATE SUCCESS", data.content);
            yield put({
                type: GET_PROJECT_INFO_BY_ID,
                projectId: action.newStatus.projectId
            });
        }
    } catch (error) {
        console.log(error)
    }
}
export function* listenUpdateTaskStatus() {
    yield takeLatest(UPDATE_STATUS_TO_API, updateTaskStatus);
}
// UPDATE WHOLE PROJECT TO API
export function* updateProjectTaskToAPI(action) {

    // Vi dispatch ben components are asynchronous = > nen ta ko biet duoc cai nao se xay ra truoc.
    // ideally thi se store len reducer de lam thay doi state ben trong form 
    // sau do la dispatch len api de update giao dien ben ngoai on real time
    switch (action.actionType) {
        case UPDATE_STATUS: {
            yield put({
                type: UPDATE_STATUS,
                newStatusId: action.data
            })
        }; break;
        case UPDATE_PRIORITY: {
            yield put({
                type: UPDATE_PRIORITY,
                newPriority: action.data
            })
        }; break;
        case UPDATE_DESCRIPTION: {
            yield put({
                type: UPDATE_DESCRIPTION,
                newDescription: action.data
            })
        }; break;
        case UPDATE_ESTIMATE_TIME: {
            yield put({
                type: UPDATE_ESTIMATE_TIME,
                newTime: action.data
            })
        }; break;
        case UPDATE_ASSIGNESS: {
            yield put({
                type: UPDATE_ASSIGNESS,
                newAssigness: action.data
            })
        }; break;
        case REMOVE_ASSIGNESS: {
            yield put({
                type: REMOVE_ASSIGNESS,
                assignessId: action.data
            })
        }; break;
    }
    const updatedTask = yield select(state => state.TaskStateReducer.taskDetailModal);
    let newlistUserAsign = updatedTask.assigness.map((item, index) => {
        return item.id
    })
    console.log("updated task after change", { ...updatedTask, listUserAsign: newlistUserAsign });
    try {
        let { status, data } = yield call(() => {
            return taskCallingApi.updateEntireTaskService({ ...updatedTask, listUserAsign: newlistUserAsign });
        })
        if (status === STATUS_SUCCESS) {
            yield put({
                type: GET_PROJECT_INFO_BY_ID,
                projectId: updatedTask.projectId
            })
        }
        if (status !== STATUS_SUCCESS) {
            console.error(data.content);
        }
    } catch (err) {
        console.error(err)
    }
}
export function* listenUpdatePrjectTaskToAPI() {
    yield takeLatest(UPDATE_TASK_TO_API, updateProjectTaskToAPI);
}

//======== UPLOAD COMMENT ==========
export function* uploadComment(action) {
    yield console.log("uploading new comment ....", action);
    try {
        let { data, status } = yield call(() => {
            return taskCallingApi.uploadTaskCommentService(action.newComment);
        })
        if (status === STATUS_SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_BY_ID,
                id: action.newComment.taskId
            })
        } else {
            console.error(data.content)
        }
    } catch (error) {
        console.error(error);
    }
}
export function* listenUploadComment() {
    yield takeLatest(UPLOAD_COMMENT, uploadComment);
}

// ======== DELETE COMMENT ===========
export function * deleteComment (action){
    yield console.log("Deleteing comment", action);
    try{
        let {data,status} = yield call(()=>{
            return taskCallingApi.deleteTaskCommentService(action.data.commentId);
        })
        if (status === STATUS_SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_BY_ID,
                id: action.data.taskId
            })
        } else {
            console.error(data.content)
        }
    }catch(err){
        console.log(err);
    }
}
export function * listenDeleteComment(){
    yield takeLatest(DELETE_COMMENT, deleteComment);
}

//=========== UPDATE COMMENT =============
export function * updateComment (action){
    yield console.log("updating comment....",action);
    try {
        let {data,status} = yield call(()=>{
            return taskCallingApi.updateTaskCommentService(action.data);
        })
        if (status === STATUS_SUCCESS){
            yield put({
                type: GET_TASK_DETAIL_BY_ID,
                id: action.data.taskId
            })
        }else{
            yield console.log(data.content);
        }
    } catch (error) {
        console.error(error)
    }
}
export function * listenUpdateComment(){
    yield takeLatest(UPDATE_COMMENT,updateComment);
}