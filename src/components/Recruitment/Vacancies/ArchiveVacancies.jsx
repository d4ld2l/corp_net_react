import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Col, Clearfix } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { isEqual } from 'lodash'
import compose from 'ramda/src/compose'

import { Arrow } from '../../Icon'
import SelectInput from '../../Form/SelectInput'
import ArchiveVacanciesItem from './ArchiveVacanciesItem'

const cn = require('bem-cn')('archive-vacancies')

if (process.env.BROWSER) {
  require('./archive-vacancies.css')
}

const connector = compose(
  reduxForm({
    form: 'ArchiveVacancies',
  }),
  connect(
    state => ({
      myVacancies: state.vacancies.data,
      user: state.user,
    }),
    {}
  )
)

class ArchiveVacancies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: false,
      vacancies: [],
      tabs: [
        {
          value: 'all',
          label: 'Все',
        },
        {
          value: 'my-vacancy',
          label: 'Мои вакансии',
        },
      ],
      currentTab: 'all',
    }
  }

  onBlockToggle = (name: string) => {
    this.setState({ [name]: !this.state[name] })
  }
  render() {
    const { currentTab, tabs } = this.state
    const { vacancies, myVacancies } = this.props
    const data =
      currentTab === 'my-vacancy'
        ? myVacancies.filter(vacancy => vacancy.status === 'archived')
        : vacancies
    return (
      <div className={cn} id='vacancies-container'>
        {/* <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            {tabs.map(e => (
              <li
                key={e.value}
                className={cn('tabs-list-item')
                  .mix('cur')
                  .state({ current: currentTab === e.value })}
                onClick={() => this.setState({ currentTab: e.value })}
              >
                {e.label}
              </li>
            ))}
          </ul>
        </div> */}
        {/* <div className={cn('inner')}>
          <h4 onClick={() => this.onBlockToggle('filter')} className={cn('h4')}>
            Фильтр
            <Arrow
              dir={this.state.filter ? 'up' : 'down'}
              className={cn('arrow')}
              color="#93959a"
            />
          </h4>
          {this.state.filter && (
            <div className={cn('block')}>
              <Row>
                <Col xs={5}>
                  <Field
                    name="structural_unit"
                    label="Структурное подразделение"
                    component={SelectInput}
                    placeholder="Не выбрано"
                    noResultsText="Нет категорий"
                  />
                </Col>
                <Col xs={5} xsOffset={1}>
                  <Field
                    name="city"
                    label="Город"
                    component={SelectInput}
                    placeholder="Не выбран"
                    noResultsText="Нет категорий"
                  />
                </Col>
                <Clearfix />
                <Col xs={5}>
                  <Field
                    name="block"
                    label="Блок"
                    component={SelectInput}
                    placeholder="Не выбран"
                    noResultsText="Нет категорий"
                  />
                </Col>
                <Clearfix />
                <Col xs={5}>
                  <button type="button" className="btn btn-primary btn-margin-right btn-margin-top">
                    Подобрать
                  </button>
                  <button type="button" className="btn btn-outline btn-margin-top">
                    Сбросить фильтр
                  </button>
                </Col>
              </Row>
            </div>
          )}
        </div> */}

        <div className={cn('wrap')}>
          {data.map(e => <ArchiveVacanciesItem key={e.id} item={e} />)}
        </div>
      </div>
    )
  }
}

export default connector(ArchiveVacancies)
