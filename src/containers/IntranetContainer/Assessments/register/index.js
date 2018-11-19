import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => ({
  system: state.system,
  assessment: state.assessment,
  loaderAssessmentSessions: state.loaders.assessmentSessions
})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Assessments = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

export default Assessments
