import React, { Component } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'

export default class CommentApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}