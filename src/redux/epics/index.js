import { combineEpics } from 'redux-observable'
import { isEmpty, flatMapDeep, values, unset } from 'lodash'
import * as router from './router'
import * as employeesEdit from './employeesEdit'
import * as profileHr from './profilesHr'
import * as profiles from './profiles'
import * as taskManager from './taskManager'
import { epics as ducksEpics } from 'redux-folder/ducks'

const epics = [
  ...ducksEpics,
  router,
  employeesEdit,
  taskManager,
  profileHr,
  profiles,
]

const combinedEpics = flatMapDeep(epics, formatExportedToCombiner)

function formatExportedToCombiner(rawEpics) {
  const newAgeOfEpics = { ...rawEpics }
  unset(newAgeOfEpics, 'default')

  return isEmpty(newAgeOfEpics) ? rawEpics.default : values(newAgeOfEpics)
}

export default combineEpics(
  ...combinedEpics
)
