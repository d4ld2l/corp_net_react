import React from 'react'
import { Link } from 'react-router-dom'
import {
  Flag,
} from 'components-folder/Icon/'
import { cn } from './common'

const Label = ({
  label,
  link,
  link_duplicate,
  link_attr,
  title,
  link_flag,
  link_flag_dublicate,
  text,
  text_dublicate,
  dangerouslyText,
  children,
}) => (
  <div className={cn('candidate-label-wrapper')}>
    <div>
      {label && (
        <label className={cn('candidate-label')} htmlFor={''}>
          {label}
        </label>
      )}
      {text_dublicate && (
        <p className={cn('candidate-text').mix(cn('candidate-text_dublicate'))}>{text_dublicate}</p>
      )}
      {text && <p className={cn('candidate-text')}>{text}</p>}
      {dangerouslyText && (
        <p 
          className={cn('candidate-text')}
          dangerouslySetInnerHTML={{ __html: dangerouslyText }}
        />
      )}
      {link_duplicate && (
        <Link
          to={`${link_attr}${link_duplicate}`}
          title={title}
          className={cn('candidate-link').mix(cn('candidate-link-duplicate'))}
        >
          {link_duplicate}
          {link_flag_dublicate && (
            <span>
              <Flag className={cn('candidate-icon-flag')} />
            </span>
          )}
        </Link>
      )}
      <div />
      {link && (
        <Link to={`${link_attr}${link}`} title={title} className={cn('candidate-link')}>
          {link}
          {link_flag && (
            <span>
              <Flag className={cn('candidate-icon-flag')} />
            </span>
          )}
        </Link>
      )}
      {children}
    </div>
  </div>
)

export default Label
