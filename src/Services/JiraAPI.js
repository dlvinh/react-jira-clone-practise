import Axios from "axios";
import { TOKEN } from "../utilities/Constants";
class JiraAPI {
    //Constructor
    constructor() { }

    // Methods
    getAllProjectCategories() {
        return Axios({
            url: 'http://casestudy.cyberlearn.vn/api/ProjectCategory',
            method: "GET",
        })

    }
    createNewProject(newProject){
        return Axios({
            url: 'http://casestudy.cyberlearn.vn/api/Project/createProject',
            method:"POST",
            data: newProject
        })
    }
    createNewProjectWithAuthorisation(newProject){
        //console.log('Authorization', "Bearer "+localStorage.getItem(TOKEN))
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/createProjectAuthorize`,
            method:`POST`,
            data: newProject,
            headers: {'Authorization': "Bearer "+localStorage.getItem(TOKEN)}
        })
    }
    getAllProjectsWithAuthorisation (){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/getAllProject`,
            method: "GET",
            headers:{'Authorization': "Bearer "+localStorage.getItem(TOKEN)}
        })
    }
    updateProject(newProjectValue){
        return Axios ({
            url:`http://casestudy.cyberlearn.vn/api/Project/updateProject?projectId=${newProjectValue.id}`,
            method:"PUT",
            data: newProjectValue,
            headers:{'Authorization': "Bearer "+localStorage.getItem(TOKEN)}
        })
    }
    deleteProject(projectId){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Project/deleteProject?projectId=${projectId}`,
            method:`DELETE`,
            headers:{'Authorization': "Bearer "+localStorage.getItem(TOKEN)}
        })
    }

}

export const jiraAPI = new JiraAPI()
