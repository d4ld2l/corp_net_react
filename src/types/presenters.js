import type {
  EventRaw,
  AssociateRaw,
  DepartmentRaw,
  EmployeeRaw,
  DepartmentsRaw,
  RootDepartmentRaw,
  SearchParticipantRaw,
  SearchParticipantsRaw,
} from './raws'

export type EventPresenter = EventRaw & {
  title: string,
  start: Date,
  end: Date,
  desc: string,
}

export type AssociatePresenterType = AssociateRaw & {
  avatar: string,
  name: string,
  position: string,
}

export type DepartmentPresenterType = DepartmentRaw & {
  name: string,
  manager: ?AssociatePresenterType,
  participants: Array<AssociatePresenterType>,
  children: Array<DepartmentPresenterType>,
  count: number,
}

export type DepartmentsPresenterType = DepartmentsRaw

export type RootDepartmentPresenterType = RootDepartmentRaw & {
  logo: string,
  children: Array<DepartmentPresenterType>,
}

export type SearchParticipantPresenter = SearchParticipantRaw & {
  key: () => string,
  __key: string,
  name: () => string,
  __name: string,
  logo: () => string,
  __logo: string,
  departments: () => string,
  __departments: string,
  users: () => Array<{
    type: 'user',
    item: EmployeeRaw,
  }>,
  __users: Array<{
    type: 'user',
    item: EmployeeRaw,
  }>,
  isUser: () => boolean,
  __isUser: boolean,
  isDepartment: () => boolean,
  __isDepartment: boolean,
  position: () => string,
  __position: string,
}

export type SearchParticipantsPresenter = SearchParticipantsRaw & {
  getParticipants: () => Array<SearchParticipantPresenter>,
  forEventForm: () => {
    available_for_all?: true,
    event_participants_attributes?: Array<{
      user_id: number,
    }>,
  },
}

export type ServicesPresenter = {}
export type BidsPresenter = {}
