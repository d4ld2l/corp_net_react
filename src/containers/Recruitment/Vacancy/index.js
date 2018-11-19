import { connect } from 'react-redux'
import Presenter from './Presenter'

const mapStateToProps = state => {
  return {
    ...state.vacancyCard,
    routerHistory: state.routerHistory,
    role: state.role,
    loaders: state.loaders,
    showLindkedModal: state.candidates.openLinkedCandidateModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Vacancy = connect(mapStateToProps, mapDispatchToProps)(Presenter)

export default Vacancy
