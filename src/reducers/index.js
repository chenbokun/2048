import { combineReducers } from 'redux'
import gameReducer from './game.js'

export let initialState = {
    nums:[]
}
export default combineReducers({
    ...gameReducer
})