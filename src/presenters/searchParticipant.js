import { pathOr } from 'ramda'

import type { SearchParticipantRaw } from '../types/raws'
import type { SearchParticipantPresenter } from '../types/presenters'

const SearchParticipant = (raw): SearchParticipantPresenter => {
  const it = { ...raw }

  it.key = () =>
    it.__key ||
    (it.__key = `${it.model_name}-${it.id}`)

  it.name = () =>
    it.__name ||
    (it.__name = it.model_name === 'Account' ? it.full_name || it.fullname : raw.name)

  it.logo = () =>
    it.__logo ||
    (it.__logo =
      it.model_name === 'Account'
        ? pathOr('/public/avatar.png', ['photo', 'url'], it)
        : pathOr('/public/avatar.png', ['item', 'logo', 'url'], it))

  // it.departments = () =>
  //   it.__departments ||
  //   (it.__departments =
  //     it.item.departments_chain && it.item.departments_chain.map(it => it.name_ru).join(' / '))

  it.users = () =>
    it.__users ||
    (it.__users = pathOr([], ['accounts'], it).map(it =>
      SearchParticipant({
        model_name: 'Account',
        ...it,
      })
    ))

  it.isUser = () => it.__isUser || (it.__isUser = it.model_name === 'Account')

  it.isDepartment = () =>
    it.__isDepartment || (it.__isDepartment = it.model_name === 'Department' || it.model_name === 'MailingList')

  it.position = () => it.__position || (it.__position = it.position_name)

  return it
}

export default SearchParticipant
