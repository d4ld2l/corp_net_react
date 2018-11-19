import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import EmployeeCard from './EmployeeCard'
import { getEmployee, getEmployees } from '../../../redux/actions/employeesActions'

import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('intranet-news')

if (process.env.BROWSER) {
  require('./Container.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
    loaders: state.loaders,
    state,
  }),
  {
    getEmployee,
    getEmployees,
  }
)

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    const { getEmployee, match, current } = this.props
    if (current.id !== match.params.id){
      await getEmployee(match.params.id)
    }
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    const { getEmployee, match } = this.props
    if (nextProps.match.params.id !== match.params.id) {
      getEmployee(nextProps.match.params.id)
    }
  }

  render() {
    const { current, match } = this.props

    if ( !current.id || match.params.id !== (current.id && current.id.toString()) ) {
      return <Loader />
    }

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs
              breadcrumbs={[
                {
                  name:
                    !!current.name &&
                    current.surname + ' ' + current.name + ' ' + current.middlename,
                  active: true,
                },
              ]}
            />
          </Col>
        </Row>
        <EmployeeCard />
      </div>
    )
  }
}

export default connector(Container)
