import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getVacancies,
  getCurrentVacancy,
  updateVacancy,
  resetCurrentVacancy,
} from '../../../redux/actions/vacanciesActions'
import { getEmployees } from '../../../redux/actions/employeesActions'
import { resetMilestones } from '../../../redux/actions/recruiterActions'

import Wrapper from 'components-folder/Wrapper'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import VacancyNew from 'components-folder/Recruitment/VacancyNew'
import Loader from 'components-folder/Loader'
import scrollToComponent from "components-folder/ScrollToComponent";
import ReactDOM from "react-dom";
import { getMilestonesGroup } from "../../../redux/actions/milestonesGroupActions";
import { getMilestonesTemplate } from '../../../redux/actions/milestonesTemplateActions'
import {
  getManagerRecruiterRoleInfo,
  getRecruiterGeneralRoleInfo,
  getRecruiterRoleInfo,
} from 'redux-folder/actions/recruiterRoleActions'
import {push} from "react-router-redux";

const cn = require('bem-cn')('new-vacancy-container')

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(state => state)

class Container extends Component {
  state = {
    stage: 'info',
    name: 'Создание вакансии',
    loading: true,
  }

  componentDidMount() {
    const { dispatch, state, match: { params: { id } }, employees: { all } } = this.props
    if (!all) {
      dispatch(getEmployees())
    }
    dispatch(getRecruiterGeneralRoleInfo()),
    dispatch(getManagerRecruiterRoleInfo()),
    dispatch(getRecruiterRoleInfo()),
    dispatch(getMilestonesTemplate())
    dispatch(getMilestonesGroup())
    if (id) {
      dispatch(getCurrentVacancy(id)).then(() => {
        this.setState({ loading: false })
      })
    } else {
      this.setState({ loading: false })
    }
    if (window.location.href.split('#').length > 1 && window.location.href.split('#')[1] === 'status_new' && state.role.create_vacancy){
      this.setState({stage: 'selection'})
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetCurrentVacancy())
    dispatch(resetMilestones())
  }

  handlerCreate = () => {
    const {
      dispatch,
      createVacancy,
      state,
      recruiter: { newRequest },
      match: { params: { id } },
    } = this.props

    let status = 'new'
    if (newRequest.currentMilestonesTemplate) status = 'worked'
    if (id) {
      dispatch(updateVacancy({ state, status })).then(() => {
        dispatch(push(`/recruitment/vacancies/${state.vacancies.current.id}`))
      })
    } else {
      createVacancy({ state, status }).then(() => {
        dispatch(push(`/recruitment/vacancies/${state.vacancies.current.id}`))
      })
    }
  }

  handlerUpdate = () => {
    const { dispatch, state } = this.props
    let status = state.vacancies.current.status
    dispatch(updateVacancy({ state, status })).then(() => {
      dispatch(push(`/recruitment/vacancies/${state.vacancies.current.id}`))

      // dispatch(getVacancies())
    })
  }

  labelButton = () => {
    const { recruiter: { newRequest }, match: { params: { id } } } = this.props
    const { stage } = this.state

    let label = 'Оставить заявку'

    if (stage === 'full') label = 'Оставить заявку'
    if (stage === 'selection' || newRequest.currentMilestonesTemplate)
      label = id ? 'Взять в работу' : 'Открыть вакансию'
    return label
  }

  renderButton = () => {
    const {
      recruiter: { newRequest },
      match: { params: { id } },
      state: { vacancies: { current } },
    } = this.props
    const { stage } = this.state

    if(id && stage !== 'selection') {
      return false
    }

    switch (stage) {
      case 'info':
      case 'full':
        return true
      case 'selection':
        return (id && current.status === 'worked') ? false : (newRequest.currentMilestonesTemplate && true)
      default:
        return false
    }
  }

  render() {
    const {
      disabledCreate,
      match: { params: { id } },
      state: { vacancies: { current } },
    } = this.props
    const { stage, loading } = this.state

    if (loading) {
      return <Loader/>
    }

    return (
      <Wrapper className={cn}>
        <Helmet>
          <title>
            HR - {id && current.name ? current.name : 'Создание вакансии'}
          </title>
        </Helmet>
        <Breadcrumbs
          breadcrumbs={[
            {
              name: id && current.name ? current.name : 'Новая вакансия',
              active: true
            }
          ]}
        />
        <h1 className={cn('title')}>{(id && current.name) || 'Создание вакансии'}</h1>

        <VacancyNew
          stage={stage}
          setStage={stage => {
            this.setState({ stage });
            window.scrollTo(0, 0);
          }}
          vacancyId={id}
        />
        <div style={{ display: 'flex', marginTop: '30px' }}>
          {this.renderButton() && (
            <div style={{ marginRight: '20px' }}>
              <button
                className={`${cn('btn-open-vacancy').mix('btn btn-primary')}`}
                disabled={disabledCreate}
                onClick={this.handlerCreate}>
                {this.labelButton()}
              </button>
            </div>
          )}
          {id && (
            <div style={{ marginRight: '20px' }}>
              <button
                className={`${cn('btn-open-vacancy').mix('btn btn-primary')}`}
                disabled={disabledCreate}
                onClick={this.handlerUpdate}>
                Сохранить вакансию
              </button>
            </div>
          )}
          <div>
            <Link to={'/recruitment/my'}>
              <button className={cn('btn-cancel-vacancy')}>Отменить</button>
            </Link>
          </div>
        </div>
      </Wrapper>
  )
  }
}

export default connector(Container)
