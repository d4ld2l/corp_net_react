import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { CandidateWithIncludesRaw } from '../../../types/raws'

const cn = require('bem-cn')('candidate-expectations-tabs')
if (process.env.BROWSER) {
  require('./candidate-expectations-tabs.css')
}

const optionsExperience = {
  doesnt_matter: 'Не имеет значения',
  no_experience: 'Нет опыта',
  from_1_year: 'От 1 года',
  for_3_years: 'До 3 лет',
  from_3_to_6_years: 'От 3 до 6 лет',
  from_6_years: 'Более 6 лет',
}

const optionsSchedule = {
  full_day: 'Полный день',
  exchangeable: 'Сменный график',
  flextime: 'Гибкий график',
  remote: 'Удаленная работа',
  rotating: 'Вахтовый метод',
}

const optionsEmployment = {
  full_time: 'Полная',
  part_time: 'Частичная',
  volunteering: 'Волонтерство',
  probation: 'Стажировка',
  temporary: 'Проектная или временная работа',
}

type Props = {
  candidate: CandidateWithIncludesRaw,
}
export default class ExpectationsTab extends Component<Props> {
  renderNotSpecified = id => {
    return (
      <div>
        <h2 className={cn('indent-before-content')}>Ожидания кандидата</h2>
        <p className={cn('text')}>
          Здесь вы можете указать уровень зарплаты, график работы, тип занятости и оставить общий
          комментарий
        </p>
        <Link to={`/recruitment/candidates/${id}/edit#expectations`} className="btn btn-outline">
          заполнить
        </Link>
      </div>
    )
  }

  renderSpecified = resume => (
    <div>
      {resume.desired_position && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>Должность</p>
          <p className={cn('info-text')}>{resume.desired_position}</p>
        </div>
      )}
      {resume.professional_specializations.length > 0 && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>ПРОФЕССИОНАЛЬНАЯ ОТРАСЛЬ</p>
          {resume.professional_specializations.slice(0, 1).map((it, id) => (
            <p className={cn('info-text')} key={id}>
              {it.professional_area.name}
            </p>
          ))}
        </div>
      )}
      {resume.professional_specializations.length > 0 && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>СПЕЦИАЛИЗАЦИЯ</p>
          {resume.professional_specializations.map((it, id) => (
            <p className={cn('info-text')} key={id}>
              {it.name}
            </p>
          ))}
        </div>
      )}
      {resume.salary_level && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>Уровень заработной платы</p>
          <p className={cn('info-text')}>
            от {`${resume.salary_level}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} руб
          </p>
        </div>
      )}
      {resume.experience && resume.experience.length > 0 && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>опыт работы</p>
          <p className={cn('info-text')}>
            {resume.experience.map(
              (item, i) =>
                `${optionsExperience[item]}${i < resume.experience.length - 1 ? ', ' : ''}`
            )}
          </p>
        </div>
      )}
      {resume.working_schedule && resume.working_schedule.length > 0 && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>график работы</p>
          <p className={cn('info-text')}>
            {resume.working_schedule.map(
              (item, i) =>
                `${optionsSchedule[item]}${i < resume.working_schedule.length - 1 ? ', ' : ''}`
            )}
          </p>
        </div>
      )}
      {resume.employment_type && resume.employment_type.length > 0 && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>тип занятости</p>
          <p className={cn('info-text')}>
            {resume.employment_type.map(
              (item, i) =>
                `${optionsEmployment[item]}${i < resume.employment_type.length - 1 ? ', ' : ''}`
            )}
          </p>
        </div>
      )}
      {resume.comment && (
        <div className={cn('info-block')}>
          <p className={cn('label')}>Комментарий</p>
          <p className={cn('info-text')} dangerouslySetInnerHTML={{ __html: resume.comment }} />
        </div>
      )}
    </div>
  )

  render() {
    const { candidate, candidate: { resume } } = this.props
    return (
      <div className={cn}>
        <div className={cn('tabs-content')}>
          <h2 className={cn('indent-before-content')}>Ожидания кандидата</h2>

          {(resume.desired_position && resume.desired_position.length > 0) ||
          resume.professional_specializations.length > 0 ||
          resume.salary_level ||
          (resume.experience && resume.experience.length) > 0 ||
          (resume.working_schedule && resume.working_schedule.length > 0) ||
          (resume.employment_type && resume.employment_type.length > 0) ||
          resume.comment ? (
            this.renderSpecified(resume)
          ) : (
            <p className={cn('text')}>
              Здесь вы можете указать уровень зарплаты, график работы, тип занятости и оставить
              комментарий по ожиданиям кандидата.
            </p>
          )}

          {(resume.desired_position && resume.desired_position.length > 0) &&
          resume.professional_specializations.length > 0 &&
          resume.salary_level &&
          (resume.experience && resume.experience.length) > 0 &&
          (resume.working_schedule && resume.working_schedule.length > 0) &&
          (resume.employment_type && resume.employment_type.length > 0) > 0 &&
          resume.comment ? (
            ''
          ) : (
            <Link
              to={`/recruitment/candidates/${candidate.id}/edit#expectations`}
              className="btn btn-outline"
            >
              Заполнить
            </Link>
          )}
        </div>
      </div>
    )
  }
}
