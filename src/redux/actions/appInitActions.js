import { getProfileInfo } from './profileInfoActions'
import { updateApplicationSettings } from './systemActions'
import { loginSettings } from './uiActions'
import { actions as topicActions } from '../ducks/topics'

export const appInit = () => async (dispatch, gState) => {
  Promise.all([
    await dispatch(updateApplicationSettings()),
    await dispatch(getProfileInfo()),
  ])
  dispatch(topicActions.initSocketConnection())
}

export const loginInit = () => (dispatch) =>
  Promise.all([
    dispatch(loginSettings())
  ])
