import React, { Component } from 'react'
import { MAIN_TABS } from './data'
import ResumeTab from './ResumeTab'
import ExpectationsTab from './ExpectationsTab'
import FilesTab from './FilesTab'
import LettersTab from './LettersTab'
import HistoryTab from './HistoryTab'

const cn = require('bem-cn')('candidate-tabs')

if (process.env.BROWSER) {
  require('./candidate-tabs.css')
}


export default class Tabs extends Component {
  switchTab = (tab, { candidate, dispatch, loaders }) => {
    switch (tab) {
      case 'resume':
        return <ResumeTab candidate={candidate} />
      case 'expectations':
        return <ExpectationsTab candidate={candidate} />
      case 'files':
        return <FilesTab candidate={candidate} dispatch={dispatch} loaders={loaders} />
      case 'letters':
        return <LettersTab candidate={candidate} />
      case 'history':
        return <HistoryTab candidate={candidate} />

      default:
        return <ResumeTab candidate={candidate} />
    }
  }
  render() {
    const { tabs, currentTab, changeTab } = this.props

    return (
      <div className={cn}>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0')}>
            {tabs.map(e => (
              <li
                key={e.value}
                className={cn('tabs-list-item')
                  .mix('cur')
                  .mix(currentTab === e.value ? 'is-current' : '')}
                onClick={() => changeTab({ currentTab: e.value })}
              >
                {e.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('tabs-content')}>{this.switchTab(currentTab, this.props)}</div>
      </div>
    )
  }
}
