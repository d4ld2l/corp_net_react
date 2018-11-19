import React, { Component } from 'react'
import { v4 } from 'uuid'

import { PROJECTS_TAB, PROJECTS_HEAD } from './data'
import Project from './Project'
import Filtered from './Filtered'
import Search from './Search'
import { toggleTab, getProjectsDataPagination } from '../../../redux/actions/projectsDataActions'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('projects')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project_tab: PROJECTS_TAB,
      project_head: PROJECTS_HEAD,
    }
  }

  toggleTab() {
    const { dispatch, activeTabMy } = this.props
    dispatch(toggleTab(!activeTabMy))
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { dispatch, scroll, page, activeTabMy, loaders: { projectsData } } = this.props
    if (scroll && !projectsData) {
      const element = document.querySelectorAll('#projects')[0]
      const height = element ? element.clientHeight : 1000
      const offset = window.pageYOffset
      if (height - offset < 900) {
        dispatch(getProjectsDataPagination(page, activeTabMy))
      }
    }
  }

  render() {
    const { project_tab, project_head } = this.state
    const { projectsAllCount, projectsMyCount, data, loaders, activeTabMy } = this.props

    return (
      <div className={cn('wrapper')}>
        <Search {...this.props} />
        <Filtered {...this.props} />
        <ul className={cn('tabs-list')}>
          {project_tab.map(it => (
            <li
              key={v4()}
              className={cn('tabs-list-item')
                .mix('cur')
                .state({
                  current: activeTabMy ? 'mine' === `${it.nameTab}` : 'all' === `${it.nameTab}`,
                })}
              onClick={() => {
                if (!activeTabMy ? 'mine' === `${it.nameTab}` : 'all' === `${it.nameTab}`) {
                  this.toggleTab()
                }
              }}
            >
              <p className={cn('tabs-list-item-text')}>
                {it.title}
                {it.nameTab === 'mine' && (
                  <sup className={cn('tabs-list-item-count-employee')}>{projectsMyCount}</sup>
                )}
                {it.nameTab === 'all' && (
                  <sup className={cn('tabs-list-item-count-employee')}>{projectsAllCount}</sup>
                )}
              </p>
            </li>
          ))}
        </ul>
        <div className={cn('head-table')}>
          <ul className={cn('head-table-list')}>
            {project_head.map(it => (
              <li key={v4()} className={cn('head-table-list-inner')}>
                <p className={'p3 p3_theme_light indent_5'}>{it.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="projects">
          {loaders.projectsDataChangeTab && <Loader />}
          {!loaders.projectsDataChangeTab && data.map(it => <Project key={v4()} project={it} />)}
          {!loaders.projectsDataChangeTab && loaders.projectsData && <Loader />}
        </div>
      </div>
    )
  }
}
