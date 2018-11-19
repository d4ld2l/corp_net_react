import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { isEmpty, last, get } from 'lodash'
import moment from 'moment'
import {
  getCurrentVacancy,
} from 'redux-folder/actions/vacanciesActions'
import VacancyStatus from './VacancyStatus'
import VacancyInfo from './VacancyInfo'
import ScrollToTopOnMount from 'components-folder/ScrollToTopOnMount'
import SettingsMenu from 'components-folder/Recruitment/Vacancies/SettingsMenu'
import NoticeWindow from 'components-folder/Modals/NoticeWindow'
import Loader from 'components-folder/Loader'
import Wrapper from 'components-folder/Wrapper'
import CandidatesList from './CandidatesList'
import { Settings, Pencil, Post } from 'components-folder/Icon'
import { getVacancyStages } from 'redux-folder/actions/vacancyCardActions'

const cn = require('bem-cn')('vacancy-container')

if (process.env.BROWSER) {
  require('./style/Container.css')
}

class Presenter extends Component {
  state = {
    open: false,
    show: false,
    tab: 'candidates',
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } }, routerHistory } = this.props
    dispatch(getVacancyStages(id))
    dispatch(getCurrentVacancy(id))

    if (['edit', 'recruiter', 'edit#status_new'].includes(last(get(routerHistory, '[1].pathname', '').split('/')))) {
      this.setState({ tab: 'description' })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({ type: 'RESET_CURRENT_VACANCY' })
    dispatch({ type: 'RESET_VACANCIES' })
  }

  render() {
    const {
      showLindkedModal,
      current,
      role,
      match,
      dispatch,
      routerHistory,
      loaders: { loadingVacancyCandidates, loadingVacancyCandidate, vacancy: loadingVacancy },
      vacancyStages,
      currentCandidates,
      page,
      scroll,
      filter,
      showCandidateCard,
      currentCandidate,
      checkAllVacancyCandidate,
    } = this.props

    const { open, tab, show } = this.state

    if (loadingVacancy) {
      return <Loader />
    }

    return (
      <Wrapper className={cn}>
            <ScrollToTopOnMount />
            <Helmet>
              <title>{`HR - Вакансия ${current.name || 'не определена'}`}</title>
            </Helmet>
            <Breadcrumbs breadcrumbs={[{ name: current.name, active: true }]}/>

            <div className={cn('page-head')}>
              <h1 className={cn('page-title')}>{current.name}</h1>
              <div className={cn('page-icons')}>
                <span className="cur" onClick={() => this.setState({ show: true })}>
                  <Post outline />
                </span>
                {role.update_vacancy && ['new', 'paused', 'worked'].includes(current.status) && (
                  <Link
                    to={`/recruitment/vacancies/${current.id}/edit${current.status === 'new'
                      ? '#status_new'
                      : ''}`}
                  >
                    <Pencil outline className={cn('icon-settings')} />
                  </Link>
                )}
                {current.status !== 'archived' && (
                  <span
                    className={cn('settings').mix('cur')}
                    onClick={() => this.setState({ open: true })}
                  >
                    <Settings outline className={cn('icon-settings').state({ active: open })} />
                  </span>
                )}
              </div>
              {open && (
                <SettingsMenu
                  item={current}
                  actionCallback={() => dispatch(getCurrentVacancy(match.params.id))}
                  handlerClose={() => this.setState({ open: false })}
                />
              )}
            </div>
            <div className={cn('creator-container')}>
              <p className={'p3 p3_theme_light'}> Менеджер - { get(current, 'creator.name_surname') } </p>
              <p className={'p3 p3_theme_light text-separator'}>|</p>
              <p className={'p3 p3_theme_light'}> Дата подачи заявки - {moment(current.created_at).format('DD.MM.YYYY')} </p>
              <p className={'p3 p3_theme_light text-separator'}>|</p>
              <p className={'p3 p3_theme_light'}> Статус - { current.status_name } </p>
            </div>

        { current.status !== 'new' && !isEmpty(vacancyStages) && (
          <VacancyStatus
            {
              ...{
                dispatch,
                match,
                vacancyStages,
                filter,
              }
            }
          />
        )}

        <div className={cn('tabs')}>
          <div
            onClick={() => this.setState({ tab: 'candidates' })}
            className={cn('tabs-item').state({ active: tab === 'candidates' })}
          >
            Кандидаты
          </div>
          <div
            onClick={() => this.setState({ tab: 'description' })}
            className={cn('tabs-item').state({ active: tab === 'description' })}
          >
            Описание
          </div>
        </div>
        <div className={cn('tab-container')}>
            <CandidatesList
              {
                ...{
                  hiddenCandidateList: tab !== 'candidates',
                  dispatch,
                  match,
                  currentCandidates,
                  loadingVacancyCandidates,
                  loadingVacancyCandidate,
                  page,
                  scroll,
                  showCandidateCard,
                  currentCandidate,
                  role,
                  current,
                  checkAllVacancyCandidate,
                  showLindkedModal,
                }
              }
            />
            <VacancyInfo
              {
                ...{
                  hiddenVacancyInfo: tab === 'candidates',
                  current,
                }
              }
              />
        </div>

        <NoticeWindow
          handleHide={() => this.setState({ show: false })}
          show={show}
          clearLinkedCandidates={() => dispatch({ type: 'CLEAR_LINKED_VACANCY_CANDIDATES' })}
          linkedCandidates={ currentCandidates.filter( it => it.isChecked ) }
        />
      </Wrapper>
    )
  }
}
export default Presenter
