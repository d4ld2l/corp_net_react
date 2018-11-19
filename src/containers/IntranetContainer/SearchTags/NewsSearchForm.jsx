import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input'
import { Loupe } from 'components-folder/Icon'

import {
  FormControl,
  ControlLabel,
  FormGroup,
  Row,
  Col,
  Checkbox,
  ButtonGroup,
  Button,
  Radio,
} from 'react-bootstrap'

const cn = require('bem-cn')('news-search-form')
if (process.env.BROWSER) {
  require('./news-search-form.css')
}

export default class NewsSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { data } = this.props

    return (
      <div className={cn}>
        <form>
          <div className="row">
            <div className={cn('c-search')}>
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
            <hr />
            <h4 className={cn('select-news')}>
              Выбрать новости за <a href="#">все время</a>
            </h4>
            <hr />
            <div className={cn('select-mark')}>
              <a href="#">#компания</a>
              <a href="#">#соревнования</a>
              <a href="#">#события</a>
              <a href="#">#соревнования</a>
              <a href="#">#2017</a>
              <a href="#">#праздники</a>
              <a href="#">#новостиСпорта</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
