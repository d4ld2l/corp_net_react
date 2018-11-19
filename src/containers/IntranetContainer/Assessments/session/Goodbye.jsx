import React from 'react';
import { Link } from 'react-router-dom'
import { cn } from './Container';

const Goodbye = ({onClick, goodbeyText, emblem}) => {

  return (
    <div className={cn('goodbye').mix('goodbye')}>
      <figure className={'indent_15'}>
        {emblem === null || emblem === undefined || emblem.length === 0 ? (
          <div className={'goodbye__emblem goodbye__emblem_fake indent_15'}>
            <p className={'goodbye__emblem-text_fake indent_reset'}>Оценка 360°</p>
          </div>
        ) : (
          <img
            className={'goodbye__emblem indent_15'}
            src={emblem}
            alt="random image"
          />
        )}
        <figcaption>
          <p className={'goodbye__text indent_reset'} dangerouslySetInnerHTML={{ __html: goodbeyText }}>
          </p>
        </figcaption>
      </figure>
      <Link to={`/assessments`} className={'btn btn-primary'} onClick={onClick}>К оценкам</Link>
    </div>
  )
}

export default Goodbye
