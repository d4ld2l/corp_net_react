import React, { Component } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

class MentionsField extends Component {
  state = {
    value: '',
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  render() {
    const { users, placeholder, onFocus } = this.props

    return (
      <MentionsInput value={this.state.value}
                     onChange={this.handleChange.bind(this)}
                     style={defaultStyle}
                     placeholder={placeholder} onFocus={onFocus}>
        <Mention
          trigger="@"
          data={ users }
          style={defaultMentionStyle}
        />
      </MentionsInput>
    )
  }
}

export default MentionsField
