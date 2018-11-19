import React, { Component } from 'react'
import NoteCardHead from './NoteCardHead'
import NoteCardBody from './NoteCardBody'
import NoteCardComments from './NoteCardComments'
import CommentForm from './CommentForm'
import * as ReactDOM from 'react-dom'

const cn = require('bem-cn')('notify-note-card')

export default class NoteCard extends Component {
  componentDidMount() {
    this._commentForm = ReactDOM.findDOMNode(this._commentForm)
    this._wrap = ReactDOM.findDOMNode(this._wrap)
    const _commentForm = this._commentForm.offsetHeight
    const _wrap = this._wrap
    _wrap.style.cssText = `height: calc(95% - ${_commentForm}px)`
  }

  componentDidUpdate() {
    this._commentForm = ReactDOM.findDOMNode(this._commentForm)
    this._wrap = ReactDOM.findDOMNode(this._wrap)
    const _commentForm = this._commentForm.offsetHeight
    const _wrap = this._wrap
    _wrap.style.cssText = `height: calc(95% - ${_commentForm}px)`
  }

  render() {
    return (
      <div className={cn}>
        <NoteCardHead {...this.props} />

        <div className={cn('wrap')} ref={node => (this._wrap = node)}>
          <NoteCardBody {...this.props} />
          <NoteCardComments {...this.props} />
        </div>

        <CommentForm ref={node => (this._commentForm = node)} />
      </div>
    )
  }
}
