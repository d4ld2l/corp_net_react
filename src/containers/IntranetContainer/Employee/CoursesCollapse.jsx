import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'
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
            <h2 className="indent-reset">
              Курсы
              <sup className={cn('count-recommendations').mix('p4 p4_theme_light_third')}>
                {current.resumes[0] && current.resumes[0].resume_courses.length}
              </sup></h2>

            {open ? (
              <Arrow className={cn('arrow-icon_open')} />
            ) : (
              <Arrow className={cn('arrow-icon_close')} />
            )}
          </div>
          <Collapse in={this.state.open}>
            <div>
              <div className={cn('body')}>
                {(current.resumes[0] && current.resumes[0].resume_courses.length > 0) && (
                  <p1 className={cn('margin-head-4').mix('p1 p1_theme_light_first')}>Курсы</p1>
                )}
                {current.resumes[0] && current.resumes[0].resume_courses.map(item => (
                  <article className={cn('achievement-article')} key={item.id}>
                    <div className={cn('date-interval')}>
                      <p className={cn('achievement-date').mix('p1 p1_theme_light_second')}>
                        {item.end_year ? moment(item.end_year).format('YYYY') : ''}
                      </p>
                    </div>
                    <div className={cn('achievement-data')}>
                      {item.name && <p className={cn('achievement-text-name').mix('p1 p1_theme_light_second indent_reset')}>{item.name}</p>}
                      {item.speciality && <p className={cn('achievement-text-name').mix('p1 p1_theme_light_second indent_reset')}>{item.speciality}</p>}
                      {item.company_name && <p className={cn('achievement-text').mix('p2 p2_theme_light_second indent_reset')}>{item.company_name}</p>}
                      {item.document &&
                      (<div className={cn('inner-content-comment')}>
                          <div>
                            <a href={item.document.file.url} download>
                              <span className={('link link_theme_light_third')} title={replace(item.document.name, item.document.extension, '')}>{replace(item.document.name, item.document.extension, '')}</span>
                            </a>
                          </div>
                        </div>
                      )}
                      {/*{item.file.url && (*/}
                        {/*<div>*/}
                          {/*<a href={`${item.file.url}`} className={cn('file-name')}>*/}
                            {/*{item.file.url}*/}
                          {/*</a>*/}
                        {/*</div>*/}
                      {/*)}*/}
                    </div>
                    <div>
                    </div>
                  </article>
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
