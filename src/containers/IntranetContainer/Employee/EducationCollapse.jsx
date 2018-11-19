import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";
import {toastr} from "react-redux-toastr";
import {replace} from "lodash";

const cn = require('bem-cn')('employee-resume-tabs')
if (process.env.BROWSER) {
  require('./employee-resume-tabs.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
  }),
  {}
)


class StatusesCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state
    const { current } = this.props

    return (
      <div>
        <div className={cn} id="education">
          <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
            <h2 className="indent-reset">Образование</h2>

            {open ? (
              <Arrow className={cn('arrow-icon_open')} />
            ) : (
              <Arrow className={cn('arrow-icon_close')} />
            )}
          </div>
          <Collapse in={this.state.open}>
            <div>
              <div className={cn('body')}>
                {current.resumes[0] && current.resumes[0].resume_educations.length > 0 && current.resumes[0].resume_educations.map(item => (
                  <div key={item.id}>
                    {item.education_level && <h4>{item.education_level.name}</h4>}
                    <article className={cn('achievement-article')}>
                      <div className={cn('date-interval')}>
                        <p className={cn('achievement-date').mix('p1 p1_theme_light_second indent_reset')}>
                          {item.end_year ? item.end_year : 'по наст. вр.'}
                        </p>
                      </div>
                      <div className={cn('achievement-data')}>
                        <div>
                          <p className={cn('achievement-text-name').mix('p1 p1_theme_light_second indent_reset')}>{item.school_name}</p>
                        </div>
                        {item.faculty_name && (
                          <div>
                            <p className={cn('achievement-text').mix('p2 p2_theme_light_second indent_reset')}>{item.faculty_name}{item.speciality ? ', ' : ''}{item.speciality}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
                {current.resumes[0] && current.resumes[0].language_skills.length > 0 && (
                  <h4>Знание языков</h4>
                )}
                {current.resumes[0] && current.resumes[0].language_skills.map(item => (
                  <div key={item.id}>
                    <article className={cn('achievement-article')}>
                      <div className={cn('achievement-data')}>
                        <div>
                          <p className={cn('achievement-text-name').mix('p1 p1_theme_light_second indent_reset')}>{item.language.name} — {item.language_level.name}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}

              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}
export default connector(StatusesCollapse)
