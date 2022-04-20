import { LOGIN_USER_API, SIGN_UP, STORE_USER_REDUCER } from "../ReduxTypeList/typeList"

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

export const SignUpUserAction = (userInfo,...arg)=>{
    return {
        type: SIGN_UP,
        userInfo: {
            email: userInfo.email,
            passWord: userInfo.password,
            name: userInfo.name,
            phoneNumber: userInfo.phone
        },
        option: arg
    }
}