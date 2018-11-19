import React, { Component } from 'react'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import PersonnelMovementCollapse from './PersonnelMovementCollapse'
import PersonalFotCollapse from './PersonalFotCollapse'
import PersonalRequisitesCollapse from './PersonalRequisitesCollapse'
import StatusesCollapse from './StatusesCollapse'

const cn = require('bem-cn')('employee-card-tab-personnel-information')

if (process.env.BROWSER) {
  require('./employee-card-tab-personnel-information.css')
}
moment.locale('ru')

export default class EmployeeCardTabPersonalInner extends Component {
  state = {
    currentTab: 0,
  }

  formatSalary(salary = 0) {
    return salary.toFixed().replace(/(\d)(?=(\d{3})+(␣|$))/g, '$1 ')
  }

  render() {
    const { currentTab } = this.state
    const { data } = this.props
    const current_legal_unit = data.all_legal_unit_employees[currentTab]

    if (!current_legal_unit) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <div className={cn('place-of-work-block')}>
            <ul className={'filtering indent-reset'}>
              {data.all_legal_unit_employees.map((name, i) => (
                <li
                  key={i}
                  className={cn('').mix('filtering__btn').state({ current: currentTab === i })}
                  onClick={() => this.setState({ currentTab: i })}
                >
                  {name.legal_unit.name}
                </li>
              ))}
            </ul>
        </div>
        <div>
          <Row>
            <Col xs={6}>
              {current_legal_unit.legal_unit && current_legal_unit.legal_unit.full_name  && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Полное Название юридического лица</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current_legal_unit.legal_unit.full_name}</p>
              </div>}
              {current_legal_unit.state && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Статус в юридическом лице</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current_legal_unit.state.state}</p>
              </div>}
              {current_legal_unit.position && current_legal_unit.position.department && current_legal_unit.position.department.name_ru &&<div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Практика</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current_legal_unit.position.department.name_ru}</p>
              </div>}
              {current_legal_unit.position && current_legal_unit.position.position && current_legal_unit.position.position.name_ru && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Должность</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current_legal_unit.position.position.name_ru}</p>
              </div>}
              {current_legal_unit.wage && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Заработная плата</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{this.formatSalary(current_legal_unit.wage)} руб.</p>
              </div>}

              {/* <div className={cn('info-block')}>
                <label>Город работы (фактический):</label>
                <p className={cn('info-text')}>{current.city}</p>
              </div>
              <div className={cn('info-block')}>
                <label>Блок:</label>
                <p className={cn('info-text')}>
                  {current.departments_chain[0] && current.departments_chain[0].name_ru}
                </p>
              </div>
              <div className={cn('info-block')}>
                <label>Практика:</label>
                <p className={cn('info-text')}>
                  {current.departments_chain[1] && current.departments_chain[1].name_ru}
                </p>
              </div>
              {data.position &&
                data.position.department &&
                data.position.department.name_ru && (
                  <div className={cn('info-block')}>
                    <label>Подразделение:</label>
                    <p className={cn('info-text')}>{data.position.department.name_ru}</p>
                  </div>
                )}
              <div className={cn('info-block')}>
                <label>Должность:</label>
                <p className={cn('info-text')}>
                  {data.position && data.position.position && data.position.position.name_ru}
                </p>
              </div> */}
            </Col>

            <Col xs={6}>
              {/* <div className={cn('info-block')}>
                <label>Руководитель:</label>
                <p className={cn('info-text')}>
                  {data.position && data.position.position && data.position.position.name_ru}
                </p>
              </div> */}
              {current_legal_unit.hired_at && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Дата приема на работу</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>
                  {moment(current_legal_unit.hired_at).format('DD.MM.YYYY')}
                </p>
              </div>}
              {current_legal_unit.contract_type && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Тип договора</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>{current_legal_unit.contract_type.name}</p>
              </div>}
              {current_legal_unit.contract_end_at && <div className={cn('info-block')}>
                <label className={('p3 p3_theme_light fw_300')}>Дата окончания трудового договора</label>
                <p className={cn('info-text').mix('p1 p1_theme_light_first')}>
                  {moment(current_legal_unit.contract_end_at).format('DD.MM.YYYY')}
                </p>
              </div>}
            </Col>
          </Row>
        </div>

        {/* {data && <PersonalFotCollapse data={data} />} */}
        {/* {data && (
          <Row>
            <Col xs={6}>
              <div className={cn('info-block')}>
                <label>Дата приема:</label>
                <p className={cn('info-text')}>
                  {moment(data.starts_work_at).format('DD MMM YYYY')}
                </p>
              </div>
            </Col>
          </Row>
        )} */}
        {/* {data && <PersonalRequisitesCollapse data={data} />} */}
        {current_legal_unit && <PersonnelMovementCollapse data={current_legal_unit} />}
        {current_legal_unit && <StatusesCollapse data={current_legal_unit} />}
      </div>
    )
  }
}
