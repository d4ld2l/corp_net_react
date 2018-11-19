import React, { Component } from 'react'
import moment from 'moment/moment'
import { v4 } from 'uuid'

import { EMPLOYMENT_TAB } from './data'


const cn = require('bem-cn')('personal-roaster-employees-tabs')
if (process.env.BROWSER) {
  require('./css/tabs/tabs.css')
}
moment.locale('ru')

export default class Tabs extends Component {
  state = {
    currentTab: 'first-legal-person',
    tabs: EMPLOYMENT_TAB,
  }

  render() {
    const { currentTab, tabs } = this.state
    return (
      <div>
        <div className={cn('container')}>
          <ul className={cn('list')}>
            {tabs.map(it => (
              <li
                key={v4()}
                className={cn('list-item').state({ current: currentTab === it.id })}
                onClick={() => this.setState({ currentTab: it.id })}
              >
                <a className={cn('list-text').mix('link link_theme_light link_pseudo')}>
                  {it.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {currentTab === 'first-legal-person' && <FirstLegalPersonData />}
        {currentTab === 'second-legal-person' && <SecondLegalPersonData />}
      </div>
    )
  }
}

class FirstLegalPersonData extends Component {
  render() {
    return (
      <div className={cn('data')}>
        <div className={cn('data-box')}>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>табельный номер</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>00001212120120</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Подразделение</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Блок Инновационных решений BSS/GSS / Практика омниканальных решений</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Должность</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Должность</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Ставка</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>1</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Тип договора</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Тип договора</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>заработная плата</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>100 000 руб</p>
          </div>
        </div>
        <div className={cn('data-box')}>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Дата начала трудового договора</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>19.04.2017</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Состояние</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Работа</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Офис</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Москва</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Вид занятости</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Полная</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Вид занятости</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Основное место работы</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Подразделение </span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Обособленное подразделение в г. Воронеже</p>
          </div>
        </div>
      </div>
    )
  }
}
class SecondLegalPersonData extends Component {
  render() {
    return (
      <div className={cn('data')}>
        <div className={cn('data-box')}>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Подразделение</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Блок Инновационных решений BSS/GSS / Практика омниканальных решений</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Должность</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Должность</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Ставка</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>1</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Тип договора</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Тип договора</p>
          </div>
        </div>
        <div className={cn('data-box')}>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>заработная плата</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>100 000 руб</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Дата начала трудового договора</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>19.04.2017</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Состояние</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Работа</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Офис</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Москва</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Вид занятости</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Полная</p>
          </div>
          <div className={cn('item')}>
            <span className={('p3 p3_theme_light')}>Вид занятости</span>
            <p className={('p1 p1_theme_light_first indent-reset')}>Основное место работы</p>
          </div>
        </div>
      </div>
    )
  }
}

