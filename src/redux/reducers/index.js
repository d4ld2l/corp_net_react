import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import user from './user'
import role from './role'
import recruiter from './recruiter'
import vacancies from './vacancies'
import candidates from './candidates'
import news from './news'
import employees from './employees'
import birthdays from './birthdays'
import surveys from './surveys'
import events from './events'
import departments from './departments'
import departmentsReduced from './departmentsReduced'
import loaders from './loaders'
import structure from './structure'
import searchParticipants from './searchParticipants'
import searchSkills from './searchSkills'
import services from './services'
import bids from './bids'
import customers from './customers'
import customerContacts from './customerContacts'
import legal_units from './legal_units'
import projects from './projects'
import feed from './feed'
import assistants from './assistants'
import users from './users'
import system from './system'
import comparison from './comparison'
import distribution from './distribution'
import analytics from './analytics'
import projectsData from './projectsData'
import profilesProject from './profilesProject'
import routerHistory from './routerHistory'
import tasks from './tasks'
import profilesHr from './profilesHr'
import dictionaries from './dictionaries'
import vacancyCard from './vacancyCard'
import myVacancies from './myVacancies'
import notifyBlind from './notifyBlind'
import stbParticipants from './stbParticipants'
import assessment from './assessment'
import { reducers as ducksReducers } from 'redux-folder/ducks'

const appReducer = combineReducers({
  ...ducksReducers,
  router,
  user,
  role,
  recruiter,
  form: formReducer,
  vacancies,
  candidates,
  news,
  employees,
  birthdays,
  surveys,
  events,
  departments,
  departmentsReduced,
  loaders,
  structure,
  searchParticipants,
  searchSkills,
  services,
  bids,
  customers,
  customerContacts,
  legal_units,
  projects,
  feed,
  assistants,
  users,
  toastr: toastrReducer,
  system,
  comparison,
  distribution,
  analytics,
  projectsData,
  profilesProject,
  routerHistory,
  tasks,
  profilesHr,
  dictionaries,
  vacancyCard,
  myVacancies,
  notifyBlind,
  stbParticipants,
  assessment,
})

const rootReducer = (state, action) => {
  // if (action.type === 'LOGOUT_USER_RES') {
  //   state = {
  //     user: {
  //       isAuthenticated: false,
  //     },
  //     router: {
  //       location: {
  //         hash: '',
  //         key: 'nu0hfl',
  //         pathname: '/login',
  //         search: '',
  //         state: undefined,
  //       }
  //     }
  //   }
  // }
  return appReducer(state, action)
}

export default rootReducer
