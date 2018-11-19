import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import EmployeesSearchForm from './EmployeesSearchForm'
import EmployeesSorting from './EmployeesSorting'
import EmployeesTable from './EmployeesTable'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import {getEmployees, resetEmployeeSearch, getEmployeesPagination, getEmployeeSort, resetEmployeeSort, resetEmployeeFilter } from 'redux-folder/actions/employeesActions'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

const cn = require('bem-cn')('intranet-news')
if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(
  state => ({
    employees: state.employees.data,
    loaders: state.loaders,
    search: state.employees.search,
    scroll: state.employees.scroll,
    scope: state.employees.scope,
    page: state.employees.page,
    isSearch: state.employees.isSearch,
    sortingValue: state.employees.sortingValue,
    all: state.employees.all,
    state,
  }),
  {
    resetEmployeeSearch,
    getEmployeesPagination,
    getEmployeeSort,
    resetEmployeeSort,
    resetEmployeeFilter,
  }
)

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: this.props.employees,
    }
  }

  componentDidMount(){
    const {dispatch, getEmployeesPagination, page, all} = this.props
    if (!all){
      getEmployeesPagination(1)
    }
    dispatch({type: 'TOGGLE_FILTER_EMPLOYEE', payload: false})
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.employees, nextProps.employees)) {
      this.setState({ employees: nextProps.employees })
    }
  }

  componentWillUnmount() {
    this.props.resetEmployeeSearch()
    this.props.resetEmployeeFilter()
  }

  filterEmployees({ target: { innerText } }) {
    this.props.resetEmployeeSearch()
    let employees = [].concat(this.props.employees)
    if (innerText === 'Все') {
      this.props.resetEmployeeSort()
      this.props.getEmployeesPagination(1)
    } else {
      this.props.getEmployeeSort(innerText, 1)
    }
    this.setState({ employees })
  }

  render() {
    const { employees } = this.state

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <h1>Список сотрудников</h1>

            <EmployeesSearchForm {...this.props}/>
            {/*<Search/>*/}
            <EmployeesSorting filterEmployees={event => this.filterEmployees(event)} sortingValue={this.props.sortingValue} />
            <EmployeesTable employees={employees} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Container)
