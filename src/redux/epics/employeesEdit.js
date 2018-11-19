import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import { get, isBoolean, includes, split } from 'lodash' 

export const preferedContactControl = (action$, store)  =>
  action$.pipe(
    ofType("@@redux-form/BLUR", "@@redux-form/CHANGE", "@@redux-form/ARRAY_REMOVE"),
    filter(action => {
      if (action.meta.form === 'ContactInformationCollapse') {
        const rawActionMetaField = split(action.meta.field, /\[(.*?)\]/)
        const fieldName = rawActionMetaField[0]
        if (isUpdateAction(fieldName, rawActionMetaField)) {
          if (
            action.type === "@@redux-form/BLUR" && action.payload === '' &&
            (`${get(store.value, `form.ContactInformationCollapse.values.preferable_${fieldName}`)}.${fieldName}` === action.meta.field)
          ) return true
          if (
            action.type === "@@redux-form/CHANGE" && action.payload !== '' &&
            (get(store.value, `form.ContactInformationCollapse.values.${fieldName}`, [])
                           .filter(notEmpty(fieldName)).length === 1)
          ) return true
        }
        if (
          action.type === "@@redux-form/ARRAY_REMOVE" && action.meta.field === fieldName &&
          parseInt(get(store.value, `form.ContactInformationCollapse.values.preferable_${fieldName}`, '[-1]').match(/\[(.*?)\]/)[1]) === action.meta.index
        ) return true
        if (
          action.type === "@@redux-form/CHANGE" && isDestroyAction(fieldName, rawActionMetaField) &&
          `${get(store.value, `form.ContactInformationCollapse.values.preferable_${fieldName}`)}.destroy` === action.meta.field
        ) return true

      }
      return false
    }),
    mergeMap((action) => of({
        type: '@@redux-form/CHANGE',
        meta: {
          form: 'ContactInformationCollapse',
          field: `preferable_${split(action.meta.field, /\[(.*?)\]/)[0]}`, 
          touch: true,
          persistentSubmitErrors: false
        },
        payload: setPreferableEmailIndex(store, action.meta.field, action.payload)
      })
    )
  )

function isUpdateAction(type, values){
  return ((values[0] === type) && (values[2] === `.${type}`))
}
function isDestroyAction(type, values){
  if ((values[0] === type) && (values[2] === '.destroy')) return true
  return false
}

function setPreferableEmailIndex(store, fieldName, value) {
  const parserFieldName = split(fieldName, /\[(.*?)\]/)
  const actualFieldName = parserFieldName[0]
  const indexOfElementToInspect = value ? parseInt(parserFieldName[1]) : null
  if (value && !isBoolean(value) && value !== '') return `${actualFieldName}[${indexOfElementToInspect}]`

  const indexOfFieldWithNotEmptyValue = get(store.value, `form.ContactInformationCollapse.values.${actualFieldName}`, [])
                                        .findIndex(notEmpty(actualFieldName, indexOfElementToInspect))
  const newIndex = indexOfFieldWithNotEmptyValue === -1 ? 0 : indexOfFieldWithNotEmptyValue
  return `${actualFieldName}[${newIndex}]`
}

function notEmpty(type, skipIndex) {
  return (it, i) => {
    if ((skipIndex && i === skipIndex) || it.destroy) return false
    return (!!it[type] && it[type] !== '')
  }
}
