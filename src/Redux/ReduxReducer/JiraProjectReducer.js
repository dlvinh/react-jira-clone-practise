import { STORE_CATEGORY } from "../ReduxTypeList/typeList";

/**
 * Quan ly nguon du lieu tu API goi ve.
 * 
 */
let defaultState={
    arrProjectCategories:[ ]
}

export const JiraProjectStateReducer = (state=defaultState,action)=>{
    switch(action.type){
        case STORE_CATEGORY:{
            state.arrProjectCategories = action.categoryList;
            return {...state};
        }
        default: return{...state};
    }
}
