import { ofType } from 'redux-observable'
import { delay, mergeMap, filter } from 'rxjs/operators'
import { of } from "rxjs/index";

export const taskManagerCloseTask = (action$, store)  =>
  action$.pipe(
    ofType("UPDATE_DONE_TASK_RES"),
    filter(action => {
      return action.payload.done
    }),
    delay(1950),
    mergeMap((action) => of({type: 'TM_TOGGLE_TASK', payload: action.payload}))
  )

export const taskManagerOpenTask = (action$, store)  =>
  action$.pipe(
    ofType("UPDATE_DONE_TASK_RES"),
    filter(action => {
      return !action.payload.done
    }),
    delay(500),
    mergeMap((action) => of({type: 'TM_TOGGLE_TASK', payload: action.payload}))
  )

export default taskManagerOpenTask
