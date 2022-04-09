import { STORE_TASK_TYPE } from "../ReduxTypeList/typeList";

const initialState = {
    arrTaskType:[]
};

export const TaskTypeStateReducer = (state= initialState, action)=>{
    switch(action.type){
        case STORE_TASK_TYPE: {
            return {...state,arrTaskType:action.taskList}
        }
        default: return {...state}
    }
}
