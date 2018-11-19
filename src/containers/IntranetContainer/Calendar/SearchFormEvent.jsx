import React, { Component } from 'react'
import { connect } from 'react-redux'
import pick from 'ramda/src/pick'
import DebounceInput from 'react-debounce-input'
import { Link } from 'react-router-dom'
import { Loupe } from 'components-folder/Icon'

const cn = require('bem-cn')('search-form-event-one')

if (process.env.BROWSER) {
  require('./search-form-event-one.css')
}

const connector = connect(pick(['events']))

class SearchFormEvent extends Component {
  render() {
    const { current } = this.props.events

    return (
      <div className={cn}>
        <div className={cn('search-form')}>
          <form>
            <div className={cn('head-sidebar')}>
              <h2>
                Участники
                <sup className={cn('value').mix('p4 p4_theme_light_third')}>{current.participants_count}</sup>
              </h2>
            </div>
            <label className={cn('group-label').mix('p3 p3_theme_light')}>Участники</label>
            <div className={cn('c-search').mix('col-xs-12')}>
              <div className="row">
                <DebounceInput
                  minLength={2}
                  className={cn('input-search')}
                  debounceTimeout={300}
                  onChange={event =>
                    this.setState({
                      value: event.target.value,
                    })}
                />
                <Loupe className={cn('icon-magnify')} />
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row">
                <p className={cn('sub-text').mix('p2 p2_theme_light_second')}>Введите имя участника или название подразделения</p>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row">
                {current.participants_list &&
                  current.participants_list.length > 0 &&
                  current.participants_list.map(employee => {
                    return (
                      employee &&
                        <article className={cn('article')} key={employee.id}>
                          <figure className={cn('figure')}>
                            <img src={employee.photo.url} />
                          </figure>
                          <div className={cn('wrap-1')}>
                            <Link
                              to={`/employees/${employee.id}`}
                              className={cn('name-text').mix('link link_theme_light_first indent_reset')}
                            >
                              {employee.fullname || employee.full_name}
                            </Link>
                            <p className={cn('specialty-text').mix('p2 p2_theme_light_second indent_reset')}>{employee.position_name}</p>
                          </div>
                          {/*<div className={cn('wrap-2')}>*/}
                          {/*<DeleteIcon className={cn('delete-icon')}/>*/}
                          {/*</div>*/}
                        </article>
                    )
                  })}
                <span className={cn('show-more').mix('link link_theme_light_third')}>Показать еще</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connector(SearchFormEvent)
