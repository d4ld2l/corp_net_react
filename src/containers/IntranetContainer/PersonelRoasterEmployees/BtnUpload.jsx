import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('groups')

export default class BtnUpload extends Component {
  render() {
    return (
      <div className={cn('button-box')}>
       <Link className={cn('upload btn btn-primary btn_padding-8-12')} to={`/`}>
         Выгрузить подборку
       </Link>
      </div>
    )
  }
}
