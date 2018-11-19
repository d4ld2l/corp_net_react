import React, { Component } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'
import moment from 'moment'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('employee-card-tab-project')

if (process.env.BROWSER) {
  require('./employee-card-tab-project.css')
}

export default class EmployeeCardTabProjectsInner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state
    const { elem } = this.props

    return (
      <div className={cn('collapse')} id="statuses">
        <div className={cn('head-collapse')} onClick={() => this.setState({ open: !open })}>
          <div className={cn('item_title').mix(cn('item'))}>
            <a href={`/projects/${elem.project.id}`} className={cn('name-project').mix('link link_theme_light_first link_pseudo indent_reset')}>
              {elem.project && elem.project.title}
            </a>
            <p className={cn('code-project').mix('p2 p2_theme_light_second')}>{elem.project && elem.project.charge_code}</p>
          </div>

          <div className={cn('item_date').mix(cn('item'))}>
            <p className={cn('date').mix('p1 p1_theme_light_first indent_reset')}>
              <time dateTime="2017-08-5">
                {elem.project && elem.project.begin_date === null
                  ? moment(elem.project.created_at).format('DD.MM.YYYY')
                  : moment(elem.project.begin_date).format('DD.MM.YYYY')}{' '}
                -{' '}
                {elem.project && elem.project.end_date === null
                  ? 'наст. вр.'
                  : moment(elem.project.end_date).format('DD.MM.YYYY')}
              </time>
            </p>
          </div>

          <div className={cn('item_post').mix(cn('item')).mix('p1 p1_theme_light_first indent_reset')}>
            <p className={cn('post')}>{ elem.project_work_periods && elem.project_work_periods.map(({role}) => (role)).join(', ')  }</p>
          </div>

          <div className={cn('item_arrow').mix(cn('item'))}>
            {open ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </div>
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('body')}>
              {
                elem.project_work_periods.length > 0 &&
                (
                  elem.project_work_periods.map((it) => (
                    <Row className={cn('body-project').toString()} key={it.id}>
                      <Col xs={12}>
                        <div className={cn('body-project-block').mix(cn('body-project-block_item'))}>
                          <p className={cn('body-label').mix('p1 p1_theme_light_second indent_reset')}>Роль:</p>
                          <p className={cn('body-text').mix('p1 p1_theme_light_first indent_reset')}>{it.role}</p>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className={cn('body-project-block').mix(cn('body-project-block_item'))}>
                          <p className={cn('body-label').mix('p1 p1_theme_light_second indent_reset')}>Период:</p>
                          <p className={cn('body-text').mix('p1 p1_theme_light_first indent_reset')}>
                            { it.begin_date && `${it.begin_date} - ${it.end_date ? it.end_date : 'по наст. вр.'}`}
                          </p>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className={cn('body-project-block').mix(cn('body-project-block_item'))}>
                          <p className={cn('body-label').mix('p1 p1_theme_light_second indent_reset')}>Обязанности:</p>
                          <p className={cn('body-text').mix('p1 p1_theme_light_first indent_reset')}>{it.duties}</p>
                        </div>
                      </Col>
                      <hr/>
                    </Row>
                  ))
                )
              }
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
