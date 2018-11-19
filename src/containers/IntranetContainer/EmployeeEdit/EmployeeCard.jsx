import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Breadcrumb } from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import ProfilePhoto from './ProfilePhoto'

const cn = require('bem-cn')('employee-card-edit')

if (process.env.BROWSER) {
  require('./employee-card-edit.css')
}

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
    enabledComponents: state.system.enabledComponents,
  })
)

class EmployeeCard extends Component {
  departmentsChain(chain) {
    const arr = []
    const unit = chain.filter(el => !el.parent_id)[0]
    if (unit) {
      arr.push(
        <Breadcrumb.Item href="#" key={`elem_${unit.id}`}>
          {unit.name_ru}
        </Breadcrumb.Item>
      )
    }
    function filterChain(el, ar) {
      const i = ar.filter(elem => elem.parent_id === el.id)[0]
      if (i) {
        arr.push(<span key={`span_${i.id}`}>&nbsp;/&nbsp;</span>)
        arr.push(
          <Breadcrumb.Item href="#" key={`elem_${i.id}`}>
            {i.name_ru}
          </Breadcrumb.Item>
        )
        filterChain(i, ar)
      }
    }
    if (unit) filterChain(unit, chain)
    return arr
  }

  render() {
    const { current, dispatch, enabledComponents } = this.props

    return (
      <div className={cn}>
        <Row>
          <Col lg={2} md={3} sm={3} xs={12}>
            <ProfilePhoto dispatch={dispatch} />
          </Col>

          <Col lg={8} md={7} sm={8} xs={12}>
            <hgroup className={cn('head')}>
              <h1>{current.full_name}</h1>
            </hgroup>

            {enabledComponents.shr_org && (
              <p className={cn('post').mix('p1 p1_theme_light_first')}>
                { !isEmpty(current.all_legal_unit_employees) && get(current, 'all_legal_unit_employees[0].position.position.name_ru') }
              </p>
            )}
            {enabledComponents.shr_org && (
              <Breadcrumb className={cn('breadcrumb')}>
                {
                  !isEmpty(current.departments_chain) ?
                    this.departmentsChain(current.departments_chain) :
                    <Breadcrumb.Item href="#"> { get(current, 'all_legal_unit_employees[0].position..department.name_ru') }</Breadcrumb.Item>
                }
              </Breadcrumb>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(EmployeeCard)
