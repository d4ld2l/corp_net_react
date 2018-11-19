import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
import { Comment, Like, Star, Arrow, Spread } from 'components-folder/Icon'
import { get, first, takeRight } from 'lodash'

import { humanizedCategoryName } from 'redux-folder/ducks/topics'

import CheckboxField from 'components-folder/Form/CheckboxField'

let VisibilitySensor = () => <div />
export const cn = require('bem-cn')('discussion')
if (process.env.BROWSER) {
  require('./style.css')
  VisibilitySensor = require('react-visibility-sensor').default
}

export default class Discussion extends Component {
  state = {
    disableTransitionToCard: false,
  }

  transitionToCard() {
    const { disableTransitionToCard } = this.state
    if (disableTransitionToCard) return

    const { showCard, discussion } = this.props
    showCard(discussion)
  }

  onChange = isVisible => {
    const {
      discussion: { id },
      discussions,
      loading,
      nextDiscussionPage,
      discussionsTriggerid,
    } = this.props
    const { loadTopics } = this.props
    if (!loading && nextDiscussionPage && id === discussionsTriggerid && isVisible) {
      loadTopics()
    }
  }

  render() {
    // Data
    const { discussion, activeDiscussion, activeEntity, tabs } = this.props

    // Actions
    const { showCard, addToFavorites, removeFromFavorites } = this.props

    const clickableItem = {
      onMouseEnter: () => this.setState({ disableTransitionToCard: true }),
      onMouseLeave: () => this.setState({ disableTransitionToCard: false }),
    }

    return (
      <VisibilitySensor
        onChange={isVisible => this.onChange.call(this, isVisible)}
        resizeCheck={true}
        scrollCheck={true}
      >
        <div
          onClick={this.transitionToCard.bind(this)}
          className={cn('item')
            .mix(activeDiscussion.id === discussion.id && activeEntity && cn('item_active'))
            .mix(cn(activeEntity && 'item_opened'))}
        >
          {/*<label {...clickableItem} className={'custom-checkbox'}>
            <input type="checkbox" disabled />
            <span className={'custom-checkmark is-disabled'} title="NOT NOW!!!" />
          </label>*/}
          <div className={cn('info')}>
            <p className={cn('info-name').mix('p1 p1_theme_light_first indent-reset')}>
              {discussion.name}
              {discussion.state === 'closed' ? <i> (закрыто)</i> : ''}
            </p>
            {discussion.discussable_type ? (
              <span className={cn('info-number').mix('p2 p2_theme_light_second indent-reset')}>
                {humanizedCategoryName[`${discussion.discussable_type}`]}
              </span>
            ) : (
              <span className={cn('info-number').mix('p2 p2_theme_light_second indent-reset')}>
                Диалоги
              </span>
            )}
          </div>
          <div className={cn('hidden-items')}>
            {!activeEntity && (
              <div className={cn('hidden-items')}>
                <div className={cn('author')}>
                  <p className={cn('author-name').mix('p1 p1_theme_light_first indent-reset')}>
                    {get(discussion, 'author.full_name', '')}
                  </p>
                  <time
                    className={cn('author-date-time').mix('p2 p2_theme_light_second indent-reset')}
                  >
                    <span>
                      {moment(discussion.created_at)
                        .tz('Europe/Moscow')
                        .format('DD.MM.YYYY, h:mm a')}
                    </span>
                  </time>
                </div>
                <div className={cn('functional-elements')} {...clickableItem}>
                  <div className={cn('comment')} onClick={showCard.bind(this, discussion)}>
                    <Comment className={cn('comment-icon')} />
                    <span className={cn('comment-quantity').mix('p3 p3_theme_light indent-reset')}>
                      {discussion.messages_count}
                    </span>
                  </div>
                  {tabs.current !== 'available' && (
                    <div className={cn('favorites')}>
                      {discussion.in_favorites ? (
                        <span
                          title="Удалить из избранного"
                          onClick={removeFromFavorites.bind(this, [discussion.id])}
                        >
                          <Star className={cn('favorites-icon')} />
                        </span>
                      ) : (
                        <span
                          title="Добавить в избранное"
                          onClick={addToFavorites.bind(this, [discussion.id])}
                        >
                          <Star outline className={cn('favorites-icon')} />
                        </span>
                      )}
                    </div>
                  )}
                  {/*<div className={cn('functions')}>
                    <Spread className={cn('functions-icon')} />
                  </div>*/}
                </div>
              </div>
            )}
            <div
              className={cn('messages')
                /*.mix(cn('messages_active'))*/
                .mix(cn(discussion.unread_count === 0 && 'messages_empty'))}
            >
              {discussion.unread_count === 0 ? '' : discussion.unread_count}
            </div>
          </div>

          <div className={cn('item-open-sidebar')} title={'Раскрыть карточку группы рассылки'}>
            <Arrow
              className={cn('item-arrow-icon').mix(
                cn(
                  activeDiscussion.id === discussion.id && activeEntity && 'item-arrow-icon_active'
                )
              )}
            />
          </div>
        </div>
      </VisibilitySensor>
    )
  }
}
