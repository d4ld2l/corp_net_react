import uniqBy from 'lodash/unionBy'
import type { Action } from '../../types/actions'
import type { SearchSkillsState as State } from '../../types/states'

const initialState = {
  skills: [],
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FILL_SKILLS':
      return { ...state,
        skills: action.payload.map(it => ({...it.skill, account_skill_id: it.id})),
      }
    case 'SEARCH_SKILLS_ADD':
      const skill = state.skills.find(it => it.id === action.payload.id)
      if (skill) {
        return {
          ...state,
          skills: uniqBy(state.skills.map(it => {
            if (it.id === skill.id){
              return {
                ...skill,
                _destroy: false,
              }
            } else {
              return it
            }
          }), 'name')
        }
      } else {
        return { ...state,
          skills: uniqBy([action.payload, ...state.skills], 'id'),
        }
      }
    case 'ADD_NEW_SKILL':
      return {
        skills: uniqBy([action.payload, ...state.skills], 'name'),
      }
    case 'SEARCH_SKILLS_REMOVE':
      if (!action.payload.id){
        return {
          ...state,
          skills: state.skills.filter(it => it.name !== action.payload.name),
        }
      }
      if (action.payload.account_skill_id){
        return {
          ...state,
          skills: state.skills.map(it => {
            if (it.id === action.payload.id){
              return {
                ...it,
                _destroy: true,
              }
            } else {
              return it
            }
          })
        }
      } else {
        return {
          ...state,
          skills: state.skills.filter(it => it.id !== action.payload.id)
        }
      }
    case 'SEARCH_SKILLS_RELEASE':
      return initialState
    case 'SEARCH_SKILLS_REMOVE_WITHOUT_DESTROY':
      return {
        skills: state.skills.filter(it => it.name !== action.payload),
      }
    default:
      return state
  }
}
