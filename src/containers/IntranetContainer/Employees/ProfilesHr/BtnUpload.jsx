import React, { Component } from 'react'
import moment from "moment/moment";
import serialize from 'lib-folder/serialize'
import isEmpty from 'lodash/isEmpty'

const cn = require('bem-cn')('groups')

function createSearchParams(params){
  const search = {}
  if (params && params !== ''){
    search.q = params
  }
  return search
}

function createFilterParams(params) {
  const filter = {}
  if (params) {
    !isEmpty(params.legal_unit_ids) && (filter.legal_unit_ids = params.legal_unit_ids.map(it => it.value).join(','))
    !isEmpty(params.department_ids) && (filter.department_ids = params.department_ids.map(it => it.value).join(','))
    !isEmpty(params.office_ids) && (filter.office_ids = params.office_ids.map(it => it.value).join(','))
    !isEmpty(params.block) && (filter.block = params.block.map(it => it.value).join(','))
    !isEmpty(params.practice) && (filter.practice = params.practice.map(it => it.value).join(','))
    !isEmpty(params.wage_rate) && (filter.wage_rate = params.wage_rate.replace(',', '.'))
    !isEmpty(params.contract_type_ids) && (filter.contract_type_ids = params.contract_type_ids.value)
    !isEmpty(params.wage_from) && (filter.wage_from = params.wage_from)
    !isEmpty(params.wage_to) && (filter.wage_to = params.wage_to)
    !isEmpty(params.is_default_legal_unit) && (filter.is_default_legal_unit = params.is_default_legal_unit.value)
    !isEmpty(params.structure_units) && (filter.structure_units = params.structure_units.value)
    !isEmpty(params.state) && (filter.state = params.state.value)
    !isEmpty(params.contract_ends_from) && (filter.contract_ends_from = moment(params.contract_ends_from).format('YYYY-MM-DD'))
    !isEmpty(params.contract_ends_to) && (filter.contract_ends_to = moment(params.contract_ends_to).format('YYYY-MM-DD'))
    !isEmpty(params.skill_list) && (filter.skill_names = params.skill_list.map(it => it.value).join(','))
  }
  return filter
}

export default class BtnUpload extends Component {
  render() {
    const { filter, searchParams } = this.props

    return (
      <div className={cn('button-box')}>

        <a
          className={cn('upload btn btn-primary btn_padding-8-12')}
          title={'Скачать список контактов'}
          href={`/api/accounts/export_hr${serialize(createSearchParams(searchParams))}${serialize(createFilterParams(filter), true)}`}
        >
          Выгрузить подборку
        </a>
      </div>
    )
  }
}
