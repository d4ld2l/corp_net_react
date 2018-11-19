import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Plus } from 'components-folder/Icon'
import Wrapper from 'components-folder/Wrapper'

import {
  getCandidates,
  getEducationLevel,
  getLanguages,
  getLanguagesLevel,
  getSpecialization,
  releaseCurrentCandidate,
  resetSearch,
  getCandidatesStats,
  resetCandidates,
  closeSidebar,
} from 'redux-folder/actions/candidatesActions'
import { currentVisibleCandidates } from 'redux-folder/reducers/candidates'


import CandidatesDashboard
  from 'components-folder/Recruitment/Candidates/CandidatesDashboard'
import CandidatesTable
  from 'components-folder/Recruitment/Candidates/CandidatesTable'


const cn = require('bem-cn')('candidates-container')

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(state => ({
  candidates: currentVisibleCandidates(state),
  role: state.role,
}))

class Candidates extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    Promise.all([
      dispatch(getLanguages()),
      dispatch(getLanguagesLevel()),
      dispatch(getEducationLevel()),
      dispatch(getSpecialization()),
      dispatch(getCandidatesStats()),
    ])
    dispatch(getCandidates())
  }


  componentWillUnmount() {
    this.props.dispatch(resetSearch())
    this.props.dispatch(resetCandidates())
    this.props.dispatch(releaseCurrentCandidate())
    this.props.dispatch(closeSidebar())
  }

  closeSidebar() {
    this.props.dispatch(closeSidebar())
  }

  render() {
    const { role } = this.props
    return (
      <Wrapper className={cn}>
        <Helmet>
          <title>HR - Кандидаты</title>
        </Helmet>
        <Row>
          <Col xs={6}>
            <Breadcrumbs />
          </Col>
        </Row>
        <div className={cn('head')}>
          <h1 className={cn('head-title')}>Кандидаты</h1>
          {/*<Link to="/recruitment/candidates/new">*/}
          {/*<Plus outline={30} className={cn('head-icon')} />*/}
          {/*</Link>*/}
        </div>
        <div>
          <CandidatesDashboard
            closeSidebar={this.closeSidebar.bind(this)}
          />
          <CandidatesTable candidates={this.props.candidates} closeSidebar={this.closeSidebar.bind(this)} role={role}/>
        </div>
      </Wrapper>
    )
  }
}

export default connector(Candidates)
