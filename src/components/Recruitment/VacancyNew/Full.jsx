import React, { Component } from 'react'
import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import * as vacanciesActions from '../../../redux/actions/vacanciesActions'
import EditFullForm from './EditFullForm'

const cn = require('bem-cn')('new-recruiter-request')

const connector = connect(
  state => ({
    state,
    newRequest: state.recruiter.newRequest,
    disabledCreate: !!(
      path(false, ['createVacancyChangeFullForm', 'syncErrors'], state.form) ||
      path(false, ['createVacancyChangeInfoForm', 'syncErrors'], state.form)
    ),
    role: state.role,
  }),
  { ...vacanciesActions }
)

class Full extends Component {
  handlerCreate = (status = 'draft') => {
    const { createVacancy, state } = this.props
    createVacancy({ state, status })
  }

  render() {
    const { role, setStage, vacancyId, style } = this.props

    return (
      <div className={cn} style={style}>
        <div className={cn('tab-wrap')}>
          <EditFullForm vacancyId={vacancyId} />
          {role.create_vacancy && (
            <div
              onClick={() => setStage()}
              className={'new-vacancy-container__btn-cancel-vacancy'}
            >
              Продолжить
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connector(Full)
