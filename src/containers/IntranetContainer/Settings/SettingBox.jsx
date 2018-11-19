import React, { Component } from 'react'
import moment from 'moment/moment'


const cn = require('bem-cn')('settings')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class SettingBox extends Component {

  render() {
    return(
      <div>
        <div className={cn('box')}>
          <div className={cn('name')}>
          <p className={'no-margin'}>Пароль</p>
          </div>
            <div className={cn('value')}>
              <a className={'btn btn-primary btn_padding-8-20'} onClick={this.props.toggleClick}>Изменить</a>
              </div>
        </div>
        <div className={cn('box')}>
          <div className={cn('name')}>
            <p className={'no-margin'}>Настройка</p>
          </div>
          <div className={cn('value')}>
            <p className={'no-margin'}>Значение</p>
          </div>
        </div>
      </div>
    )
  }
}

