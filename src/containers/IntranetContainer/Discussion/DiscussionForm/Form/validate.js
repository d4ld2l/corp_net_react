import { get, isUndefined } from 'lodash'

export default values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  if (!values.body) {
    errors.body = 'Обязательное поле'
  }

  if (
    get(values, 'discussers', []).filter(it => !get(it, '_destroy', false)).length === 0 &&
    !get(values, 'available_to_all', false)
  ) {
    errors.members = 'Хотябы один участник должен быть выбран'
  }

  return errors
}
