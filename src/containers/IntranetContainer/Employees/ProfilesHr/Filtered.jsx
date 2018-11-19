import React, { Component } from 'react'

import { Arrow, Calendar } from 'components-folder/Icon'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { Field, reduxForm } from 'redux-form'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import { ControlLabel, FormGroup } from 'react-bootstrap'
import { v4 } from 'uuid'
import * as legalUnitsActions from 'redux-folder/actions/legalUnitsActions'
import * as departmentsActions from 'redux-folder/actions/departmentsActions'
import { setFilter } from 'redux-folder/actions/profilesHrActions'
import {
  getDictionaryOffices,
  getDictionaryStructureUnits,
  getDictionaryContactTypes,
  getDictionaryEmployeeStates,
  getDictionarySkills,
} from 'redux-folder/actions/dictionariesActions'
import uniqBy from 'lodash/uniqBy'
import { dateTimeFormat, greaterThanStart, onlyNumbers } from '../../../../lib/validation'
import ReactDOM from 'react-dom'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import Input from 'components-folder/Input/'
import isEmpty from 'lodash/isEmpty'

const cn = require('bem-cn')('filter')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/filter/filter.css')
}

class Filtered extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
      departmentOptions: [],
    }
  }

  componentDidMount() {
    const { dispatch, filter, initialize } = this.props
    Promise.all([
      dispatch(legalUnitsActions.getLegalUnits()),
      dispatch(departmentsActions.getDepartments()),
      dispatch(getDictionaryOffices()),
      dispatch(getDictionaryStructureUnits()),
      dispatch(getDictionaryContactTypes()),
      dispatch(getDictionaryEmployeeStates()),
      dispatch(getDictionarySkills()),
    ]).then(() => {
      this.setState({ departmentOptions: this.getDepartmentForSelect() })
    })
    initialize({
      ...filter,
    })
  }

  getLegalUnitsForSelect = () => {
    const { legal_units } = this.props
    return legal_units.filter(i => i.name !== '').map(it => ({
      label: it.name,
      value: it.id,
    }))
  }

  getDictionaryForSelect = dictionary => {
    const { dictionaries } = this.props
    switch (dictionary) {
      case 'Offices':
        return dictionaries.offices.map(it => ({
          label: it.name,
          value: it.id,
        }))
      case 'ContactTypes':
        return dictionaries.contactTypes.map(it => ({
          label: it.name,
          value: it.id,
        }))
      case 'EmployeeStates':
        return dictionaries.employeeStates.map(it => ({
          label: it,
          value: it,
        }))
      case 'StructureUnits':
        return dictionaries.structureUnits.filter(it => it !== '').map(it => ({
          label: it,
          value: it,
        }))
      case 'SkillsList':
        return uniqBy(dictionaries.skills, 'name').map(it => ({
          label: it.name,
          value: it.name,
        }))
    }
  }

  getTypeOfEmploymentForSelect = () => {
    return [
      {
        label: 'Основное место работы',
        value: true,
      },
      {
        label: 'Внешнее совместительство',
        value: false,
      },
    ]
  }

  getDepartmentForSelect = () => {
    const { departments } = this.props
    return departments.map(it => ({
      label: it.name_ru,
      value: it.id,
    }))
  }

  getBlockForSelect = () => {
    const { departments, legal_unit_ids } = this.props

    if (!isEmpty(departments)) {
      return uniqBy(departments.filter(it => !isEmpty(legal_unit_ids) ? (legal_unit_ids.map(it => it.value).includes(it.legal_unit_id) && (it.parent_id === null)) : (it.parent_id === null)).map(it => ({
        label: it.name_ru,
        value: it.name_ru,
        id: it.id,
        legal_unit_id: it.legal_unit_id,
      })), 'value')
    }
  }

  getPracticeForSelect = () => {
    const { departments, block, legal_unit_ids } = this.props
    if (!isEmpty(departments)) {
      if (!isEmpty(block)){
        return uniqBy(departments.filter(it => block.map(it => it.id).includes(it.parent_id)).map(it => ({
          label: it.name_ru,
          value: it.name_ru,
          parent_id: it.parent_id
        })), 'value')
      } else if (isEmpty(legal_unit_ids)){
        return uniqBy(departments.filter(it => it.parent_id !== null).map(it => ({
          label: it.name_ru,
          value: it.name_ru,
          parent_id: it.parent_id
        })), 'value')
      } else if (!isEmpty(legal_unit_ids)) {
        return uniqBy(departments.filter(it => legal_unit_ids.map(it => it.value).includes(it.legal_unit_id) && it.parent_id !== null).map(it => ({
          label: it.name_ru,
          value: it.name_ru,
          parent_id: it.parent_id
        })), 'value')
      }
    }
  }

  openCollapse = () => {
    const { dispatch, filterOpen } = this.props
    dispatch({ type: 'TOGGLE_FILTER_PROFILES_HR', payload: !filterOpen })
  }

  onSubmit() {
    const { dispatch } = this.props
    if (!ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      dispatch(setFilter())
    }
  }

  onRestFilter() {
    const { initialize } = this.props
    initialize({
      product_list: [],
      methodology_list: [],
      technology_list: [],
    })
  }

  render() {
    const { filterOpen, enabledComponents } = this.props
    return (
      <div className={cn('collapse').mix(cn('filtered'))}>
        <div className={cn('collapse-head')} onClick={this.openCollapse}>
          <h3 className={'indent-reset'}>Фильтр</h3>
          <span onClick={this.openCollapse}>
            {filterOpen ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </span>
        </div>

        {filterOpen && (
          <div className={cn('collapse-body')}>
            <div>
              <div className={cn('filtered-body-wrapper-elem')}>
                {
                  enabledComponents.shr_org &&
                  [
                    <Field
                      key="legal_unit_ids"
                      component={SelectInputOptGroups}
                      options={this.getLegalUnitsForSelect()}
                      searchable={true}
                      name={`legal_unit_ids`}
                      multi={true}
                      ref="legalUnitField"
                      label={'Юридическое лицо'}
                      noResultsText="Нет данных для выбора."
                    />,
                    <Field
                      key="block"
                      component={SelectInputOptGroups}
                      options={this.getBlockForSelect()}
                      searchable={true}
                      name={`block`}
                      multi={true}
                      label={'Блок'}
                      noResultsText="Нет данных для выбора."
                    />,
                    <Field
                      key="practice"
                      component={SelectInputOptGroups}
                      options={this.getPracticeForSelect()}
                      searchable={true}
                      name={`practice`}
                      multi={true}
                      label={'Практика'}
                      noResultsText="Нет подрезделений в выбраном юр. лице"
                    />
                  ]
                }
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDictionaryForSelect('Offices')}
                  searchable={true}
                  name={`office_ids`}
                  multi={true}
                  label={'Офис'}
                  noResultsText="Нет данных для выбора."
                />
                <fieldset className={cn('fieldset')}>
                  <Field
                    name="wage_rate"
                    component={BootstrapInput}
                    type="text"
                    showLabel
                    labelText="Ставка"
                    toIndent
                  />
                </fieldset>
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDictionaryForSelect('ContactTypes')}
                  searchable={true}
                  name={`contract_type_ids`}
                  multi={false}
                  label={'Тип договора'}
                  noResultsText="Нет данных для выбора."
                />
                {
                  enabledComponents.shr_skills &&
                  (
                    <Field
                      component={SelectInputOptGroups}
                      options={this.getDictionaryForSelect('SkillsList')}
                      name={`skill_list`}
                      searchable={true}
                      multi={true}
                      label={'Навыки'}
                      noResultsText="Нет данных для выбора."
                    />
                  )
                }
              </div>
              <div
                className={cn('filtered-body-wrapper-elem').mix(
                  cn('filtered-body-wrapper-elem_margin')
                )}
              >
                <fieldset className={cn('fieldset')}>
                  {/*Текст ошибки*/}
                  {/*<p className={'settings__error-msg'}>Ошибочка</p>*/}
                  <div className="form-group">
                    <label>Уровень заработной платы от — до</label>
                    <div className={'form-group-container'}>
                      <div className={'form-control_salary'}>
                        <Field
                          component={BootstrapInput}
                          name="wage_from"
                          className="form-control"
                          type="text"
                          validate={[onlyNumbers]}
                          label=""
                        />
                      </div>
                      <span className={'form-control_dash'}>&#8212;</span>
                      <div className={'form-control_salary'}>
                        <Field
                          component={BootstrapInput}
                          name="wage_to"
                          className="form-control"
                          type="text"
                          validate={[onlyNumbers]}
                          label=""
                        />
                      </div>
                      <span className={'form-control_currency'}>руб.</span>
                    </div>
                  </div>
                </fieldset>
                <FormGroup>
                  <ControlLabel>Период окончания трудового договора</ControlLabel>
                  <div className={cn('wrapper-calendar')}>
                    <div className={cn('calendar')}>
                      <Field
                        label=""
                        name={`contract_ends_from`}
                        component={DateTimeField}
                        validate={[dateTimeFormat]}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                      />
                      <Calendar className={cn('calendar-icon')} />
                    </div>
                    <div className={'form-control_dash'}>—</div>
                    <div className={cn('calendar')}>
                      <Field
                        label=""
                        name={`contract_ends_to`}
                        component={DateTimeField}
                        validate={[dateTimeFormat, greaterThanStart]}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                      />
                      <Calendar className={cn('calendar-icon')} />
                    </div>
                  </div>
                </FormGroup>
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDictionaryForSelect('EmployeeStates')}
                  name={`state`}
                  searchable={true}
                  noResultsText="Нет данных для выбора."
                  label={'Состояние'}
                />
                <Field
                  component={SelectInputOptGroups}
                  options={this.getTypeOfEmploymentForSelect()}
                  name={`is_default_legal_unit`}
                  searchable={true}
                  label={'Вид занятости'}
                  noResultsText="Нет данных для выбора."
                />
                {
                  enabledComponents.shr_org &&
                  (
                    <Field
                      component={SelectInputOptGroups}
                      options={this.getDictionaryForSelect('StructureUnits')}
                      name={`structure_units`}
                      searchable={true}
                      multi={false}
                      label={'Подразделение'}
                      noResultsText="Нет данных для выбора."
                    />
                  )
                }

                {/*<CheckboxField*/}
                {/*label="Учитывать дубликаты"*/}
                {/*name={`close_project`}*/}
                {/*className={cn('nowadays-checkbox')}*/}
                {/*/>*/}
              </div>
            </div>

            <button className={'btn btn-primary btn-margin-right'} onClick={() => this.onSubmit()}>
              применить
            </button>
            <button className={'btn btn-outline'} onClick={() => this.onRestFilter()}>
              Сбросить фильтр
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default reduxForm({
  form: 'Filtered',
})(Filtered)
