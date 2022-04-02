import { STORE_CATEGORY } from "../ReduxTypeList/typeList";

/**
 * Quan ly nguon du lieu tu API goi ve.
 * 
 */
let defaultState={
    arrProjectCategories:[ ],
    filterList:[] // use for ant design table filter function
}
export const JiraProjectStateReducer = (state=defaultState,action)=>{
    switch(action.type){
        case STORE_CATEGORY:{
            
            let newList =[];
            action.categoryList.map((item, index)=>{
                let newObj ={
                  text: item.projectCategoryName,
                  value:item.projectCategoryName,
                }
                newList.push(newObj)
             });
            state.filterList = newList;
            state.arrProjectCategories = action.categoryList;
            return {...state};
        }
        default: return{...state};
    }
}
