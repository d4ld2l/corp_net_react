import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { Phone, Post, Catalog, Skype, Telegram, Hangouts, WhatSapp, Viber, Signal,
  Threema, GoogleAllo, Vk, Oks, Fb, Twitter, HabraHabr, GitHub, GitLab, LinkedIn, Dribbble, Insta, Pinterest, Tumblr, Reddit, Icq, Flag } from 'components-folder/Icon'

const cn = require('bem-cn')('employee-card-tab-basic-information')
if (process.env.BROWSER) {
  require('./employee-card-tab-basic-information.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
  }),
  {}
)

const PHONE_OPTIONS = [
  {
    value: 'personal',
    label: 'Личный',
  },
  {
    value: 'work',
    label: 'Рабочий',
  },
  {
    value: 'home',
    label: 'Домашний',
  },
  {
    value: 'other',
    label: 'Другой',
  },
]

const EMAIL_OPTIONS = [
  {
    value: 'personal',
    label: 'Личный',
  },
  {
    value: 'work',
    label: 'Рабочий',
  },
]

export const renderMessengerIcon = (type: string) => {
  switch (type) {
    case 'Telegram':
      return <Telegram outline className={cn('phone-icon')}/>
    case 'Hangout':
      return <Hangouts className={cn('phone-icon')}/>
    case 'Threema':
      return <Threema className={cn('phone-icon')}/>
    case 'Signal':
      return <Signal className={cn('phone-icon')}/>
    case 'Google Allo':
      return <GoogleAllo className={cn('phone-icon')}/>
    case 'ICQ':
      return <Icq className={cn('phone-icon')}/>
    default:
      return <Catalog className={cn('phone-icon')}/>
  }
}

export const renderSocialIcon = (url: string) => {
  if (url.toLowerCase().includes('vk.')){
    return <Vk className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('facebook.')){
    return <Fb className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('ok.')){
    return <Oks className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('twitter.')){
    return <Twitter className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('habrahabr.')){
    return <HabraHabr className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('github.')){
    return <GitHub className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('gitlab.')){
    return <GitLab className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('linkedin.')){
    return <LinkedIn className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('dribbble.')){
    return <Dribbble className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('instagram.')){
    return <Insta className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('telegram.')){
    return <Telegram className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('pinterest.')){
    return <Pinterest className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('tumblr.')){
    return <Tumblr className={cn('phone-icon')}/>
  }
  if (url.toLowerCase().includes('reddit.')){
    return <Reddit className={cn('phone-icon')}/>
  }
  return <Catalog className={cn('phone-icon')} />
}

export const parseSocialName = (url: string) => {
  if (url.toLowerCase().includes('vk.')){
    return 'вконтакте'
  }
  if (url.toLowerCase().includes('facebook.')){
    return 'facebook'
  }
  if (url.toLowerCase().includes('ok.')){
    return 'одноклассники'
  }
  if (url.toLowerCase().includes('twitter.')){
    return 'twitter'
  }
  if (url.toLowerCase().includes('habrahabr.')){
    return 'habrahabr'
  }
  if (url.toLowerCase().includes('github.')){
    return 'github'
  }
  if (url.toLowerCase().includes('gitlab.')){
    return 'gitlab'
  }
  if (url.toLowerCase().includes('linkedin.')){
    return 'linkedin'
  }
  if (url.toLowerCase().includes('dribbble.')){
    return 'dribbble'
  }
  if (url.toLowerCase().includes('instagram.')){
    return 'instagram'
  }
  if (url.toLowerCase().includes('pinterest.')){
    return 'pinterest'
  }
  if (url.toLowerCase().includes('tumblr.')){
    return 'tumblr'
  }
  if (url.toLowerCase().includes('reddit.')){
    return 'reddit'
  }
  return 'иной'
}

class EmployeeCardTabBasicInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { current } = this.props

    return (
      <div className={cn}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={6}>
                <div className={cn('margin-bottom')}>
                  <div className={cn('description')}>
                    <h3 className={cn('label')}>Телефон</h3>
                  </div>
                  { current.account_phones.map((phone, index) => (
                    <div className={cn('phones-block')} key={index}>
                      <div className={cn('description')}>
                        <Phone className={cn('phone-icon')} />
                        <div key={phone.id} className={cn('info-block')}>
                          <label className={('p3 p3_theme_light fw_300')}>{ (PHONE_OPTIONS.find(it => it.value === phone.kind) && PHONE_OPTIONS.find(it => it.value === phone.kind).label) || 'Другой' }</label>
                          <a
                            className={cn('info-text-a').mix('link link_theme_light_first link_pseudo')}
                            href={`tel:${phone.number}`}
                            target="_blank"
                          >
                            { phone.number }
                          </a>
                        </div>
                      </div>
                      <div className={cn('description-messenger-type')}>
                        { phone.telegram && <Telegram className={cn('phone-telegram-icon')} /> }
                        { phone.whatsapp && <WhatSapp className={cn('phone-whatsapp-icon')} /> }
                        { phone.viber && <Viber className={cn('phone-viber-icon')} /> }
                        { phone.preferable && <Flag className={cn('phone-preferable-icon')} /> }
                      </div>
                    </div>

                  ))}
                </div>
              </Col>
              <Col xs={6}>
                <div className={cn('margin-bottom')}>
                  <div className={cn('description')}>
                    <h3 className={cn('label')}>Email</h3>
                  </div>
                  { current.account_emails && current.account_emails.map((email, index) => (
                    <div className={cn('phones-block')} key={index}>
                      <div className={cn('description')}>
                        <Post className={cn('email-icon')} />
                        <div className={cn('info-block')}>
                          <label className={('p3 p3_theme_light fw_300')}>{ (EMAIL_OPTIONS.find(it => it.value === email.kind) && EMAIL_OPTIONS.find(it => it.value === email.kind).label) || 'Другой' }</label>
                          <a
                            className={cn('info-text-a').mix('link link_theme_light_first link_pseudo')}
                            href={`mailto:${ email.email }`}
                            target="_blank"
                          >
                            { email.email }
                          </a>
                        </div>
                      </div>
                      <div className={cn('description-messenger-type')}>
                        { email.preferable && <Flag className={cn('phone-preferable-icon')} /> }
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <div className={cn('margin-bottom')}>
                  <div className={cn('description')}>
                    {/*<Catalog className={cn('phone-icon')} />*/}
                    <h3 className={cn('label')}>Другие способы связи</h3>
                  </div>
                  {current.skype && (
                    <div className={cn('description')}>
                      <Skype className={cn('phone-icon')} />
                      <div className={cn('info-block')}>
                        <label className={('p3 p3_theme_light fw_300')}>Skype</label>
                        <a
                          className={cn('info-text-a').mix('link link_theme_light_first link_pseudo')}
                        >
                          {current.skype}
                        </a>
                      </div>
                    </div>
                  )}
                  {
                    current.account_messengers.length > 0 && (
                      current.account_messengers.map((it, index) => {
                        return (
                          <div className={cn('description')} key={index}>
                            {renderMessengerIcon(it.name)}
                            <div className={cn('info-block')}>
                              <label className={('p3 p3_theme_light fw_300')}>{it.name}</label>
                              <a
                                className={cn('info-text-a').mix('link link_theme_light_first link_pseudo')}
                              >
                                {it.phones[0]}
                              </a>
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                </div>
              </Col>
              <Col xs={6}>
                <div className={cn('margin-bottom')}>
                  <div className={cn('description')}>
                    <h3 className={cn('label')}>Сообщества</h3>
                  </div>

                  { (current.social_urls.length > 0) && current.social_urls.map((url, index) => (
                      <div className={cn('description')} key={index}>
                        {renderSocialIcon(url)}
                        <div className={cn('info-block')}>
                          <label className={('p3 p3_theme_light fw_300')}>{parseSocialName(url)}</label>
                          <a
                            className={cn('info-text-a', 'link').mix('link link_theme_light_first link_pseudo')}
                            href={url.includes('http') ? url : 'http://' + url}
                            target="_blank"
                          >
                            { url }
                          </a>
                        </div>
                      </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(EmployeeCardTabBasicInformation)
