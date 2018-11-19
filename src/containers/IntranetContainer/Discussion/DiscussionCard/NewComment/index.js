import { connect } from 'react-redux'
import { get } from 'lodash'
import { reduxForm } from 'redux-form'
import { actions, storeFormName } from 'redux-folder/ducks/topics'
import validate from './validate'
import Presenter from './Presenter'

const mapStateToProps = state => ({
  ...state.topics,
  user: get(state, `user`, {}),
  commentId: get(state, `form.${storeFormName}.values.id`, undefined),
  formValues: get(state, `form.${storeFormName}.values`, false),
  body: get(state, `form.${storeFormName}.values.body`, ''),
  attachment: get(state, `form.${storeFormName}.values.attachment`, []),
})

const mapDispatchToProps = actions

const reduxFormConfing = {
  form: 'discussionForm',
  validate,
  onSubmit: actions.submitCommentForm,
}

const NewComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(reduxFormConfing)(Presenter))

export default NewComment
