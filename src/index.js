import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {Index,Provider} from './react-redux';
import {Index} from './react-redux';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
// function createStore(reducer){
//     let state = null
//     const listeners = []
//     const subscribe = (listener)=> listeners.push(listener)
//     const getState = ()=> state
//     const dispatch = (action)=> {
//         state = reducer(state,action)
//         listeners.forEach((listener)=> listener())
//     }
//     dispatch({})  //初始化 state
//     return {getState, subscribe, dispatch}
// }

const themeReducer = (state,action)=>{
    if(!state){
        return {
            themeColor: 'red'
        }
    }
    switch (action.type){
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
}

const store = createStore(themeReducer)

ReactDOM.render(  
    <Provider store={store}>
        <Index />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();

