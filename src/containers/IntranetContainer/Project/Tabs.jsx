import React, { Component } from 'react'
import { v4 } from 'uuid'

import { PROJECT_TABS } from './data'
import GeneralInformation from './GeneralInformation'
import Participants from './Participants'
import Customers from './CustomerContacts'

const cn = require('bem-cn')('project')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Tabs extends Component {
  state = {

    project_tabs: PROJECT_TABS,
    currentTab: PROJECT_TABS[0].nameTab,
  }

  render() {
    const { project_tabs, currentTab } = this.state
    const { project } = this.props

    return (
      <div>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            {project_tabs.map(it => (
              <li
                key={it.nameTab}
                className={cn('tabs-list-item')
                  .mix('cur')
                  .state({ current: currentTab === it.nameTab })}
                onClick={() => this.setState({ currentTab: it.nameTab })}
              >
                {it.title}
                {it.nameTab === 'participant' && <sup className={cn('count')}> {project.accounts_count} </sup>}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('tabs-body')}>
          {currentTab === 'general_information' && <GeneralInformation {...this.props} />}
          {currentTab === 'participant' && <Participants {...this.props} />}
          {currentTab === 'customers_contacts' && <Customers {...this.props} />}
          {/*{currentTab === 'history' && this.renderAvailableToMe()}*/}
        </div>
      </div>
    )
  }
}
