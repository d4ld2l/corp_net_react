import React, { Component } from 'react'
import NewVacanciesItem from './NewVacanciesItem'
import { Row, Col, Clearfix } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

import { Arrow } from '../../Icon'
import SelectInput from '../../Form/SelectInput'

const cn = require('bem-cn')('new-vacancies')

if (process.env.BROWSER) {
  require('./new-vacancies.css')
}
class NewVacancies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: false,
    }
  }

  onBlockToggle = (name: string) => {
    this.setState({ [name]: !this.state[name] })
  }
  render() {
    return (
      <div className={cn} id='vacancies-container'>
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
          {this.props.vacancies.map(item => <NewVacanciesItem key={item.id} item={item} />)}
        </div>
      </div>
    )
  }
}
export default reduxForm({
  form: 'NewVacancies',
})(NewVacancies)
