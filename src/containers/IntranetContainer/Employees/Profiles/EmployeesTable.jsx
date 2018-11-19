import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import Loader from 'components-folder/Loader/index'
import get from 'lodash/get'
import { Post, Phone, Skype } from 'components-folder/Icon/'
import {
  getEmployeeSearch,
  getEmployeesPagination,
  getEmployeeSort,
} from 'redux-folder/actions/employeesActions'

const cn = require('bem-cn')('employees-table')

if (process.env.BROWSER) {
  require('./employees-table.css')
}

const connector = connect(
  state => ({
    search: state.employees.search,
    employees: state.employees.data,
    loaders: state.loaders,
    scroll: state.employees.scroll,
    scope: state.employees.scope,
    value: state.employees.value,
    page: state.employees.page,
    isSearch: state.employees.isSearch,
    searchPage: state.employees.searchPage,
    searchScroll: state.employees.searchScroll,
    sorting: state.employees.sorting,
    sortingValue: state.employees.sortingValue,
    sortingData: state.employees.sortingData,
    sortingPage: state.employees.sortingPage,
    sortingScroll: state.employees.sortingScroll,
  }),
  {
    getEmployeesPagination,
    getEmployeeSearch,
    getEmployeeSort,
  }
)

class EmployeesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: this.props.employees,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.employees, nextProps.employees)) {
      this.setState({ employees: nextProps.employees })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const {
      scroll,
      isSearch,
      sorting,
      sortingScroll,
      searchScroll,
      sortingValue,
      sortingPage,
      page,
      searchPage,
      value,
      loaders: { employees },
    } = this.props
    if (scroll || (isSearch && searchScroll) || (sorting && sortingScroll)) {
      const element = document.querySelectorAll('#employees_table')[0]
      const height = element ? element.clientHeight : 1000
      const offset = window.pageYOffset
      if (height - offset < 1000 && !employees) {
        if (isSearch && searchScroll) {
          this.props.getEmployeeSearch(value, searchPage)
        }
        if (sorting && sortingScroll) {
          this.props.getEmployeeSort(sortingValue, sortingPage)
        }
        if (!isSearch && !sorting && scroll) {
          this.props.getEmployeesPagination(page)
        }
      }
    }
  }

  render() {
    const { search, loaders, isSearch, sorting, sortingData, page } = this.props
    const { employees } = this.state
    let elements = []
    if (search && search.length > 0) {
      elements = search
    } else if (sorting && sortingData.length > 0) {
      elements = sortingData
    } else {
      elements = employees
    }
    // const elements = search && search.length > 0 ? search : employees

    return (
      <div className={cn} id={'employees_table'}>
        <div className={cn('wrapper')}>
        {elements.length <= 0 &&
          !loaders.employeesSearch && (page === 2) && (
            <div className={cn('empty_search')}> По вашему запросу ничего не найдено </div>
          )}
          <table className={cn('table')}>
            {loaders.employeesSearch ? (
              <Loader />
            ) : (
              <tbody>
                {isSearch && search.length === 0 ? (
                  <div>
                    <div className={cn('empty_search')}> По вашему запросу ничего не найдено </div>
                  </div>
                ) : sorting && sortingData.length === 0 ? (
                  <div>
                    <div className={cn('empty_search')}> По вашему запросу ничего не найдено </div>
                  </div>
                ) : (
                  elements.map(employee => (
                    <tr key={employee.id}>
                      <td>
                        <div
                          className={cn('user-logo')}
                          style={{
                            background: `url(${ get(employee, 'photo.url', '/public/avatar.png')}) center center/ cover no-repeat`,
                          }}
                        />
                      </td>

                      <td>
                        <Link
                          to={`/employees/${employee.id}`}
                          className={cn('user-name').mix('p1 link_theme_light_first link_pseudo')}
                        >
                          {employee.full_name}
                        </Link>

                        <span className={cn('user-role').mix('p2 p2_theme_light_second')}>{get(employee, 'default_legal_unit_employee.position_name')}</span>
                      </td>

                      <td>
                        <span className={cn('user-arranged').mix('p1 p1_theme_light_first')}>{get(employee, 'default_legal_unit_employee.department_name')}</span>
                      </td>

                      <td>
                        {employee.email_address && (
                          <div className={cn('user-contact-text')}>
                            <Post className={cn('user-contact-icon')} />
                            <a className={cn('user-contact-link p1 link_theme_light_first link_pseudo')} href={`mailto:${employee.email_address}`}>{employee.email_address}</a>
                          </div>
                        )}
                        {employee.phone && (
                          <div className={cn('user-contact-text')}>
                            <Phone className={cn('user-contact-icon')} />
                            <a className={cn('user-contact-link p1 link_theme_light_first link_pseudo')} href={`tel:${employee.phone}`}>{employee.phone}</a>
                          </div>
                        )}
                        {employee.skype && (
                          <div className={cn('user-contact-text')}>
                            <Skype className={cn('user-contact-icon')} />
                            {employee.skype}
                          </div>
                        )}
                      </td>

                      <td>
                        <span className={cn('user-location').mix('p1 p1_theme_light_first')}>{employee.city}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
        {loaders.employees && !loaders.employeesSearch && <Loader />}
      </div>
    )
  }
}

export default connector(EmployeesTable)
