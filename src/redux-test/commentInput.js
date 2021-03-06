
import React,{ Component } from "react"
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'
// import './index.css'



class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        username: PropTypes.any,
        onUserNameInputBlur: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            username: props.username || '',
            content: ''
        }
    }

    componentDidMount(){
        this.textarea.focus()
    }

    handleUsernameBlur(event){
        if(this.props.onUserNameInputBlur){
            this.props.onUserNameInputBlur(event.target.value)
        }
    }

    usernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    contentChange(event){
        this.setState({
            content: event.target.value
        })
    }

    changeInput(type,event){
        const obj = {}
        obj[type] = event.target.value
        this.setState(obj)
    }

    submit(){
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({ content: '' })
    }

    render(){
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input 
                            value={this.state.username}  
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.changeInput.bind(this,"username")}/>
                    </div>
                </div>
                <div className='comment-field'>
                <   span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea ref={(textarea)=> this.textarea = textarea} value={this.state.content} onChange={this.changeInput.bind(this,"content")}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.submit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
// <input/> <select/> <textarea/> 这些元素的value值被React.js 所控制、渲染的组件，在React.js当中被称为受控组件

CommentInput = wrapWithLoadData(CommentInput,'username')

export default CommentInput
