import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Close,
  Phone,
  Skype,
  Post,
  Pin,
  Flag,
} from 'components-folder/Icon/'
import orderBy from 'lodash/orderBy'
import DescriptionCollapse from './DescriptionCollapse'
import CommentsCollapse from './CommentsCollapse'
import Settings from './Settings'
import { renderMessengerIcon, renderSocialIcon, parseSocialName } from '../../Employee/EmployeeCardTabBasicInformation'

const cn = require('bem-cn')('customers')

class ContactCard extends Component {

  render() {
    const { contact, customerId, closeSidebar, dispatch } = this.props

    return (
      <div className={cn('customer-card-wrapper')}>
        <div className={cn('customer-card-func-elements')}>
          <Settings {...this.props} />
          <span
            onClick={closeSidebar}
            className={cn('customer-card-closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку заказчика'}
          >
            <Close className={cn('customer-card-closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('b-wrapper').mix('global-scroll global-scroll_theme_light')}>
          <div className={cn('customer-card-header')}>
            <h2>{contact.name}</h2>
            <p className={'p1 p1_theme_light_first indent_reset'}>{contact.position}</p>
            <div className={cn('customer-card-header-communication-method-wrapper')}>
              <div className={cn('customer-card-header-inner')}>

                { contact.city && (
                  <div className={cn('customer-card-header-item')}>
                    <Pin className={cn('pin-icon')} />
                    <p className={'p1 p1_theme_light_first indent_reset'}>{contact.city}</p>
                  </div>
                )}

                { contact.contact_phones.length > 0 && (
                  <div className={cn('customer-card-header-item')}>
                    <Phone className={cn('phone-icon')} />
                    <div>
                      {contact.contact_phones.map(phone => (
                        <Link
                          to={`tel:${phone.number}`}
                          className={cn('customer-card-header-item-link').mix('link link_theme_light_first')}
                          key={phone.id}
                        >
                          {phone.number}
                          { phone.preferable && <Flag className={cn('flag-icon')} /> }
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                { contact.contact_emails.length > 0 && (
                  <div className={cn('customer-card-header-item')}>
                    <Post className={cn('post-icon')} />
                    <div>
                      {contact.contact_emails.map(email => (
                        <Link
                          to={`mailto:${email.email}`}
                          className={cn('customer-card-header-item-link').mix('link link_theme_light_first')}
                          key={email.id}
                        >
                          {email.email}
                          { email.preferable && <Flag className={cn('flag-icon')} /> }
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className={cn('customer-card-header-inner')}>
                { contact.skype && (
                  <div className={cn('customer-card-header-item')}>
                    <Skype className={cn('skype-icon')} />
                    <Link
                      to={`tel:${contact.skype}`}
                      className={cn('customer-card-header-item-link').mix('link link_theme_light_first')}
                    >
                      {contact.skype}
                    </Link>
                  </div>
                )}

                {contact.contact_messengers.map((messenger, index) => (
                  messenger.phones.map((phone, index) => (
                    <div className={cn('customer-card-header-item')} key={`${messenger.id}_${index}`}>
                      {/*<MessengerIcon name={messenger.name} />*/}
                      { renderMessengerIcon(messenger.name) }
                      <span className={cn('customer-card-header-item-link').mix('link link_theme_light_first')}>
                        {phone}
                      </span>
                    </div>
                  ))
                ))}

                {contact.social_urls.length > 0 && (
                  <div className={cn('customer-card-header-item')}>
                    <div>
                      {contact.social_urls.map((url, index) => (
                        <Link to={`${url}`} className={cn('customer-card-header-item-link').mix('link link_theme_light_first')} key={index}>
                          {url}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/*{ (contact.social_urls.length > 0) && contact.social_urls.map((url, index) => (*/}
                  {/*<div className={cn('description')} key={index}>*/}
                    {/*{renderSocialIcon(url)}*/}
                    {/*<div className={cn('info-block')}>*/}
                      {/*<label>{parseSocialName(url)}</label>*/}
                      {/*<a*/}
                        {/*className={cn('info-text-a', 'link')}*/}
                        {/*href={url.includes('http') ? url : 'http://' + url}*/}
                        {/*target="_blank"*/}
                      {/*>*/}
                        {/*{ url }*/}
                      {/*</a>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*))}*/}

              </div>
            </div>
          </div>

          <div className={cn('customer-card-customers')}>
            <DescriptionCollapse text={contact.description} />
            <CommentsCollapse
              comments={orderBy(contact.comments, 'created_at', 'desc')}
              customerId={customerId}
              contactId={contact.id}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ContactCard
