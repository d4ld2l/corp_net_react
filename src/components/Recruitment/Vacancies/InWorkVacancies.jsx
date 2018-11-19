import React, {Component} from 'react'
import {connect} from 'react-redux'
import compose from 'ramda/src/compose'
import path from 'ramda/src/pathOr'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {Row, Col, Clearfix} from 'react-bootstrap'

import {Arrow} from '../../Icon'
import CollapseVacancy from '../../Collapse/CollapseVacancy'
import SelectInput from '../../Form/SelectInput'
import InWorkVacanciesItem from './InWorkVacanciesItem'
import get from 'lodash/get'

const cn = require('bem-cn')('in-work-vacancies')

if (process.env.BROWSER) {
  require('./InWorkVacancies.css')
}

const connector = compose(
  reduxForm({
    form: 'InWorkVacancies',
  }),
  connect(
    state => ({
      groups: path([], ['recruiter', 'newRequest', 'milestonesGroups'], state),
      candidates: state.candidates.data,
    }))
)

class InWorkVacancies extends Component {
  state = {
    filter: false,
    isOpened: true,
  }

  collapses = []

  toggleAll = () => {
    const isOpened = !this.state.isOpened
    this.setState({ isOpened }, () => {
      this.collapses.forEach(it => it.setState({ isOpened }))
    })
  }

  render() {
    const {groups, vacancies, candidates} = this.props

    return (
      <div className={cn} id='vacancies-container'>
        {/* <div className={cn('inner')}>
          <h4 onClick={() => this.setState({filter: !this.state.filter})}
              className={cn('h4')}>
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
                <Clearfix/>
                <Col xs={5}>
                  <Field
                    name="block"
                    label="Блок"
                    component={SelectInput}
                    placeholder="Не выбран"
                    noResultsText="Нет категорий"
                  />
                </Col>
                <Clearfix/>
                <Col xs={5}>
                  <button type="button"
                          className="btn btn-primary btn-margin-right btn-margin-top">
                    Подобрать
                  </button>
                  <button type="button"
                          className="btn btn-outline btn-margin-top">
                    Сбросить фильтр
                  </button>
                </Col>
              </Row>
            </div>
          )}
        </div> */}

        <div className={cn('wrapper-toggle-btn')}>
          <button className={cn('toggle-btn').mix('btn btn-link')} onClick={this.toggleAll.bind(this)}>
            {this.state.isOpened ? 'Свернуть все' : 'Развернуть все'}
          </button>
        </div>

        {vacancies.map((e, i) => (
          <div className={cn('wrapper-collapse')} key={e.id+e.name}>
            <InWorkVacanciesItem key={e.id} item={e} groups={groups}/>

            <CollapseVacancy
              ref={ref => {
                this.collapses[i] = ref
              }}
              onCollapseClick={this.onCollapseClick}
              link={`/recruitment/vacancies/${e.id}`}
              title={`${e.name}`}
              avatar={get(e, 'creator.photo.url', '/public/avatar.png')}
              name={get(e, 'creator.name_surname')}
              location={`${e.place_of_work}`}
              date={`${moment(e.created_at).format('DD.MM.YYYY')}`}
            >
              <div className={cn('stages')}>
                {e.vacancy_stages &&
                e.vacancy_stages.map(el => (
                  <div
                    title={`${el.name}`}
                    className={cn('stages-item')}
                    key={Math.random()}
                    style={{width: `${100 / e.vacancy_stages.length}%`}}
                  >
                    <span className={cn('stages-name')}>{el.name}</span>
                    <Link className={cn('stages-users-count')}
                          to={`/recruitment/vacancies/${e.id}`}>
                      {el.candidates_count}
                    </Link>
                    {el.candidates_count > 0 &&
                    el.evaluation_of_candidate &&
                    this.filterCandidates(el, candidates)}
                    <div
                      className={cn('stages-grop-color')}
                      style={{
                        background: el.vacancy_stage_group.color || '#fff',
                      }}
                    />
                  </div>
                ))}
              </div>
            </CollapseVacancy>
          </div>
        ))}
        {/* <div className={cn('wrap')}>
          {vacancies.map(e => <InWorkVacanciesItem key={e.id} item={e} groups={groups} />)}
        </div> */}
      </div>
    )
  }
}

export default connector(InWorkVacancies)
