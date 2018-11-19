import React, { Component } from 'react'
import {
  Arrow,
} from 'components-folder/Icon/'

const cn = require('bem-cn')('customers')


class ContactItemNew extends Component {
  render() {
    return (
      <div
        className={cn('customer-item').mix(cn('customer-item_sb').mix(cn('customer-item_active')))}
      >
        <div className={cn('customer-item-name').mix(cn('customer-item-name_hide'))}>
          <p className={cn('customer-item-title')}>Новое контактное лицо</p>
          <p className={cn('customer-item-subtitle').mix(cn('customer-item-subtitle_max-w'))}>
            Должность
          </p>
        </div>
        <div className={cn('customer-item-open-sidebar')}>
          <Arrow
            className={cn('customer-item-arrow-icon').mix(cn('customer-item-arrow-icon_active'))}
          />
        </div>
      </div>
    )
  }
}

export default ContactItemNew
