import React, { Component } from 'react'
import moment from 'moment-timezone'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'

import { Arrow, GroupUser, Calendar, Star, Like } from 'components-folder/Icon'

const cn = require('bem-cn')('notify-note-card-body')

export default class NoteCardBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    }
  }

  handleExpandedChange = () => {
    const { isExpanded } = this.state
    this.setState({
      isExpanded: !isExpanded,
    })
  }

  render() {
    const { isExpanded } = this.state
    const {
      topics: { activeDiscussion, tabs },
      showMembers,
      addToFavorites,
      removeFromFavorites,
      likeTopic,
      dislikeTopic,
    } = this.props

    return (
      <div className={cn}>
        <div
          className={cn('head')}
          onClick={this.handleExpandedChange}
          title={isExpanded ? 'Нажмите, чтобы свернуть' : 'Нажмите, чтобы расскрыть'}
        >
          <div className={cn('level-one')}>
            {tabs.current !== 'available' && (activeDiscussion.in_favorites ? (
              <span
                className={cn('add-to-favorites')}
                title="Удалить из избранного"
                onClick={e => {
                  e.stopPropagation()
                  removeFromFavorites([activeDiscussion.id])
                }}
              >
                <Star className={cn('star')} />
              </span>
            ) : (
              <span
                className={cn('add-to-favorites')}
                title="Добавить в избранное"
                onClick={e => {
                  e.stopPropagation()
                  addToFavorites([activeDiscussion.id])
                }}
              >
                <Star outline className={cn('star')} />
              </span>
            ))}
            <h2 className={cn('label')}>{activeDiscussion.name}</h2>
            <span>
              <Arrow className={cn('arrow').mix(isExpanded && cn('arrow_open'))} />
            </span>
          </div>
          <div className={cn('level-two')}>
            <span className={cn('name').mix(cn('text'))}>
              {get(activeDiscussion, 'author.full_name', '')}
            </span>
            <span
              className={cn('participants')}
              onClick={showMembers.bind(this, activeDiscussion)}
              title={'Показать участников'}
            >
              <GroupUser className={cn('user-icon')} />
              <span className={cn('text')}>
                {activeDiscussion.discussers_count}
                {activeDiscussion.available_to_all && (
                  <span className={'p3 p3_theme_light fw_400'}>&nbsp;Доступно всем</span>
                )}
              </span>
            </span>
            <span className={cn('date')}>
              <Calendar outline className={cn('calendar-icon')} />
              <time
                className={cn('text')}
                dateTime={moment(activeDiscussion.created_at)
                  .tz(moment.tz.guess() || 'Europe/Moscow')
                  .format('DD.MM.YYYY, HH:mm')}
              >
                {moment(activeDiscussion.created_at)
                  .tz(moment.tz.guess() || 'Europe/Moscow')
                  .format('DD.MM.YYYY, HH:mm')}
              </time>
            </span>
          </div>
        </div>
        {isExpanded && (
          <div className={cn('body')}>
            <p className={cn('content')}>{activeDiscussion.body}</p>
            {/*<div className={cn('media')}>
              <div
                className={cn('first-image')}
                style={{
                  background: `url('https://picsum.photos/1000/1200/?random') center center / cover no-repeat`,
                }}
              />
              {[0, 1].map(() => (
                <div
                  key={v4()}
                  className={cn('other-image')}
                  style={{
                    background: `url('https://picsum.photos/200/300/?random') center center / cover no-repeat`,
                  }}
                />
              ))}
            </div>
            <ul className={cn('list')}>
              <li className={'item'}>
                <Link to={`/`} title={'Скачать файл'} className={cn('link')}>
                  Название документа
                </Link>
                <span className={cn('format')}>.doc</span>
              </li>
              <li className={'item'}>
                <Link to={`/`} title={'Скачать файл'} className={cn('link')}>
                  Название документа
                </Link>
                <span className={cn('format')}>.doc (15 Кб)</span>
              </li>
            </ul>*/}
            {activeDiscussion.already_liked ? (
              <span
                className={cn('i-like-it')}
                onClick={dislikeTopic.bind(this, activeDiscussion.id)}
              >
                <Like className={cn('like').mix(cn('like_active'))} />
                {/*<span className={cn('like-count')}>{activeDiscussion.likes_count || ''}</span>*/}
              </span>
            ) : (
              <span className={cn('i-like-it')} onClick={likeTopic.bind(this, activeDiscussion.id)}>
                <Like status={'outline'} className={cn('like')} />
                {/*<span className={cn('like-count')}>{activeDiscussion.likes_count || ''}</span>*/}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
}
