import React, {Component} from 'react'
import {connect} from 'react-redux'
import scrollToComponent from "components-folder/ScrollToComponent";

import type {CandidatesState} from '../../../types/states'
import SearchForm from './SearchForm'
import CandidatesRainbow from './CandidatesRainbow'
import CandidatesAdvancedSearch from './CandidatesAdvancedSearch'
import {
  getCandidates,
  advancedSearch,
  resetSearch, toggleAdvancedSearch, updateSearchState,
} from '../../../redux/actions/candidatesActions'
import ReactDOM from "react-dom";
import * as customersActions from "../../../redux/actions/customersActions";
import * as bidsActions from "../../../redux/actions/bidsActions";
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";

const cn = require('bem-cn')('candidates-dashboard')

if (process.env.BROWSER) {
  require('./candidates-dashboard.css')
}

type Props = {
  candidates: CandidatesState
}

const connector = connect(state => ({
  candidates: state.candidates,
  search: state.candidates.search,
}))

class CandidatesDashboard extends Component<Props> {

  handleSearch = () => {
    this.props.closeSidebar()
    const {dispatch, search: { showAdvanced, query } } = this.props
    dispatch(advancedSearch(1, query.trim()))
    dispatch(updateSearchState({ query: query.trim() }))
    if (showAdvanced){
      dispatch(toggleAdvancedSearch())
    }
  }

  resetSearch = async () => {
    const {dispatch } = this.props
    scrollToComponent(ReactDOM.findDOMNode(this), {
      offset: -250,
      align: 'top',
      duration: 1000
    })
    await dispatch(resetSearch())
    dispatch(getCandidates())
  }


  render() {
    const { search: { showAdvanced, now, count }, closeSidebar } = this.props
    return (
      <div className={cn}>
        <SearchForm
          closeSidebar={closeSidebar}
          handleSearch={this.handleSearch}
          resetSearch={this.resetSearch}
        />

        {showAdvanced ? (
          <CandidatesAdvancedSearch
            {...this.props}
            handleSearch={this.handleSearch}
            resetSearch={this.resetSearch}
          />
        ) : (
          <CandidatesRainbow {...this.props} />
        )}

        {now &&
        <div className={cn('search-result').mix('p1 p1_theme_light_first')}>
          Найдено: {count}
        </div>}
      </div>
    )
  }
}

export default connector(CandidatesDashboard)
