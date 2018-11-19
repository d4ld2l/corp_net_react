import type { Action } from '../../types/actions'
import type { LoadersState as State } from '../../types/states'

const initialState = {
  birthdays: true,
  currentCandidate: true,
  resumeSources: true,
  candidates: true,
  languages: true,
  languagesLevel: true,
  educationLevel: true,
  uploadingFile: false,
  departments: true,
  news: true,
  new: true,
  survey: true,
  surveys: true,
  surveysMore: false,
  event: true,
  employees: true,
  employee: true,
  employeePhoto: false,
  services: true,
  bids: true,
  bidsMore: false,
  vacancies: true,
  myVacancies: true,
  feeds: true,
  roles: true,
  employeesSearch: true,
  distribution: true,
  candidatesStats: true,
  projectsData: true,
  project: true,
  projectsDataChangeTab: false,
  profilesProject: true,
  profilesProjectTab: false,
  profileProject: true,
  // tasks: true,
  // tasksMore: true,
  login: false,
  profilesHr: true,
  getProfileHr: true,
  task: false,
  taskFormLoading: false,
  vacancy: true,
  loadingVacancyCandidates: true,
  loadingVacancyCandidate: true,
  stbParticipants: true,
  assessmentSessions: true,
  assessmentSession: true,
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'LOGIN_USER_REQ':
      return { ...state, login: true }
    case 'LOGIN_USER_RES':
    case 'LOGIN_USER_FAIL':
      return { ...state, login: false }
    case 'GET_BIRTHDAYS_CURRENT_REQ':
      return { ...state, birthdays: true }
    case 'GET_BIRTHDAYS_CURRENT_RES':
    case 'GET_BIRTHDAYS_CURRENT_FAIL':
      return { ...state, birthdays: false }
    case 'GET_ALL_VACANCIES_REQ':
      return { ...state, vacancies: true }
    case 'GET_ALL_VACANCIES_RES':
    case 'GET_ALL_VACANCIES_FAIL':
      return { ...state, vacancies: false }
    case 'GET_MY_VACANCIES_REQ':
    case 'CHANGE_MY_VACANCIES_TAB':
      return { ...state, myVacancies: true }
    case 'GET_MY_VACANCIES_RES':
    case 'GET_MY_VACANCIES_FAIL':
      return { ...state, myVacancies: false }
    case 'GET_CURRENT_CANDIDATE_REQ':
    case 'UPDATE_CURRENT_CANDIDATE_REQ':
      return { ...state, currentCandidate: true }
    case 'GET_CURRENT_CANDIDATE_RES':
    case 'GET_CURRENT_CANDIDATE_FAIL':
    case 'UPDATE_CURRENT_CANDIDATE_RES':
    case 'UPDATE_CURRENT_CANDIDATE_FAIL':
    case 'RELEASE_CURRENT_CANDIDATE':
      return { ...state, currentCandidate: false }
    case 'GET_RESUME_SOURCES_REQ':
      return { ...state, resumeSources: true }
    case 'GET_RESUME_SOURCES_RES':
    case 'GET_RESUME_SOURCES_FAIL':
      return { ...state, resumeSources: false }
    case 'GET_CANDIDATES_REQ':
    case 'GET_CANDIDATES_GROUP_REQ':
      return { ...state, candidates: true }
    case 'GET_CANDIDATES_RES':
    case 'GET_CANDIDATES_FAIL':
    case 'GET_CANDIDATES_GROUP_RES':
    case 'GET_CANDIDATES_GROUP_FAIL':
      return { ...state, candidates: false }
    case 'ADVANCED_SEARCH_CANDIDATE_REQ':
      return { ...state, candidatesSearch: true }
    case 'ADVANCED_SEARCH_CANDIDATE_RES':
    case 'ADVANCED_SEARCH_CANDIDATE_FAIL':
      return { ...state, candidatesSearch: false }
    case 'GET_LANGUAGES_REQ':
      return { ...state, languages: true }
    case 'GET_LANGUAGES_RES':
    case 'GET_LANGUAGES_FAIL':
      return { ...state, languages: false }
    case 'GET_LANGUAGES_LEVEL_REQ':
      return { ...state, languagesLevel: true }
    case 'GET_LANGUAGES_LEVEL_RES':
    case 'GET_LANGUAGES_LEVEL_FAIL':
      return { ...state, languagesLevel: false }
    case 'GET_EDUCATION_LEVEL_REQ':
      return { ...state, educationLevel: true }
    case 'GET_EDUCATION_LEVEL_RES':
    case 'GET_EDUCATION_LEVEL_FAIL':
      return { ...state, educationLevel: false }
    case 'UPLOAD_FILE_TO_CANDIDATE_REQ':
      return { ...state, uploadingFile: true }
    case 'UPLOAD_FILE_TO_CANDIDATE_RES':
    case 'UPLOAD_FILE_TO_CANDIDATE_FAIL':
      return { ...state, uploadingFile: false }
    case 'GET_DEPARTMENTS_TREE_REQ':
      return { ...state, departments: true }
    case 'GET_DEPARTMENTS_TREE_RES':
    case 'GET_DEPARTMENTS_TREE_FAIL':
      return { ...state, departments: false }
    case 'GET_ANALYTICS_STATS_REQ':
      return { ...state, analyticsStats: true }
    case 'GET_ANALYTICS_STATS_RES':
    case 'GET_ANALYTICS_STATS_FAIL':
      return { ...state, analyticsStats: false }
    case 'GET_NEWS_REQ':
      return { ...state, news: true }
    case 'GET_NEWS_RES':
    case 'GET_NEWS_FAIL':
      return { ...state, news: false }
    case 'GET_NEW_REQ':
      return { ...state, new: true }
    case 'GET_NEW_RES':
    case 'GET_NEW_FAIL':
      return { ...state, new: false }
    case 'GET_SURVEY_REQ':
      return { ...state, survey: true }
    case 'GET_SURVEY_RES':
    case 'GET_SURVEY_FAIL':
      return { ...state, survey: false }
    case 'GET_SURVEYS_REQ':
    case 'SEARCH_SURVEYS_REQ':
      return { ...state, surveys: !action.loadMore, surveysMore: action.loadMore }
    case 'GET_SURVEYS_RES':
    case 'SEARCH_SURVEYS_RES':
    case 'GET_SURVEYS_FAIL':
    case 'SEARCH_SURVEYS_FAIL':
      return { ...state, surveys: false, surveysMore: false }
    case 'GET_EVENT_REQ':
      return { ...state, event: true }
    case 'GET_EVENT_RES':
    case 'GET_EVENT_FAIL':
      return { ...state, event: false }
    case 'GET_EMPLOYEES_REQ':
    case 'GET_EMPLOYEE_SEARCH_REQ':
    case 'GET_EMPLOYEE_SORT_REQ':
    case 'GET_PAGINATION_EMPLOYEES_REQ':
      return { ...state, employees: true }
    case 'GET_EMPLOYEE_SEARCH_FIRST_REQ':
      return { ...state, employeesSearch: true }
    case 'GET_PAGINATION_EMPLOYEES_FILTER_REQ':
      return { ...state, employees: true, employeesSearch: true }
    case 'GET_EMPLOYEES_RES':
    case 'GET_PAGINATION_EMPLOYEES_RES':
    case 'GET_PAGINATION_EMPLOYEES_FAIL':
    case 'GET_EMPLOYEE_SEARCH_RES':
    case 'GET_EMPLOYEE_SEARCH_FAIL':
    case 'GET_EMPLOYEE_SORT_RES':
    case 'GET_EMPLOYEE_SORT_FAIL':
    case 'GET_PAGINATION_EMPLOYEES_FILTER_RES':
    case 'GET_PAGINATION_EMPLOYEES_FILTER_FAIL':
      return { ...state, employees: false, employeesSearch: false }
    case 'GET_SERVICES_REQ':
    case 'RELEASE_SERVICES':
      return { ...state, services: true }
    case 'GET_SERVICES_RES':
    case 'GET_SERVICES_FAIL':
      return { ...state, services: false }
    case 'GET_SERVICE_REQ':
    case 'RELEASE_SERVICE':
      return { ...state, services: true }
    case 'GET_SERVICE_RES':
    case 'GET_SERVICE_FAIL':
      return { ...state, services: false }
    case 'GET_BIDS_REQ':
    case 'RELEASE_BIDS':
      return { ...state, bids: !action.loadMore, bidsMore: action.loadMore }
    case 'GET_BIDS_RES':
    case 'GET_BIDS_FAIL':
      return { ...state, bids: false, bidsMore: false }
    case 'GET_BID_REQ':
    case 'RELEASE_BID':
      return { ...state, bids: true }
    case 'GET_BID_RES':
    case 'GET_BID_FAIL':
      return { ...state, bids: false }
    case 'GET_FEEDS_REQ':
    case 'GET_POSTS_REQ':
    case 'GET_PAGINATION_POSTS_REQ':
      return { ...state, feeds: true }
    case 'GET_FEEDS_RES':
    case 'GET_FEEDS_FAIL':
    case 'GET_POSTS_RES':
    case 'GET_POSTS_FAIL':
    case 'GET_PAGINATION_POSTS_RES':
    case 'GET_PAGINATION_POSTS_FAIL':
      return { ...state, feeds: false }
    case 'GET_PROFILE_ROLE_RES':
      return { ...state, roles: false }
    case 'GET_EMPLOYEE_REQ':
      return { ...state, employee: true }
    case 'GET_EMPLOYEE_RES':
    case 'GET_EMPLOYEE_FAIL':
      return { ...state, employee: false }
    case 'UPLOAD_EMPLOYEE_PHOTO_REQ':
    case 'UPDATE_EMPLOYEE_PHOTO_REQ':
    case 'DELETE_EMPLOYEE_PHOTO_REQ':
    case 'SET_EMPLOYEE_PHOTO_REQ':
      return { ...state, employeePhoto: true }
    case 'UPLOAD_EMPLOYEE_PHOTO_RES':
    case 'UPLOAD_EMPLOYEE_PHOTO_FAIL':
    case 'UPDATE_EMPLOYEE_PHOTO_RES':
    case 'UPDATE_EMPLOYEE_PHOTO_FAIL':
    case 'DELETE_EMPLOYEE_PHOTO_RES':
    case 'DELETE_EMPLOYEE_PHOTO_FAIL':
    case 'SET_EMPLOYEE_PHOTO_RES':
    case 'SET_EMPLOYEE_PHOTO_FAIL':
      return { ...state, employeePhoto: false }
    case 'GET_DISTRIBUTION_REQ':
      return { ...state, employee: true }
    case 'GET_DISTRIBUTION_RES':
    case 'GET_DISTRIBUTION_FAIL':
      return { ...state, distribution: false }
    case 'GET_PROJECTS_DATA_TOGGLE_TAB_RES':
    case 'SET_FILTER_PROJECTS_DATA_REQ':
      return { ...state, projectsDataChangeTab: true }
    case 'GET_PROJECTS_DATA_REQ':
    case 'GET_PROJECTS_DATA_PAGINATION_REQ':
      return { ...state, projectsData: true }
    case 'GET_PROJECTS_DATA_RES':
    case 'GET_PROJECTS_DATA_FAIL':
    case 'GET_PROJECTS_DATA_PAGINATION_RES':
    case 'GET_PROJECTS_DATA_PAGINATION_FAIL':
      return { ...state, projectsData: false, projectsDataChangeTab: false }
    case 'GET_PROJECT_DATA_REQ':
      return { ...state, project: true }
    case 'GET_PROJECT_DATA_RES':
    case 'GET_PROJECT_DATA_FAIL':
      return { ...state, project: false }
    case 'GET_PROFILES_PROJECT_REQ':
    case 'GET_PROFILES_PROJECT_PAGINATION_REQ':
      return { ...state, profilesProject: true }
    case 'GET_PROFILES_PROJECT_RES':
    case 'GET_PROFILES_PROJECT_PAGINATION_RES':
    case 'GET_PROFILES_PROJECT_FAIL':
    case 'GET_PROFILES_PROJECT_PAGINATION_FAIL':
      return { ...state, profilesProject: false, profilesProjectTab: false }
    case 'TOGGLE_TAB_PROFILES_PROJECT':
      return { ...state, profilesProjectTab: true}
    case 'GET_PROFILE_PROJECT_REQ':
      return { ...state, profileProject: true}
    case 'GET_PROFILE_PROJECT_RES':
    case 'GET_PROFILE_PROJECT_FAIL':
      return { ...state, profileProject: false}
    case 'GET_CUSTOMER_CONTACTS_REQ':
    case 'SEARCH_CUSTOMER_CONTACTS_REQ':
      return { ...state, customerContacts: !action.loadMore, customerContactsMore: action.loadMore }
    case 'GET_CUSTOMER_CONTACTS_RES':
    case 'GET_CUSTOMER_CONTACTS_FAIL':
    case 'SEARCH_CUSTOMER_CONTACTS_RES':
    case 'SEARCH_CUSTOMER_CONTACTS_FAIL':
      return { ...state, customerContacts: false, customerContactsMore: false }
    case 'GET_TASKS_REQ':
    case 'SEARCH_TASKS_REQ':
      return { ...state, tasks: !action.loadMore, tasksMore: action.loadMore }
    case 'GET_TASKS_RES':
    case 'GET_TASKS_FAIL':
    case 'SEARCH_TASKS_RES':
    case 'SEARCH_TASKS_FAIL':
      return { ...state, tasks: false, tasksMore: false }
    case 'GET_TASK_REQ':
      return { ...state, task: true}
    case 'GET_TASK_RES':
    case 'GET_TASK_FAIL':
      return { ...state, task: false}
    case 'CREATE_TASK_REQ':
    case 'UPDATE_TASK_REQ':
      return { ...state, taskFormLoading: true }
    case 'CREATE_TASK_RES':
    case 'CREATE_TASK_FAIL':
    case 'UPDATE_TASK_RES':
    case 'UPDATE_TASK_FAIL':
      return { ...state, taskFormLoading: false }

    case 'GET_PROFILES_HR_PAGINATION_REQ':
      return { ...state, profilesHr: true }
    case 'GET_PROFILES_HR_PAGINATION_RES':
    case 'GET_PROFILES_HR_PAGINATION_FAIL':
      return { ...state, profilesHr: false }
    case 'GET_PROFILE_HR_REQ':
      return { ...state, getProfileHr: true }
    case 'GET_PROFILE_HR_RES':
    case 'GET_PROFILE_HR_FAIL':
      return { ...state, getProfileHr: false }
    case 'GET_CURRENT_VACANCY_REQ':
      return { ...state, vacancy: true }
    case 'GET_CURRENT_VACANCY_RES':
    case 'GET_CURRENT_VACANCY_FAIL':
      return { ...state, vacancy: false }
    case 'GET_VACANCY_CANDIDATES_REQ':
      return { ...state, loadingVacancyCandidates: true }
    case 'GET_VACANCY_CANDIDATES_RES':
    case 'GET_VACANCY_CANDIDATES_FAIL':
      return { ...state, loadingVacancyCandidates: false }
    case 'GET_VACANCY_CANDIDATE_REQ':
      return { ...state, loadingVacancyCandidate: true }
    case 'GET_VACANCY_CANDIDATE_RES':
    case 'GET_VACANCY_CANDIDATE_FAIL':
      return { ...state, loadingVacancyCandidate: false }
    case 'GET_STB_PARTICIPANTS_REQ':
      return { ...state, stbParticipants: true }
    case 'GET_STB_PARTICIPANTS_RES':
    case 'GET_STB_PARTICIPANTS_FAIL':
      return { ...state, stbParticipants: false }
    case 'GET_ASSESSMENT_SESSIONS_REQ':
    case 'SET_SEARCH_ASSESSMENT_SESSIONS_RES':
      return { ...state, assessmentSessions: true }
    case 'GET_ASSESSMENT_SESSIONS_RES':
    case 'GET_ASSESSMENT_SESSIONS_FAIL':
      return { ...state, assessmentSessions: false }
    case 'GET_ASSESSMENT_SESSION_REQ':
      return { ...state, assessmentSession: true }
    case 'GET_ASSESSMENT_SESSION_RES':
    case 'GET_ASSESSMENT_SESSION_FAIL':
      return { ...state, assessmentSession: false }
    case 'LOAD_ASSESSMENT_REQ':
      return { ...state, assessmentSession: true }
    case 'LOAD_ASSESSMENT_RES':
    case 'LOAD_ASSESSMENT_FAIL':
      return { ...state, assessmentSession: false }
    default:
      return state
  }
}
