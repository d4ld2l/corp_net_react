import type { Action } from '../../types/actions'
import type { NewsState as State } from '../../types/states'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  data: [],
  group: [],
  categories: [],
  current: {},
  currentCat: [],
  tagNews: [],
  tags: [],
  allTags: [],
  openLinkedCandidateModal: false,
}

function searchIndexId(arr, el) {
  let index = false
  arr.forEach((item, idx) => {
    if (item.id === el.id) {
      index = idx
    }
  })
  return index
}

function addComment(current, payload) {
  if (payload.data.success) {
    if (payload.data.comment.parent_comment_id) {
      const comment = current.comments_list.find(
        comment => payload.data.comment.parent_comment_id === comment.id
      )
      const children = comment.children.find(child => payload.data.comment.id === child.id)
      if (children) {
        comment.children.splice(searchIndexId(comment.children, children), 1, payload.data.comment)
      } else {
        comment.children.push(payload.data.comment)
        current.comments_count = current.comments_count + 1
      }
      current.comments_list.splice(searchIndexId(current.comments_list, comment), 1, comment)
    } else {
      const comment = current.comments_list.find(comment => comment.id === payload.data.comment.id)
      if (comment) {
        current.comments_list.splice(
          searchIndexId(current.comments_list, comment),
          1,
          payload.data.comment
        )
      } else {
        current.comments_list.push(payload.data.comment)
        current.comments_count = current.comments_count + 1
      }
    }
  }
  return current
}

function setLikeComment(current, payload, status) {
  if (payload.data.success) {
    current.comments_list = current.comments_list.map(comment => {
      if (payload.commentId === comment.id) {
        comment.likes_count = payload.data.current_likes_count
        comment.already_liked = status
      }
      if (comment.children.length) {
        comment.children = comment.children.map(child => {
          if (payload.commentId === child.id) {
            child.likes_count = payload.data.current_likes_count
            child.already_liked = status
          }
          return child
        })
      }
      return comment
    })
  }
  return current
}

function setLike(current, payload, status) {
  if (payload.data.success) {
    current.likes_count = payload.data.current_likes_count
    current.already_liked = status
  }
  return current
}

function setLikeData(news, payload, status) {
  if (payload.data.success) {
    return news.map(post => {
      if (payload.id === post.id) {
        post.likes_count = payload.data.current_likes_count
        post.already_liked = status
      }
      return post
    })
  }
  return news
}

function addCommentData(posts, payload) {
  let newPosts = [...posts]
  if (payload.data.success && !isEmpty(newPosts)) {
    console.log(payload)
    const post = newPosts.find(post => payload.id === post.id)
    if (payload.data.comment.parent_comment_id) {
      const comment = post.comments_list.find(
        comment => payload.data.comment.parent_comment_id === comment.id
      )
      const children = comment.children.find(child => payload.data.comment.id === child.id)
      if (children) {
        comment.children.splice(searchIndexId(comment.children, children), 1, payload.data.comment)
      } else {
        comment.children.push(payload.data.comment)
        post.comments_count = post.comments_count + 1
      }
      post.comments_list.splice(searchIndexId(post.comments_list, comment), 1, comment)
    } else {
      const comment = post.comments_list.find(comment => comment.id === payload.data.comment.id)
      if (comment) {
        post.comments_list.splice(
          searchIndexId(post.comments_list, comment),
          1,
          payload.data.comment
        )
      } else {
        post.comments_list.push(payload.data.comment)
        post.comments_count = post.comments_count + 1
      }
    }
    newPosts.splice(searchIndexId(posts, post), 1, post)
  }
  return newPosts
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_NEWS_RES':
      return { ...state, data: action.payload }
    case 'GET_GROUP_NEWS_RES':
      return { ...state, group: action.payload }
    case 'GET_NEW_RES':
      return { ...state, current: action.payload }
    case 'GET_NEWS_CATEGORIES_RES':
      return { ...state, categories: action.payload }
    case 'GET_NEWS_CURRENT_CATEGORY_RES':
      return { ...state, currentCat: action.payload }
    case 'GET_TAG_NEWS_RES':
      return { ...state, tagNews: action.payload.tagNews, tags: action.payload.tags }
    case 'RESET_TAG_NEWS':
      return { ...state, tagNews: [], tags: [] }
    case 'GET_ALL_TAGS_RES':
      return { ...state, allTags: action.payload }
    case 'SET_LIKE_NEWS_RES':
      return { ...state, current: setLike(state.current, action.payload, true), data: setLikeData(state.data, action.payload, true) }
    case 'DEL_LIKE_NEWS_RES':
      return { ...state, current: setLike(state.current, action.payload, false), data: setLikeData(state.data, action.payload, false) }
    case 'SEND_COMMENT_NEWS_RES':
    case 'UPDATE_COMMENT_NEWS_RES':
    case 'DELETE_COMMENT_NEWS_RES':
      return { ...state, current: addComment(state.current, action.payload), data: addCommentData(state.data, action.payload) }
    case 'SET_LIKE_COMMENT_NEWS_RES':
      return { ...state, current: setLikeComment(state.current, action.payload, true) }
    case 'DEL_LIKE_COMMENT_NEWS_RES':
      return { ...state, current: setLikeComment(state.current, action.payload, false) }
    default:
      return state
  }
}
