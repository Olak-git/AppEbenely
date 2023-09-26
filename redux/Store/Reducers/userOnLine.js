const initialState = { userConnected:[] }

export default function userConnected(state=initialState, action){
    let nextState
    switch(action.type){
        case 'AJOUTER':
            nextState={
                ...state,
                userConnected: action.value
            }
            return nextState || state
        default:
            return state
    }
} 