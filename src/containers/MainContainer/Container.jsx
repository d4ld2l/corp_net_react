import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Sidebar } from 'components-folder/Sidebar'
import ScrollToTopOnMount from 'components-folder/ScrollToTopOnMount'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { connect } from 'react-redux'
import Loader from 'components-folder/Loader'
import { Row, Col } from 'react-bootstrap'
import { Loupe, Close, Arrow } from 'components-folder/Icon/'
import SearchForm from './SearchForm'
import CollapseVacancy from 'components-folder/Collapse/CollapseVacancy'
import { getMyVacancies } from '../../redux/actions/vacanciesActions'
import { getMilestonesGroup } from '../../redux/actions/milestonesGroupActions'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import Wrapper from 'components-folder/Wrapper'

import {
  getVacancies,
  getVacanciesStat,
  resetVacancies,
  changeMyVacanciesTab,
} from 'redux-folder/actions/vacanciesActions'

const cn = require('bem-cn')('main-container')

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(state => ({
  current: state.vacancies.current,
  vacancies: state.vacancies.all,
  stats: state.vacancies.stats,
  loading: state.loaders.myVacancies,
  candidates: state.candidates.data,
}))

// TODO: удалить этот компонент, использовать src/components/Recruitment/Vacancies/index.js
//
class Container extends Component {
  state = {
    filter: false,
    openSearch: false,
    isOpened: true,
    open: true,
    tabs: [
      {
        value: 'worked',
        label: 'В работе',
      },
      {
        value: 'new',
        label: 'Новые',
      },
      {
        value: 'paused',
        label: 'На паузе',
      },
      {
        value: 'archived',
        label: 'Архив',
      }
    ],
  }

  collapses = []

  componentDidMount() {
    const { dispatch, page, currentTab } = this.props
    dispatch(getMyVacancies(page, currentTab))
    dispatch(getVacanciesStat({scope: 'my'}))
    this.scrollBlock.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    this.scrollBlock.removeEventListener('scroll', this.handleScroll)
    dispatch({ type: 'RESET_MY_VACANCIES_STORE' })
  }

  toggleAll = () => {
    const isOpened = !this.state.isOpened
    this.setState({ isOpened }, () => {
      this.collapses.forEach(it => it.setState({ isOpened }))
    })
  }

  onCollapseClick = () => {
    const isOpened = !!this.collapses.find(it => it.state.isOpened)
    this.setState({ isOpened })
  }

  closeSearchForm() {
    const { openSearch } = this.state
    this.setState({ openSearch: !openSearch })
  }

  renderRatings(stage){
    const passed = stage.rated['1'] || 0
    const failed = stage.rated['0'] || 0
    return (
      <ul className={cn('stage-list')}>
        <li>
          <span className={cn('stage-list-green')}/>
          { passed }
        </li>
        <li>
          <span className={cn('stage-list-red')}/>
          { failed }
        </li>
        <li>
          <span className={cn('stage-list-gray')}/>
          { stage.unrated }
        </li>
      </ul>
    )
  }

  changeTab = (tab) => {
    const { currentTab, dispatch } = this.props
    if ( tab !== currentTab ) {
      dispatch(changeMyVacanciesTab(tab))
      let open = currentTab !== 'new'
      this.setState({ isOpened: open, open: open })
    }
  }

  handleScroll = () => {
    const { scroll, dispatch, page, currentTab, loaders: { myVacancies: loadingVacancies } } = this.props

    if (scroll) {
      const el = this.scrollBlock
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop

      if (scrollBottom < 550 && !loadingVacancies) {
        dispatch(getMyVacancies(page, currentTab))
      }
    }
  }

  render() {
    const { stats, currentTab, data, page, loaders: { myVacancies: loadingVacancies } } = this.props
    const { tabs } = this.state

    return (
      <Wrapper>
        <Breadcrumbs breadcrumbs={[{ name: 'Мои вакансии', active: true }]} />

        <h1>Мои вакансии</h1>

        <Helmet>
          <title>HR - Главная страница</title>
        </Helmet>
        <div className={cn.mix('indent_30')}>
          <div className={cn('tabs')}>
            {/*<ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>*/}
              {/*<li*/}
                {/*className={cn('tabs-list-item').mix('cur').state({ current: currentTab === 'worked' })}*/}
                {/*onClick={() => this.changeTab('worked')}*/}
              {/*>*/}
                {/*В работе*/}
                {/*<sup className={cn('count')}>{get(stats, 'worked')}</sup>*/}
              {/*</li>*/}
              {/*<li*/}
                {/*className={cn('tabs-list-item').mix('cur').state({ current: currentTab === 'new' })}*/}
                {/*onClick={() => this.changeTab('new')}*/}
              {/*>*/}
                {/*Новые*/}
                {/*<sup className={cn('count')}>{get(stats, 'new')}</sup>*/}
              {/*</li>*/}
            {/*</ul>*/}
            <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
              {tabs.map((e, i) => (
                <li
                  key={i}
                  className={cn('tabs-list-item')
                    .mix('cur')
                    .state({ current: currentTab === e.value })}
                  onClick={() => this.changeTab(e.value)}
                >
                  {e.label}<span
                  className={cn('tabs-list-item-count')}>{stats[e.value]}</span>
                </li>
              ))}
            </ul>


            {currentTab !== 'new' &&
            <div className={cn('function-block')}>
              <div className={cn('hide-show-collapse')}>
                {this.state.open ? (
                  <a
                    className={cn('link-text')}
                    onClick={() =>
                      this.setState({
                        isOpened: false,
                        open: false,
                      })}
                  >
                    Свернуть все
                  </a>
                ) : (
                  <a
                    className={cn('link-text')}
                    onClick={() => this.setState({ isOpened: true, open: true })}
                  >
                    Развернуть все
                  </a>
                )}
              </div>
            </div>
            }
          </div>


          <div className={cn('wrapper-tab-content global-scroll global-scroll_theme_light')} ref = { node => this.scrollBlock = node }>
            {
              ( loadingVacancies && page === 1 ) ? (
                <Loader/>
              ) :
                (
                  !isEmpty(data) ? (
                      data.map((e, i) => (
                          <CollapseVacancy
                            key={i}
                            ref={ref => {
                              this.collapses[i] = ref
                            }}
                            open={this.state.isOpened}
                            onClick={this.onCollapseClick}
                            link={`/recruitment/vacancies/${e.id}`}
                            title={`${e.name || 'Название не указано'}`}
                            avatar={ get(e, 'creator.photo.url', '/public/avatar.png') }
                            name={ get(e, 'creator.name_surname') }
                            location={ e.place_of_work }
                            date={`${moment(e.created_at).format('DD.MM.YYYY')}`}
                          >
                            <div className={cn('stages')}>
                              {e.vacancy_stages &&
                              e.vacancy_stages.map(el => (
                                <div
                                  className={cn('stages-item')}
                                  key={el.id}
                                  style={{ width: `${100 / e.vacancy_stages.length}%` }}
                                >
                                  <span className={cn('stages-name')}>{el.name}</span>
                                  <Link className={cn('stages-users-count')}
                                        to={`/recruitment/vacancies/${e.id}`}>
                                    {el.candidates_count}
                                  </Link>
                                  { el.evaluation_of_candidate && this.renderRatings(el)}
                                  <div
                                    className={cn('stages-grop-color')}
                                    style={{ background: get(el, 'vacancy_stage_group.color', '#fff') }}
                                  />
                                </div>
                              ))}
                            </div>
                          </CollapseVacancy>
                        )
                      )
                    ) :
                    (
                      currentTab === 'worked' ? (
                        <div className={cn('msg-info')}>
                          <p className={cn('text-info').mix('p1 p1_theme_light_first indent_reset')}>
                            В работе вакансий нет
                          </p>
                        </div>
                      ) : (
                        <div className={cn('msg-info')}>
                          <p className={cn('text-info').mix('p1 p1_theme_light_first indent_reset')}>
                            Новые вакансии отсутствуют:&nbsp;
                          </p>
                          <Link
                            className={cn('link').mix('link link_theme_light_third')}
                            to={`/recruitment/vacancies/new/recruiter`}
                            title="Перейти на страницу создания вакансии"
                          >
                            создать новую вакансию
                          </Link>
                        </div>
                      )
                    )
                )
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default connector(Container)
