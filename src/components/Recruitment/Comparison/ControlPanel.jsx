import React, { Component } from 'react'
import Select from 'react-select'
import Wrapper from 'components-folder/Wrapper'
import {
  GroupUser,
  User,
  Hook,
} from 'components-folder/Icon/'
import { cn } from './common'

export default class ControlPanel extends Component {
  render() {
    const { 
      comparison: { select: { value, options } },
      saveOneCandidate,
      saveBothCandidates, 
      changeSaveDecision 
    } = this.props
    return (
      <div className={cn('control-panel')}>
        <Wrapper>
          <div className={cn('leave-wrapper')}>
            <div className={cn('leave')}>
              <GroupUser className={cn('leave-group-user')} />
              <span className={cn('leave-text')}>Это 2 разных кандидата?</span>
              <button
                className={'btn btn-primary btn-small'}
                onClick={saveBothCandidates}
              >
                Оставить оба
              </button>
            </div>
            <div className={cn('leave-before')}>
              <User className={cn('leave-user')} />
              <span className={cn('leave-text')}>Это один человек?</span>
              <div className={cn('leave-before-form').mix('comparison')}>
                <Hook className={cn(value.cnClass)} />
                <div className="form-group">
                  <Select
                    name="type_survey"
                    options={options}
                    value={value}
                    searchable={false}
                    onChange={changeSaveDecision}
                  />
                </div>
                <button
                  className={'btn btn-primary btn-small'}
                  onClick={saveOneCandidate}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}
