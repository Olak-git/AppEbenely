const initialState = { panier : [] }

export default function panier(state = initialState, action){
    let nextState
    if(action.type === "ADD"){
        nextState = {
            ...state,
            panier : [...state.panier, action.value]
        }
    }
    else{
        if(action.type === "DEL_FROM_PANIER"){
            nextState = { panier: []}
        }else{
            if(action.type === "DEL_SINGLE_FROM_PANIER"){
                nextState = {
                    panier : state.panier.filter((item, index) => item.product.id !== action.value.id)
                }
            
            }else{
                console.log("NOOOOOOOOOOOO")
            }
        }
    }
    return nextState || state
}