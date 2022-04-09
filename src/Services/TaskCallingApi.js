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
}

export const taskCallingApi = new TaskCallingApi();