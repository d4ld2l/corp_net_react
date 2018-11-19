import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ExperienceCollapse from './ExperienceCollapse'
import EducationCollapse from './EducationCollapse'
import CertificatesCollapse from './CertificatesCollapse'
import CoursesCollapse from './CoursesCollapse'
import { Link } from 'react-router-dom'
import { Pencil } from 'components-folder/Icon'

const cn = require('bem-cn')('employee-card-tab-resume')
if (process.env.BROWSER) {
  require('./employee-card-tab-resume.css')
}

export default class EmployeeCardTabResume extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {current, user} = this.props

    return (
      <div className={cn}>
        <Row>
          {current.id === user.id && (
            <Col xs={12}>
              <div className={cn('edit-button')}>
                <Link to={`/employees/${current.id}/edit/resume`} title="Редактировать резюме">
                  <Pencil outline className={cn('pencil-icon')} />
                </Link>
              </div>
            </Col>
          )}
          <Col xs={12}>
            {
              current.resumes[0] ? (
                [
                  <ExperienceCollapse key="EmployeeExperienceCollapse"/>,
                  <EducationCollapse key="EmployeeEducationCollapse"/>,
                  <CertificatesCollapse key="EmployeeCertificatesCollapse"/>,
                  <CoursesCollapse key="EmployeeCoursesCollapse"/>
                ]
              ) : (
                <h3 className={cn('wrapper')}>Пользователь еще не заполнил резюме.</h3>
              )
            }
          </Col>
        </Row>
      </div>
    )
  }
}
