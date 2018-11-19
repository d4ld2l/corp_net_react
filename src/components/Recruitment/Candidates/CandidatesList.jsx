import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'components-folder/Loader'
import CandidateItem from './CandidateItem'
import { getCandidates } from '../../../redux/actions/candidatesActions'
import includes from 'lodash/includes'


const connector = connect(state => ({
  state,
  scroll: state.candidates.scroll,
  loader: state.loaders.candidates,
  search: state.candidates.search,
  page: state.candidates.page,
  loaderSearch: state.loaders.candidatesSearch,
}))

class CandidatesList extends Component {
  componentDidMount() {
    this.candidatesContainer.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.candidatesContainer.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scroll, dispatch } = this.props

    if (scroll) {
      const el = this.candidatesContainer
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop
      if (scrollBottom < 550 && !this.props.loaderSearch && !this.props.loader) {
        dispatch(getCandidates({ loadMore: true }))
      }
    }
  }

  render() {
    const { candidates, loader, linkedCandidates, loaderSearch, page } = this.props
    return (
      <div id="candidates-container" className={('global-scroll global-scroll_theme_light')} ref={node => this.candidatesContainer = node}>
        {
          (loaderSearch && page === 1) ? (
            <Loader/>
          ) : (
          candidates.length > 0 && candidates.map(e => (
            <CandidateItem
              candidate={e}
              checked={includes(linkedCandidates, e.id)}
              key={`candidate-${e.id}-${e.first_name}`}
              {...this.props}
            />))
          )
        }
        {(loaderSearch && page !== 1) && <Loader />}

        {loader && <Loader />}
       </div>
    )
  }
}

export default connector(CandidatesList)
