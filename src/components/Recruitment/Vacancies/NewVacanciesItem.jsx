import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Settings } from '../../Icon'
import SettingsMenu from './SettingsMenu'
import {connect} from "react-redux";
import {compose} from "ramda";
import onClickOutside from "react-onclickoutside";
import get from 'lodash/get'

const cn = require('bem-cn')('new-vacancies')

if (process.env.BROWSER) {
  require('./new-vacancies.css')
}
const connector = compose(connect(state => ({ state })), onClickOutside)
class NewVacanciesItem extends Component {
  state = {
    open: false,
  }
  handleClickOutside = () => {
    this.setState({open: false})
  }

  render() {
    const { item } = this.props
    return (
      <div className={cn('item')}>
        <div className={cn('item-head')}>
          <Link className={cn('item-link').mix('link link_theme_light_first indent_5')} to={`/recruitment/vacancies/${item.id}`}>
            {item.name}
          </Link>
        </div>

        <div className={cn('head-data')}>
          <div
            className={cn('avatar')}
            style={{
              background: `url(${get(item, 'creator.photo.url', '/public/avatar.png')}) center center / cover no-repeat`,
            }}
            title={get(item, 'creator.name_surname')}
          />

          <span className={cn('name').mix('p3 p3_theme_light')}>
            {get(item, 'creator.name_surname')}
          </span>

          <span className={cn('location').mix('p3 p3_theme_light')}>{item.place_of_work}</span>

          <time className={cn('date').mix('p3 p3_theme_light')} dateTime={`${moment(item.created_at).format('DD.MM.YYYY')}`}>
            {moment(item.created_at).format('DD.MM.YYYY')}
          </time>
        </div>

        <div className={cn('wrapper-setting')}>
          <span
            className={`${cn('settings')} ${this.state.open ? 'active' : ''}`}
            onClick={() => this.setState({ open: !this.state.open })}
            title={this.state.open ? 'Закрыть' : 'Открыть'}
          >
            <Settings outline className={cn('seting-icon').state({ open: this.state.open })} />
          </span>
          {this.state.open && <SettingsMenu item={item} />}
        </div>
      </div>
    )
  }
}
export default connector(NewVacanciesItem)
