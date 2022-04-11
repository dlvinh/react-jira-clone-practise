import { SELECT_STATUS, STORE_ALL_TASK_STATUS } from "../ReduxTypeList/typeList"

const initialState ={
    arrStatus:[],
}

export const TaskStatusStateReducer = (state= initialState, action)=>{
    switch(action.type){
        case STORE_ALL_TASK_STATUS:{
            return {...state,arrStatus: action.taskStatus};
        }
        default: return {...state};
    }
}