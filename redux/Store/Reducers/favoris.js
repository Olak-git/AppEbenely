const initialState = { favoris : [] }

export default function favoris(state = initialState, action){
    let nextState
    switch (action.type) {
        case "ADD_FAVORIS":
            nextState = {
                ...state,
                favoris : [...state.favoris, action.value]
            }
            break;
        
        case "REMOVE_FAVORIS":
            nextState = {
                ...state,
                favoris : state.favoris.filter((item, index) => item.id !== action.id)
            }
        default:
            
            break;
    }

    return nextState || state
}