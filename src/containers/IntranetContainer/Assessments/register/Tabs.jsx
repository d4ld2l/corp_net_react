import React, { Component } from 'react'
import Сonduct from './Сonduct'
import Search from './Search'
import { getAssessmentSessions, changeStatusFilterAssessment } from 'redux-folder/actions/assessmentActions'

const cn = require('bem-cn')('assessments')

if (process.env.BROWSER) {
  require('./css/style.css')
}

class Tabs extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getAssessmentSessions(1))
  }

  render() {
    const { assessment: {
      filterParams: { status },
      },
      dispatch,
      loaderAssessmentSessions,
    } = this.props

    return (
      <div>
        <div className={"tabs"} style={{ marginTop: '30px' }}>
          <ul className={"tabs__list"}>
            <li
              className={cn('tabs-item')
                .mix('tabs__item')
                .state({
                  current: status === 'in_progress'
                })}
              onClick={() => dispatch(changeStatusFilterAssessment('in_progress'))}
            >
              Проводятся
            </li>
            <li
              className={cn('tabs-item')
                .mix('tabs__item')
                .state({
                  current: status === 'closed'
                })}
              onClick={() => dispatch(changeStatusFilterAssessment('closed'))}
            >
              Завершённые
            </li>
          </ul>
        </div>
        <div className={'tabs__content'}>
          <Search key="searchTbl" {...this.props}/>
          <Сonduct {...this.props} />
        </div>
      </div>
    )
  }
}

export default Tabs
