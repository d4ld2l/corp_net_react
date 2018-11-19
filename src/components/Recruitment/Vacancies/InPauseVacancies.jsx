import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import compose from 'ramda/src/compose'
import path from 'ramda/src/pathOr'
import { Row, Col, Clearfix } from 'react-bootstrap'
import moment from 'moment'

import { updateState, getVacancies } from '../../../redux/actions/vacanciesActions'
import { Arrow } from '../../Icon'
import SelectInput from '../../Form/SelectInput'
import CollapseVacancy from '../../Collapse/CollapseVacancy'
import InPauseVacanciesItem from './InPauseVacanciesItem'
import get from 'lodash/get'


const cn = require('bem-cn')('in-pause-vacancies')

if (process.env.BROWSER) {
  require('./in-pause-vacancies.css')
}

const connector = compose(
  reduxForm({
    form: 'InPauseVacancies',
  }),
  connect(
    state => ({
      groups: path([], ['recruiter', 'newRequest', 'milestonesGroups'], state),
      candidates: state.candidates.data,
    }),
    { updateState, getVacancies }
  )
)

class InPauseVacancies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: false,
      isOpened: true,
    }
  }

  onBlockToggle = (name: string) => {
    this.setState({ [name]: !this.state[name] })
  }

  collapses = []

  toggleAll = () => {
    const isOpened = !this.state.isOpened
    this.setState({ isOpened }, () => {
      this.collapses.forEach(it => it.setState({ isOpened }))
    })
  }

  onCollapseClick = () => {
    // const isOpened = !!this.collapses.find(it => it.state.isOpened)
    // this.setState({ isOpened })
  }

  updateState(id, status) {
    const { updateState, getVacancies } = this.props
    updateState(id, status).then(() => {
      getVacancies()
    })
  }

  filterCandidates(e, candidates) {
    const filtered = candidates
      .reduce((counts, item) => {
        // А полей то нет и пагинация всё "портит"
        // const candidateVacancy = item.candidate_vacancies
        //   .find(el => el.vacancy_id === e.vacancy_id &&
        //     el.current_vacancy_stage_id === e.id)
        // if (candidateVacancy) {
        //   const ratings = candidateVacancy.candidate_ratings
        //     .filter(rate => rate.rating_type === 'passing')
        //   if (ratings.length > 0) {
        //     const value = ratings
        //       .sort((el1, el2) => moment(el1.updated_at) - moment(el2.updated_at)).reverse()[0].value
        //     if(value) {
        //       counts.green = counts.green + 1
        //     } else {
        //       counts.red = counts.red + 1
        //     }
        //   } else if (ratings.length === 0) {
        //     counts.gray = counts.gray + 1
        //   }
        // }
        return counts
      }, {
        red: 0,
        green: 0,
        gray: 0,
      })
    return <span/>
    return (
      <ul className={cn('stage-list')}>
        <li>
          <span className={cn('stage-list-green')}/>
          {filtered.green}
        </li>
        <li>
          <span className={cn('stage-list-red')}/>
          {filtered.red}
        </li>
        <li>
          <span className={cn('stage-list-gray')}/>
          {filtered.gray}
        </li>
      </ul>
    )
  }

  render() {
    const { updateState, getVacancies, groups, vacancies, item, candidates } = this.props

    const borderBottomColor = id => groups.find(e => e.id === id)

    return (
      <div className={cn} id='vacancies-container'>
        {/* <div className={cn('inner')}>
          <h4 onClick={() => this.setState({filter: !this.state.filter})} className={cn('h4')}>
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

        <div className={cn('wrapper-toggle-btn')}>
          <button className={cn('toggle-btn').mix('btn btn-link')} onClick={this.toggleAll.bind(this)}>
            {this.state.isOpened ? 'Свернуть все' : 'Развернуть все'}
          </button>
        </div>

        {vacancies.map((e, i) => (
          <div className={cn('wrapper-collapse')} key={e.id+e.name}>
            <InPauseVacanciesItem
              item={e}
              updateState={updateState}
              getVacancies={getVacancies}
              groups={groups}
              key={e.id}
            />

            <CollapseVacancy
              key={i}
              ref={ref => {
                this.collapses[i] = ref
              }}
              onClick={this.onCollapseClick}
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
                      style={{ width: `${100 / e.vacancy_stages.length}%` }}
                    >
                      <span className={cn('stages-name')}>{el.name}</span>
                      <Link className={cn('stages-users-count')} to={`/recruitment/vacancies/${e.id}`}>
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
          {vacancies.map(e => (
            <InPauseVacanciesItem
              item={e}
              key={e.id}
              updateState={updateState}
              getVacancies={getVacancies}
              groups={groups}
            />
          ))}
        </div> */}
      </div>
    )
  }
}

export default connector(InPauseVacancies)
