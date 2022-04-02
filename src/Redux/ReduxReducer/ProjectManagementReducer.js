/**
 * All projects that should be gotten from API will store in this Reducer.
 * API: http://casestudy.cyberlearn.vn/api/Project/getAllProject
 */

import {STORE_ALL_PROJECTS } from "../ReduxTypeList/typeList";


const stateDefault ={
    projectList:[]
};


export const ProjectManagementStateReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case STORE_ALL_PROJECTS:{
            state.projectList = action.projectList;
            return {...state};
        }
        default: return {...state};
    }
}
