import Axios from "axios";
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

}

export const jiraAPI = new JiraAPI()
