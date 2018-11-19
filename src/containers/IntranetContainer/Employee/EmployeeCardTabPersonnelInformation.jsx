import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get, isEmpty } from 'lodash'
import { Collapse } from 'react-bootstrap'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import PersonnelMovementCollapse from './PersonnelMovementCollapse'
import StatusesCollapse from './StatusesCollapse'
import EmployeeCardTabPersonalInner from './EmployeeCardTabPersonalInner'

const cn = require('bem-cn')('employee-card-tab-personnel-information')

if (process.env.BROWSER) {
  require('./employee-card-tab-personnel-information.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
  }),
  {}
)

class EmployeeCardTabPersonnelInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  departmentsChain(chain) {
    const arr = []
    const unit = chain.filter(el => !el.parent_id)[0]
    if (unit) {
      arr.push(
        <a href="" className={cn('info-text-link').mix('p1 link link_theme_light_first')} key={`elem_${unit.id}`}>
          {unit.name_ru}
        </a>
      )
    }
    function filterChain(el, ar) {
      const i = ar.filter(elem => elem.parent_id === el.id)[0]
      if (i) {
        arr.push(
          <p className={cn('info-text').mix('p1 p1_theme_light_first')} key={`span_${i.id}`}>
            &nbsp;/&nbsp;
          </p>
        )
        arr.push(
          <a href="" className={cn('info-text-link').mix('p1 link link_theme_light_first')} key={`elem_${i.id}`}>
            {i.name_ru}
          </a>
        )
        filterChain(i, ar)
      }
    }
    if (unit) filterChain(unit, chain)
    return arr
  }
  render() {
    const { open } = this.state
    const { current } = this.props
    return (
      <div className={cn}>
        <Row>
          <Col xs={12}>
            <div className={cn('margin-bottom')}>
              <h3 className={cn('label')}>Персональная информация</h3>

              <Row>
                <Col xs={6}>
                  {current.birthday && <div className={cn('info-block')}>
                    <label className={('p3 p3_theme_light fw_300')}>Дата рождения</label>
                    <time>
                      <p className={cn('info-text').mix('p1 p1_theme_light_first')}>
                        {current.birthday && moment(current.birthday).format('DD.MM.YYYY')}
                      </p>
                    </time>
                  </div>}

                  {current.sex && <div className={cn('info-block')}>
                    <label className={('p3 p3_theme_light fw_300')}>Пол</label>
                    <p className={cn('info-text').mix('p1 p1_theme_light_first')}>
                      {current.sex === 'male' ? 'Мужской' : 'Женский'}
                    </p>
                  </div>}
                </Col>

                <Col xs={6}>
                  {current.sex && current.marital_status && <div className={cn('info-block')}>
                    <label className={('p3 p3_theme_light fw_300')}>Семейное положение</label>
                    <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current.sex === 'male' ? (current.marital_status === 'single' ? `Не женат` :
                      current.marital_status ===`married` ? `Женат` :  current.marital_status ===`divorced` ? `Разведен` : `Вдовец`) : (current.marital_status === 'single' ? `не замужем` :
                      current.marital_status ===`married` ? `Замужем` :  current.marital_status ===`divorced` ? `Разведена` : `Вдова`) }</p>
                  </div>}

                  <div className={cn('info-block')}>
                    <label className={('p3 p3_theme_light fw_300')}>Дети</label>
                    <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current.kids}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={12}>
            <div className={cn('margin-bottom')}>
              <h3 className={cn('label')}>Информация по трудоустройству</h3>
              <div>
                <EmployeeCardTabPersonalInner data={current}  />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(EmployeeCardTabPersonnelInformation)
