import React, { Component } from 'react'
import Switch from 'react-ios-switch'

const cn = require('bem-cn')('new-recruiter-request-selection-tab-evaluation')
if (process.env.BROWSER) {
  require('./Evaluation.css')
}

export default class Evaluation extends Component {
  render() {
    const { evaluationOfCandidate, onChange } = this.props

    return (
      <div className={cn}>
        <div className={cn('title')}>
          <div className={cn('title-wrap')}>
            <span className={cn('title-text')}>Оценка кандидата на этапе</span>

            <div className={cn('title-description')}>Выберите тип оценки</div>
          </div>

          <Switch
            checked={evaluationOfCandidate}
            disabled={false}
            handleColor={'#ffffff'}
            offColor={'#e8e8ed'}
            onChange={value => onChange(value)}
            onColor={'#2b2d4b'}
            // pendingOffColor={<color>}
          />
        </div>
      </div>
    )
  }
}
