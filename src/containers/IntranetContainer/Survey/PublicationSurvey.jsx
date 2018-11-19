import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'ramda/src/compose'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Loader from 'components-folder/Loader'
import { getCurrentSurvey } from '../../../redux/actions/surveysActions'
import DataSurvey from './DataSurvey'
import BasicInformationSurvey from './BasicInformationSurvey'
import SurveyQuestionStats from './SurveyQuestionStats'

import { Settings, Download } from 'components-folder/Icon'

if (process.env.BROWSER) {
  require('./survey-publication.css')
}

const cn = require('bem-cn')('publication-survey')

const connector = connect(state => ({
  current: state.surveys.current,
  loading: state.loaders.survey,
  // result: state.surveys.result,
  currentUser: state.user
}))

class Container extends Component {
  state = {
    index: 0,
    // result: {},
    openSettingSurvey: false,
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(getCurrentSurvey(match.params.id))
  }

  handleClickOutside = () => {
    this.handlerCloseSettingSurvey()
  }

  handlerOpenSettingSurvey = () => {
    this.setState({ openSettingSurvey: true })
  }

  handlerCloseSettingSurvey = () => {
    this.setState({ openSettingSurvey: false })
  }

  render() {
    const { current, loading, currentUser } = this.props
    // const { openSettingSurvey } = this.state

    if (loading || !current) {
      return <Loader />
    }

    return (
      <div>
        <div className={cn('background')} />
        <div className={cn.mix('container')}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Breadcrumbs breadcrumbs={[{ name: current.name, active: true }]} />
              <div className={cn('wrapper-header-and-icon')}>
                <h1 style={{ color: `#34363c` }}>{current.name}</h1>
                <div className={cn('wrapper-icon')}>
                  {currentUser.id === current.creator_id && (
                    <a
                      download
                      href={`/api/surveys/${current.id}/download`}
                      title="Скачать результаты"
                    >
                      <Download outline className={cn('dwn-icon')} />
                    </a>
                  )}
                  {/*
                  <div
                    className={cn('block-btn')
                      .mix('cur')
                      .state({ open: openSettingSurvey })}
                    onClick={() => {
                      openSettingSurvey
                        ? this.handlerCloseSettingSurvey()
                        : this.handlerOpenSettingSurvey()
                    }}
                  >
                    <Settings outline className={cn('setting-icon')} />
                    {openSettingSurvey && (
                      <div className={cn('wrapper-dropdown')}>
                        <ul className={cn('inner')}>
                          <li className={cn('item')}>
                            <Link to={`/`}>Редактировать</Link>
                          </li>
                          <li className={cn('item')}>
                            <Link to={`/`}>Опубликовать</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>*/}
                </div>
              </div>
            </Col>
          </Row>
          <DataSurvey />
          <BasicInformationSurvey />
          <SurveyQuestionStats />
        </div>
      </div>
    )
  }
}

export default connector(Container)
