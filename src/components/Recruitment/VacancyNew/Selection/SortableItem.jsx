import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import * as recruiterActions from '../../../../redux/actions/recruiterActions'
import {Plus, Drop, Lock } from '../../../Icon'

const cn = require('bem-cn')('sortable-item')
if (process.env.BROWSER) {
  require('./SortableItem.css')
}

const connector = connect(
  state => ({
    state,
    milestonesGroups: state.recruiter.newRequest.milestonesGroups,
  }),
  { ...recruiterActions }
)

class SortableItemSrc extends Component {
  render() {
    const {
      value,
      sizeWidth,
      milestonesGroups,
      addRightMilestone,
    } = this.props
    const borderBottomColor = milestonesGroups.find(e => e.id === value.vacancy_stage_group_id)
    return (
      <li
        className={cn.state({ active: value.active })}
        style={{ width: sizeWidth }}
        onClick={(e) => {
          if (!e.target.classList.contains('sortable-item__plus-icon') && !(e.target.tagName === 'path' || e.target.tagName === 'svg') ){
            this.props.selectMilestones({ value, position: value.position })
          }
        }}
      >
        <div className={cn('head')}>
          {value.editable ? (
            <Drop className={cn('drag-icon')} />
          ) : (
            <Lock className={cn('lock-icon')} />
          )}
          <span className={cn('name')}>{value.name}</span>
        </div>
        {value.can_create_right && (
          <span
            className={cn('add-step-right').mix('cur')}
            onClick={() => addRightMilestone({ milestone: value })}
          >
            <Plus outline={'filled'} className={cn('plus-icon').mix('btn-icon_16')} />
          </span>
        )}
        {/*<div className={cn('status')}>*/}
        {/*{value.need_notification && <BellOutline className={cn('status-bell')} />}*/}
        {/*{value.evaluation_of_candidate && <StarContur className={cn('status-star')} />}*/}
        {/*</div>*/}

        <div
          className={cn('group-color')}
          style={{ background: borderBottomColor ? borderBottomColor.color : '#fff' }}
        />
      </li>
    )
  }
}

const SortableItem = SortableElement(connector(SortableItemSrc))

export default SortableItem
