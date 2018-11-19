import React, { Component } from 'react'
import moment from 'moment/moment'
import Loader from 'components-folder/Loader'

import CardHeader from './CardHeader'
import CardMainInfo from './CardMainInfo'
import CardBody from './CardBody'
import SubtaskWrapper from './Subtask/SubtaskWrapper'
import Observers from './Observers'
import { reduxForm } from 'redux-form'

const cn = require('bem-cn')('task-card')

if (process.env.BROWSER) {
  require('../css/style.css')
}
moment.locale('ru')

const ObserversSelect = reduxForm({ form: 'Task' })(Observers)

export default class TaskCard extends Component {
  componentDidUpdate() {
    const card_wrap = document.querySelector('.card__wrapper')

    card_wrap && (card_wrap.clientHeight > 750 && card_wrap.classList.add('card__wrapper_active'))
    // card_wrap.classList.add('card__wrapper_active', 'global-scroll', 'global-scroll_theme_light')
  }

  render() {
    const { taskLoading, current } = this.props

    if (taskLoading) {
      return <Loader/>
    }

    return (
      <div className={cn} key={current.id}>
        <CardHeader {...this.props} />

        <div className={cn('wrapper')}>
          <CardMainInfo {...this.props} />
          <CardBody {...this.props} />

          { !current.parent_id &&
            <SubtaskWrapper {...this.props} submitOnChange={true} />
          }

          { !current.parent_id &&
            <ObserversSelect
              {...this.props}
              wrapperClass="task-card__observers"
              submitOnChange={true}
            />
          }
        </div>

      </div>
    )
  }
}
