import { connect } from 'react-redux'
import Container from './Container'
import { beginAssessment,
  completeAssessment,
  toAssessments,
  nextCompetenceIndex,
  prevCompetenceIndex,
  getAssessmentSession,
  sendAssessmentSession } from "redux-folder/actions/assessmentActions";

const mapStateToProps = state => ({
  state,
  system: state.system,
  assessment: state.assessment.session,
  begin_assessment: state.assessment.begin_assessment,
  complete_assessment: state.assessment.complete_assessment,
  to_assessment: state.assessment.to_assessment,
  nextCompetence: state.assessment.nextCompetence,
  loaderAssessmentSession: state.loaders.assessmentSession
})

const mapDispatchToProps = dispatch => ({
  beginAssessment: () => dispatch(beginAssessment()),
  completeAssessment: () => dispatch(completeAssessment()),
  toAssessments: () => dispatch(toAssessments()),
  sendAssessmentSession: (id) => dispatch(sendAssessmentSession(id)),
  nextCompetenceIndex: nextCompetence => dispatch(nextCompetenceIndex(nextCompetence)),
  prevCompetenceIndex: nextCompetence => dispatch(prevCompetenceIndex(nextCompetence)),
  dispatch
})

const Assessment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

export default Assessment
