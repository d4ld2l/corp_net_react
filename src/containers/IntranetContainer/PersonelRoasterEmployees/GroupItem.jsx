import React, { Component } from 'react'

import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'

import { v4 } from 'uuid'
import moment from 'moment/moment'

const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('./css/groups/groups.css')
}
moment.locale('ru')

export default class GroupItem extends Component {
  state = {
    open: false,
    showExternalData: false,
  }


  render() {
    const { open, showExternalData } = this.state
    const {
      group,
      director,
      setting,
      onClick,
      show,
      showNewGroupCard,
      showEditGroupCard,
      groupId,
    } = this.props

    return (
      <div
        className={cn('item').mix(
          cn(director ? 'item_fs' : 'item_sb').mix(
            cn(groupId === group && show && 'item_active')
          )
        )}
        /*onClick={() => onClick({ groupId: group, show: true, showEditGroupCard: false })}*/
      >
        <div
          className={cn('table-item').mix(cn('table-item_logo'))}
          style={{
            background: `url('${group.logo}') center center / cover no-repeat`,
          }}
        />
        <div className={cn('table-item').mix(cn('table-item_info'))}>
          <a className={('p1 link_theme_light_first indent-reset')}>{group.name}</a>
          <time className={cn('table-date').mix('p2 p2_theme_light_second indent-reset')}>{group.date}</time>
        </div>
        {show ? (
          <div className={cn('table-item').mix(cn('table-item_quantity'))}>
            {group.currentPositions.length}
          </div>
          ) : showExternalData ? (
            <div className={cn('table')}>
                {group.currentPositions.map((it,i) => (
                  <div className={cn('table-data').mix(cn('table-data_inner'))} key={`${i}:${it.group_id}`}>
                    <div className={cn('table-item').mix(cn('table-item_name'))}>
                      <p className={cn('table-link').mix('p1 p1_theme_light_first indent-reset')}>{it.name}</p>
                    {(group.currentPositions.length === (i + 1)) && (
                      <a className={cn('table-link').mix('p1 link_theme_light_third indent-reset')} onClick={e => this.setState({showExternalData: false})}>Скрыть</a>
                    )}
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_practice'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.practice}</p>
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_rate'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.rate}</p>
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_unit'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            ): (
              <div className={cn('table-data')}>
                <div className={cn('table-item').mix(cn('table-item_name'))}>
                  <p>{group.currentPositions[0].name}</p>
                  {group.currentPositions.length > 1 && (
                    <a className={cn('table-link')} onClick={e => this.setState({showExternalData: true})}>Ещё {group.currentPositions.length - 1} юр. лиц</a>
                  )}
                </div>
                <div className={cn('table-item').mix(cn('table-item_practice'))}>
                  <p>{group.currentPositions[0].practice}</p>
                </div>
                <div className={cn('table-item').mix(cn('table-item_rate'))}>
                  <p>{group.currentPositions[0].rate}</p>
                </div>
                <div className={cn('table-item').mix(cn('table-item_unit'))}>
                  <p>{group.currentPositions[0].unit}</p>
                </div>
              </div>
            )}
        {/*{director && (*/}
          {/*<div*/}
            {/*className={cn('item-director').mix(*/}
              {/*cn((show || showNewGroupCard || showEditGroupCard) && 'item-director_hide')*/}
            {/*)}*/}
          {/*>*/}
            {/*<p className={cn('item-director-name')}>{group.director}</p>*/}
          {/*</div>*/}
        {/*)}*/}
        <div
          className={cn('item-open-sidebar')}
          title={'Раскрыть карточку группы рассылки'}
          onClick={() => onClick({ groupId: group, show: true, showEditGroupCard: false })}
        >
          <Arrow
            className={cn('item-arrow-icon').mix(
              cn(groupId === group && show && 'item-arrow-icon_active')
            )}
          />
        </div>
      </div>
    )
  }

  setCandidate(groupId) {
    this.props.setCandidate(groupId)
  }
}
