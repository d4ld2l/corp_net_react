import React, { Component } from 'react'
import Loader from '../../Loader'
import {connect} from 'react-redux'
import { currentGroup } from '../../../redux/reducers/candidates'
import {closeSidebar, getCandidates, resetCandidates, resetSearch} from "../../../redux/actions/candidatesActions"

const cn = require('bem-cn')('candidates-dashboard')

const connector = connect(state => ({
  currentGroup: currentGroup(state)
}))

class CandidatesRainbow extends Component {

  onGroupClick = async (id: ?number) => {
    const { dispatch } = this.props
    dispatch(closeSidebar())
    await dispatch(resetCandidates())
    await dispatch(resetSearch())
    dispatch(getCandidates({ groupId: id }))
  }

  render() {
    const { candidates: { stats }, currentGroup } = this.props

    if(stats.total_candidates_count == undefined) {
      return <Loader />
    }

    return (
      <div className={cn('rainbow')}>
        <div
          className={cn('stage')
            .mix('cur')
            .state({ active: currentGroup.value === 'all' })}
          style={{ borderBottom: 'none' }}
          onClick={() => { this.onGroupClick(null) }}
        >
          <p className={cn('label').mix('p3 p3_theme_light fw_400')}>Все</p>
          <span className={cn('link').mix('p2 link_theme_light_third link_pseudo')}>{stats.total_candidates_count}</span>
        </div>
        <div
          className={cn('stage')
            .mix('cur')
            .state({ active: currentGroup.value === 'free' })}
          style={{ borderBottom: 'none' }}
          onClick={() => { this.onGroupClick(-1) }}
        >
          <p className={cn('label').mix('p3 p3_theme_light fw_400')}>Свободные</p>
          <span className={cn('link').mix('p2 link_theme_light_third link_pseudo')}>{stats.unassigned_candidates_count}</span>
        </div>
        {stats.vacancy_stage_groups.map(group => (
          <div
            key={group.id}
            className={cn('stage')
              .mix('cur')
              .state({ active: currentGroup.value === group.value })}
            style={{ borderBottomColor: group.color }}
            onClick={() => { this.onGroupClick(group.id) }}
          >
            <p className={cn('label').mix('p3 p3_theme_light fw_400')}>{group.label}</p>
            <span className={cn('link').mix('p2 link_theme_light_third link_pseudo')}>{group.candidates_count}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default connector(CandidatesRainbow)
