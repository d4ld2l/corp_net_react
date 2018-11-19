import React, { Component } from 'react'

import { Arrow, Calendar } from 'components-folder/Icon'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'ramda'
import { FormGroup } from 'react-bootstrap'
import { v4 } from 'uuid'
import * as legalUnitsActions from 'redux-folder/actions/legalUnitsActions'
import * as departmentsActions from 'redux-folder/actions/departmentsActions'
import { setFilter } from 'redux-folder/actions/employeesActions'
import {
  getDictionaryOffices,
  getDictionaryPositions,
  getDictionarySkills,
  getDictionaryCities,
} from 'redux-folder/actions/dictionariesActions'
import ReactDOM from 'react-dom'
import uniqBy from 'lodash/uniqBy'
import { getProjectsDictionary } from '../../../../redux/actions/projectsDataActions'
import isEmpty from "lodash/isEmpty";

const cn = require('bem-cn')('filter')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/filter/filter.css')
}

const connector = compose(
  reduxForm({ form: 'EmployeesFiltered', asyncBlurFields: [], })
)

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
      dispatch(getDictionaryPositions()),
      dispatch(getDictionarySkills()),
      dispatch(getDictionaryCities()),
    ])
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

  getDictionary = () => {
    const { dictionaries } = this.props
    return (
      uniqBy(dictionaries.skills, 'name').map(it => ({
        label: it.name,
        value: it.name,
      }))
    )
  }

  getCity = () => {
    const { dictionaries } = this.props
    return dictionaries.cities.map(it => ({
      label: it,
      value: it,
    }))
  }

  getPosition = () => {
    const { dictionaries } = this.props
    return dictionaries.positions.map(it => ({
      label: it.name_ru,
      value: it.code,
    }))
  }

  openCollapse = () => {
    const { dispatch, filterOpen } = this.props
    dispatch({ type: 'TOGGLE_FILTER_EMPLOYEE', payload: !filterOpen })
  }

  onSubmit() {
    const { dispatch } = this.props
    if (!ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      dispatch(setFilter())
    }
  }

  onRestFilter() {
    const { initialize, dispatch } = this.props
    initialize({
      product_list: [],
      methodology_list: [],
      technology_list: [],
    })
    dispatch(setFilter())
  }

  render() {
    const { filterOpen, legalUnitIds, departments, enabledComponents } = this.props

    return (
      <div className={cn('collapse').mix(cn('filtered'))}>
        <div className={cn('collapse-head')} onClick={this.openCollapse}>
          <h3>Фильтр</h3>
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

                <FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getCity()}
                    name={`city_list`}
                    searchable={true}
                    multi={true}
                    label={'Город'}
                    noResultsText="Нет данных для выбора."
                  />
                </FormGroup>
              </div>
              <div
                className={cn('filtered-body-wrapper-elem').mix(
                  cn('filtered-body-wrapper-elem_margin')
                )}
              >
                <FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getPosition()}
                    name={`position_list`}
                    searchable={true}
                    multi={true}
                    label={'Должность'}
                    noResultsText="Нет данных для выбора."
                  />
                </FormGroup>
                {
                  enabledComponents.shr_skills &&
                  (
                    <FormGroup>
                      <Field
                        component={SelectInputOptGroups}
                        options={this.getDictionary()}
                        name={`skill_list`}
                        searchable={true}
                        multi={true}
                        label={'Навыки'}
                        noResultsText="Нет данных для выбора."
                      />
                    </FormGroup>
                  )
                }
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
export default connector(Filtered)
