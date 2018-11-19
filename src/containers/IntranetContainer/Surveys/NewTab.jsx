import React, { Component } from 'react'
import { connect } from 'react-redux'
import SurveysBlock from './SurveysBlock'

const cn = require('bem-cn')('new-tab')

if (process.env.BROWSER) {
  require('./new-tab.css')
}

// const connector = connect(state => ({
//   surveys: state.surveys.data,
//   // searchResult: state.surveys.searchResult,
//   // isSearch: state.surveys.isSearch,
// }))

export default class NewTab extends Component {

  // async componentDidMount() {
  //   const { getSurveys, updateCount } = this.props
  //   const response = await getSurveys('all')
  //   // updateCount({
  //   //   new: response.new_count,
  //   //   passed: response.passed_count,
  //   //   created: response.my_count
  //   // })
  //   debugger
  // }

  render() {
    const { surveys, isSearch } = this.props

    return (
      <div className={cn()}>
        <SurveysBlock surveys={surveys} isSearch={isSearch} />
      </div>
    )
  }
}

// export default connector(NewTab)
