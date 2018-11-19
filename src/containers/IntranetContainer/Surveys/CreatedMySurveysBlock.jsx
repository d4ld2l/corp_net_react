import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'
import * as surveysActions from '../../../redux/actions/surveysActions'
import { Check, Calendar, User} from 'components-folder/Icon'
import Setting from 'components-folder/Icon/Settings'
import {toastr} from 'react-redux-toastr'

const cn = require('bem-cn')('surveys-block')

if (process.env.BROWSER) {
  require('./surveys-block.css')
}

class SettingsComponent extends Component {
  state = { open: false }

  handleClickOutside = () => this.close()
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  onEdit = () => this.props.dispatch(push(`/surveys/${this.props.survey.id}/edit`))
  onDelete = async () => {
    const { dispatch } = this.props

    if (confirm('Вы уверены?')) {
      const res_delete_status =await dispatch(surveysActions.deleteSurvey(this.props.survey.id))
      if (res_delete_status === 200){
        toastr.success('Опрос успешно удален.')
      } else{
        toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
      }
    }
  }

  onPublic = async () => {
    const { dispatch } = this.props
    const res_public_status = await dispatch(surveysActions.publicSurvey(this.props.survey.id))
    if (res_public_status === 200){
      toastr.success('Опрос успешно опубликован.')
      // dispatch(surveysActions.getSurveys())
    } else{
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  onUnpublic = async () => {
    const { dispatch } = this.props
    const res_unpublic_status = await dispatch(surveysActions.unpublicSurvey(this.props.survey.id))
    if (res_unpublic_status === 200){
      toastr.success('Опрос успешно снят с публикации.')
      // dispatch(surveysActions.getSurveys())
    } else{
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  render() {
    const { survey } = this.props
    const { open } = this.state
    const finished = survey.ends_at && moment(survey.ends_at).isBefore(moment())

    return (
      <div
        className={cn('block-btn')
          .mix('cur')
          .state({ open })}
        onClick={() => (open ? this.close() : this.open())}
      >
        <Setting outline className={cn('setting-icon')} />
        {open && (
          <div className={cn('wrapper-dropdown')}>
            <ul className={cn('inner')}>
              {(survey.state === 'draft' || survey.state === 'unpublished') && (
                <li onClick={this.onEdit} className={cn('item')}>
                  Редактировать
                </li>
              )}

              {survey.state === 'published' && (
                <li onClick={this.onUnpublic} className={cn('item')}>
                  Снять с публикации
                </li>
              )}

              {(survey.state === 'draft' || survey.state === 'unpublished') && !finished && (
                <li onClick={this.onPublic} className={cn('item')}>
                  Опубликовать
                </li>
              )}

              {(survey.state === 'draft' || survey.state === 'unpublished') && (
                <li onClick={this.onDelete} className={cn('item')}>
                  Удалить
                </li>
              )}
            </ul>
          </div>
        )}

        {survey.ends_at && (
          <div>
            <time className={cn('time-begin').mix('p2 p2_theme_light_third')} dateTime={moment(survey.ends_at).format('DD MMM YYYY')}>
              до {moment(survey.ends_at).format('DD MMM YYYY')}
            </time>
          </div>
        )}

      </div>
    )
  }
}

const Settings = connect()(onClickOutside(SettingsComponent))

const StatusLabel = ({ survey }) => {
  const statusNames = {
    draft: 'Не опубликован',
    published: 'Опубликован',
    unpublished: 'Снят с публикации'
  }

  return (
    <div className={`surveys-block__info-message surveys-block__info-message_${survey.state}`} >
      <span>{statusNames[survey.state]}</span>
    </div>
  )
}

class CreatedMySurveysBlock extends Component {
  render() {
    const { surveys, isSearch } = this.props

    return (
      <div>
        {surveys.length === 0 && isSearch ? (
          <div>Ничего не найдено</div>
        ) : (
          surveys.map(survey => (
            <div className={cn} key={Math.random()}>
              <article className={cn('article')}>
                <div className={cn('block-img-text')}>
                  {survey.symbol &&
                    survey.symbol.thumb &&
                    survey.symbol.medium.url && (
                      <figure className={cn('figure')}>
                        <Link to={`/surveys/${survey.id}/publication`}>
                          <div
                            className="logo"
                            style={{
                              background: `url(${survey.symbol.medium
                                .url}) center center / cover no-repeat`,
                            }}
                          />
                        </Link>
                      </figure>
                    )}

                  <div className={cn('block-info')}>
                    <Link
                      className={cn('link-start-survey').mix('link link_theme_light_first')}
                      to={`/surveys/${survey.id}/publication`}
                    >
                      <h3>{survey.name}</h3>
                    </Link>

                    <StatusLabel survey={survey} />

                    <div className={cn('block-icon')}>
                      <div className={cn('block-icon-text')}>
                        <Check className={cn('checkbox-icon')} />
                        <span className={'p3 p3_theme_light'}>
                          {survey.questions_count}&nbsp;{survey.questions_count &&
                            (survey.questions_count === 1
                              ? 'вопрос'
                              : survey.questions_count < 5 ? 'вопроса' : 'вопросов')}
                        </span>
                      </div>
                      {survey.published_at && (
                        <div className={cn('block-icon-text')}>
                          <Calendar outline className={cn('calendar-icon')} />
                          <span className={'p3 p3_theme_light'}>
                            <time dateTime="2017-08-15">
                              {moment(survey.published_at).format('DD.MM.YYYY')}
                            </time>
                          </span>
                        </div>
                      )}
                      <div className={cn('block-icon-text').mix('border-left')}>
                        <User className={cn('user-icon').mix('is-user')} />
                        <span className={'p3 p3_theme_light'}>
                          {survey.participants_passed_count} из {survey.participants_total_count}
                        </span>
                      </div>
                    </div>
                    <p className={'p1 p1_theme_light_first'} dangerouslySetInnerHTML={{ __html: survey.note }} />
                  </div>
                </div>
                <Settings survey={survey} key={survey.id} />
              </article>
            </div>
          ))
        )}
      </div>
    )
  }
}
export default CreatedMySurveysBlock
