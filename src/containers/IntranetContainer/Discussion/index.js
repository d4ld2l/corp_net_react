import { get } from 'lodash'
import { connect } from 'react-redux'
import { actions } from 'redux-folder/ducks/topics'
import Container from './Container'

const mapStateToProps = state => ({
  ...state.topics,
  user: get(state, `user`, {}),
  accounts: get(state, `dictionaries.accounts`, []),
  system: state.system,
})

const mapDispatchToProps = actions

const Discussion = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

export default Discussion
