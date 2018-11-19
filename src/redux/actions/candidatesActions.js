import path from 'ramda/src/pathOr'

import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import moment from 'moment'
import isEqual from 'lodash/isEqual'

import api from '../../api'
import getBase64 from '../../helpers/getFileBase64'
import urlToBase64 from '../../helpers/urlToBase64'
import { isEmpty, get } from 'lodash'

import type { Dispatch, ThunkAction, GetState } from '../../types/actions'
import type { CandidatePermittedAttrsRaw } from '../../types/raws'

function normalizeContacts(form) {
  let arr = []
  if (typeof form.phones[0] !== 'string') {
    arr = [...arr, ...form.phones.map((item, key) => {
      return {
        contact_type: 'phone',
        value: item.phone,
        preferred: form.preferred_contact_type === `${key}-phone`,
      }
    })]
  }
  if (typeof form.emails[0] !== 'string') {
    arr = [...arr, ...form.emails.map((item, key) => {
      return {
        contact_type: 'email',
        value: item.email,
        preferred: form.preferred_contact_type === `${key}-email`,
      }
    })]
  }
  if (form.skype) {
    arr.push({
      contact_type: 'skype',
      value: form.skype,
      preferred: form.preferred_contact_type === 'skype',
    })
  }
  return arr
}

export const createCandidate = ({ state }): ThunkAction => async (dispatch: Dispatch) => {
  const form = {...path({}, ['NewCandidateForm', 'values'], state.form)}
  const values = {
    first_name: form.fullName.first_name,
    middle_name: form.fullName.middle_name ? form.fullName.middle_name : null,
    last_name: form.fullName.last_name,
    birthdate: form.basicInformation.birthdate,
    candidate_vacancies_attributes: form.fullName.candidate_vacancies_attributes.map(
      id => id && { vacancy_id: id },
    ),
    resume_attributes: {
      desired_position: form.tabExpectations.desired_position,
      city: form.fullName.city,
      sex: form.basicInformation.sex ? form.basicInformation.sex : null,
      professional_specialization_ids: form.tabExpectations.professional_specialization_ids ? form.tabExpectations.professional_specialization_ids.map(
        specialization => specialization.value
      ) : null,
      resume_source_id: form.fullName.resume_source_id ? form.fullName.resume_source_id.value : null,
      skills_description: form.basicInformation.skills_description ? form.basicInformation.skills_description : null,
      salary_level: form.tabExpectations.salary_level ? form.tabExpectations.salary_level.toString().split(' ').join('') : null,
      experience: form.tabExpectations.experience ? form.tabExpectations.experience : null,
      employment_type: form.tabExpectations.employment_type ? form.tabExpectations.employment_type : null,
      working_schedule: form.tabExpectations.working_schedule ? form.tabExpectations.working_schedule : null,
      comment: form.tabExpectations.comment ? form.tabExpectations.comment : null,
      vacancy_id: form.fullName.vacancy_id ? form.fullName.vacancy_id : null,
      education_level_id: get(form, 'achievements.education_level_id.value', form.achievements.education_level_id),
      skill_list: form.basicInformation.skills ? ((!isEmpty(form.basicInformation.skills.filter(it => !isEmpty(it.name)))) ? form.basicInformation.skills.map(it => it.name)
        : form.basicInformation.skills) : null,
      language_skills_attributes: form.basicInformation.language_skills_attributes.map(
        skill =>
          (typeof skill !== 'string' && isEmpty(skill.language_id)) ? ({
            language_id: skill.language_id,
            language_level_id: skill.language_level_id,
          }) : (!isEmpty(skill.language_id) ? ({
            language_id: skill.language_id.value,
            language_level_id: skill.language_level_id.value,
          }) : null),
      ),
      resume_work_experiences_attributes: form.experience.resume_work_experiences_attributes.map(item => {
        return (
          item && {
            ...item,
            end_date: item.nowadays ? null : item.end_date,
          }
        )
      }),
      resume_recommendations_attributes: form.tabRecommendations.resume_recommendations_attributes,
      resume_courses_attributes: form.achievements.resume_courses_attributes
        ? form.achievements.resume_courses_attributes
        : null,
      resume_certificates_attributes: form.achievements.resume_certificates_attributes
        ? form.achievements.resume_certificates_attributes
        : null,
      resume_educations_attributes: form.achievements.resume_educations_attributes.map(
        education =>
          education && {
            ...education,
            education_level_id: !isEmpty(education.education_level_id) ? education.education_level_id.value
              : (!isEmpty(education.education_level) ? education.education_level.id : null),
          },
      ),
      additional_contacts_attributes: form.contactInformation.additional_contacts_attributes,
      raw_resume_doc_id: form.fullName.raw_resume_doc_id,
      resume_text: form.tabResume.resume_text,
      resume_contacts_attributes: normalizeContacts(form.contactInformation),
      manual: form.parsed ? false : true,
      remote_resume_file_url: get(form, 'fullName.remote_resume_file_url'),
    },
  }

  dispatch({ type: 'CREATE_CANDIDATE_REQ' })

  try {
    if (form.fullName.documents && form.fullName.documents.length) {
      const files = form.fullName.documents.map((it) =>
        ({
          file: it.file,
          name: it.name,
        })
      )
      values.resume_attributes.resume_documents_attributes = await Promise.all(files)
    }
    if (form.fullName.photo) {
      values.resume_attributes.photo = await urlToBase64(form.fullName.photo)
    }
    const candidate = { ...values }
    const req = await api.candidates.create(candidate)
    if (req.status === 200){
      dispatch({ type: 'CREATE_CANDIDATE_RES', payload: req.data })
      toastr.success('Кандидат успешно создан')
      dispatch(push('/recruitment/candidates'))
    } else {
      toastr.error('Возникли ошибки при сохранении.')
      dispatch({ type: 'CREATE_CANDIDATE_FAIL', payload: req.data})
    }
  } catch (error) {
    dispatch({ type: 'CREATE_CANDIDATE_FAIL', payload: error.message })
  }
}

export const updateCandidate = ({ state }): ThunkAction => async (dispatch: Dispatch) => {
  const id = state.candidates.current.id
  const resumeId = state.candidates.current.resume.id
  const candidate_vacancies = state.candidates.current.candidate_vacancies
  const language_skills = state.candidates.current.resume.language_skills
  const experiences = state.candidates.current.resume.resume_work_experiences
  const recommendations = state.candidates.current.resume.resume_recommendations
  const courses = state.candidates.current.resume.resume_courses
  const certificates = state.candidates.current.resume.resume_certificates
  const educations = state.candidates.current.resume.resume_educations
  const contacts = state.candidates.current.resume.additional_contacts
  const resumeContacts = state.candidates.current.resume.resume_contacts
  const resumeDocuments = state.candidates.current.resume.resume_documents
  const expectation = state.candidates.current.resume.professional_specializations
  const form = {...path({}, ['NewCandidateForm', 'values'], state.form)}
  const filteredCandidateVacancies = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => old.vacancy_id === nw)
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({ vacancy_id: el, id: old.id })
    })
    newArr.forEach(nw => {
      const el = oldArr.find(old => old.vacancy_id === nw)
      if (!el) result.push({ vacancy_id: nw })
    })
    return result
  }
  const filteredLanguageSkills = (oldArr, newArrLanguage) => {
    const result = []
    const newArr = newArrLanguage.map((it) => ({
      language_id: !isEmpty(it.language) ? it.language.id : (!isEmpty(it.language_id) ? it.language_id.value : null),
      language_level_id: !isEmpty(it.language_level) ? it.language_level.id : (!isEmpty(it.language_id) ? it.language_level_id.value : null),
    }))
    oldArr.forEach(old => {
      const el = newArr.find(
        nw =>
          old.language_id === nw.language_id &&
          old.language_level_id === nw.language_level_id,
      )
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)

        result.push({
          language_id: el.language_id,
          id: old.id,
          language_level_id: el.language_level_id,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(
        old =>
          old.language_id === nw.language_id &&
          old.language_level_id === nw.language_level_id,
      )
      if (!el)
        result.push({
          language_id: nw.language_id,
          language_level_id: nw.language_level_id,
        })
    })
    return result
  }
  const filteredExperiences = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => old.id === nw.id)
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({ ...el, id: old.id })
    })
    newArr.forEach(nw => {
      const el = oldArr.find(old => isEqual(old, nw))
      if (!el)
        result.push({
          ...nw,
          end_date: nw.nowadays ? null : nw.end_date,
        })
    })
    return result
  }
  const filteredContacts = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => isEqual(old, nw))
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({ ...el, id: old.id })
    })
    newArr.forEach(nw => {
      const el = oldArr.find(old => isEqual(old, nw))
      if (!el) result.push(nw)
    })
    return result
  }
  const filteredEducation = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => isEqual(old.id, nw.id))
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)
        result.push({
          education_level_id: el.education_level_id ? el.education_level_id : null,
          id: old.id,
          end_year: el.end_year,
          faculty_name: el.faculty_name,
          school_name: el.school_name,
          speciality: el.speciality,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(old => isEqual(old.id, nw.id))
      if (!el)
        result.push({
          education_level_id: nw.education_level_id ? nw.education_level_id : null,
          end_year: nw.end_year,
          faculty_name: nw.faculty_name,
          school_name: nw.school_name,
          speciality: nw.speciality,
        })
    })
    return result
  }
  const filteredCertificates = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(
        nw =>
          old.company_name === nw.company_name &&
          old.end_date === nw.end_date &&
          old.name === nw.name,
      )
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)
        result.push({
          company_name: el.company_name,
          id: old.id,
          end_date: el.end_date,
          name: el.name,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(
        old =>
          old.company_name === nw.company_name &&
          old.end_date === nw.end_date &&
          old.name === nw.name,
      )
      if (!el)
        result.push({
          company_name: nw.company_name,
          end_date: nw.end_date.length === 4 ? `${nw.end_date}-02-02` : nw.end_date,
          name: nw.name,
        })
    })
    return result
  }
  const filteredRecommendations = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(
        nw =>
          old.company_and_position === nw.company_and_position &&
          old.recommender_name === nw.recommender_name &&
          old.email === nw.email &&
          old.phone === nw.phone,
      )
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)
        result.push({
          company_and_position: el.company_and_position,
          id: old.id,
          recommender_name: el.recommender_name,
          email: el.email,
          phone: el.phone,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(
        old =>
          old.company_and_position === nw.company_and_position &&
          old.recommender_name === nw.recommender_name &&
          old.email === nw.email &&
          old.phone === nw.phone,
      )
      if (!el)
        result.push({
          company_and_position: nw.company_and_position,
          recommender_name: nw.recommender_name,
          email: nw.email,
          phone: nw.phone,
        })
    })
    return result
  }
  const filteredCourses = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(
        nw =>
          old.company_name === nw.company_name &&
          old.end_year === nw.end_year &&
          old.name === nw.name,
      )
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)
        result.push({
          company_name: el.company_name,
          id: old.id,
          end_year: el.end_year,
          name: el.name,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(
        old =>
          old.company_name === nw.company_name &&
          old.end_year === nw.end_year &&
          old.name === nw.name,
      )
      if (!el)
        result.push({
          company_name: nw.company_name,
          end_year: nw.end_year,
          name: nw.name,
        })
    })
    return result
  }
  const filteredDocuments = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => isEqual(old, nw))
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({ ...el, id: old.id })
    })
    newArr.forEach(nw => {
      const el = oldArr.find(old => isEqual(old, nw))
      if (!el) result.push(nw)
    })
    return result
  }
  const filteredContactsAttributes = (oldArr, form) => {
    const newArr = normalizeContacts(form)
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(
        nw =>
          old.contact_type === nw.contact_type &&
          old.value === nw.value &&
          old.preferred === nw.preferred,
      )
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el)
        result.push({
          contact_type: el.contact_type,
          id: old.id,
          value: el.value,
          preferred: el.preferred,
        })
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(
        old =>
          old.contact_type === nw.contact_type &&
          old.value === nw.value &&
          old.preferred === nw.preferred,
      )
      if (!el)
        result.push({
          contact_type: nw.contact_type,
          value: nw.value,
          preferred: nw.preferred,
        })
    })
    return result
  }
  const filteredExpectations = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => old.id === nw)
      if (!el) result[Object.keys(old)] = old.id
      if (el) result.push(el)
    })
    newArr.forEach(nw => {
      if (!nw) return
      const el = oldArr.find(old => old.id === nw)
      if (!el) result.push(nw)
    })
    return result
  }

  const values = {
    first_name: form.fullName.first_name,
    middle_name: form.fullName.middle_name ? form.fullName.middle_name : null,
    last_name: form.fullName.last_name,
    birthdate: form.basicInformation.birthdate,
    candidate_vacancies_attributes:
    form.fullName.candidate_vacancies_attributes &&
    filteredCandidateVacancies(candidate_vacancies, form.fullName.candidate_vacancies_attributes),
    resume_attributes: {
      id: resumeId,
      desired_position: form.tabExpectations.desired_position,
      city: form.fullName.city,
      sex: form.basicInformation.sex ? form.basicInformation.sex : null,
      professional_specialization_ids: form.tabExpectations.professional_specialization_ids ?
        filteredExpectations(expectation, form.tabExpectations.professional_specialization_ids.map(
          specialization => specialization.value
        )) : null,
      resume_source_id: form.fullName.resume_source_id ? form.fullName.resume_source_id.value : null,
      skills_description: form.basicInformation.skills_description ? form.basicInformation.skills_description : null,
      salary_level: form.tabExpectations.salary_level ? form.tabExpectations.salary_level.toString().split(' ').join('') : null,
      experience: form.tabExpectations.experience,
      employment_type: form.tabExpectations.employment_type,
      working_schedule: form.tabExpectations.working_schedule,
      comment: form.tabExpectations.comment,
      vacancy_id: form.fullName.vacancy_id ? form.fullName.vacancy_id : null,
      education_level_id: get(form, 'achievements.education_level_id.value', form.achievements.education_level_id),
      skill_list: form.basicInformation.skills ? ((!isEmpty(form.basicInformation.skills.filter(it => !isEmpty(it.name)))) ? form.basicInformation.skills.filter(it => !it._destroy).map(it => it.name)
        : form.basicInformation.skills) : null,
      language_skills_attributes:
      form.basicInformation.language_skills_attributes &&
      filteredLanguageSkills(language_skills, form.basicInformation.language_skills_attributes),
      resume_work_experiences_attributes:
      form.experience.resume_work_experiences_attributes &&
      filteredExperiences(experiences, form.experience.resume_work_experiences_attributes),
      resume_recommendations_attributes:
      form.tabRecommendations.resume_recommendations_attributes &&
      filteredRecommendations(recommendations, form.tabRecommendations.resume_recommendations_attributes),
      resume_courses_attributes:
      form.achievements.resume_courses_attributes &&
      filteredCourses(courses, form.achievements.resume_courses_attributes),
      resume_certificates_attributes:
      form.achievements.resume_certificates_attributes &&
      filteredCertificates(certificates, form.achievements.resume_certificates_attributes),
      resume_educations_attributes:
      form.achievements.resume_educations_attributes &&
      filteredEducation(educations, form.achievements.resume_educations_attributes),
      additional_contacts_attributes:
      form.contactInformation.additional_contacts_attributes &&
      filteredContacts(contacts, form.contactInformation.additional_contacts_attributes),
      resume_text: form.tabResume.resume_text ? form.tabResume.resume_text : null,
      resume_contacts_attributes: filteredContactsAttributes(resumeContacts, form.contactInformation),
      manual: form.parsed ? false : true,
      remote_resume_file_url: get(form, 'fullName.remote_resume_file_url'),
      resume_documents_attributes: form.fullName.documents &&
      filteredDocuments(resumeDocuments ,form.fullName.documents)
    },
  }

  dispatch({ type: 'UPDATE_CANDIDATE_REQ' })

  try {
    !isEmpty(form.fullName.photo) ? values.resume_attributes.photo = form.fullName.photo : values.resume_attributes.remove_photo = true
    // const candidate = { ...values }
    const req = await api.candidates.update(id, { ...values })
    dispatch({ type: 'UPDATE_CANDIDATE_RES', payload: req.data })
    toastr.success('Изменения успешно сохранены')
    dispatch(push(`/recruitment/candidates/${id}`))
  } catch (error) {
    dispatch({ type: 'UPDATE_CANDIDATE_FAIL', payload: error.message })
  }
}

export const getCandidatesStats = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CANDIDATES_STATS_REQ' })

  try {
    const req = await api.candidates.stats()
    dispatch({ type: 'GET_CANDIDATES_STATS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CANDIDATES_STATS_FAIL', payload: error.message })
  }
}

export const getSelectCandidates = (ids, count) => async (dispatch) => {
  dispatch({ type: 'GET_SELECT_CANDIDATES_REQ' })

  try {
    const req = await api.candidates.select(ids, count)
    dispatch({ type: 'GET_SELECT_CANDIDATES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_SELECT_CANDIDATES_FAIL', payload: error.message })
  }
}

export const getAllCandidates = ({ loadMore }): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  const page = getState().candidates.page
  const perPage = getState().candidates.perPage
  const size = getState().candidates.data.length

  dispatch({ type: 'GET_CANDIDATES_REQ' })

  try {
    // if last page has less items than perPage -> request it again

    const req = await api.candidates.all(page, perPage)

    dispatch({ type: 'GET_CANDIDATES_RES', payload: req.data, page })
  } catch (error) {
    dispatch({ type: 'GET_CANDIDATES_FAIL', payload: error.message })
  }
}

export const getCandidatesWhereGroupId = (groupId: number, { loadMore }): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const page = getState().candidates.page
  const perPage = getState().candidates.perPage
  const size = getState().candidates.groupCandidates.length

  dispatch({ type: 'GET_CANDIDATES_GROUP_REQ', payload: { groupId } })

  try {
    // if last page has less items than perPage -> request it again

    const req = groupId === -1 ? await api.candidates.freeCandidates(page, perPage) : await api.candidates.whereGroupId(groupId, page, perPage)
    dispatch({ type: 'GET_CANDIDATES_GROUP_RES', payload: req.data, page })
  } catch (error) {
    dispatch({ type: 'GET_CANDIDATES_GROUP_FAIL', payload: error.message })
  }
}

export const getCandidates = ({ groupId, loadMore } = {}): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  if (!groupId) groupId = getState().candidates.groupId

  const search = getState().candidates.search
  const page = getState().candidates.page
  return dispatch(
    search.now ? advancedSearch(page, search.query, { loadMore }) :
      (groupId ? getCandidatesWhereGroupId(groupId, { loadMore }) : getAllCandidates({ loadMore }))
  )
}

export const resetCandidates = (): ThunkAction => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'RESET_CANDIDATES' })
}

export const resetGroupCandidates = (): ThunkAction => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'RESET_CANDIDATES_GROUP' })
}

export const getCurrentCandidate = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CURRENT_CANDIDATE_REQ' })

  try {
    const req = await api.candidates.findById(id)
    dispatch({ type: 'GET_CURRENT_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CURRENT_CANDIDATE_FAIL', payload: error.message })
  }
}

export const getCurrentCandidateLight = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CURRENT_CANDIDATE_REQ' })

  try {
    const req = await api.candidates.light(id)
    dispatch({ type: 'GET_CURRENT_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CURRENT_CANDIDATE_FAIL', payload: error.message })
  }
}

export const getCurrentCandidateWithOutLoader = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CURRENT_CANDIDATE_WITHOUT_LOADER_REQ' })

  try {
    const req = await api.candidates.findById(id)
    dispatch({ type: 'GET_CURRENT_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CURRENT_CANDIDATE_WITHOUT_LOADER_FAIL', payload: error.message })
  }
}

export const updateCurrentCandidate = (id: number, data: CandidatePermittedAttrsRaw) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'UPDATE_CURRENT_CANDIDATE_REQ' })

  try {
    const req = await api.candidates.update(id, data)
    dispatch({ type: 'UPDATE_CURRENT_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'UPDATE_CURRENT_CANDIDATE_FAIL', payload: error.message })
  }
}

export const releaseCurrentCandidate = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'RELEASE_CURRENT_CANDIDATE' })

export const toggleLinkedCandidateModal = (payload): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_LINKED_VACANCIES' })
  dispatch({ type: 'TOGGLE_LINKED_CANDIDATE_MODAL', payload })
}

export const getResumeSources = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  if (getState().candidates.sources.length) {
    return Promise.resolve()
  }
  dispatch({ type: 'GET_RESUME_SOURCES_REQ' })

  try {
    const req = await api.resume_sources()
    dispatch({ type: 'GET_RESUME_SOURCES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_RESUME_SOURCES_FAIL', payload: error.message })
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

export const getSpecialization = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  if (getState().candidates.specialization.length) {
    return Promise.resolve()
  }
  dispatch({ type: 'GET_SPECIALIZATION_REQ' })

  try {
    const req = await api.candidates.specialization()
    dispatch({ type: 'GET_SPECIALIZATION_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_SPECIALIZATION_FAIL', payload: error.message })
  }
}

export const getLanguagesLevel = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
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
  getState: GetState,
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

export const uploadFileToCandidate = (id: number, resumeId: number, file) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'UPLOAD_FILE_TO_CANDIDATE_REQ' })

  try {
    const base64 = await getBase64(file[0])
    const params = {
      resume_attributes: {
        id: resumeId,
        resume_documents_attributes: [
          {
            file: base64.target.result,
            name: file[0].name,
          },
        ],
      },
    }
    const req = await api.candidates.update(id, params)
    dispatch({ type: 'UPLOAD_FILE_TO_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'UPLOAD_FILE_TO_CANDIDATE_FAIL', payload: error.message })
  }
}
export const parsingFileToCandidate = file => async (dispatch: Dispatch) => {
  dispatch({ type: 'PARSING_FILE_TO_CANDIDATE_REQ' })

  try {
    const base64 = await getBase64(file[0])
    const params = {
      file: base64.target.result,
    }
    const req = await api.candidates.parsing(params)
    dispatch({ type: 'PARSING_FILE_TO_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'PARSING_FILE_TO_CANDIDATE_FAIL', payload: error.message })
  }
}

export const parsingReset = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'PARSING_RESET' })
}

export const changeStageCandidate = (id: number, chainId: number, stageId: number) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'CHANGE_STAGE_CANDIDATE_REQ' })

  try {
    const params = {
      candidate_vacancies_attributes: [
        {
          id: chainId,
          current_vacancy_stage_id: stageId,
        },
      ],
    }
    const req = await api.candidates.update(id, params)
    dispatch({ type: 'CHANGE_STAGE_CANDIDATE_RES', payload: req.data })
    toastr.success('Кандидат успешно переведен на другой этап')
  } catch (error) {
    dispatch({ type: 'CHANGE_STAGE_CANDIDATE_FAIL', payload: error.message })
    toastr.success('Кандидат не переведен на другой этап')
  }
}

export const sendComment = (
  id: number,
  candidateVacancyId: number,
  comment: string,
  vacancyStageId: number,
  userId: number,
) => async (dispatch, gState) => {
  dispatch({ type: 'SEND_CANDIDATE_COMMENT_REQ' })

  try {
    const { user } = gState()
    const params = {
      comment: {
        body: comment,
        account_id: user.id,
      }
    }
    const req = await api.candidates.sendComment(candidateVacancyId, params)
    dispatch({ type: 'SEND_CANDIDATE_COMMENT_RES', payload: req.data })
    toastr.success('Комментарий отправлен успешно')
  } catch (error) {
    dispatch({ type: 'SEND_CANDIDATE_COMMENT_FAIL', payload: error.message })
  }
}

export const sendRating = (
  userId: number,
  id: number,
  candidateVacancyId: number,
  value: number,
  vacancyStageId: number,
) => async (dispatch: Dispatch) => {
  dispatch({ type: 'SEND_RATING_REQ' })

  try {
    const params = {
      candidate_vacancies_attributes: [
        {
          id: candidateVacancyId,
          candidate_ratings_attributes: [
            {
              rating_type: 'passing',
              commenter_id: userId,
              value,
            },
          ],
          vacancy_stage_id: vacancyStageId,
        },
      ],
    }
    const req = await api.candidates.update(id, params)
    dispatch({ type: 'SEND_RATING_RES', payload: req.data })
    toastr.success('Оценка кандидату успешно выставлена')
  } catch (error) {
    dispatch({ type: 'SEND_RATING_FAIL', payload: error.message })
    toastr.error('Оценка кандидату не выставлена')
  }
}

export const linkCandidateToVacancy = (payload, getLightCandidate): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'LINK_CANDIDATE_TO_VACANCY_REQ' })

  try {
    const { vacancyId, candidateId } = payload

    const params = {
      candidate_vacancies_attributes: [{ vacancy_id: vacancyId }],
    }

    const req = await api.candidates.update(candidateId, params)
    dispatch({ type: 'LINK_CANDIDATE_TO_VACANCY_RES', payload: req.data })
    if (getLightCandidate){
      dispatch(getCurrentCandidateLight(candidateId))
    }
    toastr.success('Кандидат успешно добавлен в вакансию')
  } catch (error) {
    dispatch({ type: 'LINK_CANDIDATE_TO_VACANCY_FAIL', payload: error.message })
    toastr.error('Кандидат не добавлен в вакансию')
  }
}

export const advancedSearch = (page, query, { loadMore } = {}): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'RESET_CANDIDATES_GROUP', page: page})
  dispatch({ type: 'ADVANCED_SEARCH_CANDIDATE_REQ' })

  try {
    const perPage = getState().candidates.perPage
    const filter = getState().candidates.filter

    const params = query === '' ?
      {
        page,
        per_page: perPage
      } : {
        q: query,
        page,
        per_page: perPage
      }
    const form = getState().form
    if ((form['AdvancedSearch'] && form['AdvancedSearch'].values) || filter) {

      const values = page === 1 ? form['AdvancedSearch'].values : filter
      if (values.experience) {
        params.experience = values.experience.toString()
      }
      if (values.working_schedule) {
        params.working_schedule = values.working_schedule.toString()
      }
      if (values.employment_type) {
        params.employment_type = values.employment_type.toString()
      }
      if (values.city) {
        params.city = values.city.map(spec => spec.value).toString()
      }
      if (values.professional_specializations) {
        params.professional_specializations = values.professional_specializations
          .map(spec => spec.value)
          .toString()
      }
      if (values.vacancy_stage_groups) {
        params.vacancy_stage_groups = values.vacancy_stage_groups.map(spec => spec.value).toString()
      }
      if (values.vacancies) {
        params.vacancies = values.vacancies.map(spec => spec.value).toString()
      }
      if (!isEmpty(values.language[0]) && (typeof values.language[0] === 'object')){
        params.language = encodeURIComponent(
          values.language
            .map(spec => [spec.language_id.value, spec.language_level_id.value].toString())
            .reduce((sum, current) => `${sum}${current};`, ''),
        )
      }
      if (values.sort) {
        params.sort = values.sort.value
      }
      if (values.education_level) {
        params.education_level = values.education_level.toString()
      }
    }
    const req = await api.candidates.search(params)
    dispatch({ type: 'ADVANCED_SEARCH_CANDIDATE_RES', payload: req.data, page: page, filter: (form['AdvancedSearch'] && form['AdvancedSearch'].values) || ( !isEmpty(filter) && filter)})
  } catch (error) {
    dispatch({ type: 'ADVANCED_SEARCH_CANDIDATE_FAIL', payload: error.message })
  }
}

export const resetSearch = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_SEARCH_CANDIDATES' })
}

export const updateSearchState = (payload) => ({ type: 'UPDATE_CANDIDATES_SEARCH_STATE', payload })

export const toggleAdvancedSearch = () => ({ type: 'TOGGLE_ADVANCED_SEARCH' })

export const toggleSidebar = (payload) => ({ type: 'TOGGLE_SIDEBAR', payload })

export const closeSidebar = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'CLOSE_SIDEBAR' })
  dispatch(releaseCurrentCandidate())
}

export const setInitialResumeView = () => ({ type: 'SET_INITIAL_RESUME_VIEW' })

export const switchResumeView = payload => ({ type: 'SWITCH_RESUME_VIEW', payload })

export const clearSelectedCandidates = () => ({ type: 'CLEAR_SELECT_CANDIDATES' })
