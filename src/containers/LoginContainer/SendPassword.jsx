import React, { Component } from 'react'
import moment from 'moment/moment'

import NewPassword from './NewPassword'
import {replace} from "lodash";

const cn = require('bem-cn')('login')
if (process.env.BROWSER) {
  require('../IntranetContainer/Settings/style.css')
}
moment.locale('ru')

export default class SendPassword extends Component {
  state = {
    reset: false,
  }

  clickReset = () => {
    this.setState({
      reset: !this.state.reset
    })
  }

  kitcut(text, limit) {
    let {lastSpace} = this.state
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    lastSpace = text.lastIndexOf(" ");
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace);
    }
    return text + "...";
  }

  render() {
    const { reset } = this.state
    const { email } = this.props
    return(
      <div>
        {!reset && (
          <div>
            <h1 className={'form__header'}>Сбросить пароль</h1>
            <p className={'form-send-txt'}>Мы отправили вам на адрес {this.kitcut(email, 33)}  ссылку для сброса пароля. Срок действия ссылки — 30 минут.</p>
            {/*<button className='btn btn-primary' onClick={this.clickReset}>Войти</button>*/}
          </div>
        )}
        {reset && <NewPassword />}
      </div>
    )
  }
}

