import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

export const routerHistory = (action$, store)  =>
  action$.pipe(
    ofType("@@router/LOCATION_CHANGE"),
    mergeMap((action) => of({
      type: 'PUSH_ROUTE_HISTORY',
      payload: action.payload,
      })
    )
  )

export default routerHistory
