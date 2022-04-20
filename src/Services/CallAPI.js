import Axios from "axios";
import { TOKEN } from "../utilities/Constants";
class CallAPI{
    userLoginAPI(user){
        return Axios({
            url: 'http://casestudy.cyberlearn.vn/api/Users/signin',
            method: 'POST',
            data: {
                email: user.email,
                password: user.password
            }
        })
    }

    userSignUpApi(user){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Users/signup`,
            method:`POST`,
            data:user
        })
    }

    deleteUserApi(userId){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Users/deleteUser?id=${userId}`,
            method:`DELETE`,
            headers:{ 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
   
}

export const callAPI = new CallAPI();