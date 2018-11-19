import React, { Component } from 'react'
import moment from 'moment'
import get from 'lodash/get'
import remove from 'lodash/remove'

const cn = require('bem-cn')('personal-roaster-employees-tabs')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/tabs/tabs.css')
}
moment.locale('ru')

export default class Tabs extends Component {
  state = {
    currentTab: 0,
  }

  render() {
    const { currentTab } = this.state
    const { legal_units } = this.props

    const current_legal_unit = legal_units[currentTab]

    if (!current_legal_unit) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <div className={cn('container')}>
          <ul className={cn('list')}>
            {legal_units.map(({legal_unit_name}) => legal_unit_name).map((name, i) => (
              <li
                key={i}
                className={cn('list-item').state({ current: currentTab === i })}
                onClick={() => this.setState({ currentTab: i })}
              >
                <a className={cn('list-text').mix('link link_theme_light_first link_pseudo')}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('data')}>
          <div className={cn('data-box')}>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>табельный номер</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.employee_number}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Блок / Практика</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.departments_chain.map(({name_ru}) => name_ru).join('/ ')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Должность</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{get(current_legal_unit, 'position_name', '')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Офис</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{get(current_legal_unit, 'office_name', '')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Ставка</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.wage_rate}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Тип договора</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{get(current_legal_unit, 'contract_type_name', '')}</p>
            </div>
          </div>
          <div className={cn('data-box')}>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>заработная плата</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.wage ? current_legal_unit.wage+' руб' : ''}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Дата начала трудового договора</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.hired_at && moment(current_legal_unit.hired_at).format('DD.MM.YYYY')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Дата окончания трудового договора</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.contract_end_at && moment(current_legal_unit.contract_end_at).format('DD.MM.YYYY')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Состояние</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{get(current_legal_unit, 'state_name', '')}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Вид занятости</span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.default ? 'Основное место работы' : 'Внешнее совместительство'}</p>
            </div>
            <div className={cn('item')}>
              <span className={('p3 p3_theme_light')}>Подразделение </span>
              <p className={('p1 p1_theme_light_first indent-reset')}>{current_legal_unit.structure_unit}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
