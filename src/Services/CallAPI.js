import Axios from "axios";
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

   
}

export const callAPI = new CallAPI();