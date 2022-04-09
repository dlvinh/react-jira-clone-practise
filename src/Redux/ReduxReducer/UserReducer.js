// Manage all user token and all user information from backend API 
// Moi lan dang nhap duoc luu vao local store 
// De de dang su dung cac gia tri cua user va goi o cac component khac
// vi React la SPA nen Reducer se bi reset moi lan khi F5, 
// viec chuyen gia tri cua user qua lai giua cac components se de dang hon khi user info 
// dc luu tren store
// Moi khi F5 thi userLogin luon duoc lay gia tri thi localStore ve => dam bao ko cac gia tri cua user luon duoc render

import { STORE_MEMBER_LIST, STORE_USER_REDUCER } from "../ReduxTypeList/typeList";

let userLoginInfo = {
}
let isLogin  = false;

if (localStorage.getItem("userLogin")){
    isLogin = true;
    userLoginInfo = JSON.parse(localStorage.getItem("userLogin"));
}

const stateDefault ={
    user:userLoginInfo,
    isLogin: isLogin,
    memberList: []
};

export const UserStateReducer  = (state= stateDefault, action)=>{
    switch(action.type){
        case STORE_USER_REDUCER:{
            console.log(action)
            state.user = action.user;
            state.isLogin = true;
            return {...state};
        }
        case STORE_MEMBER_LIST:{
            state.memberList = action.list;
            console.log("redux - store member list",state)
            return {...state};
        }
        default: return {...state};
    }
}