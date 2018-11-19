import { connect } from 'react-redux'
import { get } from 'lodash'
import { reduxForm } from 'redux-form'
import { actions, storeFormName } from 'redux-folder/ducks/topics'
import validate from './validate'
import Presenter from './Presenter'

const mapStateToProps = state => ({
  ...state.topics,
  user: get(state, `user`, {}),
  accounts: get(state, `dictionaries.accounts`, []),
  discussers: get(state, `form.${storeFormName}.values.discussers`, []),
  attachment: get(state, `form.${storeFormName}.values.attachment`, []),
  available_to_all: get(state, `form.${storeFormName}.values.available_to_all`, false),
})

const mapDispatchToProps = actions

const reduxFormConfing = {
  form: 'discussionForm',
  validate,
  onSubmit: actions.submitForm,
}

const DiscussionForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(reduxFormConfing)(Presenter))

export default DiscussionForm
