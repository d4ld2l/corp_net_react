import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { SECOND_TABS } from './data'

import { Settings, Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('candidate-letters-tabs')
if (process.env.BROWSER) {
  require('./candidate-letters-tabs.css')
}

const DATA = [
  {
    date: '25.05',
    subject_line: 'Тестовое задание',
    post: 'Специалист отдела кадров',
    sender: 'Вася Иванов',
  },
  {
    date: '25.05',
    subject_line: 'Тестовое задание',
    post: 'Специалист отдела кадров',
    sender: 'Вася Иванов',
  },
  {
    date: '25.05',
    subject_line: 'Тестовое задание',
    post: 'Специалист отдела кадров',
    sender: 'Вася Иванов',
  },
]

export default class LettersTab extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-9 pull-left">
              <h3>Письма</h3>
            </div>
            <div className="col-xs-3">
              <a className="btn btn-primary" href="#">
                Новое
              </a>
              <div className={cn('settings').mix('pull-right')}>
                <Settings />
                <Arrow />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <table className={cn('table')}>
            <tbody>
              <tr>
                <td>Дата</td>
                <td>Тема письма</td>
                <td>Отправитель</td>
              </tr>
              {DATA.map((e, i) => (
                <tr key={i}>
                  <td>
                    <p className={cn('text')}>{e.date}</p>
                  </td>
                  <td>
                    <div>
                      <a className={cn('link')} href="#">
                        {e.subject_line}
                      </a>
                    </div>
                    <div>
                      <a className={cn('sublink')} href="#">
                        {e.post}
                      </a>
                    </div>
                  </td>
                  <td>
                    <p className={cn('text')}>{e.sender}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
            laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
            sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
            mollis orci, sed rhoncus sapien nunc eget.
          </p>
        </div>
      </div>
    )
  }
}
