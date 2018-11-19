import { compose, uniq, map, flatten } from 'ramda'
import SearchParticipant from './searchParticipant'
import type { SearchParticipantsRaw } from '../types/raws'
import type { SearchParticipantsPresenter } from '../types/presenters'

export default (raw: SearchParticipantsRaw): SearchParticipantsPresenter => {
  const it = { ...raw }

  it.getParticipants = () => raw.participants.map(SearchParticipant).reverse()

  it.forEventForm = event => {
    const result = { available_for_all: false }

    if (raw.all) {
      result.available_for_all = true

      if (event && event.participants_list) {
        result.event_participants_attributes = event.participants_list.map(it => ({
          ...it,
          id: it.event_participant_id,
          _destroy: true,
        }))
      }

      return result
    }

    const participants = it.getParticipants()

    result.event_participants_attributes = []

    if (participants.length > 0) {
      result.event_participants_attributes = compose(
        map(id => ({ user_id: id })),
        uniq,
        map(it => it.item.id || it.item.user_id),
        flatten,
        map(it => (it.isDepartment() ? it.users() : it))
      )(participants)
    }

    if (event) {
      result.event_participants_attributes = [
        ...result.event_participants_attributes.filter(
          it => !event.participants_list.find(it2 => it2.user_id === it.user_id)
        ),
        ...event.participants_list
          .filter(
            it => !result.event_participants_attributes.find(it2 => it2.user_id === it.user_id)
          )
          .map(it => ({
            ...it,
            id: it.event_participant_id,
            _destroy: true,
          })),
      ]
    }

    return result
  }

  it.forSurveyForm = survey => {
    const result = { available_for_all: false }

    if (raw.all) {
      result.available_for_all = true

      if (survey && survey.participants_list) {
        result.survey_participants_attributes = survey.participants_list.map(it => ({
          ...it,
          id: it.survey_participant_id,
          _destroy: true,
        }))
      }

      return result
    }

    const participants = it.getParticipants()

    result.survey_participants_attributes = []

    if (participants.length > 0) {
      result.survey_participants_attributes = compose(
        map(id => ({ user_id: id })),
        uniq,
        map(it => it.item.id || it.item.user_id),
        flatten,
        map(it => (it.isDepartment() ? it.users() : it))
      )(participants)
    }

    if (survey) {
      result.survey_participants_attributes = [
        ...result.survey_participants_attributes.filter(
          it => !survey.participants_list.find(it2 => it2.user_id === it.user_id)
        ),
        ...survey.participants_list
          .filter(
            it => !result.survey_participants_attributes.find(it2 => it2.user_id === it.user_id)
          )
          .map(it => ({
            ...it,
            id: it.survey_participant_id,
            _destroy: true,
          })),
      ]
    }

    return result
  }

  return it
}
