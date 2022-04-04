import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_EDIT_FORM, SET_SUBMIT_EDIT_FORM, SUBMIT_EDIT_FORM } from "../ReduxTypeList/typeList"

const initialState = {
    visible: false,
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
        default: return { ...state }
    }
}
