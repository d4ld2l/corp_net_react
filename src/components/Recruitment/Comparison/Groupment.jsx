import React, { Component } from 'react'
import {
  Groupment_left,
  Groupment_right,
  Groupment_merge,
} from 'components-folder/Icon/'
import { cn } from './common'

export default class Groupment extends Component{
  render(){
    const { candidate_one_title, candidate_two_title, groupment, isAnyPdf, candidates } = this.props
    return (
      <div
        className={
          cn('groupment')
          .mix(isAnyPdf ? candidates[0].isPdf ? cn('groupment_mr-l-0') : cn('groupment_mr-r-0') : '')
        }
        >
      {candidate_one_title && <h3 className={cn('groupment-title')}>{candidate_one_title}</h3>}
      {candidate_two_title && <h3 className={cn('groupment-title')}>{candidate_two_title}</h3>}
      {/*groupment && (
        <div className={cn('groupment-control-elements')}>
          <span className={cn('groupment-wrapper-icon')} title={'Оставить левого'}>
            <Groupment_left className={cn('groupment-icon')} />
          </span>
          <span className={cn('groupment-wrapper-icon')} title={'Объединить вместе'}>
            <Groupment_merge className={cn('groupment-icon').mix(cn('groupment-icon_disabled'))} />
          </span>
          <span className={cn('groupment-wrapper-icon')} title={'Оставить правого'}>
            <Groupment_right className={cn('groupment-icon')} />
          </span>
        </div>
      )*/}
    </div>
    )
  }
}
