import React, { Component } from 'react'
import CandidateItem from './CandidateItem'
import { getVacancyCandidates } from 'redux-folder/actions/vacancyCardActions'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('vacancy-candidates-table')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesTable.css')
}

export default class VacancyCandidatesTable extends Component {

  componentDidMount() {
    this.candidateTable.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.candidateTable.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scroll, dispatch, match: { params: { id } }, page } = this.props

    if (scroll) {
      const el = this.candidateTable
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop

      if (scrollBottom < 550 && !this.props.loader) {
        dispatch(getVacancyCandidates(id, page))
      }
    }
  }

  render() {
    const {
      currentCandidates,
      loadingVacancyCandidates,
      page,
      showCandidateCard,
      currentCandidate,
      dispatch,
      match,
    } = this.props

    return (
      <div className={cn}>
        <div className={cn('b-border')}/>
        <div className={cn('candidates').mix('global-scroll global-scroll_theme_light')} ref={ node => this.candidateTable = node}>
          {
            (loadingVacancyCandidates && page === 1) ? (<Loader />) : (
              currentCandidates.map( it => (
                <CandidateItem
                  key={it.id}
                  {
                    ...{
                      candidate: it,
                      showCandidateCard,
                      currentCandidate,
                      dispatch,
                      match,
                    }
                  }
                />
              ))
            )
          }
          {
            loadingVacancyCandidates && <Loader />
          }
        </div>
      </div>
    )
  }
}
