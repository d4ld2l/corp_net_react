import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('leaders-collapse')

if (process.env.BROWSER) {
  require('./leaders-collapse.css')
}
moment.locale('ru')

export default class LeadersCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state
    const { current } = this.props
    let employees = []
    if (current.managers_chain) {
      employees = [].concat(current.managers_chain)
    }

    return (
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h3 className={cn('title').mix('fw_400')}>Руководители</h3>

          {open ? (
            <Arrow className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('body')}>
              <Row>
                <Col xs={12}>
                  {employees.map(element => (
                    <div className={cn('card')} key={Math.random()}>
                      <figure className={cn('image')}>
                        <img
                          src={
                            element.photo && element.photo.url
                              ? element.photo.url
                              : '/public/avatar.png'
                          }
                          alt=""
                        />
                      </figure>
                      <div className={cn('info-block')}>
                        <div className={cn('name-value')}>
                          <Link className={('link link_theme_light_first')} to={`/employees/${element.id}`}>
                            {element.surname} {element.name}
                          </Link>
                          <span className={cn('value').mix('p4 p4_theme_light_third')}>{element.subordinates_count}</span>
                        </div>
                        <p className={cn('post').mix('p3 p3_theme_light')}>{element.position_name}</p>
                      </div>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
