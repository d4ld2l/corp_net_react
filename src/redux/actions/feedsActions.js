import api from '../../api'

import type { Dispatch, GetState, ThunkAction } from '../../types/actions'
import path from 'ramda/src/pathOr'

export const getAllPosts = (): ThunkAction => async (dispatch: Dispatch) => {
  const limit = 10
  dispatch({ type: 'GET_FEEDS_REQ' })

  try {
    const req = await api.feeds.all(limit)
    dispatch({ type: 'GET_FEEDS_RES', payload: req.data, scope: '' })
  } catch (error) {
    dispatch({ type: 'GET_FEEDS_FAIL', payload: error.message })
  }
}

export const getPosts = (scope): ThunkAction => async (dispatch: Dispatch) => {
  const limit = 10
  dispatch({ type: 'GET_POSTS_REQ' })

  try {
    const req = await api.feeds.filtered(scope, limit)
    dispatch({ type: 'GET_POSTS_RES', payload: req.data, scope })
  } catch (error) {
    dispatch({ type: 'GET_POSTS_FAIL', payload: error.message })
  }
}

export const getPostsPagination = (scope, offset): ThunkAction => async (dispatch: Dispatch) => {
  const limit = 10
  dispatch({ type: 'GET_PAGINATION_POSTS_REQ' })

  try {
    let req
    if (scope) {
      req = await api.feeds.paginationFiltered(limit, offset, scope)
    } else {
      req = await api.feeds.pagination(limit, offset)
    }
    dispatch({ type: 'GET_PAGINATION_POSTS_RES', payload: req.data, scope })
  } catch (error) {
    dispatch({ type: 'GET_PAGINATION_POSTS_FAIL', payload: error.message })
  }
}

export const getPost = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_POST_REQ' })

  try {
    const req = await api.feeds.post(id)
    dispatch({ type: 'GET_POST_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_POST_FAIL', payload: error.message })
  }
}

export const createPost = (state, valueBody): ThunkAction => async (dispatch: Dispatch) => {
  const values = {
    ...path({}, ['NewPost', 'values'], state.form),
  }
  const post = {
    body: valueBody,
    allow_commenting: !!values.allow_commenting ? !values.allow_commenting : true,
  }
  if (values.files && values.files.length) {
    post.photos_attributes = []
    post.documents_attributes = []
    values.files.forEach(file => {
      if (file.target === 'image') post.photos_attributes.push({ file: file.file, name: file.name })
      if (file.target === 'doc')
        post.documents_attributes.push({ file: file.file, name: file.name })
    })
  }
  dispatch({ type: 'CREATE_POST_REQ' })

  try {
    const req = await api.feeds.createPost(post)
    dispatch({ type: 'CREATE_POST_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'CREATE_POST_FAIL', payload: error.message })
  }
}

export const updatePost = (state, valueBody): ThunkAction => async (dispatch: Dispatch) => {
  const values = {
    ...path({}, ['EditPost', 'values'], state.form),
  }
  const posts = [...state.feed.data]
  const oldPost = posts.find(post => post.id === values.id)
  const post = {
    body: valueBody,
    allow_commenting: !!values.allow_commenting ? !values.allow_commenting : true,
    id: values.id,
  }
  if ((values.files && values.files.length) || oldPost.photos.length || oldPost.documents.length) {
    post.photos_attributes = []
    post.documents_attributes = []
    values.files.filter(item => !item.id).forEach(file => {
      if (file.target === 'image') post.photos_attributes.push({ file: file.file, name: file.name })
      if (file.target === 'doc')
        post.documents_attributes.push({ file: file.file, name: file.name })
    })
    const oldDocs = values.files.filter(item => !!item.id && item.target === 'doc')
    oldPost.documents.forEach(file => {
      if (!oldDocs.find(doc => file.id === doc.id)) {
        post.documents_attributes.push({ _destroy: true, id: file.id })
      }
    })
    const oldPhotos = values.files.filter(item => !!item.id && item.target === 'image')
    oldPost.photos.forEach(file => {
      if (!oldPhotos.find(doc => file.id === doc.id)) {
        post.photos_attributes.push({ _destroy: true, id: file.id })
      }
    })
  }
  dispatch({ type: 'UPDATE_POST_REQ' })

  try {
    const req = await api.feeds.updatePost(post)
    dispatch({ type: 'UPDATE_POST_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'UPDATE_POST_FAIL', payload: error.message })
  }
}

export const deletePost = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_POST_REQ' })

  try {
    const req = await api.feeds.deletePost(id)
    dispatch({ type: 'DELETE_POST_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DELETE_POST_FAIL', payload: error.message })
  }
}

export const like = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LIKE_REQ' })

  try {
    const req = await api.feeds.like(id)
    dispatch({ type: 'SET_LIKE_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'SET_LIKE_FAIL', payload: error.message })
  }
}

export const dislike = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEL_LIKE_REQ' })

  try {
    const req = await api.feeds.dislike(id)
    dispatch({ type: 'DEL_LIKE_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DEL_LIKE_FAIL', payload: error.message })
  }
}

export const likeComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LIKE_COMMENT_REQ' })

  try {
    const req = await api.feeds.likeComment(id, commentId)
    dispatch({ type: 'SET_LIKE_COMMENT_RES', payload: { data: req.data, id, commentId } })
  } catch (error) {
    dispatch({ type: 'SET_LIKE_COMMENT_FAIL', payload: error.message })
  }
}

export const dislikeComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEL_LIKE_COMMENT_REQ' })

  try {
    const req = await api.feeds.dislikeComment(id, commentId)
    dispatch({ type: 'DEL_LIKE_COMMENT_RES', payload: { data: req.data, id, commentId } })
  } catch (error) {
    dispatch({ type: 'DEL_LIKE_COMMENT_FAIL', payload: error.message })
  }
}

export const setInFavorites = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_FAVORITES_REQ' })

  try {
    const req = await api.feeds.setInFavorites(id)
    dispatch({ type: 'SET_FAVORITES_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'SET_FAVORITES_FAIL', payload: error.message })
  }
}

export const delInFavorites = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEL_FAVORITES_REQ' })

  try {
    const req = await api.feeds.delInFavorites(id)
    dispatch({ type: 'DEL_FAVORITES_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DEL_FAVORITES_FAIL', payload: error.message })
  }
}

export const sendComment = (id, body, parentId): ThunkAction => async (dispatch: Dispatch) => {
  const comment = { body }
  if (parentId) {
    comment.parent_comment_id = parentId
  }
  dispatch({ type: 'SEND_COMMENT_REQ' })

  try {
    const req = await api.feeds.sendComment(id, comment)
    dispatch({ type: 'SEND_COMMENT_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'SEND_COMMENT_FAIL', payload: error.message })
  }
}

export const deleteComment = (id, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_COMMENT_REQ' })

  try {
    const req = await api.feeds.deleteComment(id, commentId)
    dispatch({ type: 'DELETE_COMMENT_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DELETE_COMMENT_FAIL', payload: error.message })
  }
}

export const updateComment = (id, comment): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'UPDATE_COMMENT_REQ' })

  try {
    const req = await api.feeds.updateComment(id, comment)
    dispatch({ type: 'UPDATE_COMMENT_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'UPDATE_COMMENT_FAIL', payload: error.message })
  }
}

export const search = (query): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'SEARCH_POSTS_REQ' })
  const scope = getState().feed.scope

  try {
    const req = await api.feeds.search(query, scope)
    dispatch({ type: 'SEARCH_POSTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'SEARCH_POSTS_FAIL', payload: error.message })
  }
}

export const resetSearch = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_SEARCH_POSTS' })
}

export const setSearchValue = (value): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_SEARCH_VALUE_POSTS', payload: value })
}

export const setSearchOpen = (value): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_SEARCH_OPEN_POSTS', payload: value })
}
