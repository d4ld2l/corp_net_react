import type { AxiosPromise } from 'axios'

import type {
  BirthDatesNearestRaw,
  CandidateRaw,
  CandidateWithIncludesRaw,
  EmployeesRaw,
  EmployeeRaw,
  EventsRaw,
  EventRaw,
  EventTypesRaw,
  ParticipantsRaw,
  UserRaw,
  MilestonesGroupRaw,
  MilestoneTemplateRaw,
  NewRaw,
  NewsRaw,
  NewsCategoriesRaw,
  ProfileRaw,
  ProfileRoleRaw,
  RecruiterRoleInfoRaw,
  SurveysRaw,
  SurveyRaw,
  TagsRaw,
  VacancyRaw,
  VacanciesRaw,
  CandidateVacancyRaw,
  ResumeRaw,
  AdditionalContactRaw,
  ResumeWorkExperienceRaw,
  ResumeRecommendationRaw,
  LanguageSkillRaw,
  LanguageRaw,
  LanguageLevelRaw,
  ResumeEducationRaw,
  EducationLevelRaw,
  CandidatePermittedAttrsRaw,
  ResumeSourceRaw,
  ServicesRaw,
  ServiceRaw,
  BidsRaw,
  BidRaw,
} from './raws'

import type { DepartmentsRaw } from '../presenters/departments'

export type Api = {
  birthdates: {
    nearest: () => AxiosPromise<BirthDatesNearestRaw>,
  },
  candidates: {
    all: () => AxiosPromise<Array<CandidateWithIncludesRaw>>,
    select: (params: string) => AxiosPromise<Array<CandidateWithIncludesRaw>>,
    search: (params: CandidatePermittedAttrsRaw) => AxiosPromise<Array<CandidateWithIncludesRaw>>,
    advancedSearch: (
      params: CandidatePermittedAttrsRaw
    ) => AxiosPromise<Array<CandidateWithIncludesRaw>>,
    update: (
      id: number,
      params: CandidatePermittedAttrsRaw
    ) => AxiosPromise<CandidateWithIncludesRaw | { success: false }>,
    findById: (id: number) => AxiosPromise<CandidateWithIncludesRaw>,
    whereGroupId: (id: number) => AxiosPromise<Array<CandidateWithIncludesRaw>>,
    create: (
      params: CandidatePermittedAttrsRaw
    ) => AxiosPromise<CandidateWithIncludesRaw | { success: false }>,
    parsing: (params: {
      source: string,
      file: string,
    }) => AxiosPromise<CandidateWithIncludesRaw | { success: false }>,
  },
  news: {
    create: (params: Object) => AxiosPromise<NewRaw>,
    all: () => AxiosPromise<NewsRaw>,
    where: (params: { params: * }) => AxiosPromise<NewsRaw>,
    findById: (id: number) => AxiosPromise<NewRaw>,
    categories: () => AxiosPromise<NewsCategoriesRaw>,
  },
  employees: {
    findById: (id: number) => AxiosPromise<EmployeeRaw>,
    search: (params: { params: * }) => AxiosPromise<EmployeesRaw>,
    all: () => AxiosPromise<EmployeesRaw>,
  },
  events: {
    all: () => AxiosPromise<EventsRaw>,
    findById: (id: number) => AxiosPromise<EventRaw>,
    types: () => AxiosPromise<EventTypesRaw>,
    create: (params: Object) => AxiosPromise<EventRaw>,
    update: (id: number, params: Object) => AxiosPromise<EventRaw>,
    delete: (id: number) => AxiosPromise<{}>,
    searchParticipants: (q: string) => AxiosPromise<ParticipantsRaw>,
  },
  auth: {
    signin: (params: Object) => AxiosPromise<UserRaw>,
    logout: () => AxiosPromise<UserRaw>,
  },
  profiles: {
    me: () => AxiosPromise<ProfileRaw>,
  },
  permissions: {
    my: () => AxiosPromise<ProfileRoleRaw>,
  },
  surveys: {
    all: () => AxiosPromise<SurveysRaw>,
    findById: (id: number) => AxiosPromise<SurveyRaw>,
    search: (q: string) => AxiosPromise<SurveysRaw>,
    save: (params: Object) => AxiosPromise<SurveyRaw>,
  },
  users_admin: {
    where: (params: { params: * }) => AxiosPromise<RecruiterRoleInfoRaw>,
  },
  tags: {
    all: () => AxiosPromise<TagsRaw>,
  },
  vacancies: {
    all: () => AxiosPromise<VacanciesRaw>,
    myVacancies: () => AxiosPromise<VacanciesRaw>,
    withStages: (stage: string) => AxiosPromise<VacanciesRaw>,
    changeState: (id: number, state: string) => AxiosPromise<VacancyRaw>,
    findBy: (params: { vacancy: * }) => AxiosPromise<VacancyRaw>,
    update: (id: number, params: { vacancy: * }) => AxiosPromise<VacancyRaw>,
    findById: (id: number) => AxiosPromise<VacancyRaw>,
  },
  vacancy_stage_group: () => AxiosPromise<MilestonesGroupRaw>,
  template_stages: () => AxiosPromise<MilestoneTemplateRaw>,
  resume_sources: () => AxiosPromise<Array<ResumeSourceRaw>>,
  languages: () => AxiosPromise<Array<LanguageRaw>>,
  languagesLevel: () => AxiosPromise<Array<LanguageLevelRaw>>,
  educationLevel: () => AxiosPromise<Array<EducationLevelRaw>>,
  departments: {
    tree: () => AxiosPromise<DepartmentsRaw>,
  },
  services: {
    all: () => AxiosPromise<ServicesRaw>,
    find: () => AxiosPromise<ServiceRaw>,
  },
  bids: {
    all: () => AxiosPromise<BidsRaw>,
    find: () => AxiosPromise<BidRaw>,
  },
}
