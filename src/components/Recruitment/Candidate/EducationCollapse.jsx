// @flow

import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('candidate-resume-tabs')

if (process.env.BROWSER) {
  require('./candidate-resume-tabs.css')
}

export default class EducationCollapse extends Component {
  state = {
    open: true,
  }

  render() {
    const { open } = this.state
    const { resume } = this.props

    return (
      <div>
        <div id="education">
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
                {resume.resume_educations.length > 0 && (
                  <h4 className={cn('margin-head-4')}>Образование</h4>
                )}
                {resume.education_level && <h5>Уровень образования: {resume.education_level.name}</h5>}
                {resume.resume_educations.map(item => (
                  <div key={item.id}>
                    <article className={cn('achievement-article')}>
                      <div className={cn('date-interval')}>
                        <p className={cn('achievement-date')}>
                          {item.end_year ? item.end_year : 'по наст. вр.'}
                        </p>
                      </div>
                      <div className={cn('achievement-data')}>
                        <div>
                          <p className={cn('achievement-text-name')}>{item.school_name}</p>
                        </div>
                        {item.faculty_name && (
                          <div>
                            <p className={cn('achievement-text')}>{item.faculty_name}{item.speciality ? ', ' : ''}{item.speciality}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
                {(resume.resume_certificates.length > 0) && (
                  <h4 className={cn('margin-head-4')}>Сертификаты</h4>
                )}
                {resume.resume_certificates.map(item => (
                  <article className={cn('achievement-article')} key={item.id}>
                    <div className={cn('date-interval')}>
                      <p className={cn('achievement-date')}>
                        {item.end_date ? moment(item.end_date).format('YYYY') : ''}
                      </p>
                    </div>
                    <div className={cn('achievement-data')}>
                      {item.name && <p className={cn('achievement-text-name')}>{item.name}</p>}
                      {item.company_name && <p className={cn('achievement-text')}>{item.company_name}</p>}
                      {item.file.url && (
                        <div>
                          <a href={`${item.file.url}`} className={cn('file-name')}>
                            {item.file.url}
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                ))}

                {(resume.resume_courses.length > 0) && (
                  <h4 className={cn('margin-head-4')}>Курсы</h4>
                )}
                {resume.resume_courses.map(item => (
                  <article className={cn('achievement-article')} key={item.id}>
                    <div className={cn('date-interval')}>
                      <p className={cn('achievement-date')}>{item.end_year ? moment(item.end_year).format('YYYY') : ''}</p>
                    </div>
                    <div className={cn('achievement-data')}>
                      {item.name && <p className={cn('achievement-text-name')}>{item.name}</p>}
                      {item.company_name && <p className={cn('achievement-text')}>{item.company_name}</p>}
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
