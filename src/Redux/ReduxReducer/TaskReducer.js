import { STORE_TASK_DETAIL } from "../ReduxTypeList/typeList";

const initialState = {
    taskDetailModal: {
        priorityTask: {
            "priorityId": 2,
            "priority": "Medium"
        },
        taskTypeDetail: {
            "id": 2,
            "taskType": "new task"
        },
        assigness: [
            {
                id: 1480,
                avatar: "https://ui-avatars.com/api/?name=lee",
                name: "lee",
                alias: "lee"
            },
            {
                id: 850,
                avatar: "https://ui-avatars.com/api/?name=thangtvads",
                name: "thangtvads",
                alias: "thangtv"
            },
            {
                id: 1086,
                avatar: "https://ui-avatars.com/api/?name=Minh Thu",
                name: "Minh Thu",
                alias: "minh-thu"
            },
            {
                id: 1122,
                avatar: "https://ui-avatars.com/api/?name=Hân",
                name: "Hân",
                alias: "han"
            }
        ],
        "lstComment": [],
        "taskId": 3609,
        taskName: "Add backlog",
        "alias": "add-backlog",
        "description": "<p>add new task to backlog</p>",
        statusId: "1",
        "originalEstimate": 3,
        "timeTrackingSpent": 3,
        "timeTrackingRemaining": 3,
        "typeId": 2,
        priorityId: 2,
        "projectId": 4152
    }
}
export const TaskStateReducer = (state = initialState, action) => {
    console.log("Storing task...",action.task);
    switch (action.type) {
        case STORE_TASK_DETAIL:{
            return {...state,taskDetailModal: action.task };
        }
        default: return { ...state };
    }
} 