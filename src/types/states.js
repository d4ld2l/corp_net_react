import type {
  CandidateWithIncludesRaw,
  EmployeesRaw,
  EmployeeRaw,
  NewRaw,
  NewsRaw,
  TagRaw,
  NewsCategoryRaw,
  BirthDatesNearestRaw,
  VacancyRaw,
  ResumeSourceRaw,
  PostRaw,
} from './raws'

import type {
  DepartmentsPresenterType,
  SearchParticipantsPresenter,
  ServicesPresenter,
  BidsPresenter,
} from './presenters'

export type LoadersState = {
  birthdays: boolean,
  currentCandidate: boolean,
  resumeSources: boolean,
  candidates: boolean,
}

export type BirthdaysState = {
  current: BirthDatesNearestRaw | {},
}

export type CandidatesState = {
  data: Array<CandidateWithIncludesRaw>,
  current: ?CandidateWithIncludesRaw,
  openLinkedCandidateModal: boolean,
  sources: Array<ResumeSourceRaw>,
  languages: Array<{
    name: string,
    id: number,
  }>,
  languagesLevel: Array<{
    name: string,
    id: number,
  }>,
  educationLevel: Array<{
    name: string,
    id: number,
  }>,
  parsedResume: ?CandidateWithIncludesRaw,
}

export type EmployeesState = {
  data: EmployeesRaw,
  current: EmployeeRaw | {},
  openLinkedCandidateModal: boolean,
  search: Array<any>,
  role: Array<any>,
}

export type EventsState = {
  data: Array<any>,
  current: {},
  types: Array<any>,
  participants: {},
}

export type NewsState = {
  data: Array<NewsRaw>,
  group: Array<any>,
  categories: Array<NewsCategoryRaw>,
  current: NewRaw | {},
  currentCat: Array<any>,
  tagNews: Array<TagRaw>,
  tags: Array<TagRaw>,
  allTags: Array<TagRaw>,
  openLinkedCandidateModal: boolean,
}

export type VacanciesState = {
  data: Array<VacancyRaw>,
  all: Array<VacancyRaw>,
  current: VacancyRaw,
  currentCandidates: [],
  selectVacancies: Array<{
    value: number,
    label: string,
  }>,
  currentSelectVacancies: {
    value: number,
    label: string,
  },
}

export type RecruiterState = {
  newRequest: {
    milestonesGroups: Array<{
      id: number,
      color: string,
      label: string,
      candidates_count: number,
    }>,
  },
}

export type FeedsState = {
  data: Array<PostRaw>,
  current: PostRaw,
  search: Array<PostRaw>,
}

export type SearchSkillsState = {
  skills: [],
}

export type DepartmentsState = DepartmentsPresenterType

export type StructureState = Array<$Shape<{ name: string, dropdownActive?: boolean }>>

export type SearchParticipantsState = SearchParticipantsPresenter

export type ServicesState = ServicesPresenter
export type BidsState = BidsPresenter

export type State = {
  router: any,
  user: any,
  role: any,
  recruiter: any,
  form: any,
  vacancies: VacanciesState,
  candidates: CandidatesState,
  news: NewsState,
  employees: EmployeesState,
  birthdays: BirthdaysState,
  surveys: any,
  events: EventsState,
  loaders: LoadersState,
  departments: DepartmentsState,
  searchParticipants: SearchParticipantsState,
  searchSkills: SearchSkillsState,
  services: ServicesState,
  bids: BidsState,
}
