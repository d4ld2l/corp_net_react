import React, { Component } from 'react'
import { Arrow } from 'components-folder/Icon'
import { setFilterVacancyCandidates } from 'redux-folder/actions/vacancyCardActions'
import Loader from 'components-folder/Loader'
import isEmpty from 'lodash/isEmpty'


const cn = require('bem-cn')('vacancy-status')

if (process.env.BROWSER) {
  require('./style/VacancyStatus.css')
}

export default class VacancyStatus extends Component {
  state = {
    lcount: 0,
    rcount: 0,
    marginLeft: 0,
    delta: 0,
    widthWrapper: '',
  }

  componentDidMount() {
    window.addEventListener('resize', this.getDelta)
    this.getDelta()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDelta)
  }

  getDelta = () => {
    const { vacancyStages } = this.props
    const delta = vacancyStages.length * 100 - this.refs.container.clientWidth
    const rcount = Math.ceil(delta / 100)
    const widthWrapper = this.refs.container.clientWidth > vacancyStages.length * 100 ? '100%' : `${vacancyStages.length * 100}px`
    this.setState({ rcount, delta, widthWrapper })
  }

  movePanel(direction) {
    const { lcount, rcount, marginLeft, delta } = this.state
    if (direction === 'left' && lcount === 0) {
      return
    }
    if (direction === 'right' && rcount === 0) {
      return
    }
    if (direction === 'left') {
      let margin
      if (rcount === 0) {
        margin = delta - (lcount - 1) * 100
      }
      if (Math.abs(marginLeft) < 100) {
        margin = Math.abs(marginLeft)
      } else {
        margin = 100
      }
      this.setState({
        rcount: rcount + 1,
        lcount: lcount > 0 ? lcount - 1 : 0,
        marginLeft: marginLeft + margin,
      })
    }
    if (direction === 'right') {
      let margin
      if (lcount === 0) {
        margin = delta - (rcount - 1) * 100
      } else {
        margin = 100
      }
      this.setState({
        lcount: lcount + 1,
        rcount: rcount > 0 ? rcount - 1 : 0,
        marginLeft: marginLeft - Math.abs(margin),
      })
    }
  }

  renderRatings(stage){
    const passed = stage.rated['1'] || 0
    const failed = stage.rated['0'] || 0
    return (
      <ul className={cn('stage-list')}>
        <li>
          <span className={cn('stage-list-green')}/>
          { passed }
        </li>
        <li>
          <span className={cn('stage-list-red')}/>
          { failed }
        </li>
        <li>
          <span className={cn('stage-list-gray')}/>
          { stage.unrated }
        </li>
      </ul>
    )
  }

  handlerFilterCandidate(vacancyStageId){
    const { dispatch, match: { params: { id } } } = this.props
    dispatch(setFilterVacancyCandidates(id, vacancyStageId))
  }

  render() {
    const { closeSidebarTab, vacancyStages, filter: { vacancy_stage_id } } = this.props
    const { lcount, rcount, marginLeft, delta, widthWrapper } = this.state

    if (isEmpty(vacancyStages)) {
      return(
        <div className={cn} onClick={closeSidebarTab}>
          <Loader />
        </div>
      )
    }
    return (
      <div className={cn} onClick={closeSidebarTab}>
        {delta > 0 && (
          <div
            className={cn('stage-button').state({ active: lcount > 0 })}
            onClick={() => this.movePanel('left')}
          >
            {lcount > 0 &&
            <span className={cn('stage-button-count')}>{lcount}</span>}
            <Arrow dir={'left'} className={cn('stage-button-icon')}/>
          </div>
        )}
        <div className={cn('stage-container')} ref={'container'}>
          <div
            className={cn('stage-wrapper')}
            style={{
              width: widthWrapper,
              marginLeft: `${marginLeft}px`,
            }}
          >
            <div
              className={cn('stage-item').state({ active: vacancy_stage_id === null })}
              onClick={() => this.handlerFilterCandidate(null)}
            >
              <span className={cn('stage-name')}>Все</span>
              <span className={cn('stage-users-count')}>
                { vacancyStages.reduce((sum, e) => sum + e.candidates_count, 0) }
              </span>
              <div className={cn('stage-group-color')}
                   style={{ background: '#cccccc' }}/>
            </div>
            {vacancyStages.map((e, i) => (
              <div
                className={cn('stage-item').state({ active: vacancy_stage_id === e.id })}
                key={i}
                onClick={() => this.handlerFilterCandidate(e.id)}
              >
                <span className={cn('stage-name')}>{e.name}</span>
                <span
                  className={cn('stage-users-count')}>{e.candidates_count}</span>
                { e.evaluation_of_candidate && this.renderRatings(e) }
                <div
                  className={cn('stage-group-color')}
                  style={ { background: e.vacancy_stage_group.color || '#fff' } }
                />
              </div>
            ))}
          </div>
        </div>
        {delta > 0 && (
          <div
            className={cn('stage-button').state({ active: rcount > 0 })}
            onClick={() => this.movePanel('right')}
          >
            {rcount > 0 &&
            <span className={cn('stage-button-count')}>{rcount}</span>}
            <Arrow dir={'right'} className={cn('stage-button-icon')}/>
          </div>
        )}
      </div>
    )
  }
}
