const historyState = {
    history:{}
};

export const HistoryStateReducer = (state = historyState, action) =>{
    switch (action.type){
        case "ADD_HISTORY":{
            console.log(action)
            state.history = action.history
            return {...state}
        }
        default: return {...state}
    }
}

