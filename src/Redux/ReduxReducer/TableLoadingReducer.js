import { SET_TABLE_LOADING, STOP_TABLE_LOADING } from "../ReduxTypeList/typeList"

const initial ={
    tableLoading: true
}

export const TableLoadingState = (state=initial, action)=>{
    switch(action.type){
        case SET_TABLE_LOADING:{
            //console.log("setTtableLoading")
            state.tableLoading = true;
            return {...state};
        }   
        case STOP_TABLE_LOADING:{
            //console.log("stopTableLoading")
            state.tableLoading = false;
            return {...state};
        }
        default: return {...state}
    }
}