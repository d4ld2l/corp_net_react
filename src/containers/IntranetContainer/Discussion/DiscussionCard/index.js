import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
import { get } from 'lodash'

import { Collapse } from 'react-bootstrap'

import {
  Pencil,
  Trash,
  Plus,
  Check,
  Spread,
  Close,
  Star,
  GroupUser,
  Calendar,
  Exit,
  Like,
  Arrow,
  Plane,
  Lock,
  AddImage,
  AddDocument,
  AddPeople,
  Checkbox,
} from 'components-folder/Icon'

import Comments from './Comments'
import NewComment from './NewComment'
import DiscussionContextMenu from './DiscussionContextMenu'
import DiscussionInput from './DiscussionInput'

export const cn = require('bem-cn')('discussion-card')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class DiscussionCard extends Component {
  render() {
    // Data
    const {
      discussions,
      activeDiscussion,
      activeEntity,
      user,
      tabs,
      loadingUpComments,
      loadingDownComments,
      nextCommentsUpPage,
      nextCommentsDownPage,
      card: { showAdditionalInfo, showInput, showContextMenu },
      comments,
    } = this.props

    // Actions
    const {
      showMembers,
      showEditForm,
      closeAll,
      deleteTopics,
      openTopics,
      closeTopics,
      leaveTopic,
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
        <div className={cn('func-elements')}>
          {activeDiscussion.author_id === user.id && (
            <span
              onClick={showEditForm.bind(this, activeDiscussion)}
              className={cn('func-elements-wrapper')}
            >
              <Pencil className={cn('func-elements-icon')} />
            </span>
          )}
          {/*
            <span className={cn('func-elements-wrapper')}>
              <AddPeople
              className={cn('func-elements-icon').mix(cn(showInput && 'func-elements-icon_active'))}
              />
            </span>
          */}
          {/*{showInput && <DiscussionInput handlerClose={console.log} />}*/}
          {activeDiscussion.author_id === user.id && (
            <span
              onClick={() => {
                if (activeDiscussion.state === 'closed') {
                  openTopics([activeDiscussion.id])
                } else {
                  closeTopics([activeDiscussion.id])
                }
              }}
              className={cn('func-elements-wrapper')}
              title={
                activeDiscussion.state === 'closed' ? 'Открыть обсуждение' : 'Закрыть обсуждение'
              }
            >
              <Lock
                className={cn('func-elements-icon').state({
                  closed: activeDiscussion.state === 'closed',
                })}
              />
            </span>
          )}
          {activeDiscussion.author_id === user.id && (
            <span
              onClick={() => deleteTopics([activeDiscussion.id])}
              className={cn('func-elements-wrapper')}
              title={'Удалить обсуждение'}
            >
              <Trash className={cn('func-elements-icon')} />
            </span>
          )}
          {activeDiscussion.author_id !== user.id && activeDiscussion.status === 'active' && (
            <span
              onClick={() => leaveTopic(activeDiscussion.id)}
              className={cn('func-elements-wrapper')}
              title={'Выйти из обсуждения'}
            >
              <Exit className={cn('func-elements-icon')} />
            </span>
          )}
          {/*
            <span
              className={cn('func-elements-wrapper')}
              title={showContextMenu ? 'Закрыть' : 'Открыть'}
            >
              <Spread
                className={cn('func-elements-icon').mix(
                  cn(showContextMenu && 'func-elements-icon_active')
                )}
              />
            </span>
            {showContextMenu && <DiscussionContextMenu handlerClose={console.log} />}
          */}
          <span
            onClick={closeAll}
            className={cn('closed-thin-icon-wrapper').mix('cur')}
            title={'Закрыть карточку группы'}
          >
            <Close className={cn('closed-thin-icon')} />
          </span>
        </div>
        <div className={cn('header-wrap')}>
          <div className={cn('header')}>
            {tabs.current !== 'available' && (
              <div className={cn('favorites')}>
                {activeDiscussion.in_favorites ? (
                  <span
                    title="Удалить из избранного"
                    onClick={removeFromFavorites.bind(this, [activeDiscussion.id])}
                  >
                    <Star className={cn('favorites-icon')} />
                  </span>
                ) : (
                  <span
                    title="Добавить в избранное"
                    onClick={addToFavorites.bind(this, [activeDiscussion.id])}
                  >
                    <Star outline className={cn('favorites-icon')} />
                  </span>
                )}
              </div>
            )}
            <div className={cn('group-info')}>
              <div>
                <h2 className={cn('title').mix('indent_8')}>{activeDiscussion.name}</h2>
                <div className={cn('info')}>
                  <div className={cn('info-name').mix('p3 p3_theme_light fw_400')}>
                    {get(activeDiscussion, 'author.full_name', '')}
                  </div>
                  <div
                    className={cn('info-members')}
                    title="Показать учасников"
                    onClick={showMembers.bind(this, activeDiscussion)}
                  >
                    <span>
                      <GroupUser className={cn('info-icon')} />
                    </span>
                    <span>
                      {activeDiscussion.discussers_count}
                      {activeDiscussion.available_to_all && (
                        <span className={'p3 p3_theme_light fw_400'}>&nbsp;Доступно всем</span>
                      )}
                    </span>
                  </div>
                  <div className={cn('info-date')}>
                    <span>
                      <Calendar
                        outline
                        className={cn('info-icon').mix(cn('info-icon_non-click'))}
                      />
                    </span>
                    <span className={'p3 p3_theme_light fw_400'}>
                      {moment(activeDiscussion.created_at)
                        .tz(moment.tz.guess() || 'Europe/Moscow')
                        .format('DD.MM.YYYY, HH:mm')}
                    </span>
                  </div>
                </div>
                <Collapse in={showAdditionalInfo}>
                  <div className={cn('description')}>
                    <p className={'p1 p1_theme_light_first'}>{activeDiscussion.body}</p>
                    {activeDiscussion.already_liked ? (
                      <span onClick={dislikeTopic.bind(this, activeDiscussion.id)}>
                        <Like className={cn('like-icon')} />
                      </span>
                    ) : (
                      <span onClick={likeTopic.bind(this, activeDiscussion.id)}>
                        <Like status={'outline'} className={cn('like-icon')} />
                      </span>
                    )}
                  </div>
                </Collapse>
              </div>
            </div>
            <span className={cn('arrow-icon-wrapper')} onClick={toggleCardAdditionalInfo}>
              {showAdditionalInfo ? (
                <Arrow className={cn('arrow-icon').mix(cn('arrow-icon_open'))} />
              ) : (
                <Arrow className={cn('arrow-icon')} />
              )}
            </span>
          </div>
        </div>
        <Comments
          ref={node => (this.comments = node)}
          {...{
            user,
            activeDiscussion,
            comments,
            loadingUpComments,
            loadingDownComments,
            nextCommentsUpPage,
            nextCommentsDownPage,
            loadUpComments,
            loadDownComments,
            editComment,
            deleteComment,
            likeComment,
            dislikeComment,
            unreadedCommentBecomeVisible,
          }}
        />
        <NewComment />
        {/*
          <div className={cn('scroll-down')}>
            {activeDiscussion.unread_count
              ? <div>{activeDiscussion.unread_count}</div>
              : ''
            }
          </div>
        */}
      </div>
    )
  }
}
