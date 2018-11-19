import path from 'ramda/src/pathOr'

import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import moment from 'moment'

import api from '../../api'
import getBase64 from '../../helpers/getFileBase64'

import type { Dispatch, ThunkAction } from '../../types/actions'
import type { NewRaw, NewsRaw, NewsCategoriesRaw } from '../../types/raws'

export const createNew = ({ state }): ThunkAction => async (dispatch: Dispatch) => {
  const form = {}
  const values = {}

  dispatch({ type: 'CREATE_NEW_REQ' })

  try {
    if (form.file) {
      const base64 = await getBase64(form.file[0])
      values.resume_attributes.file = base64.target.result
    }
    if (form.photo) {
      const base64 = await getBase64(form.photo[0])
      values.resume_attributes.photo = base64.target.result
    }
    const candidate = {
      ...values,
    }

    const req = await api.news.create({ candidate })
    dispatch({ type: 'CREATE_NEW_RES', payload: req.data })
    toastr.success('Создание новости прошло успешно')
    dispatch(push('/news'))
  } catch (error) {
    dispatch({ type: 'CREATE_NEW_FAIL', payload: error.message })
  }
}

export const getNews = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_NEWS_REQ' })

  try {
    const req = await api.news.all()
    dispatch({ type: 'GET_NEWS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_NEWS_FAIL', payload: error.message })
  }
}

export const getNewsCategory = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_NEWS_CURRENT_CATEGORY_REQ' })

  try {
    const req = await api.news.where({ params: { news_category_id: id } })
    dispatch({ type: 'GET_NEWS_CURRENT_CATEGORY_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_NEWS_CURRENT_CATEGORY_FAIL', payload: error.message })
  }
}

export const getCurrentNew = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_NEW_REQ' })

  try {
    const req = await api.news.findById(id)
    dispatch({ type: 'GET_NEW_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_NEW_FAIL', payload: error.message })
  }
}

export const getGroupNews = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_GROUP_NEWS_REQ' })

    const req = await api.news.where({ params: { scope: 'only_by_community' } })
    dispatch({ type: 'GET_GROUP_NEWS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_GROUP_NEWS_FAIL', payload: error.message })
  }
}

export const getNewsCategories = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_NEWS_CATEGORIES_REQ' })
    const req = await api.news.categories()
    dispatch({ type: 'GET_NEWS_CATEGORIES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_NEWS_CATEGORIES_FAIL', payload: error.message })
  }
}

export const getTagNews = (tags: Array<string>): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_TAG_NEWS_REQ' })

  let tag = ''
  tags.map(e => {
    tag += `${e},`
  })
  try {
    const req = await api.news.where({ params: { with_tags: tag } })
    dispatch({ type: 'GET_TAG_NEWS_RES', payload: { tagNews: req.data, tags } })
  } catch (error) {
    dispatch({ type: 'GET_TAG_NEWS_FAIL', payload: error.message })
  }
}

export const sendComment = (id, body, parentId): ThunkAction => async (dispatch: Dispatch) => {
  const comment = { body }
  if (parentId) {
    comment.parent_comment_id = parentId
  }
  dispatch({ type: 'SEND_COMMENT_NEWS_REQ' })

  const req = await api.news.sendComment(id, comment)
  dispatch({ type: 'SEND_COMMENT_NEWS_RES', payload: { data: req.data, id } })
  // try {
  //   const req = await api.news.sendComment(id, comment)
  //   dispatch({ type: 'SEND_COMMENT_NEWS_RES', payload: { data: req.data, id } })
  // } catch (error) {
  //   dispatch({ type: 'SEND_COMMENT_NEWS_FAIL', payload: error.message })
  // }
}

export const deleteComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_COMMENT_NEWS_REQ' })

  try {
    const req = await api.news.deleteComment(id, commentId)
    dispatch({ type: 'DELETE_COMMENT_NEWS_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DELETE_COMMENT_NEWS_FAIL', payload: error.message })
  }
}

export const updateComment = (id, comment): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'UPDATE_COMMENT_NEWS_REQ' })

  try {
    const req = await api.news.updateComment(id, comment)
    dispatch({ type: 'UPDATE_COMMENT_NEWS_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'UPDATE_COMMENT_NEWS_FAIL', payload: error.message })
  }
}

export const likeComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LIKE_COMMENT_NEWS_REQ' })

  try {
    const req = await api.news.likeComment(id, commentId)
    dispatch({ type: 'SET_LIKE_COMMENT_NEWS_RES', payload: { data: req.data, id, commentId } })
  } catch (error) {
    dispatch({ type: 'SET_LIKE_COMMENT_NEWS_FAIL', payload: error.message })
  }
}

export const dislikeComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEL_LIKE_COMMENT_NEWS_REQ' })

  try {
    const req = await api.news.dislikeComment(id, commentId)
    dispatch({ type: 'DEL_LIKE_COMMENT_NEWS_RES', payload: { data: req.data, id, commentId } })
  } catch (error) {
    dispatch({ type: 'DEL_LIKE_COMMENT_NEWS_FAIL', payload: error.message })
  }
}

export const like = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LIKE_NEWS_REQ' })

  try {
    const req = await api.news.like(id)
    dispatch({ type: 'SET_LIKE_NEWS_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'SET_LIKE_NEWS_FAIL', payload: error.message })
  }
}

export const dislike = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEL_LIKE_NEWS_REQ' })

  try {
    const req = await api.news.dislike(id)
    dispatch({ type: 'DEL_LIKE_NEWS_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DEL_LIKE_NEWS_FAIL', payload: error.message })
  }
}

export const resetTags = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_TAG_NEWS' })
