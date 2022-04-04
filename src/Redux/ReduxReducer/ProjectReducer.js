/**
 * where we store individula projct innformation on redux
 * 
 */

import { BINDING_PROJECT_TO_REDUX } from "../ReduxTypeList/typeList";

const initialState = {
    // All properties should match with API so that it will be easier to use PUT method
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": 2
    }
}

export const ProjectStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case BINDING_PROJECT_TO_REDUX:{
            console.log("BINDING....",action.project);
            state.projectEdit = action.project;
            return {...state};
        }
        default: return { ...state };
    }
}