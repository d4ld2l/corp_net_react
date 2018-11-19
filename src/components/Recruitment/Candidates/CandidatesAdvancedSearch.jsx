import React, {Component} from 'react'
import compose from 'ramda/src/compose'
import {connect} from 'react-redux'
import {Field, reduxForm, FieldArray} from 'redux-form'

import {ControlLabel, FormGroup} from 'react-bootstrap'
import ReactDOM from "react-dom";
import CheckboxGroup from '../../Form/CheckboxGroup'
import SelectInputGroupLanguageVariant from '../../Form/SelectInputGroupLanguageVariant'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { getDictionaryCities, getDictionaryVacancies } from 'redux-folder/actions/dictionariesActions'
import { getVacancies } from 'redux-folder/actions/vacanciesActions'
import { getCandidatesStats } from 'redux-folder/actions/candidatesActions'
import {first} from "lodash";
import {isEmpty} from "lodash";

const optionsExperience = [
  {label: 'Нет опыта', value: 'no_experience'},
  {label: 'От 1 года', value: 'from_1_year'},
  {label: 'От 3 лет', value: 'for_3_years'},
  {label: 'От 3 до 6 лет', value: 'from_3_to_6_years'},
  {label: 'Более 6 лет', value: 'from_6_years'},
]

const optionsSchedule = [
  {label: 'Полный день', value: 'full_day'},
  {label: 'Сменный график', value: 'exchangeable'},
  {label: 'Гибкий график', value: 'flextime'},
  {label: 'Удаленная работа', value: 'remote'},
  {label: 'Вахтовый метод', value: 'rotating'},
]

const optionsEmployment = [
  {label: 'Полная', value: 'full_time'},
  {label: 'Частичная', value: 'part_time'},
  {label: 'Волонтерство', value: 'volunteering'},
  {label: 'Стажировка', value: 'probation'},
  {label: 'Проектная или временная работа', value: 'temporary'},
]

const cn = require('bem-cn')('candidates-search-form')

const connector = compose(
  reduxForm({
    form: 'AdvancedSearch',
    initialValues: {
      language: [''],
      // city: []
    },
  }),
  connect(state => ({
    // search: state.candidates.search,
    specialization: state.candidates.specialization,
    languagesLevel: state.candidates.languagesLevel,
    languages: state.candidates.languages,
    educationLevel: state.candidates.educationLevel,
    recruiter: state.recruiter,
    dictionaries: state.dictionaries,
    stats: state.candidates.stats,
    filter: state.candidates.filter
  }))
)

class CandidatesAdvancedSearch extends Component {
  state = {
    open: false,
  }

  componentDidMount() {
    const { dispatch, filter, initialize } = this.props
    Promise.all([
      dispatch(getDictionaryCities()),
      dispatch(getCandidatesStats()),
      dispatch(getDictionaryVacancies({ scope: 'all'})),
    ]).then( () => this.setState({open: true}))
    if (!isEmpty(filter)){
      initialize({
        ...filter,
      })
    }


  }

  getCity = () => {
    const { dictionaries } = this.props

    return dictionaries.cities.map(it => ({
      label: it,
      value: it,
    }))
  }

  specializationOptionsForSelect = specialization =>
    specialization.map(item => {
      return {
        label: item.name,
        options: item.professional_specializations.map(spec => {
          return {label: spec.name, value: spec.id}
        }),
      }
    })

  render() {
    const {
      recruiter,
      specialization,
      languages,
      languagesLevel,
      initialize,
      dictionaries,
      educationLevel,
      handleSearch,
      resetSearch,
      stats
    } = this.props

    const groups = recruiter.newRequest.milestonesGroups

    return (
      <div className={cn('advanced-search')}>
        <div className={cn('flex-block')}>
          <div className={cn('check-block')}>
            <FormGroup>
              <ControlLabel className={('p3 p3_theme_light')}>Опыт работы</ControlLabel>
              <CheckboxGroup options={optionsExperience} name="experience"/>
            </FormGroup>
          </div>
          <div className={cn('tags-input')}>
            <FormGroup>
              <Field
                component={SelectInputOptGroups}
                options={this.getCity()}
                name={`city`}
                searchable={true}
                multi={true}
                label={'Город'}
                noResultsText="Нет данных для выбора."
              />
            </FormGroup>
          </div>
          <div>
            <FieldArray
              name="language"
              component={SelectInputGroupLanguageVariant}
              languages={languages}
              languagesLevel={languagesLevel}
            />
          </div>
          <div className={cn('check-block')}>
            <FormGroup>
              <ControlLabel className={('p3 p3_theme_light')}>Образование</ControlLabel>
              <CheckboxGroup
                options={educationLevel.map(level => ({
                  label: level.name,
                  value: level.id
                }))}
                name="education_level"
              />
            </FormGroup>
          </div>
        </div>

        <div className={cn('flex-block')}>
          <Field
            component={SelectInputOptGroups}
            options={this.specializationOptionsForSelect(specialization)}
            label={'Профессиональная отрасль'}
            name="professional_specializations"
            multi={true}
          />
          <div className={cn('check-block')}>
            <FormGroup>
              <ControlLabel className={('p3 p3_theme_light')}>Тип занятости</ControlLabel>
              <CheckboxGroup options={optionsEmployment}
                             name="employment_type"/>
            </FormGroup>
          </div>
          <div className={cn('check-block')}>
            <FormGroup>
              <ControlLabel className={('p3 p3_theme_light')}>График работы</ControlLabel>
              <CheckboxGroup options={optionsSchedule} name="working_schedule"/>
            </FormGroup>
          </div>
          <Field
            component={SelectInputOptGroups}
            options={dictionaries.dictionaryVacancies.map(vacancy => ({
              label: vacancy.name,
              value: vacancy.id,
            }))}
            label={'Вакансии'}
            name="vacancies"
            multi={true}
          />
          <Field
            component={SelectInputOptGroups}
            options={stats.vacancy_stage_groups.map(item => ({label: item.label, value: item.id}))}
            label={'Этапы'}
            name="vacancy_stage_groups"
            multi={true}
          />
          <Field
            component={SelectInputOptGroups}
            options={[
              {
                label: 'По возрастанию зарплаты',
                value: 'salary_asc',
              },
              {
                label: 'По убыванию зарплаты',
                value: 'salary_desc',
              },
            ]}
            label={'Сортировка'}
            name="sort"
          />
        </div>

        {/*<FormGroup>*/}
        {/*<ControlLabel>Ключевые навыки</ControlLabel>*/}
        {/*<FormControl type="text" placeholder="Укажите ключевые навыки"/>*/}
        {/*</FormGroup>*/}

        <div className={cn('buttons-panel')}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Подобрать
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              initialize({
                language: [''],
              })
              resetSearch()
            }}
          >
            Сбросить фильтр
          </button>
        </div>
      </div>
    )
  }
}

export default connector(CandidatesAdvancedSearch)
