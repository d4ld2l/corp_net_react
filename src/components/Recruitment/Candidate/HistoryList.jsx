import React, { Component } from 'react'
import moment from 'moment'
import { Collapse } from 'react-bootstrap'
import {
  Play,
  Recomendation,
  Plus,
  Arrow,
  PensilEdit,
  Star,
  Arhive,
  Crown,
  Post,
  Phone,
  Add,
  Comment,
  GroupUser,
} from 'components-folder/Icon'
import { changeType } from './data'
import type {CandidateWithIncludesRaw} from "../../../types/raws";
import xor from 'lodash/xor'
import includes from 'lodash/includes'

const cn = require('bem-cn')('candidate-history-tabs')

if (process.env.BROWSER) {
  require('./candidate-history-tabs.css')
}


function iconAction(action, color) {
  switch (action) {
    case 'vacancy_stage_changed':
      let play = <Play className={cn(color === 'red' ? 'play-icon-red' : 'play-icon-grey')} />
      return play
      break
    case 'rated':
      let star = <Star outline className={cn(color === 'red' ? 'star-outline-icon-red' : 'star-outline-icon-grey')} />
      return star
      break
    case 'edited':
      let pensil = <PensilEdit className={cn(color === 'red' ? 'pensil-edit-icon-red' : 'pensil-edit-icon-grey')} />
      return pensil
      break
    case 'vacancy_stage_changed_to_archived':
      let arhive = <Arhive className={cn(color === 'red' ? 'arhive-icon-red' : 'arhive-icon-grey')} />
      return arhive
      break
    case 'vacancy_stage_changed_to_accepted':
      let crown = <Crown className={cn(color === 'red' ? 'crown-icon-red' : 'crown-icon-grey')} />
      return crown
      break
    case 'email_sent':
      let post = <Post className={cn(color === 'red' ? 'post-icon-red' : 'post-icon-grey')} />
      return post
      break
    // case 'phone':
    //   let phone = <Phone className={cn('phone-icon')} />
    //   return phone
    //   break
    case 'created':
      let add = <Plus className={cn(color === 'red' ? 'add-icon-red' : 'add-icon-grey')} />
      return add
      break
    case 'comment_added':
      let chat = <Comment className={cn(color === 'red' ? 'chat-icon-red' : 'chat-icon-grey')} />
      return chat
      break
    // case 'rating':
    //   let groupe = <GroupUser className={cn('user-icon')} />
    //   return groupe
    //   break
    default:
  }
}



function ratingCandidate(rating) {
  let max = 5
  let countStarOutline = max - rating
  let arrPaint = new Array(rating).fill('')
  let arrOutline = new Array(countStarOutline).fill('')
  let starPaint = arrPaint.map(star => <Star className={cn('rating-icon')} />)
  let starOutline = arrOutline.map(star => <Star outline className={cn('rating-icon')} />)
  let arr = starPaint.concat(starOutline)
  return arr
}

export default class HistoryList extends Component {
  state = {
    open: [],
  }


  candidateChangeType(changes, vacancy_id) {
    const filtered = changes.filter(item => item.vacancy_id === vacancy_id)
    const attached = filtered.find(item => item.change_type === "vacancy_attached")
    const { open } = this.state

    return (
      <div key={Math.random()}>
        {attached &&
        <div key={Math.random()}>
          <div className={cn('head')} onClick={() => this.setState({open: xor(open, [attached.id])})}>
            <div className={cn('head-data')}>
              <p className={cn('head-title')}>{attached.vacancy.name}</p>
              <p className={cn('author')}>{attached.account.full_name}</p>
            </div>
            <div className={cn('wrapper-date')}>
              <time className={cn('date')}>
                {moment(attached.created_at).format('DD.MM.YYYY, HH:mm')}
              </time>
            </div>
            {open.includes(attached.id) ? (
              <Arrow className={cn('arrow-icon_close')}/>
            ) : (
              <Arrow className={cn('arrow-icon_open')}/>
            )}
          </div>

          <Collapse in={includes(this.state.open, attached.id)}>
            <div>
              <div className={cn('body')}>
                {filtered.filter(item => !['resume_edited', 'candidate_edited', 'vacancy_attached'].includes(item.change_type)).map((item, index) => (
                  <div className={cn('action')} id={index} key={Math.random()}>
                    <div className={cn('wrapper-icon')}>{iconAction(item.change_type, 'red')}</div>
                    <div className={cn('wrapper-data')}>
                      {/*<p className={cn('title')}>*/}
                      {/*{ item.change_type !== 'vacancy_stage_changed' ? changeType[item.change_type] : `${changeType[item.change_type]} "${item.change_for.name}"` }*/}
                      {/*</p>*/}

                      {item.change_type !== 'rated' ?
                        <p
                          className={cn('title')}>{item.change_type !== 'vacancy_stage_changed' ? changeType[item.change_type] : `${changeType[item.change_type]} "${item.change_for.name}"`}</p> :
                        item.change_for.value === 0 ?
                          <p className={cn('rating')}>{changeType[item.change_type]}<span
                            className={cn('icon-like-assessment').mix('dislike cur')}><Recomendation color={'#ff2f51 '}/></span>
                          </p> :
                          <p className={cn('rating')}>{changeType[item.change_type]}<span
                            className={cn('icon-like-assessment').mix('cur')}><Recomendation color={'#20c58f'}/></span></p>
                      }
                      <p className={cn('author')}>{item.account ? item.account.full_name : item.change_for.account.full_name}</p>
                      {/*{item.change_type === 'rated' && <div className={cn('rating')}>{ratingCandidate(item.change_for.value)}</div>}*/}
                      {item.change_type === 'comment_added' &&
                      <p className={cn('description')}>{item.change_for.body}</p>}
                    </div>
                    <div className={cn('wrapper-date')}>
                      <time className={cn('date')}>
                        {moment(item.timestamp).format('DD.MM.YYYY, HH:mm')}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Collapse>
        </div>
        }
      </div>
    )
  }

  render() {
    const {candidate} = this.props
    const change = candidate.candidate_changes[0]
    return (
      <div>
        {change &&
        <div className={cn('action-edit')} key={change.id}>
          <div className={cn('wrapper-icon', {indent: 'left'})}>
            {iconAction((['resume_edited', 'candidate_edited'].includes(change.change_type) ? 'edited' : change.change_type ==='vacancy_attached' ? 'vacancy_stage_changed' : change.change_type), 'grey')}
          </div>
          <div className={cn('wrapper-data')}>
            {/*{candidate.candidate_changes[0].change_type !== 'vacancy_attached' ? <p className={cn('title')}>{changeType[candidate.candidate_changes[0].change_type]}</p> : <p className={cn('title')}>{candidate.candidate_changes[0].vacancy.name}</p>}*/}
            {change.change_type === 'vacancy_attached' &&
            <p className={cn('title')}>{change.vacancy.name}</p>}
            {change.change_type !== 'rated' ?
              <p
                className={cn('title')}>{change.change_type !== 'vacancy_stage_changed' ? changeType[change.change_type] : `${changeType[change.change_type]} "${change.change_for.name}"`}</p> :
              change.change_for.value === 0 ?
                <p className={cn('rating')}>{changeType[change.change_type]}<span
                  className={cn('icon-like-assessment').mix('dislike cur')}><Recomendation color={'#ff2f51 '}/></span></p> :
                <p className={cn('rating')}>{changeType[change.change_type]}<span
                  className={cn('icon-like-assessment').mix('cur')}><Recomendation color={'#20c58f'}/></span></p>
            }
            <p className={cn('author')}>{change.account ? change.account.name_surname : change.change_for.account.name}</p>
            {/*{candidate.candidate_changes[0].change_type === 'rated' && <div className={cn('rating')}>{ratingCandidate(candidate.candidate_changes[0].change_for.value)}</div>}*/}
            {change.change_type === 'comment_added' && <p className={cn('description')}>{change.change_for.body}</p>}
          </div>
          <div className={cn('wrapper-date')}>
            <time className={cn('date')}>
              {moment(change.timestamp).format('DD.MM.YYYY, HH:mm')}
            </time>
          </div>
        </div>
        }
        <div>
        {candidate.candidate_vacancies.map((item) => this.candidateChangeType(candidate.candidate_changes, item.vacancy_id))}
        </div>
        <div>
          <div className={cn('body')}>
            {candidate.candidate_changes.filter(item => ((item.vacancy_id === null && item.change_type !== 'edited') || ['resume_edited', 'candidate_edited'].includes(item.change_type))).map((item, index) => (
              <div className={cn('action-last')} id={index} key={index}>
                <div className={cn('wrapper-icon')}>{iconAction((['resume_edited', 'candidate_edited'].includes(item.change_type) ? 'edited' : item.change_type), 'red')}</div>
                <div className={cn('wrapper-data')}>
                  <p className={cn('title')}>{changeType[item.change_type]}</p>
                  <p className={cn('author')}>{item.account.full_name}</p>
                </div>
                <div className={cn('wrapper-date')}>
                  <time className={cn('date')}>
                    {moment(item.timestamp).format('DD.MM.YYYY, HH:mm')}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

