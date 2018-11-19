import React, { Component, PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Row, Col } from 'react-bootstrap'
import NewPost from './NewPost'
import SearchFiltering from './SearchFiltering'
import UpcomingBirthdays from './UpcomingBirthdays'
import Sidebar from '../Sidebar'
import Publication from './Publication'
import { getEmployees } from '../../../redux/actions/employeesActions'
import { getBirthdaysCurrent } from 'redux-folder/actions/birthdaysActions'
import { connect } from 'react-redux'


const cn = require('bem-cn')('intranet-community')

if (process.env.BROWSER) {
  require('./Container.css')
}

class Community extends PureComponent {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getEmployees())
    dispatch(getBirthdaysCurrent())
  }

  render() {
    const {system: { menu }} = this.props.state
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <h1>{menu.find(it => it.id === 'shr_feed').label}</h1>
          </Col>
          <Col lg={7} lgOffset={1} md={7} mdOffset={1} sm={12} xs={12}>
            <NewPost form={'NewPost'} />
            <SearchFiltering />
            <Publication />
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Sidebar />
            {/*<UpcomingBirthdays />*/}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)
