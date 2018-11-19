import pathOr from 'ramda/src/pathOr'

import type { AssociateRaw, DepartmentRaw, DepartmentsRaw, RootDepartmentRaw } from '../types/raws'

import type {
  RootDepartmentPresenterType,
  AssociatePresenterType,
  DepartmentPresenterType,
  DepartmentsPresenterType,
} from '../types/presenters'

const AssociatePresenter = (raw: AssociateRaw): AssociatePresenterType => ({
  ...raw,
  avatar: pathOr('/public/avatar.png', ['photo', 'for_profile', 'url'])(raw),
  name: raw.name ? `${raw.surname} ${raw.name}` : raw.fullname,
  position: raw.position_name,
})

const DepartmentPresenter = (raw: DepartmentRaw): DepartmentPresenterType => ({
  ...raw,
  name: raw.name_ru,
  manager: raw.manager ? AssociatePresenter(raw.manager) : null,
  participants: raw.participants.map(AssociatePresenter),
  count: raw.children.length || (raw.participants.length + !!raw.manager) | 0,
  children: raw.children.map(DepartmentPresenter),
})

const RootDepartmentPresenter = (raw: RootDepartmentRaw): RootDepartmentPresenterType => ({
  ...raw,
  logo: pathOr('/public/avatar.png', ['logo', 'url'])(raw),
  children: raw.departments_tree && raw.departments_tree.map(DepartmentPresenter),
})

export default (raw: DepartmentsRaw): DepartmentsPresenterType => raw.map(RootDepartmentPresenter)
