import React, { Component } from 'react'
import EditInfoForm from './EditInfoForm'

const cn = require('bem-cn')('new-recruiter-request')

export default class Info extends Component {
  render() {
    const { setStage, style, vacancyId } = this.props

    return (
      <div className={cn} style={style}>
        <div className={cn('tab-wrap')}>
          <EditInfoForm vacancyId={vacancyId} />
          <div onClick={() => setStage()} className={'new-vacancy-container__btn-cancel-vacancy'}>
            Продолжить
          </div>
        </div>
      </div>
    )
  }
}
