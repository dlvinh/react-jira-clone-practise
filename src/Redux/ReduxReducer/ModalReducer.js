import { CLOSE_DRAWER, OPEN_CREATE_TASK_FORM, OPEN_DRAWER, OPEN_EDIT_FORM, SET_SUBMIT_EDIT_FORM, SET_SUBMIT_EDIT_USER, SET_SUBMIT_NEW_TASK, SUBMIT_EDIT_FORM } from "../ReduxTypeList/typeList"

const initialState = {
    visible: false,
    title: "",
    // this state will get all information of any component to change the content of drawer (modal)
    componentContent: <p>Default</p>,
    callBackSubmitHandler: ()=>{
        alert("submitDemo")
    }
}

export const ModalStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:{
            state.visible = true;
            return {...state};
        }
        case CLOSE_DRAWER:{
            state.visible = false;
            return {...state};
        }
        case OPEN_EDIT_FORM:{
            state.visible = true;
            state.title = action.title;
            state.componentContent = action.content;

            return {...state}
        }
        case SUBMIT_EDIT_FORM:{
            
            return {...state}
        }
        case SET_SUBMIT_EDIT_FORM:{
            console.log("Submitting.....");
            state.callBackSubmitHandler = action.submitHandler;
            return {...state};
        }
        // OPEN MODAL FOR CREATE_TASK_FORM
        case OPEN_CREATE_TASK_FORM:{
            console.log("Open create task form....");
            state.visible = true;
            state.title = action.title;
            state.componentContent = action.content;
            return {...state};
        }
        case SET_SUBMIT_NEW_TASK:{
            state.callBackSubmitHandler = action.submitHandler;
            return {...state}
        }
        case SET_SUBMIT_EDIT_USER:{
            console.log("setsubmitedituser");
            state.callBackSubmitHandler = action.submitHandler;
            return {...state};
        }
        default: return { ...state }
    }
}
