import { connect } from 'react-redux'
import Presenter from './Presenter'
import { loadAssessmentCard } from "redux-folder/actions/assessmentActions";

const mapStateToProps = state => ({
  state,
  sessionResult: state.assessment.sessionResult,
  loaderAssessmentSession: state.loaders.assessmentSession
})

const mapDispatchToProps = dispatch => {
  return {
    loadAssessmentCard: id => dispatch(loadAssessmentCard(id)),
    dispatch,
  }
}

const AssessmentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presenter)

export default AssessmentCard
