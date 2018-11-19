import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Plus } from 'components-folder/Icon'
import Projects from './Projects'
import {toggleTab, clearSearchFilter, getProjectsDictionary} from '../../../redux/actions/projectsDataActions'
import * as employeesActions from "../../../redux/actions/employeesActions";
import * as legalUnitsActions from "../../../redux/actions/legalUnitsActions";
import * as departmentsActions from "../../../redux/actions/departmentsActions";
import * as customersActions from "../../../redux/actions/customersActions";

const cn = require('bem-cn')('projects')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class Container extends Component {
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(clearSearchFilter())
    Promise.resolve(dispatch(toggleTab(true))).then(() => {
      dispatch(legalUnitsActions.getLegalUnits())
      dispatch(employeesActions.getEmployees())
      dispatch(departmentsActions.getDepartments())
      dispatch(customersActions.getCustomers())
      dispatch(getProjectsDictionary('technologies'))
      dispatch(getProjectsDictionary('products'))
      dispatch(getProjectsDictionary('methodologies'))
    })
  }
  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch(clearSearchFilter())
    dispatch(toggleTab(true))
  }

  render() {
    const {system: { menu }} = this.props.state

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>{menu.find(it => it.id === 'shr_projects').label}</title>
            </Helmet>
            <Breadcrumbs />
            <Header name={menu.find(it => it.id === 'shr_projects').label}/>
            <Projects {...this.props}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const Header = ({name}) => (
  <div className={cn('head')}>
    <h1 className={'indent_reset'}>{name}</h1>
    <Link to={`/projects/new`} title="Создать новый проект">
      <Plus outline={40} />
    </Link>
  </div>
)
