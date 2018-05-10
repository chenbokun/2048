import { createStore, applyMiddleware, compose } from 'redux'
import React from 'react'
import thunk from 'redux-thunk'
import reducers, { initialState } from './reducers'
let my_mid = store =>next => action =>{
    console.log('this is my own mid')
    next(action)
    console.log(action,'action')
    console.log('this is end')
}

let enhancer = applyMiddleware(thunk,my_mid)

const store = createStore(
    reducers,
    initialState,
    enhancer
)
export default store;