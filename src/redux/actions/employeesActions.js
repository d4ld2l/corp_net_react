import moment from 'moment'
import api from '../../api'
import isEmpty from 'lodash/isEmpty'
import { toastr } from 'react-redux-toastr'

import type { Dispatch, GetState, ThunkAction } from '../../types/actions'

function createSearchParams(params) {
  const search = {}
  if (params && params !== '') {
    search.q = params
  }
  return search
}

function createFilterParams(params, sortingValue) {
  const filter = {}
  if (params) {
    !isEmpty(params.legal_unit_ids) &&
      (filter.legal_unit_ids = params.legal_unit_ids.map(it => it.value).join(','))
    !isEmpty(params.department_ids) &&
      (filter.department_ids = params.department_ids.map(it => it.value).join(','))
    !isEmpty(params.block) &&
      (filter.block = params.block.map(it => it.value).join(','))
    !isEmpty(params.practice) &&
      (filter.practice = params.practice.map(it => it.value).join(','))
    !isEmpty(params.city_list) &&
      (filter.city_list = params.city_list.map(it => it.value).join(','))
    !isEmpty(params.position_list) &&
      (filter.position_list = params.position_list.map(it => it.value).join(','))
    !isEmpty(params.skill_list) &&
      (filter.skill_names = params.skill_list.map(it => it.value).join(','))
  }
  if (sortingValue) {
    !isEmpty(sortingValue) && (filter.starts_with = sortingValue)
  }
  return filter
}

export const getEmployees = (page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (!getState().employees.all){
    dispatch({ type: 'GET_EMPLOYEES_REQ' })
    const per_page = 10000
    const filterParams = createFilterParams(getState().employees.filter)
    const searchParams = createSearchParams(getState().employees.searchParams)
    try {
      const req = await api.employees.pagination(page, per_page, searchParams, filterParams)
      dispatch({ type: 'GET_EMPLOYEES_RES', payload: req.data, page, per_page })
    } catch (error) {
      dispatch({ type: 'GET_EMPLOYEES_FAIL', payload: error.message })
    }
  }
}

export const getEmployeesPagination = (page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PAGINATION_EMPLOYEES_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(
    getState().employees.filter,
    getState().employees.sortingValue
  )
  const searchParams = createSearchParams(getState().employees.searchParams)

  try {
    let req
    req = await api.employees.pagination(page, per_page, searchParams, filterParams)
    dispatch({ type: 'GET_PAGINATION_EMPLOYEES_RES', payload: req.data, page, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PAGINATION_EMPLOYEES_FAIL', payload: error.message })
  }
}

export const getEmployeesPaginationFilter = (page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PAGINATION_EMPLOYEES_FILTER_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(
    getState().employees.filter,
    getState().employees.sortingValue
  )
  const searchParams = createSearchParams(getState().employees.searchParams)

  try {
    let req
    req = await api.employees.pagination(page, per_page, searchParams, filterParams)
    dispatch({ type: 'GET_PAGINATION_EMPLOYEES_FILTER_RES', payload: req.data, page, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PAGINATION_EMPLOYEES_FILTER_FAIL', payload: error.message })
  }
}

export const getEmployee = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_EMPLOYEE_REQ' })

  try {
    const req = await api.employees.findById(id)
    dispatch({ type: 'GET_EMPLOYEE_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_EMPLOYEE_FAIL', payload: error.message })
  }
}

export const getAccount = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  const req = await api.employees.findById(id)
  return req.data
}

export const getProfilePhotos = (accountId) => async (dispatch) => {
  dispatch({ type: 'GET_EMPLOYEE_PHOTOS_REQ' })

  try {
    const req = await api.employees.getPhotos(accountId)
    dispatch({ type: 'GET_EMPLOYEE_PHOTOS_RES', payload: req.data })
    // return req.data
  } catch (error) {
    dispatch({ type: 'GET_EMPLOYEE_PHOTOS_FAIL', payload: error.message })
  }
}


export const uploadProfilePhoto = (originalPhoto, croppedPhoto, cropInfo) => async (dispatch, getState) => {
  dispatch({ type: 'UPLOAD_EMPLOYEE_PHOTO_REQ' })

  const accountId = getState().employees.current.id
  const params = new FormData()
  params.append('account_photo[photo]', originalPhoto)

  if (croppedPhoto) {
    params.append('account_photo[cropped_photo]', croppedPhoto, 'cropped__' + originalPhoto.name.replace(/\.[0-9a-z]+$/i, '.jpg'))
  }

  if (cropInfo) {
    for (let key in cropInfo) {
      params.append(`account_photo[crop_info][${key}]`, cropInfo[key])
    }
  }

  try {
    const req = await api.employees.createPhoto(accountId, params)
    const employeeRequest = await api.employees.findById(accountId)

    dispatch({ type: 'UPLOAD_EMPLOYEE_PHOTO_RES', payload: { data: req.data.account_photo, employee: employeeRequest.data } })

    if (!req.data.success) {
      toastr.error('Произошла ошибка при загрузке файла')
    }
  } catch (error) {
    dispatch({ type: 'UPLOAD_EMPLOYEE_PHOTO_FAIL', payload: error.message })
    toastr.error(error.message)
  }
}

export const updateProfilePhoto = (photoId, originalPhoto, croppedPhoto, cropInfo) => async (dispatch, getState) => {
  dispatch({ type: 'UPDATE_EMPLOYEE_PHOTO_REQ' })

  const accountId = getState().employees.current.id
  const params = new FormData()

  if (originalPhoto) {
    params.append('account_photo[photo]', originalPhoto)
  }

  if (croppedPhoto) {
    let time = (new Date()).getTime()
    params.append('account_photo[cropped_photo]', croppedPhoto, `cropped-${time}.jpg`)
  }

  if (cropInfo) {
    for (let key in cropInfo) {
      params.append(`account_photo[crop_info][${key}]`, cropInfo[key])
    }
  }

  try {
    const req = await api.employees.updatePhoto(accountId, photoId, params)
    const employeeRequest = await api.employees.findById(accountId)

    dispatch({ type: 'UPDATE_EMPLOYEE_PHOTO_RES', payload: { data: req.data.account_photo, employee: employeeRequest.data } })

    if (!req.data.success) {
      toastr.error('Произошла ошибка при загрузке файла')
    }
  } catch (error) {
    dispatch({ type: 'UPDATE_EMPLOYEE_PHOTO_FAIL', payload: error.message })
    toastr.error(error.message)
  }
}

export const deleteProfilePhoto = (photoId) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_EMPLOYEE_PHOTO_REQ' })

  const accountId = getState().employees.current.id

  try {
    const req = await api.employees.deletePhoto(accountId, photoId)
    const employeeRequest = await api.employees.findById(accountId)

    dispatch({ type: 'DELETE_EMPLOYEE_PHOTO_RES', payload: { id: photoId, employee: employeeRequest.data } })
  } catch (error) {
    dispatch({ type: 'DELETE_EMPLOYEE_PHOTO_FAIL', payload: error.message })
    toastr.error(error.message)
  }
}

export const setProfilePhoto = (photoId) => async (dispatch, getState) => {
  dispatch({ type: 'SET_EMPLOYEE_PHOTO_REQ' })

  const accountId = getState().employees.current.id

  try {
    const req = await api.employees.setAsAvatar(accountId, photoId)
    const employeeRequest = await api.employees.findById(accountId)

    dispatch({ type: 'SET_EMPLOYEE_PHOTO_RES', payload: { id: photoId, employee: employeeRequest.data } })
  } catch (error) {
    dispatch({ type: 'SET_EMPLOYEE_PHOTO_FAIL', payload: error.message })
    toastr.error(error.message)
  }
}

export const getEmployeeSearch = (value: string, page: number): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_EMPLOYEE_SEARCH_REQ' })
  if (page === 1) {
    dispatch({ type: 'GET_EMPLOYEE_SEARCH_FIRST_REQ' })
  }

  try {
    const req = await api.employees.searchPagination(value, page, 15)
    const newSearch = page === 1
    dispatch({ type: 'GET_EMPLOYEE_SEARCH_RES', payload: req.data, value, newSearch })
  } catch (error) {
    dispatch({ type: 'GET_EMPLOYEE_SEARCH_FAIL', payload: error.message })
  }
}

export const getEmployeeSort = (value: string, page: number): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_EMPLOYEE_SORT_REQ' })
  if (page === 1) {
    dispatch({ type: 'GET_EMPLOYEE_SEARCH_FIRST_REQ' })
  }

  try {
    const req = await api.employees.sortingPagination(value, page, 15)
    const newSort = page == 1
    dispatch({ type: 'GET_EMPLOYEE_SORT_RES', payload: req.data, value, newSort })
  } catch (error) {
    dispatch({ type: 'GET_EMPLOYEE_SORT_FAIL', payload: error.message })
  }
}

export const updateResumeEmployee = (id: number): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'POST_UPDATE_EMPLOYEE_REQ' })

  const form = {
    ...(getState().form.ResumeCollapse.values || {}),
  }

  const profileResume =
    getState().employees.current.resumes && getState().employees.current.resumes[0]

  try {
    const filteredCourses = (oldArr, newArr) => {
      const result = []
      oldArr.forEach(old => {
        const el = newArr.find(nw => old.id === nw.id)
        if (!el) result.push({ id: old.id, _destroy: true })
        if (el)
          result.push({
            company_name: el.company_name,
            id: old.id,
            end_year: el.end_year,
            name: el.name,
            document_attributes:
              el.document &&
              (el.document.length === 2 ? el.document.filter(i => !i.id)[0] : el.document[0]),
          })
      })
      newArr.forEach(nw => {
        if (!nw) return
        const el = oldArr.find(old => old.id === nw.id)
        if (!el)
          result.push({
            company_name: nw.company_name,
            end_year: nw.end_year,
            name: nw.name,
            document_attributes: nw.document && nw.document[0],
          })
      })
      return result
    }

    const filteredCertificates = (oldArr, newArr) => {
      const result = []
      oldArr.forEach(old => {
        const el = newArr.find(nw => old.id === nw.id)
        if (!el) result.push({ id: old.id, _destroy: true })
        if (el)
          result.push({
            company_name: el.company_name,
            id: old.id,
            start_date: el.start_date,
            name: el.name,
            document_attributes:
              el.document &&
              (el.document.length === 2 ? el.document.filter(i => !i.id)[0] : el.document[0]),
          })
      })
      newArr.forEach(nw => {
        if (!nw) return
        const el = oldArr.find(old => old.id === nw.id)
        if (!el)
          result.push({
            company_name: nw.company_name,
            start_date: nw.start_date,
            name: nw.name,
            document_attributes: nw.document && nw.document[0],
          })
      })
      return result
    }

    const filteredEducation = (oldArr, newArr) => {
      const result = []
      oldArr.forEach(old => {
        const el = newArr.find(nw => old.id === nw.id)
        if (!el) result.push({ id: old.id, _destroy: true })
        if (el)
          result.push({
            education_level_id: el.education_level_id ? el.education_level_id.value : null,
            id: old.id,
            end_year: el.end_year,
            faculty_name: el.faculty_name,
            school_name: el.school_name,
            speciality: el.speciality,
          })
      })
      newArr.forEach(nw => {
        if (!nw) return
        const el = oldArr.find(old => old.id === nw.id)
        if (!el)
          result.push({
            education_level_id: nw.education_level_id ? nw.education_level_id.value : null,
            end_year: nw.end_year,
            faculty_name: nw.faculty_name,
            school_name: nw.school_name,
            speciality: nw.speciality,
          })
      })
      return result
    }

    const filteredExperiences = (oldArr, newArr) => {
      const result = []
      oldArr.forEach(old => {
        const el = newArr.find(nw => old.id === nw.id)
        if (!el) result.push({ id: old.id, _destroy: true })
        if (el)
          result.push({
            ...el,
            id: old.id,
            start_date: moment(el.start_date).format('YYYY-MM-DD'),
            end_date: el.nowadays ? null : moment(el.end_date).format('YYYY-MM-DD'),
          })
      })
      newArr.forEach(nw => {
        const el = oldArr.find(old => old.id === nw.id)
        if (!el)
          result.push({
            ...nw,
            start_date: moment(nw.start_date).format('YYYY-MM-DD'),
            end_date: nw.nowadays ? null : moment(nw.end_date).format('YYYY-MM-DD'),
          })
      })
      return result
    }

    const filteredLanguageSkills = (oldArr, newArr) => {
      const result = []
      oldArr.forEach(old => {
        const el = newArr.find(nw => old.id === nw.id)
        if (!el) result.push({ id: old.id, _destroy: true })
        if (el)
          result.push({
            language_id: el.language_id && el.language_id.value,
            id: old.id,
            language_level_id: el.language_level_id && el.language_level_id.value,
          })
      })
      newArr.forEach(nw => {
        if (!nw) return
        const el = oldArr.find(old => old.id === nw.id)
        if (!el)
          result.push({
            language_id: nw.language_id && nw.language_id.value,
            language_level_id: nw.language_level_id && nw.language_level_id.value,
          })
      })
      return result
    }

    const params = {
      account: {
        resumes_attributes: [
          {
            id: profileResume && profileResume.id,
            resume_certificates_attributes:
              form.certificates &&
              filteredCertificates(
                profileResume ? profileResume && profileResume.resume_certificates : [],
                form.certificates
              ),
            resume_courses_attributes:
              form.courses &&
              filteredCourses(
                profileResume ? profileResume && profileResume.resume_courses : [],
                form.courses
              ),
            language_skills_attributes:
              form.language_skills_attributes &&
              filteredLanguageSkills(
                profileResume ? profileResume && profileResume.language_skills : [],
                form.language_skills_attributes
              ),
            resume_work_experiences_attributes:
              form.resume_work_experiences_attributes.length > 0 &&
              filteredExperiences(
                profileResume ? profileResume && profileResume.resume_work_experiences : [],
                form.resume_work_experiences_attributes
              ),
            resume_educations_attributes:
              form.resume_educations_attributes &&
              filteredEducation(
                profileResume ? profileResume && profileResume.resume_educations : [],
                form.resume_educations_attributes
              ),
          },
        ],
      },
    }
    const req = await api.employees.update(id, params)

    dispatch({ type: 'POST_UPDATE_EMPLOYEE_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_EMPLOYEE_FAIL', payload: error.message })
  }
}

export const updateEmployee = (id: number): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'POST_UPDATE_EMPLOYEE_REQ' })

  const form = {
    ...(getState().form.GeneralInformationCollapse.values || {}),
    ...(getState().form.ContactInformationCollapse.values || {}),
  }

  const skills = getState().searchSkills.skills.map( it => ({
    id: it.account_skill_id,
    skill_id: it.id,
    skill_attributes: it.id ? null : {name: it.name},
    _destroy: it._destroy,
  }))

  try {
    const phones = form.phone.filter(phone => phone.phone != null || phone.destroy)
    const emails = form.email.filter(email => email.email != null || email.destroy)
    const others = form.other.filter(other => other.other != null || other.destroy)

    const params = {
      account: {
        city: form.city,
        birthday: form.birthday.format('YYYY-MM-DD'),
        sex: form.sex,
        skype: form.skype,
        social_urls: form.social.map(it => it.link),
        account_skills_attributes: skills,
        account_phones_attributes:
          phones &&
          phones.map((it, index) => ({
            id: it.id,
            kind: (it.phone_type && it.phone_type.value) || 'other',
            number: it.phone,
            preferable: form.preferable_phone === `phone[${index}]`,
            whatsapp: !!it.whatsapp,
            telegram: !!it.telegram,
            viber: !!it.viber,
            account_id: id,
            _destroy: it.phone === '' ? true : it.destroy,
          })),
        account_emails_attributes:
          emails &&
          emails.map((it, index) => ({
            id: it.id,
            kind: (it.email_type && it.email_type.value) || 'personal',
            email: it.email,
            preferable: form.preferable_email === `email[${index}]`,
            account_id: id,
            _destroy: it.email === '' ? true : it.destroy,
          })),
        account_messengers_attributes: others.map(it => ({
          id: it.id,
          name: it.other_type && it.other_type.value,
          _destroy: it.other === '' ? true : it.destroy,
          phones: [it.other],
        })),
      },
    }
    const req = await api.employees.update(id, params)

    dispatch({ type: 'POST_UPDATE_EMPLOYEE_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_EMPLOYEE_FAIL', payload: error.message })
  }
}

export const confirmEmployeeSkill = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'CONFIRM_EMPLOYEE_SKILL_REQ' })
  try {
    const req = await api.employees.confirmSkill(id)
    dispatch({ type: 'CONFIRM_EMPLOYEE_SKILL_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'CONFIRM_EMPLOYEE_SKILL_FAIL', payload: error.message })
  }
}

export const getLanguages = (): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  if (getState().candidates.languages.length) {
    return Promise.resolve()
  }
  dispatch({ type: 'GET_LANGUAGES_REQ' })

  try {
    const req = await api.languages()
    dispatch({ type: 'GET_LANGUAGES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_LANGUAGES_FAIL', payload: error.message })
  }
}

export const getLanguagesLevel = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (getState().candidates.languagesLevel.length) {
    return Promise.resolve()
  }
  dispatch({ type: 'GET_LANGUAGES_LEVEL_REQ' })

  try {
    const req = await api.languagesLevel()
    dispatch({ type: 'GET_LANGUAGES_LEVEL_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_LANGUAGES_LEVEL_FAIL', payload: error.message })
  }
}

export const getEducationLevel = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (getState().candidates.educationLevel.length) {
    return Promise.resolve()
  }
  dispatch({ type: 'GET_EDUCATION_LEVEL_REQ' })

  try {
    const req = await api.educationLevel()
    dispatch({ type: 'GET_EDUCATION_LEVEL_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_EDUCATION_LEVEL_FAIL', payload: error.message })
  }
}

export const unconfirmEmployeeSkill = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'UNCONFIRM_EMPLOYEE_SKILL_REQ' })
  try {
    const req = await api.employees.unconfirmSkill(id)
    dispatch({ type: 'UNCONFIRM_EMPLOYEE_SKILL_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'UNCONFIRM_EMPLOYEE_SKILL_FAIL', payload: error.message })
  }
}

export const removeEmployeeSkill = (id: number, skill_id: number): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'POST_UPDATE_EMPLOYEE_REQ' })
  const params = {
    account: {
      account_skills_attributes: [{ id: skill_id, _destroy: true }],
    },
  }
  try {
    const req = await api.employees.update(id, params)
    dispatch({ type: 'GET_EMPLOYEE_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_EMPLOYEE_FAIL', payload: error.message })
  }
}

export const createEmployeeSkill = (id: number, value: string, skillId): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'POST_UPDATE_EMPLOYEE_REQ' })
  const params = {
    account: {
      account_skills_attributes: [{
        skill_id: skillId,
        skill_attributes: skillId ? null : {
          name: value
        }
      }],
    },
  }
  try {
    const req = await api.employees.update(id, params)
    dispatch({ type: 'GET_EMPLOYEE_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_EMPLOYEE_FAIL', payload: error.message })
  }
}

export const resetEmployeeSearch = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_EMPLOYEE_SEARCH' })
export const resetEmployeeSort = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_EMPLOYEE_SORT' })
export const resetEmployeeFilter = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_EMPLOYEE_FILTER' })

export const setSearch = (searchParams): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_SEARCH_EMPLOYEES_REQ' })

  try {
    dispatch({ type: 'SET_SEARCH_EMPLOYEES_RES', payload: searchParams })
    dispatch(getEmployeesPaginationFilter(1))
  } catch (error) {
    dispatch({ type: 'SET_SEARCH_EMPLOYEES_FAIL', payload: error.message })
  }
}

export const setFilter = (filterParams): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_FILTER_PARAMS_EMPLOYEES_REQ' })
  const form = getState().form.EmployeesFiltered.values || {}

  try {
    dispatch({ type: 'SET_FILTER_PARAMS_EMPLOYEES_RES', payload: form })
    dispatch(getEmployeesPaginationFilter(1))
  } catch (error) {
    dispatch({ type: 'SET_FILTER_PARAMS_EMPLOYEES_FAIL', payload: error.message })
  }
}
