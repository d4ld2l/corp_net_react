import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Row, Col } from 'react-bootstrap'
import {
  getResumeSources,
  getLanguages,
  getLanguagesLevel,
  getEducationLevel,
  getSpecialization,
  getCurrentCandidate,
  releaseCurrentCandidate,
} from '../../../redux/actions/candidatesActions'
import { getStageVacancies } from '../../../redux/actions/vacanciesActions'
import Candidate from 'components-folder/Recruitment/CandidateNew'
import Loader from 'components-folder/Loader'
import type { Dispatch } from '../../../types/actions'
import type { VacancyRaw } from '../../../types/raws'
import unionBy from 'lodash/unionBy'

const cn = require('bem-cn')('new-candidate-container')

if (process.env.BROWSER) {
  require('./style.css')
}

type Props = {
  dispatch: Dispatch,
  stageVacancies: Array<VacancyRaw>,
}
type State = {
  isFetching: boolean,
  stageVacancies: Array<VacancyRaw>,
}

const connector = connect(state => ({
  stageVacancies: state.vacancies.stageVacancies,
  candidate: state.candidates.current,
}))

class CandidateNew extends Component<Props, State> {
  state = {
    isFetching: true,
    stageVacancies: [],
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props
    Promise.all([
      dispatch(getResumeSources()),
      dispatch(getLanguages()),
      dispatch(getLanguagesLevel()),
      dispatch(getEducationLevel()),
      dispatch(getSpecialization()),
    ])
      .then(() => {
        return dispatch(getStageVacancies('worked'))
      })
      .then(async () => {
        if (id) {
          await dispatch(getCurrentCandidate(id))
        }
        this.setState({
          stageVacancies: this.state.stageVacancies.concat(this.props.stageVacancies),
        })
        return dispatch(getStageVacancies('paused'))
      })
      .then(() => {
        this.setState({
          stageVacancies: this.state.stageVacancies.concat(this.props.stageVacancies),
          isFetching: false,
        })
      })
      .then(() => {
        this.setState({
          stageVacancies: unionBy(
            this.state.stageVacancies,
            this.props.candidate.candidate_vacancies.map(({ vacancy }) => vacancy),
            'id'
          ),
        })
      })
  }

  componentWillUnmount() {
    this.props.dispatch(releaseCurrentCandidate())
  }

  componentDidUpdate() {
    const expectation = document.querySelector('.candidate-tab-expectations'),
      pathname = window.location.href.replace(window.location.origin, ''),
      hash_expectations = window.location.pathname + '#expectations'

    if (pathname === hash_expectations) {
      expectation && expectation.scrollIntoView(true)
      expectation && window.history.pushState(null, null, window.location.pathname)
    }
  }

  render() {
    const { isFetching, stageVacancies } = this.state

    if (isFetching) {
      return (
        <div className={cn}>
          <Loader />
        </div>
      )
    }
    const { candidate, match: { params: { id } } } = this.props
    return (
      <div className="container">
        <Helmet>
          <title>HR - Новый кандидат</title>
        </Helmet>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: candidate && (candidate.first_name || candidate.last_name)
              ? `${candidate.first_name || ''} ${candidate.last_name || ''}`
              : 'Новый кандидат', active: true }]}/>

            <h1 className={'indent_20'}>
              {candidate && (candidate.first_name || candidate.last_name)
                ? `${candidate.first_name || ''} ${candidate.last_name || ''}`
                : 'Новый кандидат'}
            </h1>
            <Candidate stageVacancies={stageVacancies} candidateId={id} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(CandidateNew)
