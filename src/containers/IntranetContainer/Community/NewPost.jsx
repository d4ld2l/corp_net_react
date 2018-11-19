import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { FormGroup } from 'react-bootstrap'
import onClickOutside from 'react-onclickoutside'
import { Field, reduxForm, FieldArray } from 'redux-form'
import AddImageAndFile from 'components-folder/Form/AddImageAndFile'
import { createPost, updatePost } from '../../../redux/actions/feedsActions'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

const cn = require('bem-cn')('new-post')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = compose(
  connect(state => ({
    employees: state.employees,
    state,
  })),
  reduxForm(),
  onClickOutside
)

class NewPost extends PureComponent {
  state = {
    openMessage: false,
    valueBody: '',
  }
  componentDidMount() {
    const { post, initialize } = this.props
    if (post) {
      const data = {
        body: post.body,
        allow_commenting: !post.allow_commenting,
        files: [],
        id: post.id,
      }
      if (post.documents.length) {
        post.documents.forEach(doc => {
          data.files.push({
            file: doc.file.url,
            name: doc.name,
            target: 'doc',
            id: doc.id,
          })
        })
      }
      if (post.photos.length) {
        post.photos.forEach(photo => {
          data.files.push({
            file: photo.file.url,
            name: photo.name,
            target: 'image',
            id: photo.id,
          })
        })
      }
      initialize(data)
      this.setState({ openMessage: true, valueBody: post.body})
    }
  }
  handleClickOutside = () => {
    const { post, closePost } = this.props
    if (post) {
      closePost()
    } else {
      this.setState({ openMessage: false })
    }
  }
  sendPost() {
    const { post, dispatch, state, closePost, initialize } = this.props
    if (post) {
      dispatch(updatePost(state, this.state.valueBody)).then(closePost)
    } else {
      dispatch(createPost(state, this.state.valueBody)).then(() => {
          initialize()
          this.setState({ valueBody: '' })

        }
      )
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ valueBody: value })
  }

  render() {
    const { openMessage } = this.state
    const { employees } = this.props
    return (
      <div className={cn()}>
        <div className={cn('form')}>
          <FormGroup controlId="formControlsTextarea">
            <MentionsInput multiLine
                           value={this.state.valueBody}
                           onChange={this.handleChange.bind(this)}
                           style={defaultStyle}
                           placeholder="Создать запись"
                           onFocus={() => this.setState({ openMessage: true })}>
              <Mention
                trigger="@"
                data={ employees.data.map( (it) => ({ id: it.id, display: it.full_name, key: it.id }) ) }
                style={defaultMentionStyle}
              />
            </MentionsInput>
            {/*<Field*/}
              {/*component="textarea"*/}
              {/*name="body"*/}
              {/*className={cn('pseudo-input').mix('form-control')}*/}
              {/*placeholder="Создать запись"*/}
              {/*onFocus={() => this.setState({ openMessage: true })}*/}
            {/*/>*/}
          </FormGroup>
          {openMessage && (
            <div className={cn('wrapper-functional-element')}>
              <FieldArray name="files" component={AddImageAndFile} />
              <span
                className={cn('btn-add-post').mix('btn btn-primary btn-padding_min')}
                onClick={() => this.sendPost()}
              >
                Опубликовать
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connector(NewPost)
