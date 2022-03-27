import { LOGIN_USER_API, STORE_USER_REDUCER } from "../ReduxTypeList/typeList"

export const LoginUserAction = (user)=>{
    return {
        type: LOGIN_USER_API,
        userLogin:{
            email: user.email,
            password: user.password,
        }
    }
}
// ------------ To store user info or user token in UserReducer
export const StoreUserInReducerAction = (user)=>{
    return {
        type: STORE_USER_REDUCER,
        user: user
    }
}