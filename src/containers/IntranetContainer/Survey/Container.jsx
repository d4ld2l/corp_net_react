import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'ramda/src/compose'
import cloneDeep from 'lodash/cloneDeep'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import {
  getCurrentSurvey,
  saveSurvey,
  saveSurveyResults,
  getSurveys,
} from '../../../redux/actions/surveysActions'
import SurveyInner from './SurveyInner'
import SurveyQuestion from './SurveyQuestion'
import SurveyHardQuestion from './SurveyHardQuestion'
import SurveyFin from './SurveyFin'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('intranet-survey')

if (process.env.BROWSER) {
  require('./Container.css')
}
const connector = compose(
  connect(state => ({
    current: state.surveys.current,
    loading: state.loaders.survey,
    result: state.surveys.result,
  })),
  reduxForm({
    form: 'SurveyQuestion',
  })
)

class Container extends Component {
  state = {
    index: 0,
    result: {},
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(getCurrentSurvey(match.params.id)).then(() => {
      const { current } = this.props
      this.initialAnswer()
      current.passed && this.setState({ index: current.questions_count + 1 })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props
    if (nextProps.match.params.id !== match.params.id) {
      dispatch(getCurrentSurvey(nextProps.match.params.id)).then(() => {
        const { current } = this.props
        this.initialAnswer()
        if (current.passed) {
          this.setState({ index: current.questions_count + 1 })
        } else {
          this.setState({ index: 0 })
        }
      })
    }
  }

  initialAnswer() {
    const { current } = this.props
    const result = {}
    current.questions.forEach(question => {
      result[question.id] = question.offered_variants.length === 0 && question.ban_own_answer === false ?
        (question.question_type === 'single' ? {variant: 'own_answer'} : {variant: ['own_answer']}) :
        {}
    })
    this.setState({ result })
  }

  nextQuestion(idx) {
    const index = this.state.index + idx
    this.setState({ index }, () => {
      const { current } = this.props
      if (this.state.index === current.questions_count + 1) {
        this.saveResults()
      }
    })
  }

  saveResults() {
    const { dispatch } = this.props

    dispatch(saveSurveyResults(this.props.current.id, this.state.result)).then(() => {
      dispatch(getSurveys())
    })
  }

  render() {
    const { current, loading, result } = this.props
    const condition =
      current.background == '#ededed' ||
      current.background == '#ffffff' ||
      current.background == '#fff' ||
      current.background == '' ||
      current.background == null
    const backgroundSyrvey = {
      backgroundColor: `${current.background}`,
    }
    if (loading || !current) {
      return <Loader />
    }
    console.log(this.state.result)
    return (
      <div>
        <div className={cn('background')} style={backgroundSyrvey} />
        <div className={cn.mix('container')}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Breadcrumbs
                breadcrumbs={[{name: 'Опросы', location: '/surveys'}, { name: current.name, active: true }]}
                style={condition ? { color: `#93959a` } : { color: `rgba(255, 255, 255, 0.5)` }} />
              <h1 style={condition ? { color: `#34363c` } : { color: `#fff` }}>{current.name}</h1>
            </Col>
          </Row>
          {this.state.index === 0 && (
            <SurveyInner current={current} nextQuestion={() => this.nextQuestion(1)} />
          )}
          {current.questions.map((question, index) => {
            if (current.survey_type === 'Простой') {
              return (
                this.state.index === index + 1 && (
                  <SurveyQuestion
                    current={current}
                    question={question}
                    index={index + 1}
                    nextQuestion={idx => this.nextQuestion(idx)}
                    initialValues={this.state.result[question.id]}
                    key={index}
                    saveQuestion={(id, state) => {
                      const result = cloneDeep(this.state.result)
                      result[id] = state
                      this.setState({ result }, () => {
                        this.nextQuestion(1)
                      })
                    }}
                  />
                )
              )
            }
            return (
              this.state.index === index + 1 && (
                <SurveyHardQuestion
                  current={current}
                  question={question}
                  index={index + 1}
                  nextQuestion={idx => this.nextQuestion(idx)}
                  initialValues={this.state.result[question.id]}
                  key={index}
                  saveQuestion={(id, state) => {
                    const result = cloneDeep(this.state.result)
                    result[id] = state
                    this.setState({ result }, () => {
                      this.nextQuestion(1)
                    })
                  }}
                />
              )
            )
          })}
          {this.state.index === current.questions_count + 1 && (
            <SurveyFin current={current} result={result} />
          )}
        </div>
      </div>
    )
  }
}

export default connector(Container)
