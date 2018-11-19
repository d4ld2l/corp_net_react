import { connect } from 'react-redux'
import Container from './Container'
import { getSurveys, searchSurveys, resetSearch } from 'redux-folder/actions/surveysActions'

const mapStateToProps = state => ({
  surveys: state.surveys.data,
  scope: state.surveys.scope,
  count: state.surveys.count,
  loading: state.loaders.surveys,
  loadingMore: state.loaders.surveysMore,
  scroll: state.surveys.scroll,
  searchQuery: state.surveys.search.query,
  searchNow: state.surveys.search.now,
  searchData: state.surveys.search.data,
  system: state.system,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  getSurveys: (...args) => dispatch(getSurveys(...args)),
  searchSurveys: (query, scope, opts = {}) => dispatch(searchSurveys(query, scope, opts)),
  resetSearch: () => dispatch(resetSearch())
})

const Surveys = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Surveys
