import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Breadcrumb } from 'react-bootstrap'
import EmployeeCardTab from './EmployeeCardTab'
import ScaleProfile from './Scale/ScaleProfile'

import { Phone, Post, Pin, Pencil, Monet, Birthday, Arrow } from 'components-folder/Icon'
import ProfilePhoto from '../EmployeeEdit/ProfilePhoto'
import { reverse, take, isEmpty, get } from 'lodash'

const cn = require('bem-cn')('employee-card')

if (process.env.BROWSER) {
  require('./employee-card.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    user: state.user,
    current: state.employees.current,
    employees: state.employees.data,
    role: state.role,
    enabledComponents: state.system.enabledComponents,
  })
)

class EmployeeCard extends Component {
  state ={
    open_skills: false,
  }
  departmentsChainUni(position, chain) {
    const arr = []
      if (position){
      arr.push(
        <Breadcrumb.Item href="#" key="position">
          {position}
        </Breadcrumb.Item>
      )
    }
    take(reverse(chain), 2).map( it => {
      if (!isEmpty(arr)){
        arr.push(<span key={`span_${it.id}`}>&nbsp;/&nbsp;</span>)
      }
      arr.push(
        <Breadcrumb.Item href="#" key={`elem_${it.id}`}>
          {it.name_ru}
        </Breadcrumb.Item>
      )
    })
    return arr
  }
  departmentsChain(chain) {
    const arr = []
    const unit = chain.filter(el => !el.parent_id)[0]

    if (unit) {
      arr.push(
        <Breadcrumb.Item href="#" key={`elem_${unit.id}`}>
          {unit.name_ru}
        </Breadcrumb.Item>
      )
    }

    function filterChain(el, ar) {
      const i = ar.filter(elem => elem.parent_id === el.id)[0]
      if (i) {
        arr.push(<span key={`span_${i.id}`}>&nbsp;/&nbsp;</span>)
        arr.push(
          <Breadcrumb.Item href="#" key={`elem_${i.id}`}>
            {i.name_ru}
          </Breadcrumb.Item>
        )
        filterChain(i, ar)
      }
    }

    if (unit) filterChain(unit, chain)

    return arr
  }

  render() {
    const { current, user, dispatch, enabledComponents } = this.props

    const _preferable_email = current.account_emails.find(it => it.preferable)
    const preferable_email = _preferable_email ? _preferable_email.email : (current.account_emails.length > 0 ? current.account_emails[0].email : '')

    const _preferable_phone = current.account_phones.find(it => it.preferable)
    const preferable_phone = _preferable_phone ? _preferable_phone.number : (current.account_phones.length > 0 ? current.account_phones[0].number : '')

    return (
      <div className={cn}>
        <Row>
          <Col lg={2} lgOffset={1} md={2} mdOffset={1} sm={3} xs={3}>
            <ProfilePhoto dispatch={dispatch} />
            {
              enabledComponents.shr_game &&
              (
                <div className={cn('info-block').mix('p1 p1_theme_light_first')}>
                  {current.balance}
                  <Monet className={cn('icon-monet')} />
                </div>
              )
            }
          </Col>
          <Col xs={9}>
            <hgroup className={cn('head')}>
              <h1>{`${current.surname} ${current.name} ${current.middlename}`}</h1>

              <div className={cn('wrapper-elemets-control')}>
                {/*<Link to={'/chats'}>*/}
                  {/*<AddChat className={cn('chat-icon')} />*/}
                {/*</Link>*/}
                {current.id === user.id && (
                  <Link to={`/employees/${current.id}/edit`}>
                    <Pencil outline className={cn('pencil-icon')} />
                  </Link>
                )}
                {/* <Arrow className={cn('arrow-icon')} /> */}
              </div>
            </hgroup>

            {enabledComponents.shr_org(
              <p className={cn('post').mix('p1 p1_theme_light_first')}>
                { !isEmpty(current.all_legal_unit_employees) && get(current, 'all_legal_unit_employees[0].position.position.name_ru') }
              </p>
            )}
            {enabledComponents.shr_org && (
              <Breadcrumb>
                {

                  !isEmpty(current.departments_chain) ?
                    (
                      this.departmentsChain(current.departments_chain)
                    ) :
                    <Breadcrumb.Item href="#">
                      {
                        get(current, 'all_legal_unit_employees[0].position.department.name_ru')
                      }
                    </Breadcrumb.Item>

                }
              </Breadcrumb>
            )}


            {/* <div className={cn('wrapper-mark')} style={{ display: 'block' }}>
              <mark>в отпуске</mark>
              <span className={cn('date-number')}>с 25 авг по 12 сен</span>
            </div> */}

            <Row>
              <address className={cn('address').mix('col-xs-8')}>
                <Row>
                  <div className={cn('info-block').mix('col-xs-6')}>
                    <div className={cn('wrapper-icon')}>
                      <Birthday className={cn('icon-cake')} />
                    </div>
                    <div>
                      <label className={cn('label').mix('p3 p3_theme_light')}>Дата рождения</label>
                      <time className={('p1 p1_theme_light_first')} dateTime="2017-08-21">
                        {current.birthday && moment(current.birthday).format('DD.MM')}
                      </time>
                    </div>
                  </div>
                  <div className={cn('info-block').mix('col-xs-6')}>
                    <div className={cn('wrapper-icon')}>
                      <Phone className={cn('icon-phone')} />
                    </div>
                    <div>
                      <label className={cn('label').mix('p3 p3_theme_light')}>телефон</label>
                      <a className={('p1 link_theme_light_first link_pseudo')}
                        href={`tel:${preferable_phone}`}
                      >
                        { preferable_phone }
                      </a>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className={cn('info-block').mix('col-xs-6')}>
                    <div className={cn('wrapper-icon')}>
                      <Pin className={cn('icon-map')} />
                    </div>
                    <div>
                      <label className={cn('label').mix('p3 p3_theme_light')}>Местоположение</label>
                      <p className={cn('city-text').mix('p1 p1_theme_light_first')}>{current.city}</p>
                    </div>
                  </div>
                  <div className={cn('info-block').mix('col-xs-6')}>
                    <div className={cn('wrapper-icon')}>
                      <Post className={cn('icon-email')} />
                    </div>
                    <div>
                      <label className={cn('label').mix('p3 p3_theme_light')}>Email</label>
                      <a className={('p1 link_theme_light_first link_pseudo')}
                        href={`mailto:${preferable_email}`}
                      >
                        {preferable_email}
                      </a>
                    </div>
                  </div>
                </Row>
              </address>

              { current.account_skills.length > 0 && enabledComponents.shr_skills ? (
                <div className={cn('select-mark').mix('col-xs-4')} style={{ display: 'block' }}>
                  <label className={cn('label').mix('p3 p3_theme_light')}>Навыки</label>
                  <div className={cn('select-mark_tag')}>
                    {current.account_skills.slice(0,11).map((item, index) => (
                      <a
                        key={`${index}:${item.skill.name}`}
                        className={cn('tag').mix('p1_theme_light_first')}
                        style={{cursor: 'not-allowed'}}
                        href="javascript://"
                      >
                        {item.skill.name} ∙ {item.skill_confirmations_count}
                      </a>
                    ))}
                    { current.account_skills.length > 11 && (
                      <a className={cn('read-more')} href="javascript://" style={{
                        display: this.state.open_skills ? 'none' : 'inline-block',
                      }} onClick={() => this.setState({open_skills: true})}>
                        <span className={cn('circle')} />
                        <span className={cn('circle')} />
                        <span className={cn('circle')} />
                      </a>
                    )}

                    { this.state.open_skills && (
                      current.account_skills.slice(12,100).map((item, index) => (
                        <a
                          key={`${index}:${item.skill.name}`}
                          className={cn('tag')}
                          style={{cursor: 'not-allowed'}}
                          href="javascript://"
                        >
                            {item.skill.name} ∙ {item.skill_confirmations_count}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              ) : ('') }
            </Row>
          </Col>
        </Row>

        {(current.id === user.id &&
        enabledComponents.shr_skills &&
        enabledComponents.shr_resume &&
        enabledComponents.shr_projects) && (
          <Row>
            <Col xs={11} xsOffset={1}>
              <ScaleProfile {...this.props}/>
            </Col>
          </Row>
        )}

        <EmployeeCardTab {...this.props}/>
      </div>
    )
  }
}

export default connector(EmployeeCard)
