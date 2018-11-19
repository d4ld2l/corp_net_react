import React, {Component, PureComponent} from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import {
  getAllPosts,
  getPostsPagination
} from '../../../redux/actions/feedsActions'
import Loader from 'components-folder/Loader'
import {Gallery} from 'components-folder/Modals/Gallery'
const cn = require('bem-cn')('publication')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(state => ({
  posts: state.feed.data,
  search: state.feed.search,
  scope: state.feed.scope,
  scroll: state.feed.scroll,
  search_init: state.feed.search_init,
  loaders: state.loaders,
}))

class Publication extends PureComponent {
  state = {
    open: false,
    photos: [],
    idx: 1,
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(getAllPosts(0))
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const {search, scroll} = this.props
    if (!search.length) {
      if (scroll) {
        const element = document.querySelectorAll('#post-container')[0]
        const height = element ? element.clientHeight : 1000
        const offset = window.pageYOffset
        const {loaders: {feeds}} = this.props
        if (height - offset < 550 && !feeds) {
          const {dispatch, scope, posts} = this.props
          dispatch(getPostsPagination(scope, posts.length))
        }
      }
    }
  }

  render() {
    const {posts, search, search_init, loaders: {feeds}} = this.props
    const {open, photos, idx} = this.state
    const data = search_init ? search : posts
    if (feeds && data.length === 0) {
      return <Loader/>
    }
    return (
      <section id={'post-container'}>
        {data.map(post => (
          <Post
            post={post}
            key={post.id}
            showGallery={(photos, idx) => this.setState({
              open: true,
              photos,
              idx
            })}
          />
        ))}
        {
          data.length === 0 && search_init &&
          <div className={cn()}>
            <div className={cn('header')}>
              <h2 className={cn('empty_search')}> По вашему запросу ничего не найдено </h2>
            </div>
          </div>
        }
        <Gallery
          show={open}
          onHide={() => this.setState({open: false})}
          photos={photos}
          idx={idx}
        />
        {feeds && data.length > 0 && <Loader/>}
      </section>
    )
  }
}

export default connector(Publication)
