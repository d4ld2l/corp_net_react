import React, { Component } from 'react'
import Loader from 'components-folder/Loader'
import DiscussionHeader from '../Discussion/DiscussionHeader'
import Discussion from '../Discussion'
import DiscussionCard from '../DiscussionCard'
import DiscussionForm from '../DiscussionForm'
import DiscussionMembers from '../DiscussionMembers'
import Filter from '../Filter'

const cn = require('bem-cn')('discussions')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Discussions extends Component {
  render() {
    // Data
    const {
      nextDiscussionPage,
      discussionsTriggerid,
      accounts,
      user,
      discussions,
      activeDiscussion,
      activeEntity,
      comments,
      card,
      tableHeaders,
      tabs,
      loading,
      loadingUpComments,
      loadingDownComments,
      nextCommentsUpPage,
      nextCommentsDownPage,
    } = this.props

    // Actions
    const {
      loadTopics,
      showCard,
      showMembers,
      deleteTopics,
      closeTopics,
      leaveTopic,
      openTopics,
      showEditForm,
      closeAll,
      addToFavorites,
      removeFromFavorites,
      likeTopic,
      dislikeTopic,
      toggleCardAdditionalInfo,
      loadUpComments,
      loadDownComments,
      editComment,
      deleteComment,
      likeComment,
      dislikeComment,
      unreadedCommentBecomeVisible,
    } = this.props

    return (
      <div className={cn('wrapper')}>
        {/*old width 470px*/}
        <div className={cn('switch-container')} style={{ width: activeEntity ? '318px' : '100%' }}>
          <Filter {...this.props} />

          <DiscussionHeader activeEntity={activeEntity} tableHeaders={tableHeaders} />

          <div
            className={cn('scroll').mix('global-scroll global-scroll_theme_light')}
            ref={node => (this.discussionsScroll = node)}
          >
            {discussions.map((it, i) => (
              <Discussion
                key={`table-entry-${it.id}`}
                {...{
                  discussion: it,
                  discussionsTriggerid,
                  discussions,
                  tabs,
                  loadTopics,
                  loading,
                  nextDiscussionPage,
                  activeDiscussion,
                  activeEntity,
                  showCard,
                  addToFavorites,
                  removeFromFavorites,
                }}
              />
            ))}
            {loading && <Loader />}
          </div>
        </div>
        {activeEntity === 'Card' && (
          <DiscussionCard
            {...{
              discussions,
              activeDiscussion,
              activeEntity,
              card,
              comments,
              tabs,
              user,
              loadingUpComments,
              loadingDownComments,
              nextCommentsUpPage,
              nextCommentsDownPage,
              //actions
              showEditForm,
              showMembers,
              closeAll,
              addToFavorites,
              removeFromFavorites,
              likeTopic,
              dislikeTopic,
              toggleCardAdditionalInfo,
              loadUpComments,
              loadDownComments,
              unreadedCommentBecomeVisible,
              editComment,
              deleteComment,
              likeComment,
              dislikeComment,
              deleteTopics,
              closeTopics,
              openTopics,
              leaveTopic,
            }}
          />
        )}
        {activeEntity === 'Form' && (
          <DiscussionForm
            {...{
              activeDiscussion,
              closeAll,
            }}
          />
        )}
        {activeEntity === 'Members' && (
          <DiscussionMembers
            {...{
              activeDiscussion,
              accounts,
              showCard,
              closeAll,
            }}
          />
        )}
      </div>
    )
  }
}
