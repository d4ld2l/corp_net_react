import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Arrow,
  Phone,
  Post,
} from 'components-folder/Icon/'
import Settings from './Settings'

const cn = require('bem-cn')('customers')


class ContactItem extends Component {
  render() {
    const {
      contact,
      current,
      onClick,
      show,
    } = this.props

    const preferablePhone = contact.contact_phones.find(phone => phone.preferable)
    const phone = preferablePhone || contact.contact_phones[0]

    const preferableEmail = contact.contact_emails.find(email => email.preferable)
    const email = preferableEmail || contact.contact_emails[0]

    return (
      <div
        ref={ node => this.item = node }
        className={cn('customer-item').mix(
          cn(show === 'card' && current.id === contact.id && 'customer-item_active')
        )}
        onClick={(e) => {
          if (!this.item.querySelector('.customers__customer-item-setting').contains(e.target)) {
            onClick({current: contact, show: 'card'})
          }
        }}
      >
        <div
          className={cn('customer-item-name').mix(
            cn(show && 'customer-item-name_hide')
          )}
        >
          <p className={'p1 p1_theme_light_first indent_reset'}>{contact.name}</p>
          <p
            className={cn('customer-item-subtitle').mix('p1 p1_theme_light_second indent_reset').mix(
              cn(
                show &&
                'customer-item-subtitle_max-w'
              )
            )}
          >
            {contact.position}
          </p>
        </div>


        <div className={cn('customer-item-communication')}>
          { phone && (
            <div
              className={cn('customer-item-phone').mix(
                cn(
                  show && 'customer-item-phone_hide'
                )
              )}
            >
              <Phone className={cn('phone-icon')} />{' '}
              <Link
                title={'Позвонить'}
                to={`tel:${phone.number}`}
                className={'link link_theme_light_first'}
              >
                {phone.number}
              </Link>
            </div>
          )}

          { email && (
            <div
              className={cn('customer-item-phone').mix(
                cn(
                  show && 'customer-item-phone_hide'
                )
              )}
            >
              <Post className={cn('post-icon')} />{' '}
              <Link
                title={'Написать на почту'}
                to={`mailto:${email.email}`}
                className={'link link_theme_light_first'}
              >
                {email.email}
              </Link>
            </div>
          )}

        </div>

        <div className={cn('customer-item-wrapper-setting')}>
          <span
            className={cn(
              show && 'customer-item-phone_hide'
            )}
          />
          <Settings {...this.props} />
          <div
            className={cn('customer-item-open-sidebar')}
            title={'Раскрыть карточку заказчика'}
          >
            <Arrow
              className={cn('customer-item-arrow-icon').mix(
                cn(show === 'card' && 'customer-item-arrow-icon_active')
              )}
            />
          </div>
        </div>


      </div>
    )
  }
}

export default ContactItem
