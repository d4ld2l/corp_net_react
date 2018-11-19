import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import path from 'ramda/src/pathOr'
import moment from 'moment'
import PDF from 'react-pdf-js'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { Collapse } from 'react-bootstrap'
import StageTransitionBlock from 'components-folder/Recruitment/Candidate/StageTransitionBlock'
import {
  toggleLinkedCandidateModal,
} from 'redux-folder/actions/candidatesActions'
import {
  sendCandidateRate,
  sendCandidateComment,
  transferCandidate,
} from 'redux-folder/actions/vacancyCardActions'
import Loader from 'components-folder/Loader'
import {
  Star,
  Recomendation,
  Play,
  PensilEdit,
  Arhive,
  Crown,
  Post,
  Phone,
  Plus,
  Comment,
  Close,
  Planet,
  Plane,
  Skype,
  Settings,
  RewindDouble,
  Rewind,
  UserByParts,
  Arrow
} from 'components-folder/Icon'
import CandidateContextMenu from './CandidateContextMenu'

const cn = require('bem-cn')('vacancy-candidates-sidebar')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesSidebar.css')
}

const changeType = {
  vacancy_stage_changed: 'Переведен на этап',
  comment_added: 'Оставлен комментарий',
  rated: 'Выставлена оценка',
  vacancy_stage_changed_to_accepted: 'Принят на вакансию',
  vacancy_stage_changed_to_archived: 'Перенесен в Архив',
}

const connector = connect(state => ({
  user: state.user,
  showLindkedModal: path(false, ['candidates', 'openLinkedCandidateModal'], state),
}))

function iconAction(action) {
  switch (action) {
    case 'vacancy_stage_changed':
      let play = <Play className={cn('play-icon')} />
      return play
      break
    case 'rated':
      let star = <Star outline className={cn('star-outline-icon')} />
      return star
      break
    case 'edited':
      let pensil = <PensilEdit className={cn('pensil-edit-icon-red')} />
      return pensil
      break
    case 'vacancy_stage_changed_to_archived':
      let arhive = <Arhive className={cn('arhive-icon-red')} />
      return arhive
      break
    case 'vacancy_stage_changed_to_accepted':
      let crown = <Crown className={cn('crown-icon-red')} />
      return crown
      break
    case 'email_sent':
      let post = <Post className={cn('post-icon-red')} />
      return post
      break
    // case 'phone':
    //   let phone = <Phone className={cn('phone-icon')} />
    //   return phone
    //   break
    case 'created':
      let add = <Plus className={'icon is-plus'} />
      return add
      break
    case 'comment_added':
      let chat = <Comment className={cn('chat-icon-red')} />
      return chat
      break
    // case 'rating':
    //   let groupe = <GroupUser className={cn('user-icon')} />
    //   return groupe
    //   break
    default:
  }
}

class VacancyCandidatesSidebar extends Component {
  state = {
    showHistory: false,
    showRating: false,
    showWork: false,
    comment: '',
    listMenu: false,
    pages: null,
    page: 1,
    disabled: true,
  }

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages })
  }

  onPageComplete = (page) => {
    this.setState({ page })
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 })
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 })
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}>
      <a href="#"><i className="fa fa-arrow-left"/> Назад</a></li>
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i
        className="fa fa-arrow-left"/> Назад</a></li>
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a
      href="#">Дальше <i className="fa fa-arrow-right"/></a></li>
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Дальше <i
        className="fa fa-arrow-right"/></a></li>
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    )
  }

  handlerSend() {
    const { dispatch, currentCandidate } = this.props
    const { comment } = this.state
    if (comment !== '') {
      dispatch(sendCandidateComment(comment, currentCandidate.id)).then( () => {
        this.setState({comment: ''})
        this.checkComment()
      })
    }
  }

  handlerSendRate(value) {
    const { currentCandidate, dispatch } = this.props
    if ( get(currentCandidate, 'current_candidate_rating.value') !== value ) {
      dispatch(sendCandidateRate(value, currentCandidate.current_vacancy_stage.id, currentCandidate.id))
    }
  }

  keyDown = ({ key }) => {
    if (key === 'Enter' && !this.state.disabled) {
      const { current: vacancy, currentCandidate: candidate } = this.props
      // const currentCandidateVacancy = candidate.candidate_vacancies.find(
      //   candidate => vacancy.id === candidate.vacancy_id,
      // )
      //
      // this.handlerSend(currentCandidateVacancy.id, currentCandidateVacancy.current_vacancy_stage_id)
      this.handlerSend(vacancy.id, vacancy.current_stage_id)
    }
  }

  checkComment(){
    this.setState({ showHistory: true }, this.highlightElement.bind(this))
  }

  highlightElement(){
    const el = this.historyEl0
    el.style.backgroundColor = '#f7f7f7'
    el.style.transition = 'background-color 0.2s'
    setTimeout(() => (el.style.backgroundColor = '#FFF'), 250)
  }

  candidateYears(age) {
    if (!age) return ''
    return `${age} ${age.toString().slice(-1) === 1
      ? 'год'
      : age.toString().slice(-1) < 5 ? 'года' : 'лет'},`
  }

  handlerTransferNextStage(stageId){
    const { dispatch } = this.props
    dispatch(transferCandidate(stageId))
  }

  render() {
    const { currentCandidate, loadingVacancyCandidate } = this.props

    if (loadingVacancyCandidate || isEmpty(currentCandidate)) {
      return <Loader/>
    }
    const {
      showLindkedModal,
      dispatch,
      current,
      role,
      currentCandidate: { candidate: { resume } },
      currentCandidate: { candidate },
    } = this.props
    const { showHistory, comment, listMenu, showRating, showWork, disabled } = this.state

    const phone = get(resume, 'preferred_contact.contact_type') === 'phone' ?
      resume.preferred_contact : resume.resume_contacts.find(item => item.contact_type === 'phone')
    const email = get(resume, 'preferred_contact.contact_type') === 'email' ?
      resume.preferred_contact : resume.resume_contacts.find(item => item.contact_type === 'email')
    const skype = resume.resume_contacts.find(item => item.contact_type === 'skype')

    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages)
    }

    const currentVacancyStage = this.props.currentCandidate.current_vacancy_stage
    const availableStages = current.vacancy_stages.map(stage => (
      { name: stage.name, id: stage.id }
    )).filter(stage => stage.id !== currentVacancyStage.id)

    return (
      <div className={cn}>
        <div className={cn('control-panel')}>
          <span
            title={'Перевести на следующий этап'}
            className={'cur'}
            hidden={!currentCandidate.next_vacancy_stage}
            onClick={ () => this.handlerTransferNextStage(currentCandidate.next_vacancy_stage.id) }
          >
            <Rewind type={'outline'} className={cn('icon-rewind').mix('btn-icon_36')}/>
          </span>

          <StageTransitionBlock iconClassName={cn('icon-rewind').mix('btn-icon_36')}
                                iconType="outline"
                                stages={availableStages}
                                onChange={(stageId) => this.handlerTransferNextStage(stageId)} />

          <span
            title={'Перевести на этап "отказ"'}
            className={'cur'}
            hidden={
              findIndex(current.vacancy_stages, it => it.name === 'Отказ') <=
              findIndex(current.vacancy_stages, it => it.id === currentCandidate.current_vacancy_stage.id)
            }
            onClick={() => this.handlerTransferNextStage(current.vacancy_stages.find(it => it.name === 'Отказ').id) }
          >
            <UserByParts outline className={cn('icon-rewind').mix('btn-icon_36')}/>
          </span>

          <span onClick={() => this.setState({ listMenu: !listMenu })}
                className={cn('settings').mix('cur')}>
            <Settings outline
              className={cn('icon-settings').mix('btn-icon_53_36').state({ active: listMenu })}/>
          </span>

          <span onClick={() => dispatch({type: 'CLOSE_VACANCY_CANDIDATE_CARD'})} className={'cur'}>
            <Close className={cn('icon-close')}/>
          </span>

          {listMenu && (
            <CandidateContextMenu
              candidate={candidate}
              handlerClose={(e) => {
                if (!e.target.closest('.' + cn('settings'))) {
                  this.setState({ listMenu: false })
                }
              }}
            />
          )}
        </div>
        <div className={cn('b-wrapper')}>
          <div className={cn('candidate-information')}>
            <div className={cn('user-information')}>
              <div className={cn('avatar')}
                   style={{
                     backgroundImage: `url(${get(resume, 'photo.url') || '/public/avatar.svg'})`
                   }} >
                <div className={cn('resume-update').mix('p2 p2_theme_light_second')}>
                  Последнее обновление <br />резюме {moment(candidate.updated_at).format('DD.MM.YYYY')}
                </div>
              </div>

              <div className={cn('data')}>

                  <Link to={`/recruitment/candidates/${candidate.id}`} className={cn('user-title').mix('link link_theme_light_second indent_5')} >
                    <h2>{candidate.full_name}</h2>
                  </Link>
                <p className={cn('user-text').mix('p2 p2_theme_light_second indent_reset')}>
                  {this.candidateYears(candidate.age)} {resume.city}
                </p>
                <p className={cn('user-position')}>
                  {resume.salary_level ? `${resume.salary_level},` : ''} {resume.last_position ? `${resume.last_position}` : ''}
                </p>
                <div className={cn('user-status-block')}>
                  <div
                    className={cn('user-status')}
                    style={{
                      backgroundColor: currentCandidate.current_vacancy_stage.vacancy_stage_group.color,
                    }}
                  >
                    { currentCandidate.current_vacancy_stage.name }
                    { currentCandidate.current_vacancy_stage.evaluation_of_candidate && (
                      <span
                        className={cn('circle')}
                        style={{
                          backgroundColor: currentCandidate.current_candidate_rating ? (currentCandidate.current_candidate_rating.value ? '#20c58f' : '#ff2f51') : null,
                        }}
                      />
                    )}
                  </div>
                  { currentCandidate.other_vacancies_count > 0 && (
                    <p className={cn('user-exp')}>
                      Также на рассмотрении
                      в&nbsp;{ currentCandidate.other_vacancies_count }
                      &nbsp;вакансиях
                    </p>
                  )}
                </div>
                <address className={cn('address')}>
                  {phone && (
                    <div className={cn('address-phone')}>
                      <Phone className={cn('address-icon')}/>
                      <a href={`tel:${phone.value}`} className={'link link_theme_light_first'}>{phone.value}</a>
                    </div>
                  )}
                  {email  && (
                    <div className={cn('address-email')}>
                      <Post className={cn('address-icon')}/>
                      <a href={`mailto:${email.value}`}  className={'link link_theme_light_first'}>{email.value}</a>
                    </div>
                  )}
                  {skype && (
                    <div className={cn('address-skype')}>
                      <Skype className={cn('address-icon')}/>
                      <a href={`tel:${skype.value}`}  className={'link link_theme_light_first'}>{skype.value}</a>
                    </div>
                  )}
                  {resume.additional_contacts.map(item => (
                    <div className={cn('address-social')} key={item.id}>
                      <Planet className={cn('address-icon')}/>
                      <a
                        target={'blank'}
                        href={`${item.link}`}
                        key={item.id}
                        className={cn('account-icons-list-item').mix('link link_theme_light_first')}
                      >
                        {item.link}
                      </a>
                    </div>
                  ))}
                </address>
              </div>
            </div>
          </div>
          <div className={cn('history-block')}>
            <h4
              className={cn('history-title').mix('cur')}
              onClick={() => this.setState({
                showRating: !showRating,
                showHistory: showHistory ? showHistory : !showRating,
              })}
            >
              Оценка
              {showRating ? (
                <Arrow dir={'up'} className={cn('arrow-icon')}/>
              ) : (
                <Arrow className={cn('arrow-icon')}/>
              )}
            </h4>
            <Collapse in={showRating}>
              <div className={cn('inner')}>
                {
                  role.scoring &&
                  currentCandidate.current_vacancy_stage.evaluation_of_candidate &&
                  (
                    <div className={cn('rating-container')}>
                      <p className={cn('rating-title')}>Оцените кандидата по
                        двухбалльной шкале</p>
                      <div className={cn('rating')}>
                    <span
                      onClick={() => this.handlerSendRate(1)}
                      className={cn('icon-like').mix('cur')}
                    >
                      <Recomendation
                        color={currentCandidate.current_candidate_rating && currentCandidate.current_candidate_rating.value === 1 ? '#20c58f' : '#34363c'}/>
                    </span>
                        <span
                          onClick={() => this.handlerSendRate(0)}
                          className={cn('icon-like').mix('dislike cur')}
                        >
                      <Recomendation
                        color={currentCandidate.current_candidate_rating && currentCandidate.current_candidate_rating.value === 0 ? '#ff2f51' : '#34363c'}/>
                    </span>
                      </div>
                    </div>
                  )
                }
                <div className={cn('form-comment').mix('form-group')}>
                  <input
                    className="form-control"
                    name="comment"
                    type="text"
                    ref="comment"
                    placeholder="Оставьте комментарий"
                    onChange={event => this.setState({ comment: event.target.value, disabled: false })}
                    value={comment}
                    onKeyDown={this.keyDown}
                  />
                  <button
                    className={cn('btn-comment')}
                    title="Отправить"
                    disabled={disabled}
                    onClick={this.handlerSend.bind(this)}
                  >
                    <Plane className={cn('plane-icon')}/>
                  </button>
                </div>
              </div>
            </Collapse>
          </div>
          <div className={cn('history-block')}>
            <h4
              className={cn('history-title').mix('cur')}
              onClick={() => this.setState({ showHistory: !showHistory })}
            >
              История взаимодействия по вакансии
              {showHistory ? (
                <Arrow dir={'up'} className={cn('arrow-icon')}/>
              ) : (
                <Arrow className={cn('arrow-icon')}/>
              )}
            </h4>
            <Collapse in={showHistory}>
              <div className={cn('inner')}>
                <ul className={cn('chronological-list')}>
                  {
                    currentCandidate.candidate_changes_as_json.filter(item => item.change_type !== 'vacancy_attached').map( (item, index) => (
                      <li key={item.id}
                          ref={ history => this[`historyEl${index}`] = history }
                          className={cn('chronological-comment')}>
                        <article className={cn('chronological-article')}>
                          <div className={cn('chronological-icon-triangle')}>{iconAction(item.change_type)}</div>
                          <div className={cn('chronological-hgroup')}>
                            {item.change_type !== 'rated' ?
                              <p className={cn('chronological-title')}>{ item.change_type !== 'vacancy_stage_changed' ? changeType[item.change_type] : `${changeType[item.change_type]} "${item.change_for.name}"` }</p>:
                              item.change_for.value === 0 ?
                                <p className={cn('rating')}>{changeType[item.change_type]}<span className={cn('icon-like-assessment').mix('dislike cur')} ><Recomendation color={'#ff2f51 '}/></span></p> :
                                <p className={cn('rating')}>{changeType[item.change_type]}<span className={cn('icon-like-assessment').mix('cur')}><Recomendation color={'#20c58f'}/></span></p>
                            }
                            <p className={cn('chronological-name').mix('p3 p3_theme_light')}>{ get(item, 'account.name_surname', get(item, 'account.full_name')) }</p>
                          </div>
                          <p className={cn('chronological-date')}>
                            {moment(item.timestamp).format('DD.MM.YYYY, HH:mm')}
                          </p>
                        </article>
                        { item.change_type === 'comment_added' && <p className={cn('chronological-comment-inner')}>{item.change_for.body}</p> }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Collapse>
          </div>
          <div className={cn('history-block')}>
            <h4
              className={cn('history-title').mix('cur')}
              onClick={() => this.setState({ showWork: !showWork })}
            >
              Последнее место работы
              {showWork ? (
                <Arrow dir={'up'} className={cn('arrow-icon')}/>
              ) : (
                <Arrow className={cn('arrow-icon')}/>
              )}
            </h4>
            <Collapse in={showWork}>
              <div>
                {resume.raw_resume_doc_id ?
                  <div>{resume.raw_resume_doc && <div><PDF
                    file={resume.raw_resume_doc.file.url}
                    onDocumentComplete={this.onDocumentComplete}
                    onPageComplete={this.onPageComplete}
                    page={this.state.page}
                    loading={<Loader/>}
                  />
                    {pagination}</div>}</div>
                  :
                  <div>
                    {resume.last_work_experience && (
                      <div className={cn('address')}>
                        {resume.last_work_experience.start_date && (
                          <p className={cn('last-work-head').mix('p1 p1_theme_light_second')}>
                            {moment(resume.last_work_experience.start_date).format('DD.MM.YYYY')} -{' '}
                            {resume.last_work_experience.end_date
                              ? moment(resume.last_work_experience.end_date).format('DD.MM.YYYY')
                              : 'по наст. вр.'}
                          </p>
                        )}
                        <div className={cn('last-work-article')}>
                          <h4 className={cn('last-work-position')}>
                            {resume.last_work_experience.position}
                          </h4>
                          <div className={cn('last-work-company')}>
                            <p className={'p1 p1_theme_light_second indent_reset'}>{resume.last_work_experience.company_name}{'ᅠ'}</p>
                            <a href={resume.last_work_experience.website}
                               target={'blank'}
                               className={'link link_theme_light_first'}
                               style={{marginLeft: '5px'}}
                            >
                              {resume.last_work_experience.website}
                            </a>
                          </div>
                          <p className={cn('last-work-city').mix('p1 p1_theme_light_second')}>
                            {resume.last_work_experience.region}
                          </p>
                          <p className={cn('last-work-text-head')}>Основные
                            обязанности:</p>
                          <p
                            className={cn('last-work-text').mix('p1 p1_theme_light_first')}
                            dangerouslySetInnerHTML={{
                              __html: resume.last_work_experience.experience_description,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    )
  }
}

export default connector(VacancyCandidatesSidebar)
