import { REMOVE_ASSIGNESS, STORE_TASK_DETAIL, UPDATE_ASSIGNESS, UPDATE_DESCRIPTION, UPDATE_ESTIMATE_TIME, UPDATE_PRIORITY, UPDATE_STATUS } from "../ReduxTypeList/typeList";

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
    switch (action.type) {
        case STORE_TASK_DETAIL:{
            console.log("Storing task...",action.task);
            return {...state,taskDetailModal: action.task };
        }
        case UPDATE_STATUS:{
            console.log("update status",action.newStatusId);
            let newtaskDetailModal = {...state.taskDetailModal};
            newtaskDetailModal.statusId = action.newStatusId;
            //console.log({...state, taskDetailModal:newtaskDetailModal})
            return {...state, taskDetailModal:newtaskDetailModal}
        }
        case UPDATE_PRIORITY:{
            let newtaskDetailModal = {...state.taskDetailModal};
            newtaskDetailModal.priorityTask = action.newPriority;
            newtaskDetailModal.priorityId = action.newPriority.priorityId;
            return {...state,taskDetailModal:newtaskDetailModal};
        }
        case UPDATE_ESTIMATE_TIME:{
            console.log("Update estimate time", action.newTime);
            let newtaskDetailModal = {...state.taskDetailModal};
            newtaskDetailModal.originalEstimate = action.newTime;
            return {...state,taskDetailModal: newtaskDetailModal}
        }
        case UPDATE_DESCRIPTION:{
            console.log("Update description", action.newDescription);
            let newtaskDetailModal = {...state.taskDetailModal};
            newtaskDetailModal.description = action.newDescription;
            return {...state,taskDetailModal: newtaskDetailModal}
        }
        case UPDATE_ASSIGNESS:{
            console.log("Update assigness", action.newAssigness);
            let newAssignessList = [...state.taskDetailModal.assigness];
            newAssignessList.push(action.newAssigness);
            // console.log("new",{...state,taskDetailModal:{
            //     ...state.taskDetailModal,
            //     assigness:newAssignessList
            // }})
            return{...state,taskDetailModal:{
                ...state.taskDetailModal,
                assigness:newAssignessList
            }}
        }
        case REMOVE_ASSIGNESS:{
            console.log("Remove Assigness",action.assignessId);
            let newAssignessList = [...state.taskDetailModal.assigness];
            let index = state.taskDetailModal.assigness.findIndex(item => item.id == action.assignessId);
            if (index !== -1){
                newAssignessList.splice(index,1);
            }
            // console.log("new",{...state,taskDetailModal:{
            //     ...state.taskDetailModal,
            //     assigness:newAssignessList
            // }})
            return {...state,taskDetailModal:{
                ...state.taskDetailModal,
                assigness:newAssignessList
            }}
          


        }
        default: return { ...state };
    }
} 