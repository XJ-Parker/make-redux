
import React,{ Component } from "react"
import PropTypes from 'prop-types'
import Comment from './comment'
import './index.css'


class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment (index) {
        console.log(index)
        if (this.props.onDeleteComment) {
          this.props.onDeleteComment(index)
        }
    }

    render(){
        const comments = this.props.comments
        // console.log(comments)
        return (
            <div>
                {comments.map((comment,index)=>{ 
                    return <Comment 
                                comment={comment} 
                                index = {index}
                                onDeleteComment={this.handleDeleteComment.bind(this)}
                                key={index}/>
                })}
            </div>
        )
    }
}



export default CommentList
