import Axios from "axios";
import { TOKEN } from "../utilities/Constants";
export class TaskCallingApi {
    constructor() {

    }
    getTaskTypeService() {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/TaskType/getAll`,
            method: "GET",
        })
    }
    getTaskPriorityService() {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Priority/getAll`,
            method: `GET`
        })
    }
    getTaskStatusService() {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Status/getAll`,
            method: `GET`
        })
    }
    createTaskService(newTask) {
        console.log("Service", newTask)
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/createTask`,
            method: `POST`,
            data: newTask,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    //======= GET TASK DETAIL ====
    getTaskDetailByIdService(id) {
        console.log("Getting task detail of " + id);
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/getTaskDetail?taskId=${id}`,
            method: `GET`,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    // ======= UPDATE TASK STATUS ======
    updateTaskStatus(newTask) {
        console.log("updating task", newTask);
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/updateStatus`,
            method: `PUT`,
            data: newTask,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    // ======= UPDATE TASK DESCRIPTION =======
    updateTaskDescriptionService(newDescription) {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/updateDescription`,
            method: `PUT`,
            data: newDescription,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    updateEntireTaskService(updatedTask) {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/updateTask`,
            method: `POST`,
            data: updatedTask,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    // ========== UPLOAD COMMENT =============
    uploadTaskCommentService(newComment) {
        return Axios({
            url: `http://casestudy.cyberlearn.vn/api/Comment/insertComment`,
            method: `POST`,
            data: newComment,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    // ======== DELETE TASK COMMENT =========
    deleteTaskCommentService(commentId) {
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Comment/deleteComment?idComment=${commentId}`,
            method:`DELETE`,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    // =========== UPDATE COMMENT ============
    updateTaskCommentService(newComment){
        return Axios({
            url:`http://casestudy.cyberlearn.vn/api/Comment/updateComment?id=${newComment.id}&contentComment=${newComment.content}`,
            method:`PUT`,
            headers: { 'Authorization': "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

}

export const taskCallingApi = new TaskCallingApi();