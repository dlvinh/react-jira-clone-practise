import { STORE_PRIORITY_LIST } from "../ReduxTypeList/typeList"

const initialState = {
    arrPriority:[]
}
export const PriorityStateReducer =( state= initialState, action)=>{
    switch(action.type){
        case STORE_PRIORITY_LIST:{
            return {...state,arrPriority:action.priorityList};
        }
        default: return {...state};
    }
}