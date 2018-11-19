import React, { Component } from 'react'
import { v4 } from 'uuid'

import { GENERAL_INFORMATION } from './data'
import { Phone, Post } from 'components-folder/Icon'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('project')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class GeneralInformation extends Component {
  state = {
    general_info: GENERAL_INFORMATION,
  }
  render() {
    const { project } = this.props
    return (
      <div className={cn('general-information')}>
        <div className={cn('general-information-data')}>
          <div className={'indent_25'}>
            <p className={'p3 p3_theme_light indent_5'}>Продукты</p>
            <ul className={cn('general-information-list')}>
              {project.products.length > 0 &&
                project.products.map(({ name }) => (
                  <li key={Math.random()} className={cn('general-information-list-inner')}>
                    <span className={'p1 p1_theme_light_first'}>
                      {name}
                      {name === project.products[project.products.length - 1].name ? '' : ','}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className={'indent_25'}>
            <p className={'p3 p3_theme_light indent_5'}>методологии</p>
            {project.methodologies.length > 0 &&
              project.methodologies.map(({ name }) => (
                <span key={Math.random()} className={'p1 p1_theme_light_first'}>
                  {name}
                  {name === project.methodologies[project.methodologies.length - 1].name
                    ? ''
                    : ', '}
                </span>
              ))}
          </div>

          <div className={'indent_25'}>
            <p className={'p3 p3_theme_light indent_5'}>Технологии</p>
            {project.technologies.length > 0 &&
              project.technologies.map(({ name }) => (
                <span key={Math.random()} className={'p1 p1_theme_light_first'}>
                  {name}
                  {name === project.technologies[project.technologies.length - 1].name ? '' : ', '}
                </span>
              ))}
          </div>
          <div className={'indent_25'}>
            <p className={'p3 p3_theme_light indent_5'}>Описание проекта</p>
            <span className={'p1 p1_theme_light_first'}>{project.description}</span>
          </div>
        </div>
        <div className={cn('general-information-sidebar')}>
          <h2 className={'indent_20'}>Информация о проекте</h2>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Код проекта</p>
            <span className={'p1 p1_theme_light_first'}>{project.charge_code}</span>
          </div>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Сроки работы над проектом</p>
            <time dateTime={''} className={'p1 p1_theme_light_first'}>
              {project.begin_date
                ? `${moment(project.begin_date).format('DD.MM.YYYY')} - ${project.end_date
                    ? moment(project.begin_date).format('DD.MM.YYYY')
                    : 'наст. вр.'}`
                : '-'}
            </time>
          </div>

          <p className={cn('subtitle').mix('p1 p1_theme_light_first fw_500')}>Исполнитель</p>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Юридическое лицо</p>
            <span className={'p1 p1_theme_light_first'}>
              {project.legal_unit && project.legal_unit.name}
            </span>
          </div>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Подразделение</p>
            <span className={'p1 p1_theme_light_first'}>
              {project.department &&
                (project.department.parent
                  ? `${project.department.parent.name_ru} / ${project.department.name_ru}`
                  : project.department.name_ru)}
            </span>
          </div>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Менеджер</p>
            {project.manager && (
              <div className={cn('general-information-item')}>
                <div
                  className={cn('general-information-item-avatar')}
                  style={{
                    background: `url(${project.manager.photo.url}) center center / cover no-repeat`,
                  }}
                />
                <div>
                  <Link
                    to={`/employees/${project.manager_id}`}
                    className={'link link_theme_light_first'}
                  >
                    {project.manager.full_name}
                  </Link>
                  <div className={'p2 p2_theme_light_second'}>{project.manager.position_name}</div>
                </div>
              </div>
            )}
            {project.manager && (
              <div className={cn('general-information-item-contacts')}>
                {project.manager.preferred_email && (
                  <div className={cn('general-information-item-contact')}>
                    <div className={cn('general-information-item-contact-icon')}>
                      <Post className={cn('post-icon')} />
                    </div>
                    <a
                      href={`mailto:${project.manager.preferred_email.email}`}
                      className={'p1 p1_theme_light_first'}
                    >
                      {project.manager.preferred_email.email}
                    </a>
                  </div>
                )}
                {project.manager.preferred_phone && (
                  <div className={cn('general-information-item-contact')}>
                    <div className={cn('general-information-item-contact-icon')}>
                      <Phone className={cn('phone-icon')} />
                    </div>
                    <a
                      href={`tel:${project.manager.preferred_phone.number}`}
                      className={'p1 p1_theme_light_first'}
                    >
                      {project.manager.preferred_phone.number}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className={cn('subtitle').mix('p1 p1_theme_light_first fw_500')}>Заказчик</p>

          <div className={'indent_15'}>
            <p className={'p3 p3_theme_light indent_5'}>Название организации</p>
            {project.customers[0] && (
              <span className={'p1 p1_theme_light_first'}>{project.customers[0].name}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}
