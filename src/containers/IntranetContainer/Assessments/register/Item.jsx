import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from './Container';
import { MATCHING_SESSION_KIND } from './constants'

import { Check, User, Calendar } from 'components-folder/Icon';
import moment from 'moment';

const Item = ({
  emblem,
  id,
  title,
  status,
  count_competence,
  id_employee,
  estimated_name,
  creation_date,
  description,
  filterParams,
  due_date,
}) => (
  <li className={cn('item').mix('flex ai_c')}>
    <div style={{alignSelf: 'flex-start'}}>
      {emblem === null || emblem === undefined || emblem.length === 0 ? (
        <div className={cn('emblem').mix(cn('emblem_fake'))}>
          <p className={cn('emblem-text_fake').mix('indent_reset')}>Оценка 360°</p>
        </div>
      ) : (
        <img
          className={cn('emblem')}
          src={emblem}
          alt="random image"
        />
      )}
    </div>
    <div style={{flex: '1'}}>
      <h3 className={'indent_8'}>
        {
          filterParams.status === 'in_progress' ? (
            <Link
              to={`/assessments/${id}/session`}
              className={'link_theme_light_first'}
              title={'Нажмите, чтобы пройти'}>
              {title}
            </Link>
          ) : (
            <Link
              to={`/assessments/${id}`}
              className={'link_theme_light_first'}
              title={'Нажмите, чтобы посмотреть результат'}>
              {title}
            </Link>
          )
        }
      </h3>
      <div className={cn('status').mix('indent_8')}>
        <span className={'p3 p1_theme_dark_first'} title={'Статус'}>
          {MATCHING_SESSION_KIND[status]}
        </span>
      </div>
      <div className={'flex ai_c jc_fs indent_13'}>
        <div className={cn('b-icon-text')}>
          <Check className={cn('icon').mix(cn('icon_check'))} />
          <span className={'p3 p3_theme_light'}>
            {count_competence}
            &nbsp;
            {
              count_competence === 1
                ? 'компетенция'
                : (0 < count_competence && count_competence < 5)
                ? 'компетенции'
                : 'компетенций'}
          </span>
        </div>
        <div className={cn('b-icon-text')}>
          <User className={cn('icon').mix(cn('icon_user'))} />
          <Link
            to={`/employees/${id_employee}`}
            className={'p3 link link_theme_light_second'}
            title={'Перейти в профиль'}>
            {estimated_name}
          </Link>
        </div>
        <div className={cn('b-icon-text')}>
          <Calendar outline className={cn('icon').mix(cn('icon_calendar'))} />
          <time
            dateTime={moment(creation_date).format('DD.MM.YYYY')}
            className={'p3 p3_theme_light'}
            title={'Дата создания'}>
            {moment(creation_date).format('DD.MM.YYYY')}
          </time>
        </div>
      </div>
      {/*<p className={cn('text-description').mix('indent_reset')}>*/}
        {/*{description}*/}
      {/*</p>*/}
    </div>
    <div>
      {
        filterParams.status === 'in_progress' && (
          <Link
            to={`/assessments/${id}/session`}
            className={'btn btn-primary'}
            title={'Нажмите, чтобы пройти'}>
            Пройти
          </Link>
        )
      }
      {
        filterParams.status === 'in_progress' && due_date && (
          <div>
            <time className={cn('time-begin').mix('p2 p2_theme_light_third')} dateTime={moment(due_date).format('DD MMM YYYY')}>
              до {moment(due_date).format('DD MMM YYYY')}
            </time>
          </div>
        )
      }
    </div>
  </li>
);

export default Item;
