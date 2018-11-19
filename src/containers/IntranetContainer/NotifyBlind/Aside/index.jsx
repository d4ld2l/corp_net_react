import React, { Component } from 'react'
import { v4 } from 'uuid'
import ReactResponsiveSelect from 'react-responsive-select'
import onClickOutside from 'react-onclickoutside'

import AsideHead from './AsideHead'
import DiscussionFilters from './DiscussionFilters'
import Discussions from '../Discussions'
import Discussion from '../Discussion'
import ParticipantsCard from '../Participants'
import Filtering from 'components-folder/Filtering'
import Input from 'components-folder/Input'
import DiscussionForm from '../DiscussionForm'
import { Loupe, Filter } from 'components-folder/Icon/'

import TaskFiltering from '../TaskFiltering'
import { get, isEmpty } from 'lodash'

export const cn = require('bem-cn')('aside')

class Aside extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: '',
    }

    this.handlerSubmitSearch = this.handlerSubmitSearch.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  handleClickOutside = () => {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_NOTIFY_BLIND' })
  }

  handlerSubmitSearch() {
    const {
      changeFilterParam,
      topics: {
        filter: {
          params: { q },
        },
      },
    } = this.props
    const { searchInput } = this.state
    if (q || searchInput !== '')
      changeFilterParam({
        q: searchInput === '' ? undefined : searchInput,
      })
  }

  clearSearch() {
    this.setState({ searchInput: '' }, this.handlerSubmitSearch)
  }

  toggleSearch = () => {
    const { dispatch } = this.props
    dispatch({ type: 'NOTIFY_BLIND_TOGGLE_SEARCH' })
    this.handlerSubmitSearch()
  }

  toggleFilters = () => {
    const { dispatch } = this.props
    dispatch({ type: 'NOTIFY_BLIND_TOGGLE_FILTERS' })
  }

  onTabChange = tab => {
    const { dispatch } = this.props
    dispatch({ type: 'NOTIFY_BLIND_CHANGE_TAB', payload: { tab: tab.id } })
  }

  get entityName() {
    const { pathname, state } = this.props

    const pathItems = pathname.match(/(\w+)\/(\d+)$/)
    const resourceName = pathItems && pathItems[1]

    const mapping = {
      bids: `Заявка ${get(state, 'bids.current.id')}`,
      surveys: get(state, 'surveys.current.name'),
      vacancies: get(state, 'surveys.vacancies.name'),
      projects: get(state, 'projectsData.current.title'),
      events: get(state, 'events.current.name'),
      // distribution: get(state, 'distribution.current.name'), // TBD
    }

    return mapping[resourceName]
  }

  render() {
    const {
      showSearch,
      showFilters,
      // isNoteCard,
      // isTaskCard,
      // isParticipants,
      // isCreateDiscussion,
      // isCreateTask,
      tasks,
      openTaskCard,
      openTaskForm,
      tab,
      view,
      topics,
      enabledComponents,
    } = this.props

    const { searchInput } = this.state

    const {
      activeEntity,
      selectOptions,
      filter: { params },
    } = topics

    const { changeTab, changeFilterParam } = this.props

    const tabs =
      enabledComponents.shr_discussions &&
      (enabledComponents.recruitment_tasks || enabledComponents.shr_tasks)
        ? [
            {
              id: 'discussions',
              name: 'Обсуждения',
              count: topics.tabs.discussionsCount,
            },
            {
              id: 'tasks',
              name: 'Задачи',
              count: tasks.length,
            },
          ]
        : []

    // TODO: remove
    if (tab === 'tasks' && (openTaskCard || openTaskForm)) {
      return (
        <div className={cn.mix('aside_note-card')}>
          <TaskFiltering {...this.props} />
        </div>
      )
    }

    return (
      <div className={cn.mix(activeEntity !== undefined && 'aside_note-card')}>
        {/*карточка обсуждения*/}
        {tab === 'discussions' && activeEntity === 'Card' && <Discussion {...this.props} />}

        {/*участники*/}
        {tab === 'discussions' && activeEntity === 'Members' && (
          <ParticipantsCard {...this.props} />
        )}

        {/*создание обсуждения*/}
        {tab === 'discussions' && activeEntity === 'Form' && <DiscussionForm {...this.props} />}

        {activeEntity === undefined && (
          <div>
            <AsideHead {...this.props} className={cn('head')} />

            <p className={cn('name-essence')}>{this.entityName}</p>

            <div className={cn('wrap')}>
              <Filtering
                key={v4()}
                filtering={tabs}
                current={tab}
                showCount={true}
                className={cn('filtering')}
                onClick={this.onTabChange}
              />

              <div>
                {enabledComponents.shr_tasks && (
                  <span
                    className={cn('loupe')}
                    title={showSearch ? 'Закрыть поиск' : 'Открыть поиск'}
                    onClick={this.toggleSearch}
                  >
                    <Loupe
                      className={cn('loupe-icon').mix(
                        (!isEmpty(searchInput) || showSearch) && cn('loupe-icon_active')
                      )}
                    />
                  </span>
                )}
                <span
                  className={cn('filter')}
                  title={showFilters ? 'Закрыть фильтр' : 'Открыть фильтр'}
                  onClick={this.toggleFilters}
                >
                  <Filter
                    className={cn('filter-icon').mix(showFilters && cn('filter-icon_active'))}
                  />
                </span>
              </div>
            </div>
            {tab === 'discussions' && (
              <div key={v4()} className={cn('wrap')} style={{ marginTop: 20 }}>
                <Filtering
                  filtering={topics.tabs.items}
                  current={topics.tabs.current}
                  showCount={true}
                  className={cn('filtering')}
                  onClick={changeTab}
                />
              </div>
            )}

            {showSearch && (
              <div className={cn('search')}>
                <Loupe className={cn('search-icon')} />
                <Input
                  type={'text'}
                  name={'search'}
                  placeholder={'Введите запрос'}
                  className={cn('input')}
                  value={searchInput}
                  input={{
                    onChange: evt => {
                      this.setState({
                        searchInput: evt.target.value,
                      })
                    },
                    onKeyDown: ({ key }) => {
                      if (key === 'Enter') {
                        this.handlerSubmitSearch.call(this)
                      }
                    },
                  }}
                />
              </div>
            )}

            {tab === 'discussions' && showFilters && (
              <DiscussionFilters
                {...selectOptions}
                {...params}
                changeFilterParam={changeFilterParam}
              />
            )}

            {tab === 'discussions' && <Discussions {...this.props} />}

            {tab === 'tasks' && <TaskFiltering {...this.props} />}
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(Aside)
