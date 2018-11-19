import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import DebounceInput from 'react-debounce-input'
import { getTagNews } from '../../../redux/actions/newsActions'
import { Loupe, Women } from 'components-folder/Icon'

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

import { Field, FieldArray, reduxForm } from 'redux-form'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import { Calendar } from 'components-folder/Icon'

const cn = require('bem-cn')('news-search-form')
if (process.env.BROWSER) {
  require('./news-search-form.css')
}

const connector = compose(
  connect(state => ({ allTags: state.news.allTags, enabledComponents: state.system.enabledComponents }), { getTagNews }),
  reduxForm({ form: 'NewsSearchForm' })
)

class NewsSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      tags: [],
      showPeriod: false,
    }
  }

  togglePeriod(e) {
    e.preventDefault()
    this.setState({ showPeriod: !this.state.showPeriod })
  }

  checkboxChange(event) {
    let tags = [].concat(this.state.tags)
    if (event.target.checked) {
      tags.push(event.target.value)
    } else {
      tags = tags.filter(el => el !== event.target.value)
    }
    this.setState(
      {
        tags,
      },
      () => {
        this.props.getTagNews(this.state.tags)
      }
    )
  }

  getSearch(tags) {
    this.props.getTagNews(tags)
  }

  render() {
    const { allTags, state, enabledComponents } = this.props
    const image = {
      width: '100%',
      display: 'block',
      height: '260px',
      background: `url('http://placehold.it/370x260') center center / cover no-repeat`,
      marginBottom: '20px',
      marginTop: '40px',
    }
    const margin = {
      marginTop: '93px',
    }
    const { showPeriod } = this.state

    return (
      <div className={cn}>
        {/* <div className={cn('c-search')}>
          <DebounceInput
            minLength={2}
            className={cn('input-search')}
            debounceTimeout={300}
            onChange={event => this.getSearch([event.target.value])}
          />
          <Loupe className={cn('icon-magnify')} />
        </div>
        <hr />
        <h4 className={cn('select-news')}>
          Новости за
          <a
            className={cn('select-news-pseudo-link')}
            onClick={this.togglePeriod.bind(this)}
            href="#"
          >
            { this.state.showPeriod ? 'период' : 'все время' }
          </a>
        </h4> */}
        {this.state.showPeriod && (
          <Row>
            <Col xs={6}>
              <Field
                name="starts_at"
                component={DateTimeField}
                dateFormat="DD-MM-YYYY"
                timeFormat={true}
              />
              <Calendar className={cn('calendar-icon')} />
              <span className={cn('dash')}>—</span>
            </Col>
            <Col xs={6}>
              <Field
                name="ends_at"
                component={DateTimeField}
                dateFormat="DD-MM-YYYY"
                timeFormat={true}
              />
              <Calendar className={cn('calendar-icon')} />
            </Col>
          </Row>
        )}

        {/* <div
          style={image}
        /> */}
        {/* <div className={cn('select-mark')}>
          {allTags &&
            allTags.map((tag, key) => (
              <span key={key}>
                <input
                  type="checkbox"
                  value={tag.name}
                  id={tag.id}
                  onChange={event => this.checkboxChange(event)}
                />
                <label htmlFor={tag.id}>#{tag.name}</label>
              </span>
            ))}
        </div> */}
      </div>
    )
  }
}

export default connector(NewsSearchForm)
