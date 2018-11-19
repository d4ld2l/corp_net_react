import React, { Component } from 'react'
import Sticky from 'react-stickynode'

const cn = require('bem-cn')('candidate-left-menu')

if (process.env.BROWSER) {
  require('./candidate-left-menu.css')
}

export default class CandidateLeftMenu extends Component {
  render() {
    return (
      <Sticky enabled top={0}>
        <div className={cn}>
          <ul>
            <li>
              <a href="#full_name">Основная информация</a>
            </li>
            <li>
              <a href="#contact_information">Контактная информация</a>
            </li>
            <li>
              <a href="#basic_information">Общая информация</a>
            </li>
            <li>
              <a href="#experience">Опыт работы</a>
            </li>
            <li>
              <a href="#achievements">Достижения</a>
            </li>
            <li>
              <a href="#expectations">Ожидания</a>
            </li>
            <li>
              <a href="#recommendations">Рекомендации</a>
            </li>
          </ul>
        </div>
      </Sticky>
    )
  }
}

// https://stackoverflow.com/a/31987330
