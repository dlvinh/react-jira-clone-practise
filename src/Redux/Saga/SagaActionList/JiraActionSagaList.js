import { call, delay, fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { jiraAPI } from '../../../Services/JiraAPI';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { GET_ALL_CATEGORY_API, STORE_CATEGORY } from '../../ReduxTypeList/typeList';

const API = "http://casestudy.cyberlearn.vn/api/ProjectCategory";
function * getAllProjectCategories (){
    try{
        let {data,status} = yield call(()=>{
            return jiraAPI.getAllProjectCategories();
        })
        if (status === STATUS_SUCCESS){
            console.log(data);
            let action = {
                type: STORE_CATEGORY,
                categoryList: data.content
            }
            yield put(action);
        }
        
    }catch(err){
        console.log(err)
    }
} 

export function* listenGetAllProjectCategories() {
    yield takeLatest(GET_ALL_CATEGORY_API, getAllProjectCategories)
}