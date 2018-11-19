import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { pick } from 'ramda'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Row, Col, Collapse, Clearfix } from 'react-bootstrap'

import { Arrow, Attention } from 'components-folder/Icon'

const cn = require('bem-cn')('new-survey-collapse')
if (process.env.BROWSER) {
  require('./new-survey-collapse.css'), require('./basic-info.css')
}
moment.locale('ru')

const connector = connect(state => ({
  current: state.surveys.current
}))

const StatusLabel = ({ survey }) => {
  const statusNames = {
    draft: 'Не опубликован',
    published: 'Опубликован',
    unpublished: 'Снят с публикации'
  }

  return (
    <div className={`surveys-block__info-message surveys-block__info-message_${survey.state}`} >
      <span>{statusNames[survey.state]}</span>
    </div>
  )
}

class BasicInformationSurvey extends PureComponent {
  state = { open: true }

  render() {
    const { open } = this.state
    const { current } = this.props

    const image = {
      width: '100%',
      position: 'relative',
      display: 'block',
      marginBottom: '25px',
      height: current.symbol && current.symbol.url ? '310px' : '50px',
      background: `url(${current.symbol && current.symbol.url}) top left / contain no-repeat`,
    }

    return (
      <Row>
        <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
          <div className={cn({ padding: 'null' })} id="information">
            <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
              <h2>Основная информация</h2>

              {open ? (
                <Arrow className={cn('open-icon')} />
              ) : (
                <Arrow className={cn('close-icon')} />
              )}
            </div>

            <Collapse in={this.state.open}>
              <div>
                <div className={cn('body')}>
                  <article className={cn('article')}>
                    {/*<div*/}
                      {/*className={cn('attention')}*/}
                    {/*>*/}
                      {/*{current.state === 'published' ? 'Опубликован' : 'Не опубликован'}*/}
                      {/*<Attention*/}
                        {/*className={cn('after-attention')}*/}
                        {/*style={current.state === 'published' ? { color: '#ff2f51' } : undefined}*/}
                      {/*/>*/}
                    {/*</div>*/}

                    <StatusLabel survey={current} />


                    {!!current.symbol && <div style={image} />}
                    <div className={cn('desription')}>
                      <p
                        className={'p1 p1_theme_light_first indent_15'}
                        dangerouslySetInnerHTML={{ __html: current.note }}
                      />
                    </div>
                    {!!current.document &&
                      !!current.document.url && (
                        <div className={cn('file-rules')}>
                          <a className={'link link_theme_light_third'} href={current.document.url}>
                            Правила прохождения опроса
                          </a>
                        </div>
                      )}
                  </article>
                  <aside className={cn('sidebar')}>
                    <h2>
                      Участники{' '}
                      <sup className={cn('number-participants')}>
                        {current.participants_total_count}
                      </sup>
                    </h2>
                    {current.available_to_all == false ? (
                      <div>
                        {current.participants_list &&
                          current.participants_list.length > 0 &&
                          current.participants_list.map(employee => {
                            return (
                              employee &&
                                <div className={cn('wrapper-employee')} key={employee.id}>
                                  <div
                                    className={cn('employee-photo')}
                                    style={{
                                      background: `url(${employee.photo
                                        .url}) center center / cover no-repeat`,
                                    }}
                                  />
                                  <div className={cn('wrapper-name-post')}>
                                    <Link
                                      to={`/employees/${employee.account_id}`}
                                      className={cn('name-text')}
                                    >
                                      {employee.fullname || employee.full_name}
                                    </Link>
                                    <p className={cn('post-text')}>{employee.position_name}</p>
                                  </div>
                                </div>

                            )
                          })}
                      </div>
                    ) : (
                      <p className={cn('text')}>Все сотрудники</p>
                    )}
                  </aside>
                </div>
              </div>
            </Collapse>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connector(BasicInformationSurvey)
