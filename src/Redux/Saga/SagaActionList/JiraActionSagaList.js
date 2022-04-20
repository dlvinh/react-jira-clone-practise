import { call, delay, fork, takeLatest, put, take, select } from 'redux-saga/effects';
import { jiraAPI } from '../../../Services/JiraAPI';
import { projectCallingApi } from '../../../Services/ProjectCallingApi';
import { taskCallingApi } from '../../../Services/TaskCallingApi';
import { openNotification } from '../../../utilities/Notification';
import { STATUS_SUCCESS } from '../../Constants/Status';
import { ASSIGN_MEMBERS_TO_PROJECT, CLOSE_DRAWER, DELETE_MEMBER_FORM_PROJECT, DELETE_PROJECT, GET_ALL_CATEGORY_API, GET_ALL_MEMBERS, GET_ALL_PROJECTS, GET_PROJECT_INFO_BY_ID, REMOVE_ASSIGNESS, SHOW_SUCCESS_NOTIFICATION, STORE_ALL_PROJECTS, STORE_CATEGORY, STORE_MEMBER_LIST, STORE_PROJECT_INFO, SUBMIT_EDITING_PROJECT, SUBMIT_NEW_PROJECT, SUBMIT_NEW_PROJECT_WITH_AUTHORISATION } from '../../ReduxTypeList/typeList';

const API = "http://casestudy.cyberlearn.vn/api/ProjectCategory";
function* getAllProjectCategories() {
    yield put({ type: "IS_LOADING" });
    yield delay(2000);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.getAllProjectCategories();
        })
        if (status === STATUS_SUCCESS) {
            // console.log(data);
            let action = {
                type: STORE_CATEGORY,
                categoryList: data.content
            }
            yield put(action);
        }

    } catch (err) {
        console.log(err)
    }
    yield put({ type: "NO_LOADING" });
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
function* createProjectAuthorize(action) {
    yield put({ type: "IS_LOADING" });
    yield delay(2000)
    try {
        let newProject = action.newProject;
        //call API to create new project 
        let { data, status } = yield call(() => {
            return jiraAPI.createNewProjectWithAuthorisation(newProject);
        })
        if (status === STATUS_SUCCESS) {
            console.log(data.statusCode);
            let history = yield select(state => state.HistoryStateReducer.history);
            history.push('/projectmanagement');
        } else {

        }
    } catch (error) {
        console.log(error)
    }
    yield put({ type: "NO_LOADING" });
}
export function* listenCreateProjectAuthorize() {
    yield takeLatest(SUBMIT_NEW_PROJECT_WITH_AUTHORISATION, createProjectAuthorize)
}

//----------- GET ALL PROJECT LIST WITH AUTHENTICATION
function* getAllProjects() {
    yield put({ type: "IS_LOADING" });
    delay(2000);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.getAllProjectsWithAuthorisation();
        })
        if (status === STATUS_SUCCESS) {
            console.log("porjectList", data.content);
            yield put({
                "type": STORE_ALL_PROJECTS,
                projectList: data.content
            })
            // yield put({type:"NO_LOADING"});
        }

    } catch (err) {
        console.log(err);
        // yield put({type:"NO_LOADING"});
    }
    yield put({ type: "NO_LOADING" });
}
export function* listenGetAllProjects() {
    yield takeLatest(GET_ALL_PROJECTS, getAllProjects);
}

// ------------ UPDATE PROJECT --------------
export function* updateProject(action) {
    // B1: update on API
    // B2: sau khi update, ta Get all projects ve de table dc render tro lai
    yield console.log("update project in Saga", action.newValue);
    yield put({ type: "IS_LOADING" });
    delay(2000);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.updateProject(action.newValue);
        })
        if (status === STATUS_SUCCESS) {
            console.log("project", data.content);
            yield put({
                "type": GET_ALL_PROJECTS,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            yield put({ type: "NO_LOADING" });
        }

    } catch (err) {
        console.log(err);
        // yield put({type:"NO_LOADING"});
    }
    yield put({ type: "NO_LOADING" });
};
export function* listenUpdateProject() {
    yield takeLatest(SUBMIT_EDITING_PROJECT, updateProject);
}


// ----------- DELETE PROJECT ---------
export function* deleteProject(action) {
    yield console.log("Deleting in saga ...", action.project);
    yield put({ type: "IS_LOADING" });
    delay(2000);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.deleteProject(action.project.id);
        })
        if (status === STATUS_SUCCESS) {
            //console.log("project", data.content);
            yield put({
                "type": GET_ALL_PROJECTS,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            yield openNotification("success", "top", "DELETE SUCCESS"," Delete Project");
            yield put({ type: "NO_LOADING" });
        }

    } catch (err) {
        yield openNotification("error", "top", "DELETE SUCCESS");
        console.log(err);
        // yield put({type:"NO_LOADING"});
    }
    yield put({ type: "NO_LOADING" });
}
export function* listenDeleteProject() {
    yield takeLatest(DELETE_PROJECT, deleteProject);
}

// ============= GET MEMBERS ===========
export function* getAllMembers(action) {
    yield console.log("Saga-getting all memebers", action);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.getAllMemberList(action.keyWords);
        })
        if (status === STATUS_SUCCESS) {
            yield console.log("Getting", data);
            yield put({
                type:STORE_MEMBER_LIST,
                list:data.content
            })
        } else {
            yield console.error(status)
        }
    } catch (err) {
        console.error(err)
    }
}
export function* listenGetAllMembers() {
    yield takeLatest(GET_ALL_MEMBERS, getAllMembers);
}


// ------------ ASSIGN MEMBER TO PROJECT ---------
export function * assignMemberToProject(action){
    yield console.log("Saga-Assigning memeber", action.data);
    try {
        let { data, status } = yield call(() => {
            return jiraAPI.assignMemberToProject(action.data.projectId, action.data.userId);
        })
        if (status === STATUS_SUCCESS) {
            yield console.log("Getting", data);
            yield put({
                type:GET_ALL_PROJECTS,
            })
        } else {
            yield console.error(status)
        }
    } catch (err) {
        console.error(err)
    }
}
export function * listenAssignMemberToProject(){
    yield takeLatest(ASSIGN_MEMBERS_TO_PROJECT,assignMemberToProject);
}

// ------- DELETE MEMBER FROM PROJECT ------
export function * deleteMemberFromProject (action){
    yield console.log("Saga-Deleting member from project ...", action);
    try{
        let{data,status} = yield call(()=>{
            return jiraAPI.deleteMemberFromProjectAPI(action.data.projectId, action.data.userId);
        })
        if (status === STATUS_SUCCESS){
            yield put({
                type:GET_ALL_PROJECTS
            });
        }
    }catch(err){
        console.error(err);
    }
}
export function * listenDeleteMemberFromProject(){
    yield takeLatest(DELETE_MEMBER_FORM_PROJECT,deleteMemberFromProject);
}

// =========== GET PROJECT INFO BY ID ===========
export function * getProjectInfo(action){
    yield console.log("Getting Project Info....", action );
    // yield put({ type: "IS_LOADING" });
    // delay(2000);
    try{
        let{data,status} = yield call(()=>{
            return projectCallingApi.getProjectById(action.projectId);
        }) 
        if (status === STATUS_SUCCESS){
            //dispatch len redux de component can get it
            yield put({
                type: STORE_PROJECT_INFO,
                info: data.content
            })
           // yield put({type: "NO_LOADING" });
        }
    }catch(err){
        console.error(err)
    }
    //yield put({type: "NO_LOADING" });
}
export function * listenGetProjectInfo(){
    yield takeLatest(GET_PROJECT_INFO_BY_ID,getProjectInfo);
}


