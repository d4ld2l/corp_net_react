import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetCurrentVacancy} from '../../../redux/actions/vacanciesActions'
import {resetMilestones} from '../../../redux/actions/recruiterActions'
import Info from './Info'
import Full from './Full'
import Selection from './Selection'
import Loader from '../../Loader'
import scrollToComponent from "../../ScrollToComponent";
import ReactDOM from "react-dom";

const cn = require('bem-cn')('new-recruiter-request')

if (process.env.BROWSER) {
  require('./style.css')
  require('./form-grid.css')
}

const connector = connect(state => ({
  role: state.role,
  user: state.user,
  loading: state.loaders.roles,
  pathname: state.router.location.pathname,
}))

class VacancyNew extends Component {

  notRecruiter(user) {
    return !(user.roles.filter(role => role.name === 'recruitment_recruiter').length > 0)
  }

  render() {
    const {role, user, stage, setStage, vacancyId, loading} = this.props
    if (loading) {
      return <Loader/>
    }
    return (
      <div className={cn}>
        <div className={cn('sidebar')}>
          <ul className={cn('tab-list')}>
            <li className={cn('tab-list-item')}>
              <div className={cn('tab-list-link').mix(`cur`)}
                   onClick={() => setStage('info')}>
                <span
                  className={cn('step-round').mix(stage === 'info' ? 'active' : '')}>1</span>
                <span className={cn('step-title')}>Информация о вакансии</span>
              </div>
            </li>

            <li className={cn('tab-list-item')}>
              <div className={cn('step-line')}/>
              <div className={cn('tab-list-link').mix('cur')}
                   onClick={() => setStage('full')}>
                <span
                  className={cn('step-round').mix(stage === 'full' ? 'active' : '')}>2</span>
                <span className={cn('step-title')}>Общая информация</span>
              </div>
            </li>
            {role.create_vacancy && (
              <li className={cn('tab-list-item')}>
                <span className={cn('step-line')}/>
                <div
                  className={cn('tab-list-link').mix('cur')}
                  onClick={() => setStage('selection')}
                >
                  <span
                    className={cn('step-round').mix(stage === 'selection' ? 'active' : '')}>
                    3
                  </span>
                  <span
                    className={cn('step-title')}>Этапы отбора кандидатов</span>
                </div>
              </li>
            )}
            {/*{role.create_vacancy &&*/}
            {/*this.notRecruiter(user) && (*/}
            {/*<li className={cn('tab-list-item')}>*/}
            {/*<span className={cn('step-line')}/>*/}
            {/*<div*/}
            {/*className={cn('tab-list-link').mix('cur')}*/}
            {/*onClick={() => setStage('settings')}*/}
            {/*>*/}
            {/*<span*/}
            {/*className={cn('step-round').mix(stage === 'settings' ? 'active' : '')}>*/}
            {/*4*/}
            {/*</span>*/}
            {/*<span className={cn('step-title')}>Настройки публикации</span>*/}
            {/*</div>*/}
            {/*</li>*/}
            {/*)}*/}
          </ul>
        </div>

        <div className={cn('content')}>
          <Info
            setStage={() => setStage('full')}
            vacancyId={vacancyId}
            style={{display: stage === 'info' ? 'block' : 'none'}}
          />
          <Full
            setStage={() => setStage('selection')}
            vacancyId={vacancyId}
            style={{display: stage === 'full' ? 'block' : 'none'}}
          />
          {stage === 'selection' && <Selection vacancyId={vacancyId}/>}
          {stage === 'settings' && <div className={cn('tab-content')}/>}
        </div>
      </div>
    )
  }
}

export default connector(VacancyNew)
