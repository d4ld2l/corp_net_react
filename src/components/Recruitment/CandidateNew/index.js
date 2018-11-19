import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import path from 'ramda/src/pathOr'
import { Row, Col } from 'react-bootstrap'
import CandidateTabFullName from './CandidateTabFullName'
import CandidateTabContactInformation from './CandidateTabContactInformation'
import CandidateTabBasicInformation from './CandidateTabBasicInformation'
import CandidateTabExperience from './CandidateTabExperience'
import CandidateTabAchievements from './CandidateTabAchievements'
import CandidateTabExpectations from './CandidateTabExpectations'
import CandidateTabRecommendations from './CandidateTabRecommendations'
import CandidateTabGetResume from './CandidateTabGetResume'
import CandidateTabResume from './CandidateTabResume'
import {
  createCandidate,
  updateCandidate,
} from '../../../redux/actions/candidatesActions'
import type { Dispatch } from '../../../types/actions'
import type { VacancyRaw } from '../../../types/raws'
import { isEmpty } from 'lodash'

const cn = require('bem-cn')('new-candidate')

if (process.env.BROWSER) {
  require('./style.css')
  require('./new-candidate.css')
}

type Props = {
  dispatch: Dispatch,
  stageVacancies: Array<VacancyRaw>,
  state: {},
  disabledCreate: boolean,
  candidateId: number,
}

const connector = connect(state => ({
  state,
  disabledCreate: !!(
    path(false, ['CandidateTabFullName', 'syncErrors'], state.form) ||
    path(false, ['CandidateTabContactInformation', 'syncErrors'], state.form) ||
    path(false, ['CandidateTabExperience', 'syncErrors'], state.form) ||
    (path(false, ['CandidateTabRecommendations', 'syncErrors', 'resume_recommendations_attributes'], state.form) &&
      !isEmpty(path(false, ['CandidateTabRecommendations', 'syncErrors', 'resume_recommendations_attributes'], state.form).filter(it => it)))
  ),
}))

class CandidateNew extends Component<Props> {
  handlerCreate = () => {
    const { dispatch, state, candidateId } = this.props
    if (candidateId) {
      dispatch(updateCandidate({ state }))
    } else {
      dispatch(createCandidate({ state }))
    }
  }

  render() {
    const { disabledCreate, stageVacancies, candidateId } = this.props

    return (
      <div className='candidate'>
        <div className={cn}>
          <CandidateTabGetResume/>
          <CandidateTabFullName stageVacancies={stageVacancies}
                                candidateId={candidateId}/>
          <CandidateTabContactInformation candidateId={candidateId}/>
          <CandidateTabResume candidateId={candidateId}/>
          <CandidateTabBasicInformation candidateId={candidateId}/>
          <CandidateTabExperience candidateId={candidateId}/>
          <CandidateTabAchievements candidateId={candidateId}/>
          <CandidateTabExpectations candidateId={candidateId}/>
          <CandidateTabRecommendations candidateId={candidateId}/>
          <Row>
            <Col xs={12}>
              <button
                disabled={disabledCreate}
                className="btn btn-primary btn-margin-right"
                onClick={() => {
                  this.handlerCreate()
                }}
              >
                Сохранить
              </button>
              <Link to={'/recruitment/candidates'}
                    className="btn btn-outline">Отменить</Link>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connector(CandidateNew)

