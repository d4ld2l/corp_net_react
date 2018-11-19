// @flow

// Pattern for prettier run
// prettier --config ./.prettierrc  --write './src/api/*'

import axios from 'axios'
import { isEmpty } from 'lodash'

import url from 'lib-folder/url'
import serialize from 'lib-folder/serialize'

import type { Api } from 'types-folder/api'

import {
  APP_SETTINGS,
  API_URL,
  BIRTHDATES_NEAREST_URL,
  CANDIDATES_URL,
  CANDIDATE_URL,
  CANDIDATE_VACANCIES,
  ACCOUNTS_URL,
  GET_TICKET_URL,
  DICTIONARIES_RESUME_SOURCES_URL,
  DICTIONARIES_LANGUAGES_URL,
  DICTIONARIES_LANGUAGES_LEVEL_URL,
  DICTIONARIES_EDUCATION_LEVEL_URL,
  DICTIONARIES_NEWS_CATEGORY_URL,
  DICTIONARIES_VACANCY_STAGE_GROUP_URL,
  DICTIONARIS_EVENT_TYPE_URL,
  DICTIONARIES_SPECIALIZATION_URL,
  PROFILE_URL,
  PROFILE_PHOTOS_URL,
  PROFILE_PHOTO_URL,
  EVENTS_URL,
  EVENT_URL,
  EVENT_PARTICIPANTS,
  SIGN_IN_URL,
  LOGOUT_URL,
  TEMPLATE_STAGES_URL,
  NEWS_URL,
  NEW_URL,
  PROFILE_ME_URL,
  PERMISSIONS_MY_URL,
  SURVEYS_URL,
  SURVEY_URL,
  SURVEY_RESULTS_URL,
  DICTIONARIES_TAG_URL,
  VACANCIES_URL,
  VACANCY_URL,
  VACANCY_CHANGE_STATE_URL,
  VACANCY_STAGES_GROUPS,
  EMAIL_NOTIFICATION,
  DEPARTMENTS_TREE_URL,
  SERVICES_URL,
  SERVICE_URL,
  BIDS_URL,
  BIDS_AUTHOR_URL,
  BIDS_EXECUTOR_URL,
  BID_URL,
  BID_STATES_URL,
  BID_ALLOWED_STATES_URL,
  BID_CHANGE_STATE_URL,
  BID_STB_PARTICIPANTS_STATE_URL,
  CUSTOMERS_URL,
  CUSTOMERS_CONTACTS_URL,
  CUSTOMERS_CONTACT_URL,
  COMMENT_CUSTOMERS_CONTACT_URL,
  LEGAL_UNITS_URL,
  PROJECTS_URL,
  FEEDS_URL,
  CONFIRM_SKILL_URL,
  UNCONFIRM_SKILL_URL,
  USERS_COUNTER_URL,
  DISTRIBUTIONS_URL,
  DISTRIBUTION_URL,
  COMPARISON_SAVE_BOTH,
  COMPARISON_SAVE_ONE,
  FILTERED_ANALYTICS_STAGES_GROUPS,
  DEPARTMENTS_URL,
  PROJECT_URL,
  PROJECTS_DICRTIONARY_URL,
  PROFILES_PROJECT_URL,
  PROFILE_PROJECT_URL,
  UPDATE_PASSWORD_URL,
  GENERATE_NEW_PASSWORD_URL,
  RESET_NEW_PASSWORD_URL,
  TASKS_URL,
  TASK_URL,
  SUBTASKS_URL,
  SUBTASK_URL,
  PROFILE_HR_URL,
  DICTIONARIES_OFFICES_URL,
  DICTIONARIES_ACCOUNTS_URL,
  DICTIONARIES_STRUCTURE_UNITS_URL,
  DICTIONARIES_CONTACT_TYPES_URL,
  DICTIONARIES_EMPLOYEE_STATES_URL,
  DICTIONARIES_POSITIONS_URL,
  DICTIONARIES_PROJECTS_URL,
  DISCUSSIONABLE_URL,
  DISCUSSIONS_URL,
  DISCUSSION_URL,
  DICTIONARIES_SKILLS_URL,
  DICTIONARIES_CITIES_URL,
  VACANCY_STAGES_URL,
  VACANCY_CANDIDATES_URL,
  VACANCY_CANDIDATE_URL,
  CANDIDATE_RATINGS_URL,
  TRANSFER_CANDIDATE_URL,
  DICTIONARIES_DEPARTMENTS_URL,
  DICTIONARIES_DEPARTMENTS_NAMES_URL,
  DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_URL,
  DICTIONARIES_CANDIDATE_SKILLS_URL,
  DICTIONARIES_VACANCIES_URL,
  LOGGIN_SETTINGS_URL,
  LEGAL_UNITS_DICTIONARY_URL,
  DICTIONARIES_SEARCH_SKILLS_URL,
  ASSESSMENT_SESSIONS_URL,
  ASSESSMENT_SESSION_URL,
  EVALUATIONS_ASSESSMENT_SESSION_URL,
  ASSESSMENT_SESSION_RESULT_URL,
} from 'api-folder/urls'
import projectsData from 'redux-folder/reducers/projectsData'

export default ({
  auth: {
    signin: params => axios.post(SIGN_IN_URL, params),
    logout: () => axios.post(LOGOUT_URL),
    changePass: params => axios.patch(UPDATE_PASSWORD_URL, params),
    generateNewPass: params => axios.post(GENERATE_NEW_PASSWORD_URL, params),
    resetNewPass: params => axios.post(RESET_NEW_PASSWORD_URL, params),
  },
  requestSocketHandshakeKey: () => axios.get(GET_TICKET_URL),
  settings: {
    update: () => axios(APP_SETTINGS),
  },
  ui: {
    logginSettings: params => axios.get(LOGGIN_SETTINGS_URL, params),
  },
  news: {
    create: params => axios.post(NEWS_URL, params),
    all: () => axios(NEWS_URL),
    where: params => axios.get(NEWS_URL, params),
    findById: id => axios(url(NEW_URL, { id })),
    categories: () => axios(DICTIONARIES_NEWS_CATEGORY_URL),
    sendComment: (id, comment) => axios.post(`${NEWS_URL}/${id}/comments`, { comment }),
    deleteComment: (id, commentId) => axios.delete(`${NEWS_URL}/${id}/comments/${commentId}`),
    updateComment: (id, comment) =>
      axios.put(`${NEWS_URL}/${id}/comments/${comment.id}`, { comment }),
    like: id => axios.post(`${NEWS_URL}/${id}/like`),
    dislike: id => axios.delete(`${NEWS_URL}/${id}/unlike`),
    likeComment: (id, commentId) => axios.post(`${NEWS_URL}/${id}/comments/${commentId}/like`),
    dislikeComment: (id, commentId) =>
      axios.delete(`${NEWS_URL}/${id}/comments/${commentId}/unlike`),
  },
  birthdates: {
    nearest: () => axios.get(BIRTHDATES_NEAREST_URL),
  },
  comparison: {
    saveBoth: params => axios.post(COMPARISON_SAVE_BOTH, params),
    saveOne: params => axios.post(COMPARISON_SAVE_ONE, params),
  },
  candidates: {
    all: (page, per_page) => axios(`${CANDIDATES_URL}${serialize({ page, per_page })}`),
    freeCandidates: (page, per_page) =>
      axios(`${CANDIDATES_URL}${serialize({ unassigned: true, page, per_page })}`),
    stats: () => axios(VACANCY_STAGES_GROUPS),
    update: (id, params) => axios.put(url(CANDIDATE_URL, { id }), { candidate: params }),
    findById: id => axios(url(CANDIDATE_URL, { id })),
    light: id => axios(url(`${CANDIDATE_URL}?light=true`, { id })),
    whereGroupId: (id, page, per_page) =>
      axios(url(`${CANDIDATES_URL}${serialize({ vacancy_stage_group_id: id, page, per_page })}`)),
    create: params => axios.post(CANDIDATES_URL, { candidate: params }),
    select: (ids, count) =>
      axios(url(`${CANDIDATES_URL}?select=${ids}${count ? `&per_page=${count}` : ''}`)),
    selectIndex: ids => axios(url(`${CANDIDATES_URL}?select=${ids}&response_format=index`)),
    search: params => axios(url(`${CANDIDATES_URL}${serialize(params)}`)),
    advancedSearch: params => axios(url(`${CANDIDATES_URL}${serialize(params)}`)),
    parsing: params => axios.post(`${CANDIDATES_URL}/parse_file`, params),
    specialization: () => axios(DICTIONARIES_SPECIALIZATION_URL),
    sendComment: (candidateId, params) =>
      axios.post(url(CANDIDATE_VACANCIES, { id: candidateId }), params),
  },
  employees: {
    findById: id => axios(url(PROFILE_URL, { id })),
    search: params => axios.get(ACCOUNTS_URL, params),
    update: (id, params) => axios.put(url(PROFILE_URL, { id }), params),
    all: per_page => axios(`${ACCOUNTS_URL}${serialize({ per_page })}`),
    confirmSkill: id => axios.put(url(CONFIRM_SKILL_URL, { id })),
    unconfirmSkill: id => axios.delete(url(UNCONFIRM_SKILL_URL, { id })),
    pagination: (page, per_page, searchParams, filterParams) =>
      axios(
        `${ACCOUNTS_URL}${serialize({ page, per_page })}${serialize(searchParams, true)}${serialize(
          filterParams,
          true
        )}`
      ),
    searchPagination: (q, page, per_page) =>
      axios(`${ACCOUNTS_URL}${serialize({ q, page, per_page })}`),
    sortingPagination: (starts_with, page, per_page) =>
      axios(`${ACCOUNTS_URL}${serialize({ starts_with, page, per_page })}`),
    getPhotos: accountId => axios.get(url(PROFILE_PHOTOS_URL, { accountId })),
    createPhoto: (accountId, params) => axios.post(url(PROFILE_PHOTOS_URL, { accountId }), params),
    updatePhoto: (accountId, id, params) =>
      axios.put(url(PROFILE_PHOTO_URL, { accountId, id }), params),
    deletePhoto: (accountId, id) => axios.delete(url(PROFILE_PHOTO_URL, { accountId, id })),
    setAsAvatar: (accountId, id) =>
      axios.put(url(PROFILE_PHOTO_URL, { accountId, id }) + '/set_as_avatar'),
  },
  events: {
    all: () => axios(EVENTS_URL),
    findById: id => axios(url(EVENT_URL, { id })),
    types: () => axios.get(DICTIONARIS_EVENT_TYPE_URL),
    create: params => axios.post(EVENTS_URL, params),
    update: (id, params) => axios.put(url(EVENT_URL, { id }), params),
    delete: id => axios.delete(url(EVENT_URL, { id })),
    searchParticipants: q => axios(`${EVENT_PARTICIPANTS}${serialize({ q })}`),
    ...discussionable(EVENT_URL),
  },
  profiles: {
    all: () => axios(ACCOUNTS_URL),
    me: () => axios.get(PROFILE_ME_URL),
  },
  permissions: {
    my: () => axios.get(PERMISSIONS_MY_URL),
  },
  surveys: {
    all: (scope, page, per_page) => axios(`${SURVEYS_URL}${serialize({ scope, page, per_page })}`),
    findById: id => axios(url(SURVEY_URL, { id })),
    create: params => axios.post(SURVEYS_URL, params),
    search: (q, scope, page, per_page) =>
      axios(`${SURVEYS_URL}${serialize({ q, scope, page, per_page })}`),
    save: params => axios.put(url(SURVEY_URL, { id: params.id }), params),
    delete: id => axios.delete(url(SURVEY_URL, { id })),
    saveResults: params => axios.post(SURVEY_RESULTS_URL, params),
    ...discussionable(SURVEY_URL),
  },
  users_admin: {
    where: params => axios.get(ACCOUNTS_URL, params),
  },
  vacancies: {
    myVacancies: page =>
      axios(
        `${VACANCIES_URL}${serialize({
          scope: 'as_creator_or_owner',
          status: 'worked,paused',
          page,
        })}`
      ),
    allMyVacancies: page => axios(`${VACANCIES_URL}${serialize({ page })}`),
    all: (page, per_page, status) =>
      axios(`${VACANCIES_URL}${serialize({ scope: 'all', page, per_page, status })}`),
    my: (page, per_page, status) =>
      axios(`${VACANCIES_URL}${serialize({ scope: 'my', page, per_page, status })}`),
    withStages: stage => axios(`${VACANCIES_URL}${serialize({ status: stage })}`),
    changeState: (id, state) =>
      axios.patch(
        url(VACANCY_CHANGE_STATE_URL, {
          id,
          state,
        })
      ),
    findBy: params => axios.post(VACANCIES_URL, params),
    update: (id, params) => axios.put(url(VACANCY_URL, { id }), params),
    stats: scope => axios(`${VACANCIES_URL}/stats${serialize(scope)}`),
    findById: id => axios(url(VACANCY_URL, { id })),
    emailNotifications: params => axios.post(url(EMAIL_NOTIFICATION), params),
    ...discussionable(VACANCY_URL),
  },
  vacancyCard: {
    getVacancyStages: id => axios(url(VACANCY_STAGES_URL, { id })),
    getVacancyCandidates: (id, page, per_page, searchParams, filterParams) =>
      axios(
        `${url(VACANCY_CANDIDATES_URL, { id })}${serialize({ page, per_page })}${serialize(
          searchParams,
          true
        )}${serialize(filterParams, true)}`
      ),
    getVacancyCandidate: (vacancyId, candidateId) =>
      axios(url(VACANCY_CANDIDATE_URL, { vacancyId, candidateId })),
    sendRate: params => axios.post(CANDIDATE_RATINGS_URL, params),
    sendComment: (candidateId, params) =>
      axios.post(url(CANDIDATE_VACANCIES, { id: candidateId }), params),
    transferCandidate: (vacancyId, params) =>
      axios.put(url(TRANSFER_CANDIDATE_URL, { vacancyId }), params),
  },
  tags: {
    all: () => axios.get(DICTIONARIES_TAG_URL),
  },
  vacancy_stage_group: () => axios.get(DICTIONARIES_VACANCY_STAGE_GROUP_URL),
  template_stages: () => axios.get(TEMPLATE_STAGES_URL),
  resume_sources: () => axios(DICTIONARIES_RESUME_SOURCES_URL),
  languages: () => axios(DICTIONARIES_LANGUAGES_URL),
  languagesLevel: () => axios(DICTIONARIES_LANGUAGES_LEVEL_URL),
  educationLevel: () => axios(DICTIONARIES_EDUCATION_LEVEL_URL),
  departments: {
    tree: () => axios(DEPARTMENTS_TREE_URL),
    all: () => axios(DEPARTMENTS_URL),
  },
  services: {
    all: () => axios(SERVICES_URL),
    find: id => axios(url(SERVICE_URL, { id })),
  },
  bids: {
    change_state: (id, state) => axios.put(url(BID_CHANGE_STATE_URL, { id, state })),
    allowed_states: id => axios(url(BID_ALLOWED_STATES_URL, { id })),
    states: id => axios(url(BID_STATES_URL, { id })),
    author: (page, per_page, params) =>
      axios(`${BIDS_AUTHOR_URL}${serialize({ page, per_page, ...params })}`), // { service_id, manager_id, created_from, created_to, bid_stage_codes } = {}
    executor: (page, per_page, params) =>
      axios(`${BIDS_EXECUTOR_URL}${serialize({ page, per_page, ...params })}`),
    create: params => axios.post(BIDS_URL, params),
    update: (id, params) => axios.patch(url(BID_URL, { id }), params),
    find: id => axios(url(BID_URL, { id })),
    stbParticipants: (id, params) =>
      axios(`${url(BID_STB_PARTICIPANTS_STATE_URL, { id })}${serialize(params)}`),
    ...discussionable(BID_URL),
  },
  customers: {
    all: () => axios(CUSTOMERS_URL),
    create: params => axios.post(CUSTOMERS_URL, { customer: params }),
  },
  customerContacts: {
    all: (customerId, page, per_page) =>
      axios(`${url(CUSTOMERS_CONTACTS_URL, { customerId })}${serialize({ page, per_page })}`),
    get: (customerId, id) => axios.get(url(CUSTOMERS_CONTACT_URL, { customerId, id })),
    create: (customerId, params) =>
      axios.post(url(CUSTOMERS_CONTACTS_URL, { customerId }), { customer_contact: params }),
    update: (customerId, id, params) =>
      axios.put(url(CUSTOMERS_CONTACT_URL, { customerId, id }), { customer_contact: params }),
    delete: (customerId, id) => axios.delete(url(CUSTOMERS_CONTACT_URL, { customerId, id })),
    addComment: (customerId, id, comment) =>
      axios.post(url(COMMENT_CUSTOMERS_CONTACT_URL, { customerId, id }), { comment }),
    search: (customerId, q, page, per_page) =>
      axios(`${url(CUSTOMERS_CONTACTS_URL, { customerId })}${serialize({ q, page, per_page })}`),
  },
  legal_units: {
    all: () => axios(LEGAL_UNITS_URL),
  },
  feeds: {
    all: limit => axios(`${FEEDS_URL}${serialize({ limit })}`),
    post: id => axios(`${FEEDS_URL}/${id}`),
    search: (q, scope) => axios(`${FEEDS_URL}${serialize({ q, scope })}`),
    getAllTags: () => axios(DICTIONARIES_TAG_URL),
    createPost: post => axios.post(FEEDS_URL, { post }),
    updatePost: post => axios.put(`${FEEDS_URL}/${post.id}`, { post }),
    deletePost: id => axios.delete(`${FEEDS_URL}/${id}`),
    like: id => axios.post(`${FEEDS_URL}/${id}/like`),
    dislike: id => axios.delete(`${FEEDS_URL}/${id}/unlike`),
    likeComment: (id, commentId) => axios.post(`${FEEDS_URL}/${id}/comments/${commentId}/like`),
    dislikeComment: (id, commentId) =>
      axios.delete(`${FEEDS_URL}/${id}/comments/${commentId}/unlike`),
    sendComment: (id, comment) => axios.post(`${FEEDS_URL}/${id}/comments`, { comment }),
    deleteComment: (id, commentId) => axios.delete(`${FEEDS_URL}/${id}/comments/${commentId}`),
    updateComment: (id, comment) =>
      axios.put(`${FEEDS_URL}/${id}/comments/${comment.id}`, { comment }),
    setInFavorites: id => axios.post(`${FEEDS_URL}/${id}/to_favorites`),
    delInFavorites: id => axios.delete(`${FEEDS_URL}/${id}/from_favorites`),
    filtered: (scope, limit) =>
      axios(
        `${FEEDS_URL}${serialize({
          scope,
          limit,
        })}`
      ),
    pagination: (limit, offset) =>
      axios(
        `${FEEDS_URL}${serialize({
          limit,
          offset,
        })}`
      ),
    paginationFiltered: (limit, offset, scope) =>
      axios(`${FEEDS_URL}${serialize({ limit, offset, scope })}`),
  },
  projects: {
    all: per_page => axios(`${PROJECTS_URL}${serialize({ per_page })}`),
    ...discussionable(PROJECT_URL),
  },
  projectsData: {
    all: per_page => axios(`${PROJECTS_URL}${serialize({ per_page })}`),
    pagination: (page, per_page, activeTabMy, filterParams, searchParams) =>
      axios(
        `${PROJECTS_URL}${serialize({ page, per_page })}${serialize(filterParams, true)}${serialize(
          searchParams,
          true
        )}${activeTabMy ? '&only_my=true' : ''}`
      ),
    create: params => axios.post(PROJECTS_URL, params),
    update: (id, params) => axios.put(`${PROJECTS_URL}/${id}`, params),
    getProject: id => axios(url(PROJECT_URL, { id })),
    getDictionary: params => axios(`${PROJECTS_DICRTIONARY_URL}${serialize(params, true)}`),
  },
  profilesProject: {
    pagination: (id, page, per_page, filterParams, searchParams) =>
      axios(
        `${url(PROFILES_PROJECT_URL, { id })}${serialize({ page, per_page })}${serialize(
          filterParams,
          true
        )}${serialize(searchParams, true)}`
      ),
    getProfileProject: (id, project_id) => axios(`${url(PROFILE_PROJECT_URL, { id, project_id })}`),
    deleteParticipant: (id, project_id) =>
      axios.delete(`${url(PROFILE_PROJECT_URL, { id, project_id })}`),
    repairParticipant: (id, project_id) =>
      axios.post(`${url(PROFILE_PROJECT_URL, { id, project_id })}/repair`),
    createProfileProject: (id, params) =>
      axios.post(`${url(PROFILES_PROJECT_URL, { id })}`, params),
    updateProfileProject: (id, profile_project_id, params) =>
      axios.put(`${url(PROFILES_PROJECT_URL, { id })}/${profile_project_id}`, params),
  },
  profilesHr: {
    pagination: (hr, page, per_page, searchParams, filterParams) =>
      axios(
        `${ACCOUNTS_URL}${serialize({ page, per_page, hr })}${serialize(
          searchParams,
          true
        )}${serialize(filterParams, true)}`
      ),
    getProfileHr: id => axios(`${url(PROFILE_HR_URL, { id })}`),
  },

  tasks: {
    all: (page, per_page, status, scope, resourceName, resourceId) => {
      let path =
        resourceName && resourceId ? `${API_URL}/${resourceName}/${resourceId}/tasks` : TASKS_URL
      let result = `${path}${serialize({ page, per_page, status, scope })}`

      return axios(result)
    },
    get: id => axios.get(url(TASK_URL, { id })),
    create: (params, resourceName, resourceId) => {
      let path =
        resourceName && resourceId ? `${API_URL}/${resourceName}/${resourceId}/tasks` : TASKS_URL

      return axios.post(path, params)
    },
    update: (id, params) => axios.put(url(TASK_URL, { id }), params),
    delete: id => axios.delete(url(TASK_URL, { id })),
    search: (q, page, per_page) => axios(`${TASKS_URL}${serialize({ q, page, per_page })}`),
    ...discussionable(TASK_URL),
  },

  subtasks: {
    all: task_id => axios(url(SUBTASKS_URL, { task_id })),
    get: (task_id, id) => axios.get(url(SUBTASK_URL, { task_id, id })),
    create: (task_id, params) => axios.post(url(SUBTASKS_URL, { task_id }), params),
    update: (task_id, id, params) => axios.put(url(SUBTASK_URL, { task_id, id }), params),
    delete: (task_id, id) => axios.delete(url(SUBTASK_URL, { task_id, id })),
  },

  system: {
    usersCounter: () => axios(USERS_COUNTER_URL),
  },
  distribution: {
    all: () => axios(DISTRIBUTIONS_URL),
    create: params => axios.post(DISTRIBUTIONS_URL, params),
    update: (id, params) => axios.put(url(DISTRIBUTION_URL, { id }), params),
    delete: id => axios.delete(`${DISTRIBUTIONS_URL}/${id}`),
    ...discussionable(DISTRIBUTION_URL),
  },
  analytics: {
    stats: () => axios(FILTERED_ANALYTICS_STAGES_GROUPS),
    filteredStats: params => axios(`${FILTERED_ANALYTICS_STAGES_GROUPS}${serialize(params)}`),
  },
  discussion: {
    all: params => axios.get(DISCUSSIONS_URL, { params }),
    get: id => axios.get(url(DISCUSSION_URL, { id })),
    create: discussion => axios.post(DISCUSSIONS_URL, discussion),
    update: (id, discussion) => axios.put(url(DISCUSSION_URL, { id }), discussion),
    delete: ids => axios.delete(`${DISCUSSIONS_URL}${serialize({ select: ids.join(',') })}`),
    filters: () => axios.get(`${DISCUSSIONS_URL}/filters`),
    open: ids => axios.put(`${DISCUSSIONS_URL}/open${serialize({ select: ids.join(',') })}`),
    close: ids => axios.put(`${DISCUSSIONS_URL}/close${serialize({ select: ids.join(',') })}`),
    like: id => axios.post(`${url(DISCUSSION_URL, { id })}/like`),
    dislike: id => axios.delete(`${url(DISCUSSION_URL, { id })}/unlike`),
    join: id => axios.post(`${url(DISCUSSION_URL, { id })}/join`),
    leave: id => axios.delete(`${url(DISCUSSION_URL, { id })}/leave`),
    add_discussers: (id, params) =>
      axios.post(`${url(DISCUSSION_URL, { id })}/add_discussers`, params),
    remove_discussers: (id, params) =>
      axios.delete(`${url(DISCUSSION_URL, { id })}/remove_discussers`, params),
    counters: () => axios.get(`${DISCUSSIONS_URL}/counters`),
    favorites: {
      add: ids =>
        axios.post(`${DISCUSSIONS_URL}/to_favorites${serialize({ select: ids.join(',') })}`),
      remove: ids =>
        axios.delete(`${DISCUSSIONS_URL}/from_favorites${serialize({ select: ids.join(',') })}`),
    },
    comment: {
      all: (id, params) => axios.get(`${url(DISCUSSION_URL, { id })}/comments${serialize(params)}`),
      get: (id, commentId) => axios.get(`${url(DISCUSSION_URL, { id })}/comments/${commentId}`),
      create: (id, comment) => axios.post(`${url(DISCUSSION_URL, { id })}/comments/`, comment),
      update: (id, commentId, comment) =>
        axios.put(`${url(DISCUSSION_URL, { id })}/comments/${commentId}`, comment),
      delete: (id, commentId) =>
        axios.delete(`${url(DISCUSSION_URL, { id })}/comments/${commentId}`),
      markAsRead: (id, read_at) =>
        axios.put(`${url(DISCUSSION_URL, { id })}/mark_as_read${serialize({ read_at })}`),
      like: (id, commentId) =>
        axios.post(`${url(DISCUSSION_URL, { id })}/comments/${commentId}/like`),
      dislike: (id, commentId) =>
        axios.delete(`${url(DISCUSSION_URL, { id })}/comments/${commentId}/unlike`),
    },
  },
  dictionaries: {
    getOffices: () => axios(DICTIONARIES_OFFICES_URL),
    searchSkills: q => axios(`${DICTIONARIES_SEARCH_SKILLS_URL}${serialize({ q })}`),
    getStructureUnits: () => axios(DICTIONARIES_STRUCTURE_UNITS_URL),
    getContactTypes: () => axios(DICTIONARIES_CONTACT_TYPES_URL),
    getEmployeeStates: () => axios(DICTIONARIES_EMPLOYEE_STATES_URL),
    getPositions: () => axios(DICTIONARIES_POSITIONS_URL),
    getSkills: () => axios(DICTIONARIES_SKILLS_URL),
    getCities: () => axios(DICTIONARIES_CITIES_URL),
    getVacancies: params => axios(`${DICTIONARIES_VACANCIES_URL}${serialize(params)}`),
    getAccounts: () => axios(DICTIONARIES_ACCOUNTS_URL),
    getFiltredAccounts: params => axios(`${DICTIONARIES_ACCOUNTS_URL}${serialize(params)}`),
    getProjects: () => axios(DICTIONARIES_PROJECTS_URL),
    getDepartment: () => axios(DICTIONARIES_DEPARTMENTS_URL),
    getDepartmentNames: () => axios(DICTIONARIES_DEPARTMENTS_NAMES_URL),
    getProffessionalSpecializations: () => axios(DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_URL),
    getCandidateSkills: () => axios(DICTIONARIES_CANDIDATE_SKILLS_URL),
    getLegalUnits: () => axios(LEGAL_UNITS_DICTIONARY_URL),
  },
  assessment: {
    getSessions: (page, per_page, searchParams, filterParams) =>
      axios(
        `${ASSESSMENT_SESSIONS_URL}${serialize({ page, per_page })}${serialize(searchParams, true)}${serialize(filterParams, true)}`
      ),
    getSession: id => axios.get(url(ASSESSMENT_SESSION_URL, { id })),
    sendSession: (id, params) => axios.post(`${url(EVALUATIONS_ASSESSMENT_SESSION_URL, {id})}`, params),
    getResult: id => axios.get(url(ASSESSMENT_SESSION_RESULT_URL, { id }))
  },
}: Api)

function discussionable(parentUrl) {
  return {
    discussions: {
      all: (parentId, params) =>
        axios.get(`${url(parentUrl, { id: parentId })}/${DISCUSSIONABLE_URL}`, { params }),
      get: (parentId, id) =>
        axios.get(
          url(`${url(parentUrl, { id: parentId })}/${DISCUSSIONABLE_URL}/{{ id }}`, { id })
        ),
      create: (parentId, discussion) =>
        axios.post(`${url(parentUrl, { id: parentId })}/${DISCUSSIONABLE_URL}`, discussion),
    },
  }
}
