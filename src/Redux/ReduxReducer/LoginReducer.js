import { LOGIN_USER_API } from "../ReduxTypeList/typeList";

const initialState = {
    isLogin: false
};
export const LoginStateReducer = (state = initialState ,  action)=>{
    switch(action.type){
        default: return {...state};
    }
}