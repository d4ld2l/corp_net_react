// @flow

import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Arrow, Post, Phone, Skype } from 'components-folder/Icon'

const cn = require('bem-cn')('candidate-resume-tabs')

if (process.env.BROWSER) {
  require('./candidate-resume-tabs.css')
}

export default class RecommendationsCollapse extends Component{
  state = {
    open: true,
  }

  render() {
    const { open } = this.state
    const { resume } = this.props

    return (
      <div>
        <div id="recommendations">
          <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
            <h2 className="indent-reset">
              Рекомендации
              <sup className={cn('count-recommendations')}>
                {resume.resume_recommendations.length}
              </sup>
            </h2>

            {open ? (
              <Arrow className={cn('arrow-icon_open')} />
            ) : (
              <Arrow className={cn('arrow-icon_close')} />
            )}
          </div>
          <Collapse in={this.state.open}>
            <div>
              <div className={cn('body')}>
                {resume.resume_recommendations.map(item => (
                  <article key={item.id}>
                    <p className={cn('recommendations-name')}>{item.recommender_name}</p>
                    <p className={cn('recommendations-post')}>{item.company_and_position}</p>
                    <address className={cn('recommendations-address')}>
                      {item.phone && (
                        <div className={cn('recommendations-info')}>
                          <div>
                            <Phone className={cn('recommendations-icon')} />
                          </div>
                          <div>
                            <a className={cn('recommendations-text')} href={`tel:${item.phone}`}>
                              {item.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {item.email && (
                        <div className={cn('recommendations-info')}>
                          <div>
                            <Post className={cn('recommendations-icon')} />
                          </div>
                          <div>
                            <a
                              className={cn('recommendations-text', { email: 'link' })}
                              href={`mailto:${item.email}`}
                            >
                              {item.email}
                            </a>
                          </div>
                        </div>
                      )}
                      {/* <div className={cn('recommendations-info')}>
                        <div>
                          <Skype className={cn('recommendations-icon')} />
                        </div>
                        <div>
                          <a className={cn('recommendations-text')} href={`tel:${item.skype}`}>{item.skype}</a>
                        </div>
                      </div> */}
                    </address>
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
