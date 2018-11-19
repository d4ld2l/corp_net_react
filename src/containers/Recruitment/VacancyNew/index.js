import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import Container from './Container'
import { createVacancy } from '../../../redux/actions/vacanciesActions'

const mapStateToProps = state => {
  let disabledCreate = true
  if (Object.keys(state.form).length) {
    disabledCreate = !!(
      path(false, ['createVacancyChangeFullForm', 'syncErrors'], state.form) ||
      path(false, ['createVacancyChangeInfoForm', 'asyncErrors'], state.form) ||
      path(false, ['createVacancyChangeInfoForm', 'syncErrors'], state.form)
    )
  }

  return {
    state,
    disabledCreate,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createVacancy: credentials => dispatch(createVacancy(credentials)),
  }
}

const VacancyNew = connect(mapStateToProps, mapDispatchToProps)(Container)

export default VacancyNew
