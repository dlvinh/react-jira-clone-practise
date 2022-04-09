import { call, delay, fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { taskCallingApi } from '../../../Services/TaskCallingApi';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { GET_ALL_USERS, GET_PRIORITY_LIST, GET_TASK_TYPE, STORE_ALL_USERS, STORE_PRIORITY_LIST, STORE_TASK_TYPE } from '../../ReduxTypeList/typeList';
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

