import { set, compact } from 'lodash'
import * as topics from './topics'

const ducks = [
  topics,
]

const ducksToObject = (acc, it) => ({ ...acc, [it.storeName]: it.reducer })

export const reducers = ducks.reduce(ducksToObject, {})

export const epics = compact(ducks.map(it => it.epics))
