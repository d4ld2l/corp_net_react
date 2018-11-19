import { ofType } from 'redux-observable'
import { filter, delay, mergeMap, mapTo } from 'rxjs/operators'
import {of} from "rxjs/index";
import isEmpty from "lodash/isEmpty";

export const profileHrEpic = (action$, store)  =>
  action$.pipe(
    ofType("@@redux-form/CHANGE"),
    filter(action => {
      if (action.meta.form === 'Filtered' && action.meta.field === "legal_unit_ids"){
        return true
      }
      return false
    }),
    mergeMap((action) => of({
        type: 'CHANGE_LEGAL_UNIT_FIELD',
        payload: action.payload.map(({value}) => value),
      })
    )
  )

export const profileHrFilteredBlock = (action$, store)  =>
  action$.pipe(
    ofType("@@redux-form/CHANGE"),
    filter(action => {
      if (action.meta.form === 'Filtered' && action.meta.field === "block"){
        const compare = store.value.form.Filtered.values
        if (!isEmpty(compare.practice) && !isEmpty(compare.block) && isEmpty(compare.block.filter(it => compare.practice.map(it => it.parent_id).includes(it.id)))) {
          return true
        }
      }
      return false
    }),
    mergeMap(() => of({
        type: '@@redux-form/CHANGE',
        meta: {
          form: 'Filtered',
          field: 'practice',
          touch: false,
          persistentSubmitErrors: false
        },
        payload: []
      })
    )
  )

export const profileHrFilteredLegalUnit = (action$, store)  =>
  action$.pipe(
    ofType("@@redux-form/CHANGE"),
    filter(action => {
      if (action.meta.form === 'Filtered' && action.meta.field === "legal_unit_ids"){
        const compare = store.value.form.Filtered.values
        if  (!isEmpty(compare.legal_unit_ids) && !isEmpty(compare.block) && isEmpty(compare.block.filter(it => compare.legal_unit_ids.map(it => it.value).includes(it.legal_unit_id)))) {
          return true
        }
      }
      return false
    }),
    mergeMap(() => of({
        type: '@@redux-form/CHANGE',
        meta: {
          form: 'Filtered',
          field: 'block',
          touch: false,
          persistentSubmitErrors: false
        },
        payload: []
      },{
        type: '@@redux-form/CHANGE',
        meta: {
          form: 'Filtered',
          field: 'practice',
          touch: false,
          persistentSubmitErrors: false
        },
        payload: []
      }
    )
  )
  )
