import { REMOVE_ASSIGNESS, STORE_TASK_DETAIL, UPDATE_ASSIGNESS, UPDATE_DESCRIPTION, UPDATE_ESTIMATE_TIME, UPDATE_PRIORITY, UPDATE_STATUS, UPDATE_TASK_TO_API } from "../ReduxTypeList/typeList";

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
    },
    updatedTask: {
        "listUserAsign": [
            0
        ],
        "taskId": "string",
        "taskName": "string",
        "description": "string",
        "statusId": "string",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "projectId": 0,
        "typeId": 0,
        "priorityId": 0
    }
}
export const TaskStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TASK_DETAIL: {
            console.log("Storing task...", action.task);
            console.log( { ...state, 
                taskDetailModal: action.task, 
        })
            return { ...state, 
                taskDetailModal: action.task, 

        }
    }
        case UPDATE_STATUS: {
            console.log("update status", action.newStatusId);
            let newtaskDetailModal = { ...state.taskDetailModal };
            newtaskDetailModal.statusId = action.newStatusId;
            //console.log({ ...state, taskDetailModal: newtaskDetailModal, updatedTask: newtaskDetailModal })
            return { ...state, taskDetailModal: newtaskDetailModal}
        }
        case UPDATE_PRIORITY: {
            let newtaskDetailModal = { ...state.taskDetailModal };
            newtaskDetailModal.priorityTask = action.newPriority;
            newtaskDetailModal.priorityId = action.newPriority.priorityId;
            //console.log({ ...state, taskDetailModal: newtaskDetailModal, updatedTask: newtaskDetailModal })
            return { ...state, taskDetailModal: newtaskDetailModal};
        }
        case UPDATE_ESTIMATE_TIME: {
            console.log("Update estimate time", action.newTime);
            let newtaskDetailModal = { ...state.taskDetailModal };
            newtaskDetailModal.originalEstimate = action.newTime;
            //console.log({ ...state, taskDetailModal: newtaskDetailModal })
            return { ...state, taskDetailModal: newtaskDetailModal }
        }
        case UPDATE_DESCRIPTION: {
            console.log("Update description", action.newDescription);
            let newtaskDetailModal = { ...state.taskDetailModal };
            newtaskDetailModal.description = action.newDescription;
           // console.log({ ...state, taskDetailModal: newtaskDetailModal, updatedTask: newtaskDetailModal })
            return { ...state, taskDetailModal: newtaskDetailModal}
        }
        case UPDATE_ASSIGNESS: {
            console.log("Update assigness", action.newAssigness);
            let newAssignessList = [...state.taskDetailModal.assigness];
            let newAssignessListForUpdate= [...state.updatedTask.listUserAsign];
            newAssignessList.push(action.newAssigness);
            newAssignessListForUpdate.push(action.newAssigness.id);
            // vi updatedTask kha giong voi taskDetailModal chi khac assigness => can phai bien doi no

            // console.log({
            //     ...state, taskDetailModal: {
            //         ...state.taskDetailModal,
            //         assigness: newAssignessList
            //     },
            //     updatedTask: {
            //         ...state.updatedTask,
            //         listUserAsign: newAssignessListForUpdate
            //     }
            // })
            return {
                ...state, taskDetailModal: {
                    ...state.taskDetailModal,
                    assigness: newAssignessList
                }
            }
        }
        case REMOVE_ASSIGNESS: {
            console.log("Remove Assigness", action.assignessId);
            let newAssignessList = [...state.taskDetailModal.assigness];
            let index = state.taskDetailModal.assigness.findIndex(item => item.id == action.assignessId);
            if (index !== -1) {
                newAssignessList.splice(index, 1);
            }
            // console.log("new",{...state,taskDetailModal:{
            //     ...state.taskDetailModal,
            //     assigness:newAssignessList
            // }})
            // console.log({
            //     ...state, taskDetailModal: {
            //         ...state.taskDetailModal,
            //         assigness: newAssignessList
            //     },
            //     updatedTask:{
            //         ...state.updatedTask,
            //         listUserAsign: newAssignessList
            //     }
            // })
            return {
                ...state, taskDetailModal: {
                    ...state.taskDetailModal,
                    assigness: newAssignessList
                }
            }
        }

        default: return { ...state };
    }
} 