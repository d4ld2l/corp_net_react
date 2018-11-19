import React from 'react';
import { cn } from './Container';

const Welcome = ({onClick, description, emblem}) => {
  return (
    <div className={cn('welcome').mix('welcome')}>
      <figure className={'indent_15'}>
        {emblem === null || emblem === undefined || emblem.length === 0 ? (
          <div className={'welcome__emblem welcome__emblem_fake indent_15'}>
            <p className={'welcome__emblem-text_fake indent_reset'}>Оценка 360°</p>
          </div>
        ) : (
          <img
            className={'welcome__emblem indent_15'}
            src={emblem}
            alt="random image"
          />
        )}
        <figcaption>
          <p className={'welcome__text indent_reset'} dangerouslySetInnerHTML={{ __html: description }}>
          </p>
        </figcaption>
      </figure>
      <button className={'btn btn-primary'} onClick={onClick}>Начать</button>
    </div>
  )
}

export default Welcome
