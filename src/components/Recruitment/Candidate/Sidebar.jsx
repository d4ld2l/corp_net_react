import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  changeStageCandidate, getCurrentCandidate,
  getCurrentCandidateWithOutLoader,
  sendComment,
  sendRating,
} from 'redux-folder/actions/candidatesActions'
import {
  Recomendation,
  Attention,
  Rewind,
  RewindDouble,
  Plane,
  Star,
  Arrow,
} from 'components-folder/Icon'
import StageTransitionBlock from './StageTransitionBlock'

const cn = require('bem-cn')('candidate-sidebar')

if (process.env.BROWSER) {
  require('./candidate-sidebar.css')
}

export default class Sidebar extends Component {
  state = {
    open: false,
    showHistory: false,
    comment: '',
    candidateVacancyId: null,
    index: 1,
    disabled: true,
  }

  componentWillMount() {
    if (this.props.candidateVacancies.length) {
      this.setState({
        candidateVacancyId: this.props.candidateVacancies[0].id,
      })
    }
  }

  handlerSend = async (stage, vacancyId) =>  {
    const { dispatch, candidate, userId } = this.props
    const id = this.props.match.params.id | 0
    const { comment } = this.state
    this.setState({ comment: '', disabled: true })
    await dispatch(sendComment(candidate.id, vacancyId, comment, stage, userId))
    dispatch(getCurrentCandidateWithOutLoader(id))
  }

  render() {
    const { candidateVacancies, dispatch, candidate, userId } = this.props
    const { open, index, disabled } = this.state
    const currentCandidateVacancy = candidateVacancies.find(
      vacancy => candidateVacancies[index - 1].vacancy_id === vacancy.vacancy_id
    )
    const rate = currentCandidateVacancy.current_candidate_rating

    const availableStages = currentCandidateVacancy.vacancy.vacancy_stages.map(stage => (
      { name: stage.name, id: stage.id }
    )).filter(stage => stage.id !== currentCandidateVacancy.current_vacancy_stage_id)

    return (
      <div className={cn}>
        <h2>Статус по вакансии</h2>
        <div className={cn('tabs-content')} >
          {candidateVacancies.length > 0 && (
            <div key={currentCandidateVacancy.id}>
              <div className={cn('info-block')}>
                <div
                  className={cn('prev').mix('cur').state({active: index > 1})}
                  onClick={() => {if(index > 1) this.setState({index: index - 1})}}
                >
                  <Arrow className={cn('arrow-light-icon', { rotate: 'left' })} />
                </div>
                <div
                  className={cn('next').mix('cur').state({active: index < candidateVacancies.length})}
                  onClick={() => {if(index < candidateVacancies.length) this.setState({index: index + 1})}}
                >
                  <Arrow className={cn('arrow-light-icon', { rotate: 'right' })} />
                </div>
                <p className={cn('count-vacancy')}>{index} из {candidateVacancies.length}</p>
                {currentCandidateVacancy && (<Link className={cn('post')} to={`/recruitment/vacancies/${currentCandidateVacancy.vacancy.id}`}>
                  {currentCandidateVacancy.vacancy.name}
                </Link>)}
                {currentCandidateVacancy && (
                <div>
                  <p className={cn('label')}>Текущий этап</p>
                  <div className={cn('stage-block')}>
                    <div
                      className={cn('stage')}
                      style={{
                        backgroundColor: currentCandidateVacancy.current_vacancy_stage.vacancy_stage_group.color,
                      }}
                      title={
                        currentCandidateVacancy.current_vacancy_stage.name
                      }
                    >
                      <span className={cn('stage-label')}>
                        {
                          currentCandidateVacancy.current_vacancy_stage.name
                        }
                      </span>
                      {currentCandidateVacancy.current_vacancy_stage.evaluation_of_candidate && (
                        <span
                          className={cn('circle')}
                          style={{
                            backgroundColor: rate ? (rate.value ? '#20c58f' : '#ff2f51') : null,
                          }}
                        />
                      )}
                      <Attention
                        className={cn('attention-icon')}
                        style={{
                          fill: currentCandidateVacancy.current_vacancy_stage.vacancy_stage_group.color,
                        }}
                      />
                    </div>

                    <div className={cn('wrapper-stage-icon')}>
                      <div
                        title="Перевести на следующий этап"
                        onClick={async () => {
                          const id = this.props.match.params.id | 0
                          if (currentCandidateVacancy.next_vacancy_stage) {
                            await dispatch(
                              changeStageCandidate(
                                candidate.id,
                                currentCandidateVacancy.id,
                                currentCandidateVacancy.next_vacancy_stage.id
                              )
                            )
                            dispatch(getCurrentCandidateWithOutLoader(id))
                          }
                        }}
                      >
                        <Rewind type={'filled'} className={cn('stage-icon', { indent: 'right' })} />
                      </div>

                      <StageTransitionBlock stages={availableStages}
                                            onChange={async (stageId, afterChange) => {
                                              const id = this.props.match.params.id | 0
                                              await dispatch(
                                                changeStageCandidate(candidate.id, currentCandidateVacancy.id, stageId)
                                              )
                                              dispatch(getCurrentCandidateWithOutLoader(id))
                                              afterChange()
                                            }} />
                    </div>
                  </div>
                  {/* <h4 className={cn('indent-bottom')}>Оценка кандидата</h4>
                  {[0,1,2,3,4].map((i) => <Star outline key={i} className={cn('star-icon')}/>)} */}
                </div>)}
              </div>

              <div className={cn('comment-block')}>
                {/* <div className={cn('evaluation-of-the-candidate')}>
                  <h4>Оценка кандидата</h4>
                </div>
                {currentCandidateVacancy.vacancy.vacancy_stages.find(
                  stage => stage.id === currentCandidateVacancy.current_vacancy_stage_id
                ).evaluation_of_candidate && (
                  <div className={cn('rating')}>
                    <span
                      onClick={() =>
                        dispatch(
                          sendRating(
                            userId,
                            candidate.id,
                            currentCandidateVacancy.id,
                            1,
                            currentCandidateVacancy.current_vacancy_stage_id
                          )
                        )}
                      className={'icon-like cur'}
                    >
                      <Recomendation color={rate && rate.value === 1 ? '#20c58f' : null} />
                    </span>
                    &nbsp;
                    <span
                      onClick={() =>
                        dispatch(
                          sendRating(
                            userId,
                            candidate.id,
                            currentCandidateVacancy.id,
                            0,
                            currentCandidateVacancy.current_vacancy_stage_id
                          )
                        )}
                      className={'icon-dislike cur'}
                    >
                      <Recomendation dir={'dislike'} color={rate && rate.value === 0 ? '#ff2f51' : null} />
                    </span>
                  </div>
                )} */}

                <h4>Комментарии</h4>

                <div className={cn('form')}>
                  <input
                    className={cn('input')}
                    onChange={event => this.setState({ comment: event.target.value, disabled: false })}
                    value={this.state.comment}
                    onKeyDown={({ key }) => { key === 'Enter' && this.handlerSend(currentCandidateVacancy.current_vacancy_stage_id, currentCandidateVacancy.id) }}
                  />
                  <button
                    className={cn('btn-comment')}
                    disabled={disabled}
                    onClick={() =>
                      this.handlerSend(currentCandidateVacancy.current_vacancy_stage_id, currentCandidateVacancy.id)}
                  >
                    <Plane className={cn('plane-icon')} />
                  </button>
                </div>
                {/*{currentCandidateVacancy.candidate_ratings.sort((el1, el2) => moment(el1.updated_at) - moment(el2.updated_at))*/}
                  {/*.reverse().map(item => (*/}
                  {/*item.comment ?*/}
                  {/*<div className={cn('wrapper-comment')} key={item.id}>*/}
                    {/*<p className={cn('name-date')}>*/}
                      {/*{item.commenter.name} {item.commenter.surname},{' '}*/}
                      {/*{moment(item.updated_at).format('DD.MM.YYYY')}*/}
                    {/*</p>*/}
                    {/*/!* {[0, 1, 2, 3, 4].map(() => (*/}
                      {/*<Star className={cn('star-icon', { width: 'small' })} />*/}
                    {/*))} *!/*/}
                    {/*<p className={cn('comment-text')} dangerouslySetInnerHTML={{ __html: item.comment }}/>*/}
                  {/*</div> : ''*/}
                {/*)*/}
                {/*)}*/}
                {currentCandidateVacancy.comments.sort((el1, el2) => moment(el1.updated_at) - moment(el2.updated_at))
                  .reverse().map(item => {
                  if (item.body !== null)
                    return (
                  <div className={cn('wrapper-comment')} key={item.id}>
                    <p className={cn('name-date')}>
                      {item.account.name_surname},{' '}
                      {moment(item.updated_at).format('DD.MM.YYYY, HH:mm')}
                    </p>
                    {/* {[0, 1, 2, 3, 4].map(() => (
                      <Star className={cn('star-icon', { width: 'small' })} />
                    ))} */}
                    <p className={cn('comment-text')} dangerouslySetInnerHTML={{ __html: item.body }}/>
                  </div>
                )
                })}
              </div>

              {/* <h4
                className={cn('title-history').mix('cur')}
                onClick={() => this.setState({ showHistory: !showHistory })}
              >
                История взаимодействия по вакансии
                {showHistory ? (
                  <ChevronUpIcon className={cn('arrow-icon')} />
                ) : (
                  <ChevronDownIcon className={cn('arrow-icon')} />
                )}
              </h4> */}
              {/* <Collapse in={showHistory}>
                <div>
                  <ul className={cn('chronological-list')}>
                    {currentCandidateVacancy.candidate_ratings.map(item => (
                      <li key={Math.random()}>
                        <article className={cn('chronological-article')}>
                          <div className={cn('chronological-hgroup')}>
                            <p className={cn('edit-profile')}>Комментарий</p>
                            <p className={cn('edit-date')}>
                              {moment(item.updated_at).format('DD.MM.YYYY')},{' '}
                              {item.commenter.full_name}
                            </p>
                          </div>
                          <main>
                            <p className={cn('chronological-text')}>{item.comment}</p>
                          </main>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              </Collapse> */}
            </div>
          )}
        </div>
      </div>
    )
  }
}
