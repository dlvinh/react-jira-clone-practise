import Axios from "axios";
import { TOKEN } from "../utilities/Constants";
export class ProjectCallingApi {
    constructor(){

    }
    getProjectById(projectId){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/getProjectDetail?id=${projectId}`,
            method: "GET",
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
}

export const projectCallingApi = new ProjectCallingApi();