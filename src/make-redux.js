// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}
 
function renderApp(appState){
    console.log('render app...')
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(content){
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = content.text
    titleDOM.style.color = content.color 
}

function renderContent(content){
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

// v1.0
// 负责数据的修改  
function dispatch(action){
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

// renderApp(appState) //首次渲染 
// dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'})
// dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blur'}) 
// renderApp(appState) 

// v2.0 抽离store
function stateChanger(state,action){
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}
// createStore 接受两个参数 一个表示应用程序状态的state，
// 另一个是stateChanger，它来描述应用程序状态会根据action发生变化，相当于dispatch代码里面的内容
// createStore 会返回一个对象，对象包含两个方法 getState 和 dispatch
// getState 用于获取state数据
// dispatch 用于修改数据，一样会接受action，然后会把state和action一并传给stateChanger，stateChanger就可以根据action来修改state

function createStore(state,stateChanger) {
    const getState = ()=> state
    const dispatch = (action)=> stateChanger(state, action)
    return { getState , dispatch }
}
// const store = createStore(appState,stateChanger) 
// renderApp(store.getState()) //首次渲染 
// store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'}) 
// store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blur'})  
// renderApp(store.getState()) 

//v3.0 监控数据变化
// 引用观察者模式，监听数据变化，然后重新渲染页面
function createStore(state,stateChanger){
    const listeners = []
    const subscribe = (listener)=> listeners.push(listener)
    const getState = ()=> state
    const dispatch = (action)=> {
        stateChanger(state,action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe}
}

// const store = createStore(appState,stateChanger) 
// store.subscribe(()=> renderApp(store.getState()))
// renderApp(store.getState()) // 首次渲染页面
// store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'}) 
// store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blur'})  


//纯函数（Pure Function）
// 一个函数的返回结果只依赖于它的参数，并且执行过程里面没有副作用，就把这个函数叫做纯函数

// v4.0  提高性能
// 只渲染改变的部分   对象之间存在引用  
// 每次修改都会产生新的对象。如果没有修改则返回原来的state对象
function stateChanger(state,action){
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return { //构建新的对象并且返回
                ...state, //复制 appState里面的内容
                title: {  //用一个新的对象覆盖原来的title属性
                    ...state.title, // 复制原来title对象里面的内容
                    text: action.text // 覆盖 text属性
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return { //构建新的对象并且返回
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state // 没有修改，返回原来的对象
    }
}

// console.log({...appState.title})

function createStore(state,stateChanger){
    const listeners = []
    const subscribe = (listener)=> listeners.push(listener)
    const getState = ()=> state
    const dispatch = (action)=> {
        state = stateChanger(state,action)
        console.log(state)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe}
}

function renderApp(newAppState,oldAppState = {}){ //防止 oldAppState 没有传入
    if(newAppState === oldAppState ){return } //数据没有变化就不渲染
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}
function renderTitle(newTitle,oldTitle = {}){
    if(newTitle === oldTitle){return }
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color 
}
function renderContent(newContent,oldContent={}){
    if(newContent === oldContent){return}
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}
// const store = createStore(appState,stateChanger) 
// let oldState = store.getState()  //缓存旧的state
// store.subscribe(()=> {
//     const newState = store.getState() //数据可能变化 获取新的state
//     renderApp(newState,oldState)  // 把新旧的state 传进去渲染
//     oldState = newState // 渲染完之后，新的state就变成了旧的oldState，等待下一次数据变化重新渲染
// })
// renderApp(store.getState()) // 首次渲染页面
// store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'}) 
// store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blur'})  


// v5.0

// stateChanger 既充当了获取初始化数据的功能，也充当了生成更新数据的功能
// stateChanger 通用的名字 reducer
function reducer(state,action){
    if(!state){
        return {
            title: {
                text: 'React.js 小书',
                color: 'red',
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        }
    }
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return { //构建新的对象并且返回
                ...state, //复制 appState里面的内容
                title: {  //用一个新的对象覆盖原来的title属性
                    ...state.title, // 复制原来title对象里面的内容
                    text: action.text // 覆盖 text属性
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return { //构建新的对象并且返回
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state // 没有修改，返回原来的对象
    }
}

// createStore 
function createStore(reducer){
    let state = null
    const listeners = []
    const subscribe = (listener)=> listeners.push(listener)
    const getState = ()=> state
    const dispatch = (action)=> {
        state = reducer(state,action)
        listeners.forEach((listener) => listener())
    }
    dispatch({}) //初始化state
    return { getState, dispatch, subscribe}
}
const store = createStore(reducer) 
let oldState = store.getState()  //缓存旧的state
store.subscribe(()=> {
    const newState = store.getState() //数据可能变化 获取新的state
    renderApp(newState,oldState)  // 把新旧的state 传进去渲染
    oldState = newState // 渲染完之后，新的state就变成了旧的oldState，等待下一次数据变化重新渲染
})
renderApp(store.getState()) // 首次渲染页面
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'}) 
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blur'})  