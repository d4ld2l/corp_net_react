import api from '../../api'
import { toastr } from 'react-redux-toastr'
import type { Dispatch, ThunkAction, State } from '../../types/actions'

export const getCustomerContacts = (customerId, { loadMore } = {}): ThunkAction => async (dispatch: Dispatch, getState: State) => {
  dispatch({ type: 'GET_CUSTOMER_CONTACTS_REQ', loadMore })

  const currentPage = getState().customerContacts.page
  const { perPage } = getState().customerContacts
  const size = getState().customerContacts.data.length

  try {
    // if last page has less items than perPage -> request it again
    const page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
    let payload

    if (customerId) {
      const req = await api.customerContacts.all(customerId, page, perPage)
      payload = {customerId, data: req.data.customer_contacts, page, loadMore}
    } else {
      payload = { data: [] }
    }

    dispatch({ type: 'GET_CUSTOMER_CONTACTS_RES', payload })
  } catch (error) {
    dispatch({ type: 'GET_CUSTOMER_CONTACTS_FAIL', payload: error.message })
  }
}

export const getCustomerContact = (customerId, id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CUSTOMER_CONTACT_REQ' })

  try {
    const req = await api.customerContacts.get(customerId, id)
    const payload = { customerId, id, contact: req.data }
    dispatch({ type: 'GET_CUSTOMER_CONTACT_RES', payload: payload })
  } catch (error) {
    dispatch({ type: 'GET_CUSTOMER_CONTACT_FAIL', payload: error.message })
  }
}

function contactParams(values) {
  // const preferableEmailIndex = values.preferable_email && values.preferable_email.match(/\d+/)
  // const preferablePhoneIndex = values.preferable_phone && values.preferable_phone.match(/\d+/)

  return {
    name: values.name,
    city: values.city,
    position: values.position,
    description: values.description,
    skype: values.skype,

    contact_phones_attributes: values.phones.map((phone, index) => ({
      id: phone.id,
      number: phone.number,
      preferable: values.preferable_phone === `phones[${index}]`,
      _destroy: phone.destroy || !phone.number
    })),

    contact_emails_attributes: values.emails.map((email, index) => ({
      id: email.id,
      email: email.email,
      preferable: values.preferable_email === `emails[${index}]`,
      _destroy: email.destroy || !email.email
    })),

    contact_messengers_attributes: values.messengers.map(m => ({
      id: m.id,
      name: m.name && m.name.value,
      phones: [m.phone],
      _destroy: m.destroy || !m.phone
    })),

    social_urls: values.social_urls.map(u => u.link)
  }
}

export const createCustomerContact = (customerId): ThunkAction => async (dispatch: Dispatch, getState: State) => {
  dispatch({ type: 'CREATE_CUSTOMER_CONTACT_REQ' })

  const values = getState().form.contact.values
  const params = contactParams(values)

  try {
    const req = await api.customerContacts.create(customerId, params)
    const payload = { customerId, contact: req.data.customer_contact }
    dispatch({ type: 'CREATE_CUSTOMER_CONTACT_RES', payload: payload })
    toastr.success('Контакт создан')
  } catch (error) {
    dispatch({ type: 'CREATE_CUSTOMER_CONTACT_FAIL', payload: error.message })
    toastr.error('Не удалось создать контакт')
  }
}

export const updateCustomerContact = (customerId, id): ThunkAction => async (dispatch: Dispatch, getState: State) => {
  dispatch({ type: 'UPDATE_CUSTOMER_CONTACT_REQ' })

  const values = getState().form.contact.values
  const params = contactParams(values)

  try {
    const req = await api.customerContacts.update(customerId, id, params)
    const payload = { customerId, id, contact: req.data.customer_contact }
    dispatch({ type: 'UPDATE_CUSTOMER_CONTACT_RES', payload: payload })
    toastr.success('Контакт обновлен')
  } catch (error) {
    dispatch({ type: 'UPDATE_CUSTOMER_CONTACT_FAIL', payload: error.message })
    toastr.error('Не удалось обновить контакт')
  }
}

export const addCommentCustomerContact = (customerId, id, body): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'ADD_COMMENT_CUSTOMER_CONTACT_REQ' })

  try {
    const req = await api.customerContacts.addComment(customerId, id, { body })
    const payload = { customerId, id, comment: req.data.comment }
    dispatch({ type: 'ADD_COMMENT_CUSTOMER_CONTACT_RES', payload: payload })
    toastr.success('Комментарий добавлен')
  } catch (error) {
    dispatch({ type: 'ADD_COMMENT_CUSTOMER_CONTACT_FAIL', payload: error.message })
    toastr.error('Произошла ошибка при добавлении комментария')
  }
}

export const searchCustomerContacts = (customerId, query, { loadMore } = {}): ThunkAction => async (dispatch: Dispatch, getState: State) => {
  dispatch({ type: 'SEARCH_CUSTOMER_CONTACTS_REQ', loadMore })

  const currentPage = getState().customerContacts.page
  const { perPage } = getState().customerContacts
  const size = getState().customerContacts.data.length

  query = query || getState().customerContacts.search.query

  try {
    // if last page has less items than perPage -> request it again
    const page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
    let payload

    if (customerId) {
      const req = await api.customerContacts.search(customerId, query, page, perPage)
      payload = {data: req.data.customer_contacts, query, page, loadMore}
    } else {
      payload = { data: [] }
    }
    dispatch({ type: 'SEARCH_CUSTOMER_CONTACTS_RES', payload })
  } catch (error) {
    dispatch({ type: 'SEARCH_CUSTOMER_CONTACTS_FAIL', payload: error.message })
  }
}
