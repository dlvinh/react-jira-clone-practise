import Axios  from "axios";
import {call, delay, fork, takeLatest, put,take,select } from 'redux-saga/effects';
import { LOGIN_USER_API } from "../../ReduxTypeList/typeList";



const _API = "http://casestudy.cyberlearn.vn/swagger/index.html";
// ACTION SAGA co gia tri tra ve la 1 function de redux dispact duoc
function * signIn(action){
    /**
     * Step 1: xu ly Signin API de tao token
     * Step 2: Step 1: xu ly Signin API de tao token
     * Step 3: Khi sign in thanh cong se redirect toi particular page
     * Step 5: Xu ly Redirect
     * Step 4: Redirect to Home page by 
     */
    try{
        //Step 1: xu ly Signin API de tao token
        let response = yield call(()=>{
            return Axios({
                url: 'http://casestudy.cyberlearn.vn/api/Users/signin',
                method: 'POST',
                data:{email:action.userLogin.email,
                password: action.userLogin.password}
            })
        });
        if (response.status === 200){
            //Step 2: Step 1: xu ly Signin API de tao token
            console.log(response.data.message)
            let token = response.data.content.accessToken;
            localStorage.setItem("Token", token);
            localStorage.setItem("userLogin", JSON.stringify(response.data.content));
            console.log(action)
            // Step 3 Xu ly Redirect
            //action.userLogin.history.push('/home') // entry level =D
            let history = yield select(state=> state.HistoryStateReducer.history);
            history.push('/home');
        }
    }catch(err){
        console.error(err)
    }
}
export function * listenSignInSagaAction(){
    yield takeLatest(LOGIN_USER_API,signIn)
}