import { call, delay, fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { jiraAPI } from '../../../Services/JiraAPI';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { GET_ALL_CATEGORY_API, GET_ALL_PROJECTS, STORE_ALL_PROJECTS, STORE_CATEGORY, SUBMIT_NEW_PROJECT, SUBMIT_NEW_PROJECT_WITH_AUTHORISATION } from '../../ReduxTypeList/typeList';

const API = "http://casestudy.cyberlearn.vn/api/ProjectCategory";
function * getAllProjectCategories (){
    yield put({type:"IS_LOADING"});
    yield delay(2000);
    try{
        let {data,status} = yield call(()=>{
            return jiraAPI.getAllProjectCategories();
        })
        if (status === STATUS_SUCCESS){
           // console.log(data);
            let action = {
                type: STORE_CATEGORY,
                categoryList: data.content
            }
            yield put(action);
        }
        
    }catch(err){
        console.log(err)
    }
    yield put({type:"NO_LOADING"});
} 

export function* listenGetAllProjectCategories() {
    yield takeLatest(GET_ALL_CATEGORY_API, getAllProjectCategories)
}

//------------ SUBMIT NEW PROJECT WITH API ------------
// function * createProject(action){
//     yield put({type:"IS_LOADING"});
//     yield delay(2000)
//     try {
//         let newProject = action.newProject;
        
//         // call API to create new project 
//         // let {data,status} = yield call(()=>{
//         //     return jiraAPI.createNewProject(newProject);
//         // })
//         // if (status === STATUS_SUCCESS){
//         //     console.log(data);
//         // }else{
//         //     console.log(status);
//         // }
//     } catch (error) {
//         console.log(error)
//     }
//    yield put({type:"NO_LOADING"});
// }
// export function * listenCreateProject(){
//     yield takeLatest(SUBMIT_NEW_PROJECT,createProject)
// }

//------------ SUBMIT NEW PROJECT WITH API AUTHORISATION------------
function * createProjectAuthorize(action){
    yield put({type:"IS_LOADING"});
    yield delay(2000)
    try {
        let newProject = action.newProject;
        //call API to create new project 
        let {data,status} = yield call(()=>{
            return jiraAPI.createNewProjectWithAuthorisation(newProject);
        })
        if (status === STATUS_SUCCESS){
            console.log(data.statusCode);
            let history = yield select(state => state.HistoryStateReducer.history);
            history.push('/projectmanagement');
        }else{
            
        }
    } catch (error) {
        console.log(error)
    }
   yield put({type:"NO_LOADING"});
}
export function * listenCreateProjectAuthorize(){
    yield takeLatest(SUBMIT_NEW_PROJECT_WITH_AUTHORISATION,createProjectAuthorize)
}

//----------- GET ALL PROJECT LIST WITH AUTHENTICATION
function * getAllProjects(){
    yield put({type:"IS_LOADING"});
    delay(2000);
    try{
        let {data,status} = yield call(()=>{
            return jiraAPI.getAllProjectsWithAuthorisation();
        })
        if (status === STATUS_SUCCESS){
            console.log("porjectList",data.content);
            yield put ({
                "type": STORE_ALL_PROJECTS,
                projectList: data.content
            })
           // yield put({type:"NO_LOADING"});
        }
        
    }catch(err){
        console.log(err);
       // yield put({type:"NO_LOADING"});
    }
    yield put({type:"NO_LOADING"});
}
export function * listenGetAllProjects(){
    yield takeLatest(GET_ALL_PROJECTS,getAllProjects);
}