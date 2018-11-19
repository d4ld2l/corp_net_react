import type { Action } from '../../types/actions'
import type { FeedsState as State } from '../../types/states'

const initialState = {
  data: [],
  current: {},
  search: [],
  scope: '',
  scroll: true,
  search_init: false,
  show: false,
  filterTags: [],
  searchValue: '',
  openSearch: false,
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

function setLike(posts, payload, status) {
  if (payload.data.success) {
    return posts.map(post => {
      if (payload.id === post.id) {
        post.likes_count = payload.data.current_likes_count
        post.already_liked = status
      }
      return post
    })
  }
  return posts
}

function setLikeComment(posts, payload, status) {
  let newPosts = [].concat(posts)
  if (payload.data.success) {
    const post = newPosts.find(post => payload.id === post.id)
    post.comments_list = post.comments_list.map(comment => {
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
    newPosts.splice(searchIndexId(posts, post), 1, post)
  }
  return newPosts
}

function setFavorite(posts, payload, status, scope) {
  if (payload.data.success) {
    if (status) {
      return posts.map(post => {
        if (payload.id === post.id) {
          post.in_favorites = status
        }
        return post
      })
    } else {
      if (scope === 'favorite') {
        return posts.filter(it => it.id !== payload.id)
      } else {
        return posts.map(post => {
          if (payload.id === post.id) {
            post.in_favorites = status
          }
          return post
        })
      }
    }
  }
  return posts
}

function updatePost(posts, payload) {
  if (payload) {
    return posts.map(post => {
      if (payload.id === post.id) {
        return payload
      }
      return post
    })
  }
  return posts
}

function deletePost(posts, payload) {
  if (payload.data.success) {
    return posts.filter(post => payload.id !== post.id)
  }
  return posts
}

function createPost(posts, payload) {
  if (payload) {
    return [].concat(payload, posts)
  }
  return posts
}

function addComment(posts, payload) {
  let newPosts = [].concat(posts)
  if (payload.data.success) {
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
    case 'GET_FEEDS_RES':
    case 'GET_POSTS_RES':
      return { ...state, data: action.payload, scope: action.scope }
    case 'GET_FEEDS_REQ':
    case 'GET_POSTS_REQ':
      return { ...state, data: initialState.data }
    case 'GET_PAGINATION_POSTS_RES':
      return { ...state, data: [].concat(state.data, action.payload), scope: action.scope, scroll:  action.payload.length > 0 }
    case 'GET_POST_RES':
      return { ...state, current: action.payload }
    case 'SEARCH_POSTS_RES':
      return { ...state, search: action.payload, search_init: true }
    case 'RESET_SEARCH_POSTS':
      return { ...state, search: [], search_init: false }
    case 'SET_LIKE_RES':
      return { ...state, data: setLike(state.data, action.payload, true) }
    case 'DEL_LIKE_RES':
      return { ...state, data: setLike(state.data, action.payload, false) }
    case 'SET_LIKE_COMMENT_RES':
      return { ...state, data: setLikeComment(state.data, action.payload, true) }
    case 'DEL_LIKE_COMMENT_RES':
      return { ...state, data: setLikeComment(state.data, action.payload, false) }
    case 'SET_FAVORITES_RES':
      return { ...state, data: setFavorite(state.data, action.payload, true, state.scope) }
    case 'DEL_FAVORITES_RES':
      return { ...state, data: setFavorite(state.data, action.payload, false, state.scope) }
    case 'DELETE_POST_RES':
      return { ...state, data: deletePost(state.data, action.payload) }
    case 'CREATE_POST_RES':
      return { ...state, data: createPost(state.data, action.payload) }
    case 'UPDATE_POST_RES':
      return { ...state, data: updatePost(state.data, action.payload) }
    case 'SET_SEARCH_VALUE_POSTS':
      return { ...state, searchValue: action.payload }
    case 'SET_SEARCH_OPEN_POSTS':
      return { ...state, openSearch: action.payload }
    case 'SEND_COMMENT_RES':
    case 'UPDATE_COMMENT_RES':
    case 'DELETE_COMMENT_RES':
      return { ...state, data: addComment(state.data, action.payload) }
    default:
      return state
  }
}
