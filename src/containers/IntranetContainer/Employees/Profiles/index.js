import react, { Component } from 'react'
import { connect } from 'react-redux'
import Container from './Container'
import {get} from "lodash";

const mapStateToProps = state => {
  return {
    state,
    data: state.news.data,
    role: state.role,
    filterOpen: state.employees.filterOpen,
    filter: state.employees.searchParams,
    legalUnitIds: state.profilesHr.legalUnitIds,
    legal_units: state.legal_units,
    skills: state.projectsData.technologies,
    departments: state.departments,
    dictionaries: state.dictionaries,
    block: get(state, 'form.EmployeesFiltered.values.block', []),
    legal_unit_ids: get(state, 'form.EmployeesFiltered.values.legal_unit_ids', []),
    enabledComponents: state.system.enabledComponents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Employees = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Employees
