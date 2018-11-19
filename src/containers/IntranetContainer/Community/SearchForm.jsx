import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'

import { Loupe } from 'components-folder/Icon'
import {resetSearch, search, getPost, setSearchValue} from '../../../redux/actions/feedsActions'

const cn = require('bem-cn')('search-form-community')
if (process.env.BROWSER) {
  require('./Container.css')
}

type Props = {
  tags: Array<String>,
}

type State = {
  show: boolean,
  filterTags: Array<String>,
}

const connector = connect(state => ({
  tags: state.news.allTags,
  scope: state.feed.scope,
  searchValue: state.feed.searchValue,
}))

class SearchForm extends Component<Props, State> {
  state = {
    show: false,
    filterTags: [],
    queryValues: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== '') {
      this.setState({show: true})
    }
  }
  onChange = async ({ target: { value } }) => {
    const {dispatch} = this.props
    dispatch(setSearchValue(value))
    const { tags } = this.props
    const rawValues = value.replace(/[,.:;]/g, '').split(' ')
    const searchTag = rawValues[rawValues.length - 1]
    if (searchTag[0] === '#') {
      this.setState({
        show: true,
        filterTags: tags.filter(tag => tag.name.indexOf(searchTag.substring(1)) !== -1),
      })
    }
    this.normalizeValues(rawValues)
  }
  normalizeValues(rawValues) {
    let queryValues = rawValues.join(',')
    if (!rawValues.every(item => item[0] === '#')) {
      queryValues = queryValues.replace(/#/g, '')
    }
    this.setState({ queryValues: encodeURIComponent(queryValues) })
  }
  keyDown = ({ key }) => {
    if (key === 'Enter') {
      this.handlerSearch()
    }
  }
  handlerSearch() {
    const { dispatch } = this.props
    const { queryValues } = this.state
    if (queryValues !== '') {
      dispatch(search(queryValues))
    } else {
      dispatch(getPost(this.props.scope))
      dispatch(resetSearch())
    }

  }
  choiceTag(tag) {
    const { searchValue, dispatch } = this.props
    let tags = searchValue.split(' ')
    tags.splice(-1, 1, tag)
    dispatch(setSearchValue(`${tags.join(' ')} `))
    this.setState({ filterTags: [] })
    this.normalizeValues(tags)
  }
  render() {
    const { show, filterTags } = this.state
    const { searchValue } = this.props

    return (
      <div className={cn('search-form')}>
        <div className="row">
          <div className={cn('c-search').mix('col-xs-10')}>
            <DebounceInput
              minLength={2}
              className={cn('surveys-search')}
              debounceTimeout={300}
              onChange={this.onChange}
              onKeyDown={this.keyDown}
              onFocus={() => this.setState({ show: true })}
              value={searchValue}
              forceNotifyByEnter={false}
            />
            <Loupe className={cn('icon-loup')} />
            {filterTags.length > 0 &&
              show && (
                <ul className={cn('result-list')}>
                  {filterTags.map(item => (
                    <li className={cn('result-item')} key={item.id}>
                      <span onClick={() => this.choiceTag(item.name)} className={'cur'}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className={cn('btn-padding').mix('col-xs-2')}>
            <button className={'btn btn-primary'} onClick={() => this.handlerSearch()}>
              Найти
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default connector(SearchForm)
