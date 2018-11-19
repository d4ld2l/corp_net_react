import unionBy from "lodash/unionBy"
import differenceBy from "lodash/differenceBy"

const initialState = {
  data: [],
  page: 1,
  perPage: 15,
  scroll: true,
  search: {
    data: [],
    query: '',
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMER_CONTACTS_RES':
      return {
        ...state,
        data: action.payload.loadMore ? unionBy(state.data, action.payload.data, 'id') : action.payload.data,
        scroll: differenceBy(action.payload.data, state.data, 'id').length > 0,
        page: action.payload.page || 1
      }
    case 'GET_CUSTOMER_CONTACT_RES':
      return {
        ...state,
        data: state.data.map(contact => contact.id === action.payload.id ?
          action.payload.contact :
          contact
        )
      }
    case 'CREATE_CUSTOMER_CONTACT_RES':
      return {
        ...state,
        data: [...state.data, action.payload.contact],
      }
    case 'UPDATE_CUSTOMER_CONTACT_RES':
      return {
        ...state,
        data: state.data.map(contact => contact.id === action.payload.id ?
          action.payload.contact :
          contact
        )
      }
    case 'ADD_COMMENT_CUSTOMER_CONTACT_RES':
      const data = state.data.slice()
      const contact = data.find(c => c.id === action.payload.id)
      contact.comments.push(action.payload.comment)
      return { ...state, data }
    case 'SEARCH_CUSTOMER_CONTACTS_RES':
      return {
        ...state,
        search: {
          data: action.payload.loadMore ? unionBy(state.search.data, action.payload.data, 'id') : action.payload.data,
          query: action.payload.query
        },
        scroll: differenceBy(action.payload.data, state.data, 'id').length > 0,
        page: action.payload.loadMore ? action.payload.page || 1 : 1
      }
    default:
      return state
  }
}
