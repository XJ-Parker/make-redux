import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'

export class Index extends Component{
    render(){
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        )
    }
}

// provider 做为一个容器，会把嵌套的内容原封不动作为自己的子组件渲染出来。还会把外界传给它的props.store 放到context
export class Provider extends Component{
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext(){
        return {
            store: this.props.store
        }
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

