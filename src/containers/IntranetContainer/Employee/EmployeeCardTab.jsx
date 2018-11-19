import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, Row, Col } from 'react-bootstrap'
import EmployeeCardTabBasicInformation from './EmployeeCardTabBasicInformation'
import EmployeeCardTabPersonnelInformation from './EmployeeCardTabPersonnelInformation'
import EmployeeCardAccordion from './EmployeeCardAccordion'
import EmployeeCardTabResume from './EmployeeCardTabResume'
import EmployeeCardTabProjects from './EmployeeCardTabProjects'
import EmployeeCardTabSkill from './EmployeeCardTabSkill'

const cn = require('bem-cn')('employee-card-tab')

if (process.env.BROWSER) {
  require('./employee-card-tab.css')
}

export default class EmployeeCardTab extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { role, enabledComponents } = this.props
    return (
      <div className={cn}>
        <Row>
          <Col lg={8} lgOffset={1} md={8} mdOffset={1} sm={8} xs={8}>
            <Tabs className={cn('list')} defaultActiveKey={1} id="tabs">
              <Tab tabClassName={`${cn('inner').mix('p1 p1_theme_light_first')}`} eventKey={1} title="Контакты">
                <EmployeeCardTabBasicInformation />
              </Tab>
              {
                enabledComponents.shr_skills &&
                (
                  <Tab tabClassName={`${cn('inner').mix('p1 p1_theme_light_first')}`} eventKey={4} title="Навыки">
                    <EmployeeCardTabSkill />
                  </Tab>
                )
              }

              { (this.props.user.id === this.props.current.id || role.stuff_info) && enabledComponents.shr_personnel &&
                <Tab tabClassName={`${cn('inner').mix('p1 p1_theme_light_first')}`} eventKey={2} title="Кадровая информация">
                  <EmployeeCardTabPersonnelInformation/>
                </Tab>
              }
              {
                enabledComponents.shr_resume &&
                (
                  <Tab tabClassName={`${cn('inner').mix('p1 p1_theme_light_first')}`} eventKey={3} title="Резюме">
                    <EmployeeCardTabResume {...this.props}/>
                  </Tab>
                )
              }
              {
                enabledComponents.shr_projects &&
                (
                  <Tab tabClassName={`${cn('inner').mix('p1 p1_theme_light_first')}`} eventKey={5} title="Проекты">
                    <EmployeeCardTabProjects />
                  </Tab>
                )
              }
            </Tabs>
          </Col>
          {
            enabledComponents.shr_org &&
            (
              <Col lg={3} md={3} sm={4} xs={4}>
                <EmployeeCardAccordion />
              </Col>
            )
          }
        </Row>
      </div>
    )
  }
}
