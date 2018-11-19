import React, { Component } from 'react'
import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'

import { Loupe, Closed } from '../../Icon'
import Loader from '../../Loader'
import NewVacancies from './NewVacancies'
import InWorkVacancies from './InWorkVacancies'
import InPauseVacancies from './InPauseVacancies'
import ArchiveVacancies from './ArchiveVacancies'
import SearchForm from './SearchForm'
import {
  getVacancies,
  getVacanciesStat,
  resetVacancies,
} from '../../../redux/actions/vacanciesActions'
import { getMilestonesGroup } from "../../../redux/actions/milestonesGroupActions";

const cn = require('bem-cn')('vacancies')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(state => ({
  loader: state.loaders.vacancies,
  vacancies: state.vacancies.all,
  stats: state.vacancies.stats,
  scroll: state.vacancies.scroll,
  stages: path([], ['vacancies', 'current', 'vacancy_stages'], state),
  groups: path([], ['recruiter', 'newRequest', 'milestonesGroups'], state),
}))

class Container extends Component {
  state = {
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
      },
    ],
    currentTab: 'worked',
    openSearch: false,
    page: 1,
  }

  closeSearchForm() {
    const { openSearch } = this.state
    this.setState({ openSearch: !openSearch })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const { currentTab, page } = this.state
    const { dispatch } = this.props
    dispatch(getVacanciesStat({scope: 'all'}))
    dispatch(getVacancies(page, currentTab)).then(() => {
      this.setState({ page: this.state.page + 1 })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  setStatus(status) {
    const { dispatch } = this.props
    if (!this.props.loader){
      dispatch(resetVacancies())
      dispatch(getVacancies(1, status))
      this.setState({ currentTab: status, page: 2 })
    }
  }

  handleScroll = () => {
    const { scroll } = this.props
    if (scroll) {
      const element = document.querySelectorAll('#vacancies-container')[0]
      const height = element ? element.clientHeight : 1000
      const offset = window.pageYOffset
      if (height - offset < 1000 && !this.props.loader) {
        this.props.dispatch(getVacancies(this.state.page, this.state.currentTab))
        this.setState({ page: this.state.page + 1 })
      }
    }
  }

  render() {
    if (!Object.keys(this.props.stats).length) {
      return <Loader/>
    }
    const { currentTab, tabs, openSearch, page } = this.state
    const { vacancies, stats } = this.props
    return (
      <div className={cn}>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            {tabs.map((e, i) => (
              <li
                key={i}
                className={cn('tabs-list-item')
                  .mix('cur')
                  .state({ current: currentTab === e.value })}
                onClick={() => this.setStatus(e.value)}
              >
                {e.label}<span
                className={cn('tabs-list-item-count')}>{stats[e.value]}</span>
              </li>
            ))}
            {/* {openSearch ? (
              <div
                className={cn('pseudo-link').state({ open: openSearch })}
                onClick={() => this.closeSearchForm()}
                title="Скрыть поиск"
              >
                <a className={cn('toggle-btn')}>Скрыть поиск</a>
              </div>
            ) : (
              <div
                className={cn('pseudo-link').state({ open: openSearch })}
                onClick={() => this.setState({ openSearch: !openSearch })}
                title="Открыть поиск"
              >
                <Loupe className={cn('loupe-icon')}/>
              </div>
            )
            } */}

            {/*{currentTab === 'new' && (*/}
            {/*openSearch ? (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.closeSearchForm()}*/}
            {/*title="Скрыть поиск"*/}
            {/*>*/}
            {/*<a className={cn('toggle-btn')}>Скрыть поиск</a>*/}
            {/*</div>*/}
            {/*) : (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.setState({openSearch: !openSearch})}*/}
            {/*title="Открыть поиск"*/}
            {/*>*/}
            {/*<Loupe className={cn('loupe-icon')}/>*/}
            {/*</div>*/}
            {/*)*/}
            {/*)}*/}

            {/*{currentTab === 'paused' && (*/}
            {/*openSearch ? (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.closeSearchForm()}*/}
            {/*title="Скрыть поиск"*/}
            {/*>*/}
            {/*<a className={cn('toggle-btn')}>Скрыть поиск</a>*/}
            {/*</div>*/}
            {/*) : (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.setState({openSearch: !openSearch})}*/}
            {/*title="Открыть поиск"*/}
            {/*>*/}
            {/*<Loupe className={cn('loupe-icon')}/>*/}
            {/*</div>*/}
            {/*)*/}
            {/*)}*/}

            {/*{currentTab === 'archived' && (*/}
            {/*openSearch ? (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.closeSearchForm()}*/}
            {/*title="Скрыть поиск"*/}
            {/*>*/}
            {/*<a className={cn('toggle-btn')}>Скрыть поиск</a>*/}
            {/*</div>*/}
            {/*) : (*/}
            {/*<div*/}
            {/*className={cn('pseudo-link').state({open: openSearch})}*/}
            {/*onClick={() => this.setState({openSearch: !openSearch})}*/}
            {/*title="Открыть поиск"*/}
            {/*>*/}
            {/*<Loupe className={cn('loupe-icon')}/>*/}
            {/*</div>*/}
            {/*)*/}
            {/*)}*/}
          </ul>
        </div>

        {currentTab === 'worked' && (!this.props.loader || page !== 1) && (
          <div>
            {currentTab === 'worked'
            //  && openSearch &&
            // <SearchForm key="search-in-work-tab"/>
            }
            <InWorkVacancies
              vacancies={vacancies}/>
          </div>
        )}
        {currentTab === 'new' && (!this.props.loader || page !== 1) && (
          <div>
            {currentTab === 'new'
            //  && openSearch &&
            // <SearchForm key="search-new-tab"/>
            }
            <NewVacancies
              vacancies={vacancies}/>
          </div>
        )}
        {currentTab === 'paused' && (!this.props.loader || page !== 1) && (
          <div>
            {currentTab === 'paused'
            // && openSearch &&
            // <SearchForm key="search-in-pause-tab"/>
            }
            <InPauseVacancies
              vacancies={vacancies}
            />
          </div>
        )}
        {currentTab === 'archived' && (!this.props.loader || page !== 1) && (
          <div>
            {currentTab === 'archived'
            // && openSearch &&
            // <SearchForm key="search-archive-tab"/>
            }
            <ArchiveVacancies
              vacancies={vacancies}
            />
          </div>
        )}
        {this.props.loader && <Loader/>}
      </div>
    )
  }
}

export default connector(Container)
