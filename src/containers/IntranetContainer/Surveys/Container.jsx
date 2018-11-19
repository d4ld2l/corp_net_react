import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { parse } from 'qs'
import NewTab from './NewTab'
import PassedTab from './PassedTab'
import CreatedMyTab from './CreatedMyTab'
import SearchForm from './SearchForm'
import { Row, Col } from 'react-bootstrap'
import Loader from 'components-folder/Loader'
import { getSurveys } from 'redux-folder/actions/surveysActions'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { Plus } from 'components-folder/Icon'

const cn = require('bem-cn')('intranet-surveys')

if (process.env.BROWSER) {
  require('./Container.css')
}

const SURVEYS_TABS = [
  {
    value: 'new',
    label: 'Новые'
  },
  {
    value: 'created',
    label: 'Созданные мной'
  },
  {
    value: 'passed',
    label: 'Пройденные'
  },
]


export default class Container extends Component {
  state = {
    tabs: SURVEYS_TABS,
  }

  componentDidMount() {
    const { getSurveys, scope } = this.props
    getSurveys({ scope })

  }

  onChangeTab = tab => {
    const { searchNow, searchQuery, getSurveys, searchSurveys } = this.props
    const scope = tab.value

    if (searchNow) {
      searchSurveys(searchQuery, scope)
    } else {
      getSurveys({ scope })
    }
  }

  handleScroll = (event) => {
    const { getSurveys, searchSurveys, query, scroll, loading, loadingMore, searchNow, scope }  = this.props

    const el = event.target
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight

    if (bottom && scroll && !loading && !loadingMore) {
      if (searchNow) {
        searchSurveys(query, scope, { loadMore: true })
      } else {
        getSurveys({ scope, loadMore: true })
      }
    }
  }

  render() {
    const { tabs } = this.state
    const { count, loading, loadingMore, searchNow, searchSurveys, resetSearch, scope, system: { menu } } = this.props

    const data = searchNow ? this.props.searchData : this.props.surveys

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <div className={cn('wrapper-header-and-icon')}>
              <h1>{menu.find(it => it.id === 'shr_surveys').label}</h1>
              <Link to={`/surveys/new`} title="Создать новый опрос">
                <Plus outline={40} />
              </Link>
            </div>


            <div>
              <div className={cn('tabs')}>
                <ul className={cn('tabs-list').mix('lsn pl0 mb0')}>
                  {tabs.map((tab, i) => (
                    <li
                      key={i}
                      className={cn('tabs-list-item')
                        .mix('cur')
                        .state({
                          current: scope === tab.value,
                        })}
                      onClick={() => this.onChangeTab(tab)}
                    >
                      {tab.label}
                      <sup className={cn('count')}>{count && count[tab.value]}</sup>
                    </li>
                  ))}
                </ul>
              </div>

              <SearchForm
                scope={scope}
                searchSurveys={searchSurveys}
                resetSearch={resetSearch}
              />

              {loading ? (
                <Loader />
              ) : (
                <div className={cn('tabs-content').mix('global-scroll global-scroll_theme_light')} onScroll={this.handleScroll}>
                  {scope === 'new' && (
                    <NewTab
                      surveys={data}
                      isSearch={searchNow}
                    />
                  )}
                  {scope === 'created' && (
                    <CreatedMyTab
                      surveys={data}
                      isSearch={searchNow}
                    />
                  )}
                  {scope === 'passed' && (
                    <PassedTab
                      surveys={data}
                      isSearch={searchNow}
                    />
                  )}

                  {loadingMore && (
                    <div>
                      <Loader />
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
