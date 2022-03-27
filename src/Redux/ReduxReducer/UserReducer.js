// Manage all user token and all user information from backend API 
// Moi lan dang nhap duoc luu vao local store 
// De de dang su dung cac gia tri cua user va goi o cac component khac
// vi React la SPA nen Reducer se bi reset moi lan khi F5, 
// viec chuyen gia tri cua user qua lai giua cac components se de dang hon khi user info 
// dc luu tren store
// Moi khi F5 thi userLogin luon duoc lay gia tri thi localStore ve => dam bao ko cac gia tri cua user luon duoc render

let userLoginInfo = {

}

if (localStorage.getItem("userLogin")){
    userLoginInfo = JSON.parse(localStorage.getItem("userLogin"));
}

const stateDefault ={
    user:userLoginInfo
} ;

export const UserStateReducer  = (state= stateDefault, action)=>{
    console.log(state);
    switch(action.type){
        case 'ADD_USER_TO_REDUCER':{
            state.user = action.user
        }
        default: return {...state};
    }
}