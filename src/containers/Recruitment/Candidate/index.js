import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { path, pick } from 'ramda'
import { Row, Col } from 'react-bootstrap'
import Wrapper from 'components-folder/Wrapper'

import Head from 'components-folder/Recruitment/Candidate/Head'
import Sidebar from 'components-folder/Recruitment/Candidate/Sidebar'
import Tabs from 'components-folder/Recruitment/Candidate/Tabs'
import Loader from 'components-folder/Loader'

import { getCurrentCandidate, releaseCurrentCandidate } from 'redux-folder/actions/candidatesActions'
import ScrollToTopOnMount from 'components-folder/ScrollToTopOnMount'

import { MAIN_TABS } from 'components-folder/Recruitment/Candidate/data'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('candidate')

if (process.env.BROWSER) {
  require('./style.css')
}


const connector = connect(pick(['candidates', 'loaders', 'vacancies', 'user', 'system']))

class Container extends Component {
  state = {
    tabs: MAIN_TABS,
    currentTab: MAIN_TABS[0].value,
  }
  componentDidMount() {
    const { dispatch } = this.props
    // $FlowFixMe
    const id = this.props.match.params.id | 0
    dispatch(getCurrentCandidate(id))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(releaseCurrentCandidate())
  }

  render() {
    if (this.props.loaders.currentCandidate || !this.props.candidates.current) {
      return (
        <div className="container">
          <Loader />
        </div>
      )
    }
    const { dispatch, loaders, user } = this.props
    const candidate = this.props.candidates.current
    const vacancies = this.props.vacancies.all
    const shrCore = this.props.system.enabledComponents.shr_core
    const { tabs, currentTab } = this.state

    return (
      <div>
        <Helmet>
          <title>{`HR - Кандидат №${candidate.id}`}</title>
        </Helmet>

        <ScrollToTopOnMount />
        {candidate.resume && (
          <div>
            <Head shrCore={shrCore}/>
            <Wrapper>
             <Row>
               <Col lg={shrCore ? 7 : 8} md={shrCore ? 7 : 8} xs={8}>
                 <Tabs
                   candidate={candidate}
                   dispatch={dispatch}
                   loaders={loaders}
                   changeTab={({currentTab}) => this.setState({currentTab})}
                   tabs={tabs}
                   currentTab={currentTab}
                 />
               </Col>
               {candidate.candidate_vacancies.length > 0 && (
                 <Col lg={4} md={4} xs={4}>
                   <Sidebar
                     dispatch={dispatch}
                     candidate={candidate}
                     vacancies={vacancies}
                     candidateVacancies={sortBy(candidate.candidate_vacancies, 'id')}
                     userId={user.id}
                     {...this.props}
                   />
                 </Col>
               )}
             </Row>
            </Wrapper>
          </div>
        )}
      </div>
    )
  }
}

export default connector(Container)
