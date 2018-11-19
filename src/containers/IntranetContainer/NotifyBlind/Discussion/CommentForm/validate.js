import { isEmpty, isBoolean, get, trim } from 'lodash'

export default values => {
  if (
    !isEmpty(trim(get(values, 'body', ''))) ||
    !isEmpty(get(values, 'attachment', []).filter(it => !isBoolean(it._destroy)))
  ) {
    return {}
  }

  return { _error: true }
}
