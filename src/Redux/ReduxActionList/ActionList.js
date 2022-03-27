import { LOGIN_USER_API } from "../ReduxTypeList/typeList"

export const LoginUserAction = (user)=>{
    return {
        type: LOGIN_USER_API,
        userLogin:{
            email: user.email,
            password: user.password,
        }
    }
}