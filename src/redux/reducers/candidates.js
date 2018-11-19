import { createSelector } from 'reselect'
import unionBy from 'lodash/unionBy'
import differenceBy from 'lodash/differenceBy'

const initialState = {
  search: {
    now: false,
    showAdvanced: false,
    query: '',
    data: [],
    count: null
  },
  data: [],
  page: 1,
  perPage: 30,
  groupId: null,
  groupCandidates: [],
  stats: [],
  scroll: true,
  current: null,
  openLinkedCandidateModal: false,
  sources: [],
  languages: [],
  languagesLevel: [],
  educationLevel: [],
  specialization: [],
  sidebar: {
    showSidebar: false,
    candidateId: null,
  },
  resumeTabSwitcher: 'resume',
  parsedResume: {
    fullName: {
      candidate_vacancies_attributes: [''],
    },
    contactInformation: {
      phones: [''],
      emails: [''],
      additional_contacts_attributes: [''],
    },
    basicInformation: {
      language_skills_attributes: [''],
    },
    resumeText: {},
    experience: {
      resume_work_experiences_attributes: [''],
    },
    achievements: {
      resume_educations_attributes: [''],
    },
    expectations: {},
    recommendations: {
      resume_recommendations_attributes: [''],
    },
  },
  select: [],
  filter: null,
}

const getGroupId = state => state.candidates.groupId
const isSearchNow = state => state.candidates.search.now
const getCandidates = state => state.candidates

export const currentVisibleCandidates = createSelector(
  [getGroupId, isSearchNow, getCandidates], (groupId, searchNow, candidates) => {
    if (searchNow) {
      return candidates.search.data
    } else if (groupId) {
      return candidates.groupCandidates
    } else {
      return candidates.data
    }
  }
)

export const currentGroup = createSelector(
  [getGroupId, getCandidates], (groupId, candidates) => {
    if (groupId === null) {
      return { label: 'Все', value: 'all' }
    } else if (groupId === -1) {
      return { label: 'Свободные', value: 'free' }
    } else {
      return candidates.stats.vacancy_stage_groups.find(g => g.id === groupId)
    }
  }
)

function preferredContact(contacts) {
  if (contacts.length === 0) return '0-phone'
  const contact = contacts.find(item => item.preferred)
  let prefer = ''
  let emails = 0
  let phones = 0
  if (!contact) return '0-phone'
  contacts.forEach((item) => {
    if(item.preferred && item.contact_type === 'email') {
      prefer = `${emails}-${item.contact_type}`
    }
    if(item.preferred && item.contact_type === 'phone') {
      prefer = `${phones}-${item.contact_type}`
    }
    if(item.contact_type === 'email') emails = emails + 1
    if(item.contact_type === 'phone') phones = phones + 1
  })
  return prefer
  // if (contact.contact_type === 'skype') {
  //   return contact.contact_type
  // }
  // if (contact.contact_type === 'email' || contact.contact_type === 'phone') {
  //   const key = contacts.find((item, key) => item.preferred && key)
  //   return `${key}-${contact.contact_type}`
  // }
}

function parsingData(data) {
  const { resume } = data
  let email = resume.resume_contacts.filter(it => it.contact_type === 'email')
  let phone = resume.resume_contacts.filter(it => it.contact_type === 'phone')

  return {
    fullName: {
      city: resume.city,
      first_name: resume.first_name,
      last_name: resume.last_name,
      middle_name: resume.middle_name,
      resume_source_id: resume.resume_source_id,
      candidate_vacancies_attributes: [''],
      photo: resume.photo.url,
      raw_resume_doc_id: resume.raw_resume_doc_id,
      remote_resume_file_url: resume.resume_file.url,
      parsed: resume.parsed,
    },
    contactInformation: {
      emails: email.length > 0 ? resume.resume_contacts.filter(item => item.contact_type === 'email').map(item => ({ email: item.value })) : [''],
      phones: phone.length > 0 ? resume.resume_contacts.filter(item => item.contact_type === 'phone').map(item => ({ phone: item.value.split(' ').join('') })) : [''],
      skype: resume.resume_contacts.find(item => item.contact_type === 'skype') ?
        resume.resume_contacts.find(item => item.contact_type === 'skype').value : '',
      preferred_contact_type: preferredContact(resume.resume_contacts),
      additional_contacts_attributes:
        Array.isArray(resume.additional_contacts) &&
        resume.additional_contacts.length > 0 ? resume.additional_contacts : [''],
    },
    tabResume: {
      resume_text: resume.resume_text,
    },
    basicInformation: {
      birthdate: resume.birthdate,
      sex: resume.sex,
      skills: resume.skill_list,
      skills_description: resume.skills_description,
      language_skills_attributes: resume.language_skills,
    },
    experience: {
      resume_work_experiences_attributes: resume.resume_work_experiences.length > 0 ?
        resume.resume_work_experiences.map(item => {
          return {
            ...item,
            nowadays: !item.end_date,
          }
        }) :
        [''],
    },
    achievements: {
      education_level_id: resume.education_level_id,
      resume_educations_attributes:
        resume.resume_educations.length > 0
          ? resume.resume_educations.map(item => {
            return {
              ...item,
              end_year: item.end_year && `${item.end_year}`,
            }
          })
          : [''],
      resume_courses_attributes:
        resume.resume_courses && resume.resume_courses.length > 0 ?
          resume.resume_courses.map(item => {
            return {
              ...item,
              end_year: item.end_year && `${item.end_year}`,
            }
          }) : [''],
      resume_certificates_attributes:
        resume.resume_certificates && resume.resume_certificates.length > 0 ?
          resume.resume_certificates.map(item => {
            return {
              ...item,
              company_name: item.company_name && `${item.company_name}`,
              name: item.name && `${item.name}`,
              end_date: item.end_date && `${item.end_date}`,
            }
          }) : [''],

    },
    tabExpectations: {
      salary_level: resume.salary_level,
      experience: resume.experience && Object.keys(resume.experience),
      working_schedule: resume.working_schedule && Object.keys(resume.working_schedule),
      employment_type: resume.employment_type && Object.keys(resume.employment_type),
      comment: resume.comment,
      desired_position: resume.desired_position,
    },
    tabRecommendations: {
      resume_recommendations_attributes:
        resume.resume_recommendations.length > 0 ?
          resume.resume_recommendations.map(item => {
            return {
              ...item,
              phone: item.phone ? item.phone : [''],
              email: item.email ? item.email : [''],
            }
          }) :
          [{
            recommender_name: '',
            company_and_position: '',
            phone: [''],
            email: [''],
          }],
    },
  }
}

function updateComment(state, comment) {
  const { current } = state
  if (comment.success){
    const candidateVacancy = current.candidate_vacancies.find(it => (it.id === comment.data.commentable_id))
    candidateVacancy.comments.push(comment.data)
    current.candidate_changes = [
      {
        id: `100000${comment.data.id}`,
        change_type: "comment_added",
        change_for: comment.data,
        account: comment.data.account,
      },
      ...current.candidate_changes,
    ]
  }
  return {
    ...state,
    current,
  }
}

function changedCandidate(list, payload) {
  return list.map(candidate => {
    if (candidate.id === payload.id) {
      return payload
    }
    return candidate
  })
}

function changedCandidates(list, payload) {
  return list.map(candidate => {
    const newCandidate = payload.find(({ id }) => candidate.id === id )
    if (newCandidate) {
      return newCandidate
    }
    return candidate
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebar: action.payload }
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebar: initialState.sidebar }
    case 'TOGGLE_ADVANCED_SEARCH':
      return {
        ...state,
        search: { ...state.search, showAdvanced: !state.search.showAdvanced }
      }
    case 'UPDATE_CANDIDATES_SEARCH_STATE':
      return {
        ...state,
        search: { ...state.search, ...action.payload }
      }
    case 'GET_CANDIDATES_RES':
      return {
        ...state,
        data: unionBy(state.data, action.payload.data, 'id'),
        scroll: action.payload.data.length === state.perPage,
        page: action.page + 1,
      }
    case 'GET_CANDIDATES_GROUP_RES':
      return {
        ...state,
        groupCandidates: unionBy(state.groupCandidates, action.payload.data, 'id'),
        scroll: action.payload.data.length === state.perPage,
        page: action.page + 1,
      }
    case 'GET_CURRENT_CANDIDATE_RES':
    case 'UPLOAD_FILE_TO_CANDIDATE_RES':
    case 'LINK_CANDIDATE_TO_VACANCY_RES':
      return { ...state, current: action.payload }
    case 'SEND_CANDIDATE_COMMENT_RES':
      return updateComment(state, action.payload)
    case 'UPDATE_CURRENT_CANDIDATE_RES':
    case 'CHANGE_STAGE_CANDIDATE_RES':
    case 'SEND_RATING_RES':
      return {
        ...state,
        current: action.payload,
        data: changedCandidate(state.data, action.payload),
      }
    case 'RELEASE_CURRENT_CANDIDATE':
      return { ...state, current: initialState.current }
    case 'RESET_CANDIDATES_GROUP':
      return { ...state, groupCandidates: initialState.groupCandidates, page: action.page, groupId: initialState.groupId }
    case 'RESET_CANDIDATES':
      return { ...state, data: initialState.data, groupCandidates: initialState.groupCandidates, page: initialState.page, groupId: initialState.groupId }
    case 'GET_CANDIDATES_STATS_RES':
      return { ...state, stats: action.payload }
    case 'TOGGLE_LINKED_CANDIDATE_MODAL':
      return { ...state, openLinkedCandidateModal: action.payload }
    case 'ADVANCED_SEARCH_CANDIDATE_RES':
      return {
        ...state,
        search: {
          ...state.search,
          count: action.payload.count,
          now: true,
          data: state.page === 1 ? action.payload.data : [...state.search.data, ...action.payload.data],
        },
        scroll: action.payload.data.length === state.perPage,
        page: state.page + 1,
        filter: action.filter,
      }
    // case 'RESET_ADVANCED_SEARCH_CANDIDATE_RES':
    //   return { ...state, search: initialState.search }
    case 'GET_SELECT_CANDIDATES_RES':
      return { ...state, select: action.payload }
    case 'CLEAR_SELECT_CANDIDATES':
      return { ...state, select: initialState.select }
    case 'RESET_SEARCH_CANDIDATES':
      return { ...state, search: initialState.search , filter: null}
    case 'GET_RESUME_SOURCES_RES':
      return { ...state, sources: action.payload }
    case 'GET_LANGUAGES_RES':
      return { ...state, languages: action.payload }
    case 'GET_LANGUAGES_LEVEL_RES':
      return { ...state, languagesLevel: action.payload }
    case 'GET_SPECIALIZATION_RES':
      return { ...state, specialization: action.payload }
    case 'GET_EDUCATION_LEVEL_RES':
      return { ...state, educationLevel: action.payload }
    case 'PARSING_FILE_TO_CANDIDATE_RES':
      return { ...state, parsedResume: parsingData(action.payload) }
    case 'CREATE_CANDIDATE_RES':
    case 'PARSING_RESET':
      return { ...state, parsedResume: initialState.parsedResume }
    case 'REPLACE_CANDIDATES_AFTER_VACANCY_LINK':
      return {
        ...state,
        data: changedCandidates(state.data, action.payload),
      }
    case 'GET_CANDIDATES_GROUP_REQ':
      return {...state, groupId: action.payload.groupId }
    case 'SET_INITIAL_RESUME_VIEW':
      return { ...state, resumeTabSwitcher: initialState.resumeTabSwitcher }
    case 'SWITCH_RESUME_VIEW':
      return { ...state, resumeTabSwitcher: action.payload }
    case 'CREATE_CANDIDATE_REQ':
    case 'CREATE_CANDIDATE_FAIL':
    case 'PARSING_FILE_TO_CANDIDATE_REQ':
    case 'PARSING_FILE_TO_CANDIDATE_FAIL':
    case 'GET_CURRENT_CANDIDATE_REQ':
    case 'GET_CANDIDATES_GROUP_FAIL':
    case 'UPDATE_CURRENT_CANDIDATE_REQ':
    case 'GET_CURRENT_CANDIDATE_FAIL':
    case 'UPDATE_CURRENT_CANDIDATE_FAIL':
    case 'GET_RESUME_SOURCES_REQ':
    case 'GET_RESUME_SOURCES_FAIL':
    case 'GET_LANGUAGES_REQ':
    case 'GET_LANGUAGES_FAIL':
    case 'GET_SPECIALIZATION_REQ':
    case 'GET_SPECIALIZATION_FAIL':
    case 'GET_LANGUAGES_LEVEL_REQ':
    case 'GET_LANGUAGES_LEVEL_FAIL':
    case 'GET_EDUCATION_LEVEL_REQ':
    case 'GET_EDUCATION_LEVEL_FAIL':
    case 'UPLOAD_FILE_TO_CANDIDATE_REQ':
    case 'UPLOAD_FILE_TO_CANDIDATE_FAIL':
    case 'CHANGE_STAGE_CANDIDATE_REQ':
    case 'CHANGE_STAGE_CANDIDATE_FAIL':
    case 'SEND_CANDIDATE_COMMENT_REQ':
    case 'SEND_CANDIDATE_COMMENT_FAIL':
    case 'SEND_RATING_REQ':
    case 'SEND_RATING_FAIL':
    case 'ADVANCED_SEARCH_CANDIDATE_REQ':
    case 'ADVANCED_SEARCH_CANDIDATE_FAIL':
    case 'GET_SELECT_CANDIDATES_FAIL':
    case 'GET_SELECT_CANDIDATES_REQ':
    case 'GET_CANDIDATES_STATS_REQ':
    case 'GET_CANDIDATES_STATS_FAIL':
      return state
    default:
      return state
  }
}
