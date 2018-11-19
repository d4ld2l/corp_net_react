import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'components-folder/Icon/';

const cn = require('bem-cn')('list-of-participants');
if (process.env.BROWSER) {
  require('./style.css');
}

export default class ParticipantItem extends Component {
  render() {
    const { participant } = this.props;
    return (
      <div className={cn('container')}>
        <div className={cn('info-wrap')}>
          <div
            className={cn('photo')}
            style={{
              background: `url('${
                participant.account.photo.url
                }') center center / cover no-repeat`
            }}
          />
          <div className={cn('info')}>
            <Link
              to={`/employees/${participant.account.id}`}
              className={'indent_3 link link_theme_light_first'}
              title={'Перейти в профиль'}
            >
              {participant.account.full_name}
            </Link>
            <p className={'indent_reset p2 p2_theme_light_second'}>
              {participant.account.position_name === null ||
              participant.account.position_name.length === 0
                ? 'Не указана'
                : participant.account.position_name}
            </p>
          </div>
        </div>
        <div className={cn('unit')}>
          {participant.account.departments_chain === null ||
          participant.account.departments_chain.length === 0
            ? 'Не указан'
            : participant.account.departments_chain.map((it, i) => (
              <span key={i + it.name_ru}>{it.name_ru}</span>
            ))}
        </div>
        <div className={cn('phone')}>
          <Phone className={cn('phone-icon')} />
          {participant.account.phone === null ||
          participant.account.phone.length === 0 ? (
            'Не указан'
          ) : (
            <a
              href={`tel:${participant.account.phone}`}
              className={'link link_theme_light_first'}
              title={'Позвонить'}
            >
              {participant.account.phone}
            </a>
          )}
        </div>
        <div className={cn('city')}>
          {participant.account.city === null ||
          participant.account.city.length === 0
            ? 'Не указан'
            : participant.account.city}
        </div>
      </div>
    );
  }
}
