import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import path from 'ramda/src/pathOr'
import moment from 'moment'
import PDF from 'components-folder/Common/PDF'
import { get, isEqual, sortBy, isEmpty } from 'lodash'
import { Collapse } from 'react-bootstrap'
import {
  getCurrentCandidate,
  getCurrentCandidateLight,
  toggleLinkedCandidateModal,
  sendComment,
  sendRating,
} from 'redux-folder/actions/candidatesActions'
import Loader from 'components-folder/Loader'
import CandidateContextMenu from './CandidateContextMenu'
import {
  Recomendation,
  Star,
  Post,
  Phone,
  Comment,
  Plane,
  Planet,
  Close,
  Skype,
  Settings,
  Arrow
} from 'components-folder/Icon'
import { LinkedCandidateModal } from 'components-folder/Modals/LinkedCandidateModal'
import { getCurrentVacancy } from 'redux-folder/actions/vacanciesActions'
import { changeType } from './data'
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";

const cn = require('bem-cn')('candidates-sidebar')

if (process.env.BROWSER) {
  require('./CandidateSidebar.css')
}

const connector = connect(state => ({
  candidate: state.candidates.current,
  loading: state.loaders.currentCandidate,
  vacancies: state.vacancies.all,
  user: state.user,
  showLindkedModal: path(false, ['candidates', 'openLinkedCandidateModal'], state),
}))

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

function iconAction(action) {
  switch (action) {
    case 'rated':
      let star = <Star outline className={cn('star-outline-icon')} />
      return star
      break
    case 'comment_added':
      let chat = <Comment className={cn('chat-icon-red')} />
      return chat
      break
    default:
  }
}

class CandidatesSidebar extends Component {
  state = {
    showHistory: false,
    showRating: false,
    showWork: true,
    showConsideration: false,
    comment: '',
    listMenu: false,
    disabled: true,
  }

  componentDidMount() {
    const { dispatch, candidateId } = this.props
    dispatch(getCurrentCandidateLight(candidateId))
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.candidateId, this.props.candidateId)) {
      this.props.dispatch(getCurrentCandidateLight(nextProps.candidateId))
    }
  }

  handlerSend(candidateVacancyId, stage) {
    const { dispatch, candidate, ownerId } = this.props
    const { comment } = this.state
    this.setState({ disabled: true })
    dispatch(sendComment(candidate.id, candidateVacancyId, comment, stage, ownerId)).then(() => {
      this.setState({comment: '', showHistory: true , showWork: false }), this.checkComment()
    })
  }

  checkComment(){
    this.setState({ showHistory: true }, this.highlightElement.bind(this))
  }

  highlightElement(){
    const el = this.historyEl0
    el.scrollIntoView()
    el.style.backgroundColor = '#FDFF47'
    el.style.transition = 'background-color 0.2s'
    setTimeout(() => (el.style.backgroundColor = '#FFF'), 250)
  }

  handlerSendRate(ownerId, candidateId, currentCandidateVacancyId, value, stage, vacancy) {
    const { dispatch } = this.props
    dispatch(sendRating(ownerId, candidateId, currentCandidateVacancyId, value, stage)).then(() => {
      dispatch(getCurrentVacancy(vacancy.id))
    })
  }

  render() {
    const { candidate, loading, user } = this.props
    if (loading || !candidate) {
      return (
        <div style={{ height: '100px' }}>
          <Loader />
        </div>
      )
    }
    const {
      showLindkedModal,
      dispatch,
      vacancy,
      closeSidebar,
      candidate: { resume = {} },
    } = this.props
    const {
      listMenu,
      showWork,
      showConsideration,
    } = this.state
    const candidateVacancyChain = get(candidate, 'candidate_vacancies_active[0]')
    let rate
    if (candidateVacancyChain) {
      rate = candidateVacancyChain.current_candidate_rating
    }
    const resumeContacts = get(resume, 'resume_contacts', [])
    const preferredContactType = get(resume, 'preferred_contact.contact_type')
    const phone = preferredContactType === 'phone' ?
      resume.preferred_contact : resumeContacts.find(item => item.contact_type === 'phone')
    const email = preferredContactType === 'email' ?
      resume.preferred_contact : resumeContacts.find(item => item.contact_type === 'email')
    const skype = resumeContacts.find(item => item.contact_type === 'skype')

    const lastWorkPlace = get(resume, 'last_work_experience', null)

    return (
      <div className={cn}>
        <div className={cn('control-panel')}>
          <span onClick={() => this.setState({ listMenu: !listMenu })} className={'cur'}>
            <Settings outline className={cn('icon-settings').state({ active: listMenu })} />
          </span>
          <span onClick={closeSidebar} className={'cur'}>
            <Close className={cn('icon-close')} />
          </span>
          {listMenu && (
            <CandidateContextMenu
              candidate={candidate}
              vacancy={vacancy}
              handlerClose={() => this.setState({ listMenu: false })}
            />
          )}
          <LinkedCandidateModal
            show={showLindkedModal}
            candidateId={candidate.id}
            onHide={() => dispatch(toggleLinkedCandidateModal(false))}
            getLightCandidate={true}
          />
        </div>

        <div className={cn('b-wrapper').mix('global-scroll global-scroll_theme_light')}>
          <div className={cn('candidate-information')}>
            <div className={cn('user-information')}>
              <div className={cn('avatar')}
                   style={{
                     backgroundImage: `url(${get(candidate, 'resume.photo.url') || '/public/avatar.svg'})`
                   }} >
              </div>

              <div className={cn('data')}>
                <h2 className={cn('user-title')}>
                  <Link className={('link link_theme_light_first')}
                    to={`/recruitment/candidates/${candidate.id}`}
                  >{`${candidate.first_name} ${candidate.middle_name ||
                    ''} ${candidate.last_name}`}</Link>
                </h2>
                <p className={cn('user-text').mix('p2 p2_theme_light_second')}>
                  {candidate.birthdate &&
                    `${moment().diff(path('', ['birthdate'], candidate), 'years')},`}{' '}
                  {get(resume, 'city', '')}
                </p>
                <p className={cn('user-position').mix('p1 p1_theme_light_first')}>
                  {get(resume, 'salary_level', false)
                    ? `${resume.salary_level}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                    : ''}
                  {get(resume, 'salary_level', false) && get(lastWorkPlace, 'position')
                    ? `, ${get(lastWorkPlace, 'position')}`
                    : get(lastWorkPlace, 'position', '')}
                </p>
                { candidateVacancyChain && (
                    <div className={cn('user-status-block')}>
                        <div
                          className={cn('user-status')}
                          style={{
                            backgroundColor: candidateVacancyChain.current_vacancy_stage.vacancy_stage_group.color,
                          }}
                        >
                          { candidateVacancyChain.current_vacancy_stage.name }
                          { candidateVacancyChain.current_vacancy_stage.evaluation_of_candidate && (
                            <span
                              className={cn('circle')}
                              style={{
                                backgroundColor: rate ? (rate.value === 1 ? '#20c58f' : '#ff2f51') : null,
                              }}
                            />
                          )}
                        </div>
                      {candidate.candidate_vacancies_active.length > 1 && (
                        <p className={cn('user-exp')}>
                          Также на рассмотрении в&nbsp;{candidate.candidate_vacancies_active.length - 1}
                          &nbsp;вакансиях
                        </p>
                      )}
                    </div>
                  )}
                <address className={cn('address')}>
                  {phone && (
                    <div className={cn('address-phone')}>
                      <Phone className={cn('address-icon')} />
                        <a className={('link link_theme_light_first')} href={`tel:${phone.value}`}>{phone.value}</a>
                    </div>
                  )}
                  {email && (
                    <div className={cn('address-email')}>
                      <Post className={cn('address-icon')} />
                      <a className={('link link_theme_light_first')} href={`mailto:${email.value}`}>{email.value}</a>
                    </div>
                  )}
                  {skype && (
                    <div className={cn('address-skype')}>
                      <Skype className={cn('address-icon')} />
                      <a className={('link link_theme_light_first')} href={`tel:${skype.value}`}>{skype.value}</a>
                    </div>
                  )}
                  {get(resume, 'additional_contacts', []).map(item => (
                    <div className={cn('address-social')} key={item.id}>
                      <Planet className={cn('address-icon')} />
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
          { !isEmpty(candidate.candidate_vacancies_active) && (
            <div className={cn('history-block')}>
              <h4
                className={cn('history-title').mix('cur')}
                onClick={() => this.setState({ showConsideration: !showConsideration })}
              >
                На рассмотрении{' '}
                <span className={cn('count')}>{candidate.candidate_vacancies_active.length}</span>
                {showConsideration ? (
                  <Arrow dir={'up'} className={cn('arrow-icon').mix('is-arrow')} />
                ) : (
                  <Arrow className={cn('arrow-icon').mix('is-arrow')} />
                )}
              </h4>
              <Collapse in={showConsideration}>
                <div className={cn('inner')}>
                  <ul className={cn('chronological-list')}>
                    {candidate.candidate_vacancies_active.map(item => {
                        return (
                          <li key={item.id} className={cn('chronological-vacancy')}>
                            <article className={cn('chronological-article')}>
                              <Link
                                className={cn('chronological-link')}
                                to={`/recruitment/vacancies/${item.vacancy.id}`}
                              >
                                {item.vacancy.name}
                              </Link>
                              <div
                                className={cn('user-status')}
                                style={{
                                  backgroundColor: item.current_vacancy_stage.vacancy_stage_group.color,
                                }}
                              >
                                {
                                  item.current_vacancy_stage.name
                                }
                                {item.current_vacancy_stage.evaluation_of_candidate && (
                                  <span
                                    className={cn('circle')}
                                    style={{
                                      backgroundColor: get(item, 'current_candidate_rating') ?
                                        ( get(item, 'current_candidate_rating.value') === 1 ? '#20c58f' : '#ff2f51' ) : null
                                    }}
                                  />
                                )}
                              </div>
                          </article>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </Collapse>
          </div>
        )}
        {(lastWorkPlace || get(resume, 'raw_resume_doc.id', false)) && (
          <div className={cn('history-block')}>
            <h3
              className={cn('history-title').mix('cur').mix('fw_300')}
              onClick={() => this.setState({showWork: !showWork})}
            >
              Последнее место работы
              {showWork ? (
                <Arrow dir={'up'} className={cn('arrow-icon').mix('is-arrow')}/>
              ) : (
                <Arrow className={cn('arrow-icon').mix('is-arrow')}/>
              )}
            </h3>
            <Collapse in={showWork}>
              <div>
                {!isEmpty(resume.raw_resume_doc) ?
                  <PDF link={candidate.resume.raw_resume_doc.file.url} />
                  : lastWorkPlace && (
                    <div>
                      {lastWorkPlace.start_date && (
                        <p className={cn('last-work-head').mix('p1 p1_theme_light_second')}>
                          {moment(lastWorkPlace.start_date).format('DD.MM.YYYY')} - {' '}
                          { lastWorkPlace.end_date
                            ? moment(lastWorkPlace.end_date).format('DD.MM.YYYY')
                            : 'по наст. вр.'}
                        </p>
                      )}
                      <div className={cn('last-work-article')}>
                        <p className={cn('last-work-position').mix('p1 p1_theme_light_first')}>
                          {lastWorkPlace.position}
                        </p>
                        <div className={cn('last-work-company').mix('indent_5')}>
                          <p className={'p1 p1_theme_light_second indent_reset'}>{lastWorkPlace.company_name}{'ᅠ'}</p>
                          <a
                            href={lastWorkPlace.website}
                            target={'blank'}
                            className={'p1 link link_theme_light_second indent_reset'}
                            style={{marginLeft: '5px'}}
                          >
                            {lastWorkPlace.website}
                          </a>
                        </div>
                        <p className={cn('last-work-city').mix('p1 p1_theme_light_second  indent_reset')}>
                          {lastWorkPlace.region}
                        </p>
                        <p className={cn('last-work-text-head').mix('p1 p1_theme_light_first')}>Основные
                          обязанности:</p>
                        <p
                          className={cn('last-work-text').mix('p1 p1_theme_light_first')}
                          dangerouslySetInnerHTML={{
                            __html: lastWorkPlace.experience_description,
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  )}
}

export default connector(CandidatesSidebar)


// {candidateVacancyChain && (
//   <div className={cn('history-block')}>
//     <h4
//       className={cn('history-title').mix('cur')}
//       onClick={() => this.setState({
//         showRating: !showRating,
//         showHistory: showHistory ? showHistory : !showRating,
//       })}
//     >
//       Оценка
//       {showRating ? (
//         <Arrow dir={'up'} className={cn('arrow-icon').mix('is-arrow')}/>
//       ) : (
//         <Arrow className={cn('arrow-icon').mix('is-arrow')}/>
//       )}
//     </h4>
//     <Collapse in={showRating}>
//       <div className={cn('inner')}>
//         {role.scoring && candidateVacancy.vacancy_stages.find(
//           stage => stage.id === candidateVacancyChain.current_vacancy_stage_id
//         ).evaluation_of_candidate && (
//           <div className={cn('rating-container')}>
//             <p className={cn('rating-title')}>Оцените кандидата по
//               двухбалльной шкале</p>
//             <div className={cn('rating')}>
//                       <span
//                         onClick={() =>
//                           this.handlerSendRate(
//                             ownerId,
//                             candidate.id,
//                             candidateVacancyChain.id,
//                             1,
//                             candidateVacancyChain.current_vacancy_stage_id,
//                             candidateVacancy
//                           )}
//                         className={cn('icon-like').mix('cur')}
//                       >
//                         <Recomendation
//                           color={rate && rate.value === 1 ? '#20c58f' : '#34363c'}/>
//                       </span>
//               <span
//                 onClick={() =>
//                   this.handlerSendRate(
//                     ownerId,
//                     candidate.id,
//                     candidateVacancyChain.id,
//                     0,
//                     candidateVacancyChain.current_vacancy_stage_id,
//                     candidateVacancy
//                   )}
//                 className={cn('icon-like').mix('dislike cur')}
//               >
//                         <Recomendation
//                           color={rate && rate.value === 0 ? '#ff2f51' : '#34363c'}/>
//                       </span>
//             </div>
//           </div>
//         )}
//         <div className={cn('form-comment').mix('form-group')}>
//           <input
//             className="form-control"
//             name="comment"
//             type="text"
//             ref="comment"
//             placeholder="Оставьте комментарий"
//             onChange={event => this.setState({comment: event.target.value, disabled: false})}
//             value={comment}
//             onKeyDown={this.keyDown}
//           />
//           <button
//             className={cn('btn-comment')}
//             title="Отправить"
//             disabled={disabled}
//             onClick={() =>
//               this.handlerSend(
//                 candidateVacancyChain.id,
//                 candidateVacancyChain.current_vacancy_stage_id,
//               )}
//           >
//             <Plane className={cn('plane-icon')}/>
//           </button>
//         </div>
//       </div>
//     </Collapse>
//   </div>
// )}

// <div className={cn('history-block')}>
// <h4
// className={cn('history-title').mix('cur')}
// onClick={() => this.setState({showHistory: !showHistory})}
// >
// История кандидата
// {showHistory ? (
//   <Arrow dir={'up'} className={cn('arrow-icon').mix('is-arrow')}/>
// ) : (
//   <Arrow className={cn('arrow-icon').mix('is-arrow')}/>
// )}
// </h4>
// <Collapse in={showHistory}>
//   <div className={cn('inner')}>
//     <ul className={cn('chronological-list')}>
//       {/*{candidate.candidate_vacancies.find(item => candidateVacancyChain.id === item.id).comments && candidate.candidate_vacancies.find(item => candidateVacancyChain.id === item.id).comments.map(item => (*/}
//       {/*<li key={item.body + item.id}*/}
//       {/*className={cn('chronological-comment')}>*/}
//       {/*<article className={cn('chronological-article')}>*/}
//       {/*<div className={cn('chronological-icon-triangle')}>{iconAction('comment_added')}</div>*/}
//       {/*<div className={cn('chronological-hgroup')}>*/}
//       {/*<p className={cn('chronological-title')}>{changeType['comment_added']}</p>*/}
//       {/*/!*<p className={cn('chronological-name')}>{item.profile.full_name}</p>*!/*/}
//       {/*</div>*/}
//       {/*<p className={cn('chronological-date')}>*/}
//       {/*{moment(item.created_at).format('DD.MM.YYYY, HH:mm')}*/}
//       {/*</p>*/}
//       {/*</article>*/}
//       {/*<p className={cn('chronological-comment-inner')}>{item.body}</p>*/}
//       {/*</li>*/}
//       {/*))}*/}
//       {candidate.candidate_changes.map((item, i) => {
//         if (item.change_type === 'comment_added' || item.change_type === 'rated')
//           return (
//             <li key={item.id}
//                 ref={el => (this[`historyEl${i}`] = el)}
//                 className={cn('chronological-comment')}>
//               <article className={cn('chronological-article')}>
//                 <div className={cn('chronological-icon-triangle')}>{iconAction(item.change_type)}</div>
//                 <div className={cn('chronological-hgroup')}>
//                   {/*<p*/}
//                   {/*className={cn('chronological-title')}>{changeType[item.change_type]}*/}
//                   {/*</p>*/}
//
//                   {item.change_type !== 'rated' ? <p className={cn('chronological-title')}>{changeType[item.change_type]}</p> : item.change_for.value === 0 ?
//                     <p className={cn('rating')}>{changeType[item.change_type]}<span className={cn('icon-like-assessment').mix('dislike cur')} ><Recomendation color={'#ff2f51 '}/></span></p> :
//                     <p className={cn('rating')}>{changeType[item.change_type]}<span className={cn('icon-like-assessment').mix('cur')}><Recomendation color={'#20c58f'}/></span></p>
//                   }
//
//                   <p
//                     className={cn('chronological-name')}>{item.user ? item.user.full_name : user.full_name}</p>
//                   {/*{item.change_type === 'rated' && <div className={cn('rating-candidate')}>{ratingCandidate(item.change_for.value)}</div>}*/}
//                 </div>
//                 <p className={cn('chronological-date')}>
//                   {moment(item.timestamp).format('DD.MM.YYYY, HH:mm')}
//                 </p>
//               </article>
//               {item.change_type === 'comment_added' &&
//               <p className={cn('chronological-comment-inner')}>{item.change_for.body}</p>}
//             </li>
//           )})}
//     </ul>
//   </div>
//   </Collapse>
//   </div>
