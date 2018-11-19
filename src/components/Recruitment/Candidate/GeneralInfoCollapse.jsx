// @flow

import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('candidate-resume-tabs')

if (process.env.BROWSER) {
  require('./candidate-resume-tabs.css')
}

export default class GeneralInfoCollapse extends Component {
  state = {
    open: true,
  }

  render() {
    const { open } = this.state
    const { resume } = this.props

    return (
      <div>
        <div id="general_information">
          <div className={cn('head')}
               onClick={() => this.setState({ open: !open })}>
            <h2 className="indent-reset">Информация о кандидате</h2>

            {open ? (
              <Arrow className={cn('arrow-icon_open')}/>
            ) : (
              <Arrow className={cn('arrow-icon_close')}/>
            )}
          </div>
          <Collapse in={this.state.open}>
            <div>
              <div className={cn('body', { flex: 'container' })}>
                <div className={cn('info-section')}>
                  {resume.skills.length > 0 && (
                    <div className={cn('info-block')}>
                      <p className={cn('label')}>КЛЮЧЕВЫЕ НАВЫКИ</p>
                      <div className={cn('mark-block')}>
                        {resume.skills.map(skill => (
                          <mark className={cn('mark')} key={skill.id}>
                            {skill.name}
                          </mark>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.skills_description && (
                    <div className={cn('info-block')}>
                      <p className={cn('label')}>Навыки</p>
                      <p
                        className={cn('info-text')}
                        dangerouslySetInnerHTML={{ __html: resume.skills_description }}
                      />
                    </div>
                  )}

                  {resume.language_skills.length > 0 && (
                    <div className={cn('info-block')}>
                      <p className={cn('label')}>Знание языков</p>
                      {resume.language_skills.map(lang => (
                        <p className={cn('language-text')} key={Math.random()}>
                          {lang.language.name} — {lang.language_level.name}
                        </p>
                      ))}
                    </div>
                  )}

                  {resume.sex && (
                    <div className={cn('info-block')}>
                      <p className={cn('label')}>пол</p>
                      <p className={cn('info-text')}>
                        {resume.sex === 'male' ? 'Мужской' : 'Женский'}
                      </p>
                    </div>
                  )}

                  {resume.birthdate && (
                    <div className={cn('info-block')}>
                      <p className={cn('label')}>Дата рождения</p>
                      <time
                        dateTime={moment(resume.birthdate).format('DD MMM YYYY')}>
                        <p className={cn('info-text')}>
                          {moment(resume.birthdate).format('DD MMM YYYY')}
                        </p>
                      </time>
                    </div>
                  )}
                </div>
                <div className={cn('sidebar-contact')}>
                  <h3>Контакты</h3>
                  {resume.resume_contacts.map(item => (
                    <div className={cn('info-block')} key={item.id}>
                      <p
                        className={cn('label')}>{item.contact_type === 'email' ?
                        'почта' : item.contact_type === 'phone' ? 'телефон' : 'skype'}</p>
                      <a
                        href={`${item.contact_type === 'email' ? `mailto:${item.value}` : `tel:${item.value}`}`}
                        className={cn('info-text')}>
                        {item.value}
                      </a>
                    </div>
                  ))}

                  {resume.additional_contacts.map(item => (
                    <div className={cn('info-block')} key={item.id}>
                      <p className={cn('label')}>сайт</p>
                      <a href={`${item.link}`}
                         className={cn('info-text')}>
                        {item.link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}
