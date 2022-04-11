import Axios from "axios";
import { TOKEN } from "../utilities/Constants";
export class TaskCallingApi {
    constructor(){

    }
    getTaskTypeService(){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/TaskType/getAll`,
            method: "GET",
        })
    }
    getTaskPriorityService(){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Priority/getAll`,
            method:`GET`
        })
    }
    getTaskStatusService(){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Status/getAll`,
            method:`GET`
        })
    }
    createTaskService(newTask){
        console.log("Service",newTask)
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/createTask`,
            method:`POST`,
            data: newTask,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        })
    }
    //======= GET TASK DETAIL ====
    getTaskDetailByIdService(id){
        console.log("Getting task detail of " + id);
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/getTaskDetail?taskId=${id}`,
            method:`GET`,
            headers:{'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        })
    }
    // ======= UPDATE TASK STATUS ======
    updateTaskStatus(newTask){
        console.log("updating task", newTask);
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/updateStatus`,
            method:`PUT`,
            data: newTask,
            headers:{'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        })
    }

    // ======= UPDATE TASK DESCRIPTION =======
    updateTaskDescriptionService(newDescription){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/updateDescription`,
            method:`PUT`,
            data: newDescription,
            headers:{'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        })
    }

}

export const taskCallingApi = new TaskCallingApi();