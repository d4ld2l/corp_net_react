import React, { Component } from 'react'
import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import Wrapper from 'components-folder/Wrapper'
import { Link } from 'react-router-dom'
import { get, reverse, sortBy } from 'lodash'
import { withCookies } from 'react-cookie'

import {
  Phone,
  Check,
  Interview,
  Star,
  Post,
  Planet,
  Recomendation,
  Close,
  Flag,
  Avatar
} from 'components-folder/Icon'
import SettingBlock from './SettingBlock'
import Aggregator from './Aggregator'
import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { toggleLinkedCandidateModal } from 'redux-folder/actions/candidatesActions'
import { LinkedCandidateModal } from 'components-folder/Modals/LinkedCandidateModal'

const cn = require('bem-cn')('candidate-head')

if (process.env.BROWSER) {
  require('./candidate-head.css')
}

const connector = connect(state => ({
  showLindkedModal: state.candidates.openLinkedCandidateModal,
  candidate: state.candidates.current,
  sources: state.candidates.sources,
}))

class Head extends Component {
  state = {
    shown: false,
  }

  componentDidMount(){
    const { cookies, candidate: { id } } = this.props

    const savedShowParam = cookies.get(`show_similar_${id}`)
    this.setState({ shown: savedShowParam ? savedShowParam === 'true' : true })
  }

  candidateYears(date) {
    if (!date) return ''
    const years = moment().diff(date, 'years')
    return `${years} ${years.toString().slice(-1) === 1
      ? 'год'
      : years.toString().slice(-1) < 5 ? 'года' : 'лет'},`
  }

  recommendationsCountFormat(count) {
    if (count < 2) {
      return `${count} рекомендация`
    } else if (count < 5) {
      return `${count} рекомендации`
    } else {
      return `${count} рекомендаций`
    }
  }

  toggle() {
    const { cookies, candidate: { id } } = this.props
    cookies.set(`show_similar_${id}`, !this.state.shown)
    this.setState({
      shown: !this.state.shown,
    })
  }

  render() {
    const { showLindkedModal, candidate, candidate: { resume }, dispatch, sources, shrCore } = this.props
    const phones = resume.resume_contacts.filter(item => item.contact_type === 'phone')
    const emails = resume.resume_contacts.filter(item => item.contact_type === 'email')

    const hidden = {
      display: this.state.shown ? 'block' : 'none',
    }

    return (
      <Wrapper className={cn}>
          <Breadcrumbs breadcrumbs={[{ name: `${path('', ['last_name'], candidate)} ${path(
            '',
            ['first_name'],
            candidate
          )} ${path('', ['middle_name'], candidate)}`, active: true }]}/>
          <Row>
            <Col lg={2} md={2} xs={2}>
              <div className={cn('avatar')}>
                {candidate.resume.photo && candidate.resume.photo.url ? (
                  <img
                    src={candidate.resume.photo.url}
                    alt="user avatar"
                    className={cn('avatar-image').mix('img-responsive')}
                  />
                ) : (
                  <Avatar size={90} className={cn('avatar')} />
                )}
              </div>

              <span className={cn('resume-update')}>
              Последнее обновление <br />резюме {moment(candidate.updated_at).format('DD.MM.YYYY')}
            </span>
            </Col>

            <Col lg={shrCore ? 9 : 10} md={shrCore ? 9 : 10} xs={10}>
            <div className={cn('top-block')}>
              <div className={cn('info')}>
                <h1 className={cn('user-name')}>
                  {`${path('', ['last_name'], candidate)} ${path(
                    '',
                    ['first_name'],
                    candidate
                  )} ${path('', ['middle_name'], candidate)}`}
                </h1>

                <div className={cn('user-short-wrap')}>
                  <span className={cn('user-short-info')}>
                    {/* {[0, 1, 2, 3, 4].map((e, i) => <Star key={i} className={cn('star-icon')} />)}
                    ,&nbsp; */}
                    {this.candidateYears(candidate.birthdate)} {candidate.resume.city}
                  </span>
                </div>

                <div className={cn('user-description-wrap')}>
                  <p className={cn('user-description')}>
                    {resume.salary_level ? `${resume.salary_level} руб., ` : ''}
                    {get(reverse(sortBy(get(resume, 'resume_work_experiences', []), ['end_date', 'start_day'])), '[0].position', '')}
                  </p>
                </div>
              </div>

              <div>
                <div className={cn('links')} ref={"links"}>
                  {/* <ul className={cn('actions-icons-list').mix('lsn pl0')}> */}

                  {/* <li className={cn('actions-icons-list-item')}>
                      <LinkVariantIcon
                        onClick={() => dispatch(toggleLinkedCandidateModal(true))}
                        className={cn('actions-icons-list-icon').mix('cur')}
                      />
                    </li> */}
                  {/*<li>*/}
                  {/*<Link to={`/recruitment/candidates/${candidate.id}/edit`}>*/}
                  {/*edit*/}
                  {/*</Link>*/}
                  {/*</li>*/}
                  {/* </ul> */}
                  <div className={cn('event-disabled')} title="Запланировать звонок">
                    <Phone outline className={cn('phone-round-icon').mix('btn-icon_disabled')} />
                  </div>
                  <div className={cn('event-disabled')} title="Написать">
                    <Post outline className={cn('mail-round-icon').mix('btn-icon_disabled')} />
                  </div>
                  <div className={cn('event-disabled')} title="Назанчить собеседование">
                    <Interview outline className={cn('interview-round-icon').mix('btn-icon_disabled')} />
                  </div>
                  <div className={cn('event-disabled')} title="Назначить задачу">
                    <Check outline className={cn('task-round-icon').mix('btn-icon_disabled')} />
                  </div>
                  <SettingBlock candidateId={candidate.id}/>

                  <LinkedCandidateModal
                    show={showLindkedModal}
                    candidateId={candidate.id}
                    onHide={() => dispatch(toggleLinkedCandidateModal(false))}
                  />
                </div>
                {candidate.similar_candidates.length > 0 &&
                  <div
                    className={cn('compare-msg')}
                    style={{
                      ...hidden,
                      width: get(this, 'refs.links.clientWidth', 274)
                    }}
                  >
                    <div onClick={this.toggle.bind(this)}>
                      <Close fat className={cn('closed-icon')}/>
                    </div>
                    <p className={cn('compare-msg-text')}>Похожий кандидат есть в базе.</p>
                    <Link className={cn('compare-msg-link')} to={`/recruitment/candidates/${candidate.id}/comparison`}>Сравнить</Link>
                  </div>
                }
              </div>
            </div>

            <div className={cn('bottom-block')}>
              <address className={cn('address')}>
                {phones.length > 0 && (
                  <div className={cn('wrapper-info-block')}>
                    <div className={cn('wrapper-icon')}>
                      <Phone className={cn('phone-icon')}/>
                    </div>
                    <div className={cn('info-block')}>
                      <label className={cn('label')}>Телефон</label>
                      {get(resume, 'preferred_contact.value') && resume.preferred_contact.contact_type === 'phone' ?
                      <a className={cn('info-block-link')} href={`tel:${resume.preferred_contact.value}`}>
                        {resume.preferred_contact.value}
                        <Flag className={cn('flag-icon')}/>
                      </a>
                        :
                      <a className={cn('info-block-link')} href={`tel:${phones[0].value}`}>
                        {phones[0].value}
                      </a>
                      }
                    </div>
                  </div>
                )}
                {emails.length > 0 && (
                  <div className={cn('wrapper-info-block')}>
                    <div className={cn('wrapper-icon')}>
                      <Post className={cn('email-icon')} />
                    </div>
                    <div className={cn('info-block')}>
                      <label className={cn('label')}>email</label>
                      <a className={cn('info-block-link')} href={`mailto:${emails[0].value}`}>
                        {emails[0].value}
                        {emails[0].preferred && <Flag className={cn('flag-icon')} />}
                      </a>
                    </div>
                  </div>
                )}
              </address>
              <div className={cn('where')}>
                <div className={cn('wrapper-info-block')}>
                  <div className={cn('wrapper-icon')}>
                    <Planet className={cn('world-icon')} />
                  </div>
                  <div className={cn('info-block')}>
                    <label className={cn('label')}>Источник</label>
                    {get(candidate, 'resume.resume_source.name', 'Нет источника')}
                  </div>
                </div>
                <div className={cn('wrapper-info-block')}>
                  <div className={cn('wrapper-icon')}>
                    <Recomendation className={cn('recomendation-icon')} />
                  </div>
                  <div className={cn('info-block')}>
                    <label className={cn('label')}>Рекомендации</label>
                    {get(candidate, 'resume.resume_recommendations.length', false) ?
                    this.recommendationsCountFormat(candidate.resume.resume_recommendations.length)
                    : 'Без рекомендации'}
                  </div>
                </div>
              </div>
              {/* <div className={cn('account-icons')}>
                <ul className={cn('account-icons-list').mix('lsn pl0')}>
                  {resume.additional_contacts.map(item => (
                    <li className={cn('account-icons-list-item')} key={item.id}>
                      <a target={'blank'} href={`${item.link}`}>
                        <EarthIcon className={cn('account-icons-list-icon')} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* <Aggregator /> */}
            </div>
          </Col>
          </Row>
      </Wrapper>
    )
  }
}

export default withCookies(connector(Head))
