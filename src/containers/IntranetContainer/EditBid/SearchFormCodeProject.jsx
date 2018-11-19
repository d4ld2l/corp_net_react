import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import { searchSurveys, resetSearch } from '../../../redux/actions/surveysActions'
import type { SurveyRaw } from '../../../types/raws'

import { Loupe } from 'components-folder/Icon'

const cn = require('bem-cn')('search-code-project')
if (process.env.BROWSER) {
  require('../NewBid/search-code-project.css')
}

type Props = {
  result: Array<SurveyRaw>,
}

type State = {
  show: boolean,
  fetching: boolean,
}

const connector = compose(
  connect(state => ({
    result: state.surveys.searchResult,
  })),
  onClickOutside
)

class SearchFormCodeProject extends Component<Props, State> {
  state = {
    show: false,
    fetching: false,
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetSearch())
  }
  handleClickOutside = () => {
    this.handlerHide()
  }
  handlerHide = () => {
    this.setState({ show: false })
  }
  onChange = async ({ target: { value } }) => {
    this.setState({ fetching: true })
    const { dispatch } = this.props
    await dispatch(searchSurveys(value))
    this.setState({ show: true, fetching: false })
  }
  render() {
    const { result } = this.props
    const { show, fetching } = this.state
    return (
      <div className={cn('search-form')}>
        <div className="row">
          <div className={cn('c-search').mix('col-xs-12')}>
            <DebounceInput
              minLength={2}
              className={cn('surveys-search')}
              debounceTimeout={300}
              onChange={this.onChange}
              onFocus={() => this.setState({ show: true })}
            />
            <Loupe className={cn('icon-loup')} />
            {result.length > 0 &&
              show &&
              !fetching && (
                <ul className={cn('result-list')}>
                  {result.map(survey => (
                    <li className={cn('result-item')} key={survey.id}>
                      <Link to={`/surveys/${survey.id}`}>{survey.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    )
  }
}
export default connector(SearchFormCodeProject)
