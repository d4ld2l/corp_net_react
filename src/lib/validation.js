import moment from 'moment'
import {get} from 'lodash'

export const required = value => (value ? undefined : 'Не может быть пустым')

export const greaterThanStart = (value, values) => {
  if ((values.starts_at || values.begin_date || values.contract_ends_from) && moment(value).isBefore(values.starts_at || values.begin_date || values.contract_ends_from)) {
    return 'Не может быть раньше даты начала'
  }
}

//TODO rework for all nested
export const greaterThanStartInArray = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const begin_date = values.project_work_periods_attributes[index] && values.project_work_periods_attributes[index].begin_date
  if ((begin_date && begin_date !== '') && moment(value).isBefore(begin_date)) {
    return 'Раньше начала'
  }
}

export const lessThanNow = (value, values) => {
  if (values.ends_at && moment(value).isBefore(new Date())) {
    return 'Должно быть больше текущей даты'
  }
}

export const dateTimeFormat = (value, values) => {
  if (value && value !== '' && !moment(value).isValid()) {
    return 'Неверный формат'
  }
}

export const onlyNumbers = value => {
  if (!/^\d+([\.,](\d+)?)?$/.test(value)) {
    return 'Неверный формат'
  }
}

export const greaterThan30Days = value => {
  if (
    moment(value)
      .add(30, 'days')
      .isBefore(new Date())
  ) {
    return 'Не может быть раньше текущей даты более чем на 30 дней'
  }
}

export const amountValidation = value => {
  return value && !(/^\d{1,12}[,.]\d{2}$/i.test(value) || /^\d{1,12}$/.test(value)) ?
    'Неверная сумма компенсации' : undefined
}

export const phoneFormat = value => {
  if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) && value !== '' && value !== undefined) {
    return 'Неверный формат'
  }
}

export const phoneFormat2 = value => {
  if (!/^\s*(?:\+?(\d{1,3}))?[-.\s(]*(\d{1,3})[-.\s)]*(\d{1,4})[-.\s]*(\d{1,4})[-.\s]*(\d{1,4})(?:\s*x(\d+))?\s*$/.test(value) && value !== '' && value !== undefined) {
    return 'Неверный формат'
  }
}

export const emailFormat = value => {
  if (!/.+@.+\..+/i.test(value) && value !== '' && value !== undefined) {
    return 'Неверный формат'
  }
}

export const workExperienceStartDate = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const work = values.experience.resume_work_experiences_attributes[index]
    if (!get(work, 'start_date', false) && (get(work, 'position', false) || get(work, 'company_name', false))) {
      return 'Обязательное поле'
    }
}

//NewCandidateForm
export const candidateRecommendationsCompany = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const it = values.tabRecommendations.resume_recommendations_attributes[index]
  if (get(it, 'recommender_name', false) && !get(it, 'company_and_position', false)) {
    return 'Обязательное поле'
  }
}

export const candidateRecommendationsPhoneOrMail = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const it = values.tabRecommendations.resume_recommendations_attributes[index]
  if (get(it, 'recommender_name', false) && ((!get(it, 'phone', false) && !get(it, 'email', false)))) {
    return 'Обязательное поле'
  }
}

export const requiredLanguageLevel = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.|..)\]/) && fieldName.match(/\[(.|..)\]/)[1]
  const it = values.basicInformation && values.basicInformation.language_skills_attributes[index]
  if (get(it, 'language_id', false) && !get(it, 'language_level_id', false)) {
    return 'Обязательное поле'
  }
}

export const phoneFormatInRecommendation = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const it = values.tabRecommendations.resume_recommendations_attributes[index]
  if (!/^\s*(?:\+?(\d{1,3}))?[-.\s(]*(\d{1,3})[-.\s)]*(\d{1,4})[-.\s]*(\d{1,4})[-.\s]*(\d{1,4})(?:\s*x(\d+))?\s*$/.test(value) && value !== '' && value !== undefined && get(it, 'recommender_name', false)) {
    return 'Неверный формат'
  }
}

export const emailFormatInRecommendation = (value, values, props, fieldName) => {
  const index = fieldName.match(/\[(.)\]/) && fieldName.match(/\[(.)\]/)[1]
  const it = values.tabRecommendations.resume_recommendations_attributes[index]
  if (!/.+@.+\..+/i.test(value) && value !== '' && value !== undefined && get(it, 'recommender_name', false)) {
    return 'Неверный формат'
  }
}

// END

export const urlFormat = value => {
  return value && (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value) && value !== '' && value !== undefined) ?
    'Неверный формат' : undefined
}

export const dateTimeFormatLength = (value, values) => {
  if (value && value.length < 8) {
    return 'Неверный формат'
  }
}

export const positive = (value, values) => {
  if (value && value <= 0) {
    return 'Должно быть больше 0'
  }
}

export const length = (value, values) => {
  if (value && value.length === 0) {
    return 'Не может быть пустым'
  }
}

// candidate form validate education_level_id
export const requiredEducationLevel = (value, values) => {
  console.log(value, values)
  if (!value && values.achievements.resume_educations_attributes[0] !== ''){
    return 'Не может быть пустым'
  }
}
// END
