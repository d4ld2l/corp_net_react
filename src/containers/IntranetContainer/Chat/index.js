import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    token: state.user.rocket_chat_token,
    url: state.user.rocket_chat_url,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default ChatContainer
