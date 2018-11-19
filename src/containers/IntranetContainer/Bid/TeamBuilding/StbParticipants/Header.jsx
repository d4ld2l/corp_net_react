import React, { Component } from 'react'
import moment from 'moment'
import { cn } from './Container'

if (process.env.BROWSER) {
  require('./style.css')
}

moment.locale('ru')

export default class Container extends Component {
  render() {
    return (
      <ul className={cn('header')}>
        <li className={('p3 p3_theme_light')}>ФИО и должность участника</li>
        <li className={('p3 p3_theme_light')}>Блок и практика</li>
        <li className={('p3 p3_theme_light')}>контакты</li>
        <li className={('p3 p3_theme_light')}>город</li>
      </ul>
    )
  }
}
