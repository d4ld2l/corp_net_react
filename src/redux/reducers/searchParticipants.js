import { evolve, append, insertAll, filter, compose, uniqBy } from 'ramda'
import { SearchParticipants } from '../../presenters'

import type { Action } from '../../types/actions'
import type { SearchParticipantsState as State } from '../../types/states'

const initialState = SearchParticipants({
  all: false,
  participants: [],
})

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SEARCH_PARTICIPANTS_TOOGLE_ALL':
      return SearchParticipants({ ...state, all: !state.all })
    case 'SEARCH_PARTICIPANTS_ADD':
      return SearchParticipants(
        evolve({
          participants: compose(uniqBy(it => it.key()), append(action.payload)),
        })(state)
      )
    case 'SEARCH_PARTICIPANTS_REMOVE':
      return SearchParticipants(
        evolve({
          participants: filter(it => it.key() !== action.payload.key()),
        })(state)
      )
    case 'SEARCH_PARTICIPANTS_EXTRACT': {
      const index = state.participants.findIndex(it => it.key() === action.payload.key())
      if (index === -1) return state

      const users = action.payload.users()
      const existKeys = state.participants.map(it => it.key())

      return SearchParticipants(
        evolve({
          participants: compose(
            insertAll(index, users.filter(it => existKeys.indexOf(it.key()) === -1)),
            filter(it => it.key() !== action.payload.key())
          ),
        })(state)
      )
    }
    case 'SEARCH_PARTICIPANTS_RELEASE':
      return initialState
    default:
      return SearchParticipants(state)
  }
}
