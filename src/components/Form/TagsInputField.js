import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
import { Field } from 'redux-form'

export default class TagsInputField extends Component {
  field = ({ input }) => {
    const { tags } = this.props
    const { onChange } = input

    const handleChange = tags => {
      // this.props.addSkill(tags)
      return onChange(tags)
    }

    return (
      <TagsInput
        onChange={handleChange}
        value={tags}
        inputProps={{ placeholder: this.props.placeholder }}
      />
    )
  }
  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
