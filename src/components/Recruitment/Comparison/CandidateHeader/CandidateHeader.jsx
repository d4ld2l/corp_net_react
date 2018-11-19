import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Attention,
  Arrow,
} from 'components-folder/Icon/'

import { cn } from '../common'

export default class CandidateHeader extends Component {
  renderStatus() {
    const { status, candidate_avatar } = this.props
    return(
      <div
        className={cn('stage', { with_margin: !candidate_avatar })}
        style={{backgroundColor: status.color}}
        title={status.name}
      >
        <span className={cn('stage-label')}>{status.name}</span>
        <Attention className={cn('attention-icon')} style={{color: status.color}}/>
      </div>
    )
  }
  render() {
    const {
      candidates: { select = [] },
      comparison: { positionInArray },
      showNextCandidate,
      showPrevCandidate,
      date_added,
      candidate_avatar,
      candidate_name,
      candidate_age,
      candidate_residency,
      candidate_profession,
      candidate_name_link_profile,
      status,
      control_elements,
      children,
    } = this.props
    return (
      <div className={cn('candidate-header')}>
        {control_elements && (
          <div className={cn('control-resume')}>
            <div
              className={positionInArray > 0 ? cn('prev').mix(cn('prev_active')) : cn('prev')}
              title={'Предыдущее резюме'}
              onClick={e => showPrevCandidate()}
            >
              <Arrow className={cn('arrow-light-icon', { rotate: 'left' })} />
            </div>
            <p className={cn('count-vacancy')}>
              {positionInArray + 1} из {select.length}
            </p>
            <div
              className={
                positionInArray < select.length - 1 ? cn('next').mix(cn('next_active')) : cn('next')
              }
              title={'Следующее резюме'}
              onClick={e => showNextCandidate()}
            >
              <Arrow className={cn('arrow-light-icon', { rotate: 'right' })} />
            </div>
          </div>
        )}
        {date_added && <p className={cn('candidate-date-added')}>Добавлен {date_added}</p>}

        <div className={cn('candidate-wrapper_flex')}>
          {candidate_avatar && (
            <div>
              <div
                className={cn('candidate-avatar')}
                style={{ background: `url('${candidate_avatar}') center center / cover no-repeat` }}
              />
              {status && this.renderStatus.call(this)}
            </div>
          )}
          <div className={cn('candidate-wrapper-basic-info')}>
            {candidate_name && (
              <Link
                to={`${candidate_name_link_profile}`}
                title={candidate_name}
                className={cn('candidate-name')}
              >
                {candidate_name}
              </Link>
            )}
            {!candidate_avatar && status && this.renderStatus.call(this)}
            {candidate_age &&
              candidate_residency && (
                <p className={cn('candidate-age-residency')}>
                  {candidate_age}
                  {candidate_age && candidate_residency ? ', ' : ''}
                  {candidate_residency}
                </p>
              )}
            {candidate_profession && (
              <p className={cn('candidate-profession')}>{candidate_profession}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }
}
