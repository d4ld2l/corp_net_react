import type {
  BirthDatesNearestRaw,
  CandidateWithIncludesRaw,
  EventsRaw,
  EventRaw,
  EventTypesRaw,
  EmployeeRaw,
  EmployeesRaw,
  EducationLevelRaw,
  NewRaw,
  NewsRaw,
  NewsCategoryRaw,
  ProfileRaw,
  ProfileRoleRaw,
  MilestonesGroupRaw,
  MilestoneTemplateRaw,
  GroupNewsRaw,
  NewsCategoriesRaw,
  TagsRaw,
  SurveysRaw,
  SurveyRaw,
  RecruiterRoleInfoRaw,
  VacancyRaw,
  UsersAdminRaw,
  UserRaw,
  ResumeSourceRaw,
  LanguageRaw,
  LanguageLevelRaw,
  DepartmentRaw,
  AssistantsRaw,
} from './raws'
import type { EventPresenter, SearchParticipantPresenter } from './presenters'
import type { State } from './states'
export type Action =
  | {| type: 'GET_BIRTHDAYS_CURRENT_REQ' |}
  | {| type: 'GET_BIRTHDAYS_CURRENT_RES', payload: BirthDatesNearestRaw |}
  | {| type: 'GET_BIRTHDAYS_CURRENT_FAIL', payload: string |}
  | {| type: 'GET_CANDIDATES_REQ' |}
  | {| type: 'GET_CANDIDATES_RES', payload: Array<CandidateWithIncludesRaw> |}
  | {| type: 'TOGGLE_LINKED_CANDIDATE_MODAL', payload: boolean |}
  | {| type: 'GET_CANDIDATES_FAIL', payload: string |}
  | {| type: 'GET_CURRENT_CANDIDATE_REQ' |}
  | {| type: 'GET_CURRENT_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'GET_CURRENT_CANDIDATE_FAIL', payload: string |}
  | {| type: 'RELEASE_CURRENT_CANDIDATE' |}
  | {| type: 'UPDATE_CURRENT_CANDIDATE_REQ' |}
  | {| type: 'UPDATE_CURRENT_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'UPDATE_CURRENT_CANDIDATE_FAIL', payload: string |}
  | {| type: 'UPLOAD_FILE_TO_CANDIDATE_REQ' |}
  | {| type: 'UPLOAD_FILE_TO_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'UPLOAD_FILE_TO_CANDIDATE_FAIL', payload: string |}
  | {| type: 'CHANGE_STAGE_CANDIDATE_REQ' |}
  | {| type: 'CHANGE_STAGE_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'CHANGE_STAGE_CANDIDATE_FAIL', payload: string |}
  | {| type: 'GET_EVENTS_REQ' |}
  | {| type: 'GET_EVENTS_RES', payload: Array<EventPresenter> |}
  | {| type: 'GET_EVENT_REQ' |}
  | {| type: 'GET_EVENT_FAIL', payload: string |}
  | {| type: 'GET_EVENT_RES', payload: EventRaw |}
  | {| type: 'GET_EVENTS_FAIL', payload: string |}
  | {| type: 'DELETE_EVENT_REQ', payload: number |}
  | {| type: 'DELETE_EVENT_RES' |}
  | {| type: 'DELETE_EVENT_FAIL' |}
  | {| type: 'GET_PARTICIPANTS_RES', payload: ParticipantsRaw |}
  | {| type: 'GET_EVENT_TYPES_RES', payload: EventTypesRaw |}
  | {| type: 'POST_EVENT_REQ' |}
  | {| type: 'POST_EVENT_FAIL', payload: string |}
  | {| type: 'GET_PARTICIPANTS_REQ' |}
  | {| type: 'GET_PARTICIPANTS_FAIL', payload: string |}
  | {| type: 'POST_EVENT_RES', payload: EventPresenter |}
  | {| type: 'PUT_EVENT_REQ' |}
  | {| type: 'PUT_EVENT_FAIL', payload: string |}
  | {| type: 'PUT_EVENT_RES', payload: EventPresenter |}
  | {| type: 'GET_EMPLOYEES_REQ' |}
  | {| type: 'GET_EMPLOYEES_RES', payload: EmployeesRaw |}
  | {| type: 'GET_EMPLOYEES_FAIL', payload: string |}
  | {| type: 'GET_EMPLOYEE_REQ' |}
  | {| type: 'GET_EMPLOYEE_RES', payload: EmployeeRaw |}
  | {| type: 'GET_EMPLOYEE_FAIL', payload: string |}
  | {| type: 'ADD_SELECTOR_EMPLOYEES' |}
  | {| type: 'GET_EMPLOYEE_SEARCH_REQ' |}
  | {| type: 'GET_EMPLOYEE_SEARCH_RES', payload: EmployeesRaw |}
  | {| type: 'GET_EMPLOYEE_SEARCH_FAIL', payload: string |}
  | {| type: 'RESET_EMPLOYEE_SEARCH' |}
  | {| type: 'CREATE_CANDIDATE_REQ' |}
  | {| type: 'CREATE_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'CREATE_CANDIDATE_FAIL', payload: string |}
  | {| type: 'PARSING_FILE_TO_CANDIDATE_REQ' |}
  | {| type: 'PARSING_FILE_TO_CANDIDATE_RES', payload: CandidateWithIncludesRaw |}
  | {| type: 'PARSING_FILE_TO_CANDIDATE_FAIL', payload: string |}
  | {| type: 'LOGIN_USER_REQ' |}
  | {| type: 'LOGIN_USER_RES', payload: UserRaw |}
  | {| type: 'LOGIN_USER_FAIL', payload: string |}
  | {| type: 'LOGOUT_USER_REQ' |}
  | {| type: 'LOGOUT_USER_RES' |}
  | {| type: 'LOGOUT_USER_FAIL', payload: string |}
  | {| type: 'CREATE_NEW_REQ' |}
  | {| type: 'CREATE_NEW_RES', payload: NewRaw |}
  | {| type: 'CREATE_NEW_FAIL', payload: string |}
  | {| type: 'GET_NEWS_REQ' |}
  | {| type: 'GET_NEWS_RES', payload: NewsRaw |}
  | {| type: 'GET_NEWS_FAIL', payload: string |}
  | {| type: 'GET_NEWS_CURRENT_CATEGORY_REQ' |}
  | {| type: 'GET_NEWS_CURRENT_CATEGORY_RES', payload: NewsCategoryRaw |}
  | {| type: 'GET_NEWS_CURRENT_CATEGORY_FAIL', payload: string |}
  | {| type: 'GET_NEW_REQ' |}
  | {| type: 'GET_NEW_RES', payload: NewRaw |}
  | {| type: 'GET_NEW_FAIL', payload: string |}
  | {| type: 'GET_TAG_NEWS_REQ' |}
  | {| type: 'GET_TAG_NEWS_RES', payload: NewsRaw |}
  | {| type: 'GET_TAG_NEWS_FAIL', payload: string |}
  | {| type: 'RESET_TAG_NEWS' |}
  | {| type: 'GET_PROFILE_INFO_REQ' |}
  | {| type: 'GET_PROFILE_INFO_RES', payload: ProfileRaw |}
  | {| type: 'GET_PROFILE_INFO_FAIL', payload: string |}
  | {| type: 'GET_PROFILE_ROLE_REQ' |}
  | {| type: 'GET_PROFILE_ROLE_RES', payload: ProfileRoleRaw |}
  | {| type: 'GET_PROFILE_ROLE_FAIL', payload: string |}
  | {| type: 'GET_MILESTONES_GROUP_REQ' |}
  | {| type: 'GET_MILESTONES_GROUP_RES', payload: MilestonesGroupRaw |}
  | {| type: 'GET_MILESTONES_GROUP_FAIL', payload: string |}
  | {| type: 'GET_MILESTONES_TEMPLATE_REQ' |}
  | {| type: 'GET_MILESTONES_TEMPLATE_RES', payload: MilestoneTemplateRaw |}
  | {| type: 'GET_MILESTONES_TEMPLATE_FAIL', payload: string |}
  | {| type: 'SET_CURRENT_MILESTONES_TEMPLATE', payload: any |}
  | {| type: 'SET_MILESTONES_TEMPLATE', payload: any |}
  | {| type: 'ADD_RIGHT_MILESTONES', payload: any |}
  | {| type: 'ADD_LEFT_MILESTONES', payload: any |}
  | {| type: 'RENAME_MILESTONES_TITLE', payload: any |}
  | {| type: 'DELETE_MILESTONES', payload: any |}
  | {| type: 'CHANGE_MILESTONES', payload: any |}
  | {| type: 'SELECT_MILESTONES', payload: any |}
  | {| type: 'CHANGE_MILESTONE_EVALUATION', payload: any |}
  | {| type: 'CHANGE_MILESTONE_NOTIFICATION', payload: any |}
  | {| type: 'CHANGE_MILESTONES_GROUPS', payload: any |}
  | {| type: 'GET_VACANCIES_REQ' |}
  | {| type: 'GET_VACANCIES_RES', payload: Array<VacancyRaw> |}
  | {| type: 'GET_VACANCIES_FAIL', payload: string |}
  | {| type: 'GET_ALL_VACANCIES_REQ' |}
  | {| type: 'GET_ALL_VACANCIES_RES', payload: Array<VacancyRaw> |}
  | {| type: 'GET_ALL_VACANCIES_FAIL', payload: string |}
  | {| type: 'GET_MY_VACANCIES_REQ' |}
  | {| type: 'GET_MY_VACANCIES_RES', payload: Array<VacancyRaw> |}
  | {| type: 'GET_MY_VACANCIES_FAIL', payload: string |}
  | {| type: 'SET_VACANCY_STATE_REQ' |}
  | {| type: 'SET_VACANCY_STATE_RES', payload: VacancyRaw |}
  | {| type: 'SET_VACANCY_STATE_FAIL', payload: string |}
  | {| type: 'GET_GROUP_NEWS_REQ' |}
  | {| type: 'GET_GROUP_NEWS_RES', payload: GroupNewsRaw |}
  | {| type: 'GET_GROUP_NEWS_FAIL', payload: string |}
  | {| type: 'GET_NEWS_CATEGORIES_REQ' |}
  | {| type: 'GET_NEWS_CATEGORIES_RES', payload: NewsCategoriesRaw |}
  | {| type: 'GET_NEWS_CATEGORIES_FAIL', payload: string |}
  | {| type: 'GET_ALL_TAGS_REQ' |}
  | {| type: 'GET_ALL_TAGS_RES', payload: TagsRaw |}
  | {| type: 'GET_ALL_TAGS_FAIL', payload: string |}
  | {| type: 'GET_SURVEYS_REQ' |}
  | {| type: 'GET_SURVEYS_RES', payload: SurveysRaw |}
  | {| type: 'GET_SURVEYS_FAIL', payload: string |}
  | {| type: 'SEARCH_SURVEYS_REQ' |}
  | {| type: 'SEARCH_SURVEYS_RES', payload: SurveysRaw |}
  | {| type: 'SEARCH_SURVEYS_FAIL', payload: string |}
  | {| type: 'GET_SURVEY_REQ' |}
  | {| type: 'GET_SURVEY_RES', payload: SurveyRaw |}
  | {| type: 'GET_SURVEY_FAIL', payload: string |}
  | {| type: 'GET_SAVE_SURVEY_REQ' |}
  | {| type: 'GET_SAVE_SURVEY_RES', payload: SurveyRaw |}
  | {| type: 'GET_SAVE_SURVEY_FAIL', payload: string |}
  | {| type: 'GET_EVENT_TYPES_REQ' |}
  | {| type: 'GET_EVENT_TYPES_FAIL', payload: string |}
  | {| type: 'GET_RECRUITER_ROLE_INFO_REQ' |}
  | {| type: 'GET_RECRUITER_ROLE_INFO_RES', payload: RecruiterRoleInfoRaw |}
  | {| type: 'GET_RECRUITER_ROLE_INFO_FAIL', payload: string |}
  | {| type: 'GET_MANAGER_RECRUITER_ROLE_INFO_REQ' |}
  | {| type: 'GET_MANAGER_RECRUITER_ROLE_INFO_RES', payload: UsersAdminRaw |}
  | {| type: 'GET_MANAGER_RECRUITER_ROLE_INFO_FAIL', payload: string |}
  | {| type: 'GET_GENERAL_RECRUITER_ROLE_INFO_REQ' |}
  | {| type: 'GET_GENERAL_RECRUITER_ROLE_INFO_RES', payload: UsersAdminRaw |}
  | {| type: 'GET_GENERAL_RECRUITER_ROLE_INFO_FAIL', payload: string |}
  | {| type: 'CREATE_VACANCY_REQ' |}
  | {| type: 'CREATE_VACANCY_RES', payload: VacancyRaw |}
  | {| type: 'CREATE_VACANCY_FAIL', payload: string |}
  | {| type: 'UPDATE_VACANCY_REQ' |}
  | {| type: 'UPDATE_VACANCY_RES', payload: VacancyRaw |}
  | {| type: 'UPDATE_VACANCY_FAIL', payload: string |}
  | {| type: 'GET_VACANCIES_WITH_STAGE_REQ' |}
  | {| type: 'GET_VACANCIES_WITH_STAGE_RES', payload: Array<VacancyRaw> |}
  | {| type: 'GET_VACANCIES_WITH_STAGE_FAIL', payload: string |}
  | {| type: 'GET_CURRENT_VACANCY_REQ' |}
  | {| type: 'GET_CURRENT_VACANCY_RES', payload: VacancyRaw |}
  | {| type: 'GET_CURRENT_VACANCY_FAIL', payload: string |}
  | {| type: 'SELECT_LINKED_VACANCIES', payload: Array<VacancyRaw> |}
  | {| type: 'LINK_CANDIDATE_TO_VACANCY_REQ' |}
  | {| type: 'LINK_CANDIDATE_TO_VACANCY_RES' |}
  | {| type: 'LINK_CANDIDATE_TO_VACANCY_FAIL', payload: string |}
  | {| type: 'EDIT_NEW_REQUIEST_INFO_TAB' |}
  | {| type: 'SAVE_NEW_REQUIEST_INFO_TAB' |}
  | {| type: 'EDIT_NEW_REQUIEST_FULL_TAB' |}
  | {| type: 'SAVE_NEW_REQUIEST_FULL_TAB' |}
  | {| type: 'OPEN_SELECTOR_EMPLOYEES_MODAL' |}
  | {| type: 'CLOSE_SELECTOR_EMPLOYEES_MODAL' |}
  | {| type: 'ADD_SELECTOR_EMPLOYEES', payload: any |}
  | {| type: 'GET_RESUME_SOURCES_REQ' |}
  | {| type: 'GET_RESUME_SOURCES_RES', payload: Array<ResumeSourceRaw> |}
  | {| type: 'GET_RESUME_SOURCES_FAIL', payload: string |}
  | {| type: 'GET_LANGUAGES_REQ' |}
  | {| type: 'GET_LANGUAGES_RES', payload: Array<LanguageRaw> |}
  | {| type: 'GET_LANGUAGES_FAIL', payload: string |}
  | {| type: 'GET_LANGUAGES_LEVEL_REQ' |}
  | {| type: 'GET_LANGUAGES_LEVEL_RES', payload: Array<LanguageLevelRaw> |}
  | {| type: 'GET_LANGUAGES_LEVEL_FAIL', payload: string |}
  | {| type: 'GET_EDUCATION_LEVEL_REQ' |}
  | {| type: 'GET_EDUCATION_LEVEL_RES', payload: Array<EducationLevelRaw> |}
  | {| type: 'GET_EDUCATION_LEVEL_FAIL', payload: string |}
  | {| type: 'GET_DEPARTMENTS_TREE_REQ' |}
  | {| type: 'GET_DEPARTMENTS_TREE_RES', payload: Array<DepartmentRaw> |}
  | {| type: 'GET_DEPARTMENTS_TREE_FAIL', payload: string |}
  | {| type: 'RELEASE_DEPARTMENTS_TREE' |}
  | {| type: 'STRUCTURE_PUSH', payload: * |}
  | {| type: 'STRUCTURE_GO_BACK' |}
  | {| type: 'STRUCTURE_GO_TO', payload: number |}
  | {| type: 'STRUCTURE_UPDATE', payload: Array<*> |}
  | {| type: 'STRUCTURE_TOGGLE_PARTICIPANTS', payload: * |}
  | {| type: 'SEARCH_PARTICIPANTS_TOOGLE_ALL' |}
  | {| type: 'SEARCH_PARTICIPANTS_ADD', payload: SearchParticipantPresenter |}
  | {| type: 'SEARCH_PARTICIPANTS_REMOVE', payload: SearchParticipantPresenter |}
  | {| type: 'SEARCH_PARTICIPANTS_EXTRACT', payload: SearchParticipantPresenter |}
  | {| type: 'SEARCH_PARTICIPANTS_RELEASE' |}
  | {| type: 'SEND_COMMENT_REQ' |}
  | {| type: 'SEND_COMMENT_RES', payload: Array<CandidateWithIncludesRaw> |}
  | {| type: 'SEND_COMMENT_FAIL', payload: string |}
  | {| type: 'GET_SERVICES_REQ' |}
  | {| type: 'GET_SERVICES_RES', payload: ServicesRaw |}
  | {| type: 'GET_SERVICES_FAIL', payload: string |}
  | {| type: 'GET_SERVICE_REQ' |}
  | {| type: 'GET_SERVICE_RES', payload: ServiceRaw |}
  | {| type: 'GET_SERVICE_FAIL', payload: string |}
  | {| type: 'GET_BIDS_REQ' |}
  | {| type: 'GET_BIDS_RES', payload: BidsRaw |}
  | {| type: 'GET_BIDS_FAIL', payload: string |}
  | {| type: 'GET_BID_REQ' |}
  | {| type: 'GET_BID_RES', payload: BidRaw |}
  | {| type: 'GET_BID_FAIL', payload: string |}
  | {| type: 'GET_ASSITANTS_REQ' |}
  | {| type: 'GET_ASSITANTS_RES', payload: AssistantsRaw |}
  | {| type: 'GET_ASSITANTS_FAIL', payload: string |}
  | {| type: 'CONFIRM_EMPLOYEE_SKILL_REQ', payload: string |}
  | {| type: 'CONFIRM_EMPLOYEE_SKILL_RES', payload: {} |}
  | {| type: 'CONFIRM_EMPLOYEE_SKILL_FAIL', payload: string |}
  | {| type: 'UNCONFIRM_EMPLOYEE_SKILL_REQ', payload: string |}
  | {| type: 'UNCONFIRM_EMPLOYEE_SKILL_RES', payload: {} |}
  | {| type: 'UNCONFIRM_EMPLOYEE_SKILL_FAIL', payload: string |}
  | {| type: 'GET_USERS_COUNTER_REQ' |}
  | {| type: 'GET_USERS_COUNTER_RES', payload: {} |}
  | {| type: 'GET_USERS_COUNTER_FAIL', payload: string |}

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any
export type GetState = () => State
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>
