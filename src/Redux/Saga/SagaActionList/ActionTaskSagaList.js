import { call, delaydrs  , fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { TaskCallingApi, taskCallingApi } from '../../../Services/TaskCallingApi';
import { openNotification } from '../../../utilities/Notification';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { CLOSE_DRAWER, CREATE_NEW_TASK, GET_ALL_PROJECTS, GET_ALL_TASK_STATUS, GET_ALL_USERS, GET_PRIORITY_LIST, GET_PROJECT_INFO_BY_ID, GET_TASK_DETAIL_BY_ID, GET_TASK_TYPE, STORE_ALL_TASK_STATUS, STORE_ALL_USERS, STORE_PRIORITY_LIST, STORE_TASK_DETAIL, STORE_TASK_TYPE, UPDATE_DESCRIPTION, UPDATE_DESCRIPTION_TO_API, UPDATE_STATUS, UPDATE_STATUS_TO_API } from '../../ReduxTypeList/typeList';
  // ========== GET TASK TYPE ==========
export function * getTaskTypeSaga(){
  
    yield console.log("Getting task type");
    try {
        let {data,status} = yield call(()=>{
            return taskCallingApi.getTaskTypeService();
        })
        if (status === STATUS_SUCCESS){
            console.log("task type", data.content);
            yield put({
                type: STORE_TASK_TYPE,
                taskList: data.content
            })
        }
        
    } catch (error) {   
        console.error(error);
    }
}
export function * listenGetTaskTypeSaga(){
    yield takeLatest(GET_TASK_TYPE,getTaskTypeSaga);
}

// ========== GET TASK PRIORITY ==========
export function * getAllPrioritySaga(){
    yield console.log("Getting priority ....");
    try {
        let {data,status} = yield call(()=>{
            return taskCallingApi.getTaskPriorityService();
        })
        if (status === STATUS_SUCCESS){
            console.log("task priority", data.content);
            yield put({
                type: STORE_PRIORITY_LIST,
                priorityList: data.content
            })
        }
        
    } catch (error) {   
        console.error(error);
    }
}
export function * listenGetAllPrioritySaga(){
    yield takeLatest(GET_PRIORITY_LIST,getAllPrioritySaga)
}

// ========== GET TASK STATUS ===========
export function * getAllTaskStatus(){
    yield console.log("Getting status ....");
    try {
        let {data,status} = yield call(()=>{
            return taskCallingApi.getTaskStatusService();
        })
        if (status === STATUS_SUCCESS){
            console.log("task status", data.content);
            yield put({
                type: STORE_ALL_TASK_STATUS,
                taskStatus: data.content
            })
        }
        
    } catch (error) {   
        console.error(error);
    }
}
export function * listengetAllTaskStatus(){
    yield takeLatest(GET_ALL_TASK_STATUS,getAllTaskStatus)
}


// ========== CREATE NEW TASK ==========
export function * createNewTask(action){
    yield console.log("Creating new task ....",action.newTask);
    yield put({type:"IS_LOADING"});
    try {
        let {data, status} = yield call(()=>{
            return taskCallingApi.createTaskService(action.newTask);
        })
        if (status === STATUS_SUCCESS){
            openNotification("success","top","Create Successful !!!");
            yield put({
                type:CLOSE_DRAWER
            })
            yield put({
                type: GET_PROJECT_INFO_BY_ID,
                projectId: action.newTask.projectId
            })
        }
    } catch (error) {   
        console.error(error);
        openNotification("error","top","Create Fail !!!");
    }
    yield put({type:"NO_LOADING"})
}
export function * listenCreateNewTask(){
    yield takeLatest(CREATE_NEW_TASK,createNewTask)
}


// ============= GET TASK DETAIL BY ID ============
export function * getTaskDetailById (action){
    yield console.log(`Saga - getting task ${action.id} detail`);
    try {
        let {data,status} = yield call(()=>{
            return taskCallingApi.getTaskDetailByIdService(action.id)
        })
        if (status === STATUS_SUCCESS){
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
export function * listenGetTaskDetailById(){
    yield takeLatest(GET_TASK_DETAIL_BY_ID, getTaskDetailById);
}

//========= UPDATE STATUS TASK ========
export function * updateTaskStatus (action){
    yield console.log(`Saga-update task ${action}`);
    try {
        let {data,status}= yield call(()=>{
            return taskCallingApi.updateTaskStatus(action.newStatus);
        })
        if(status === STATUS_SUCCESS){
            console.log("STATUS UPDATE SUCCESS", data.content);
            yield put({
                type: GET_PROJECT_INFO_BY_ID,
                projectId: action.newStatus.projectId
            });
        }
    } catch (error) {
        console.log(error)
    }
}
export function * listenUpdateTaskStatus(){
    yield takeLatest(UPDATE_STATUS_TO_API,updateTaskStatus);
}

// ====== UPDATE TASK DESRIPTION ========
// export function * updateTaskDescription(action){
//     yield console.log("saga-updateTaskDescription",action);
//     try{
//         let {status,data} = yield call(()=>{
//             return taskCallingApi.updateTaskDescriptionService(action.newDescription);
//         }) 
//         if (status === STATUS_SUCCESS){
//             yield put({
//                 type: UPDATE_DESCRIPTION,
//                 newDescription: action.newDescription
//             })
//         }else{
//             console.error(data);
//         }
//     }catch(err){
//         console.log(err);
//     }
// }
// export function * listenUpdateTaskDescription(){
//     yield takeLatest(UPDATE_DESCRIPTION_TO_API,updateTaskDescription);
// }