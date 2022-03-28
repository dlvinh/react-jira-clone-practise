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

}

export const jiraAPI = new JiraAPI()
