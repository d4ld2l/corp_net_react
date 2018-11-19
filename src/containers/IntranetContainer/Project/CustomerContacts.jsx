import React, { Component } from 'react'
import Loader from 'components-folder/Loader'
import Buttons from './contacts/Buttons'
import ContactItem from './contacts/ContactItem'
import ContactItemNew from './contacts/ContactItemNew'
import ContactCard from './contacts/ContactCard'
import ContactForm from './contacts/ContactForm'
import Search from './contacts/Search'
import { connect } from 'react-redux'
import {
  createCustomerContact,
  getCustomerContacts,
  updateCustomerContact,
  searchCustomerContacts
} from '../../../redux/actions/customerContactsActions'
import get from 'lodash/get'
import compose from "ramda/src/compose"
import { reduxForm } from "redux-form"
import flatten from "lodash/flatten"

const cn = require('bem-cn')('customers')
if (process.env.BROWSER) {
  require('./style.css')
}


const connector = compose(
  connect(state => ({
    customerId: get(state.projectsData.current.customers, '0.id'),
    contacts: state.customerContacts,
  })),
  reduxForm({
    form: 'contact',
    onSubmitFail: (errors, dispatch, submitError) => {
      const key = Object.keys(errors)[0]
      const $field = document.querySelector(`[name="${key}"]`)
      $field && $field.focus()
    }
  })
)


class CustomerContacts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: null, // null, 'card', 'new', 'edit'
      current: null,
      isSearch: false
    }
  }

  componentDidMount() {
    const { dispatch, customerId } = this.props
    dispatch(getCustomerContacts(customerId))
  }

  handleScroll = (event) => {
    const { dispatch, customerId, contacts: { scroll }, loaders } = this.props
    const { isSearch } = this.state

    const el = event.target
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight

    if (bottom && scroll && !loaders.customerContacts && !loaders.customerContactsMore) {
      if (isSearch) {
        dispatch(searchCustomerContacts(customerId, null, { loadMore: true }))
      } else {
        dispatch(getCustomerContacts(customerId, { loadMore: true }))
      }
    }
  }

  initializeForm(contact) {
    const { initialize } = this.props
    const {
      name,
      position,
      description,
      city,
      contact_phones,
      contact_emails,
      contact_messengers,
      skype,
      social_urls
    } = contact

    const phones = (contact_phones && contact_phones.length) ? contact_phones : [{}]
    const emails = (contact_emails && contact_emails.length) ? contact_emails : [{}]
    const messengers = contact_messengers && contact_messengers.length &&
      flatten(contact_messengers.map(m =>
        m.phones.map(phone => ({ phone, name: m.name, id: m.id }))
      )) || [{}]

    const urls = social_urls && social_urls.map(url => ({ link: url })) || [{}]

    const preferablePhoneIndex = phones.findIndex(e => e.preferable)
    const preferableEmailIndex = emails.findIndex(e => e.preferable)

    initialize({
      name,
      position,
      city,
      description,
      phones: phones,
      emails: emails,
      messengers: messengers,
      preferable_phone: preferablePhoneIndex > -1 ? `phones[${preferablePhoneIndex}]` : undefined,
      preferable_email: preferableEmailIndex > -1 ? `emails[${preferableEmailIndex}]` : undefined,
      skype,
      social_urls: urls
    })
  }

  handleShow = ({ current, show }) => {
    if (current) {
      this.initializeForm(current)
    }

    this.setState({
      current,
      show
    })
  }

  closeSidebar = () => {
    this.setState({ show: null, current: null })
  }

  onSubmit = async () => {
    const { dispatch, customerId } = this.props
    const contact = this.state.current
    await dispatch(contact.id ? updateCustomerContact(customerId, contact.id) : createCustomerContact(customerId))
    this.closeSidebar()
  }


  render() {
    const {
      show,
      current
    } = this.state

    const { customerId, dispatch, handleSubmit, loaders } = this.props
    const { isSearch } = this.state
    const contacts = isSearch ? this.props.contacts.search.data : this.props.contacts.data

    return (
      <div>
        <Search
          showResults={(value) => {
            this.setState({ isSearch: value })
            this.closeSidebar()
          }}
          dispatch={dispatch}
          customerId={customerId}
          isSearch={isSearch}
          results={contacts}
        />
        <div className={cn('wrapper')}>
          <div
            className={cn('customers-wrapper')}
            style={{
              width: show ? '470px' : '100%',
            }}
          >
            <Buttons
              handleShow={this.handleShow}
              customerId={customerId}
              total={contacts.length}
              show={show}
            />

            <div className={cn('customer_block')} onScroll={this.handleScroll}>
              {show === 'new' && <ContactItemNew />}

              { loaders.customerContacts ?  <Loader/> : (
                <div>
                  {contacts.map(contact => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      current={current}
                      onClick={this.handleShow}
                      show={show}
                      customerId={customerId}
                    />
                  ))}
                  { loaders.customerContactsMore && <Loader/> }
                </div>
              )}
            </div>

          </div>
          {show === 'card' && (
            <ContactCard
              closeSidebar={this.closeSidebar}
              customerId={customerId}
              contact={current}
              onClick={this.handleShow}
              dispatch={dispatch}
            />
          )}
          {(show === 'new' || show === 'edit') && (
            <ContactForm
              closeSidebar={this.closeSidebar}
              show={show}
              onSubmit={handleSubmit(this.onSubmit)}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    )
  }
}

export default connector(CustomerContacts)
