import { combineReducers } from 'redux'
import panier from './panier'
import userConnected from './userOnLine'
import favoris from './favoris'

export default combineReducers({panier, userConnected, favoris})
