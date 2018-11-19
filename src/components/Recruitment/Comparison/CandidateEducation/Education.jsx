import React from 'react'

import moment from 'moment'
import { cn } from '../common'

export const Education = ({
  name,
  education_level,
  end_year,
  company_name,
  speciality,
  file_url,
  name_dublicate,
  education_level_dublicate,
  end_year_dublicate,
  company_name_dublicate,
  speciality_dublicate,
  file_url_dublicate,
}) => (
  <div className={cn('education')}>
    {education_level_dublicate && (
      <h5 className={cn('h5_dublicate')}>{education_level_dublicate}</h5>
    )}

    {education_level && <h5>{education_level}</h5>}

    {name_dublicate && (
      <article className={cn('achievement-article').mix(cn('achievement-article_dublicate'))}>
        <div className={cn('date-interval')}>
          <p className={cn('achievement-date')}>
            {/*{end_year_dublicate ? moment(end_year_dublicate).format('YYYY') : ''}*/}
          </p>
        </div>
        <div className={cn('achievement-data')}>
          {name_dublicate && <p className={cn('achievement-text-name')}>{name_dublicate}</p>}
          <p className={cn('achievement-text')}>
            {company_name_dublicate}
            {company_name_dublicate && ','}
            {speciality_dublicate}
          </p>
          {file_url_dublicate && (
            <div>
              <a href={`${file_url_dublicate}`} className={cn('file-name')}>
                {file_url_dublicate}
              </a>
            </div>
          )}
        </div>
      </article>
    )}

    {name && (
      <article className={cn('achievement-article')}>
        <div className={cn('date-interval')}>
          <p className={cn('achievement-date')}>
            {end_year ? moment(end_year).format('YYYY') : ''}
          </p>
        </div>
        <div className={cn('achievement-data')}>
          {name && <p className={cn('achievement-text-name')}>{name}</p>}
          <p className={cn('achievement-text')}>
            {company_name}{company_name && speciality ? ", " : ''}{speciality}
          </p>
          {file_url && (
            <div>
              <a href={`${file_url}`} className={cn('file-name')}>
                {file_url}
              </a>
            </div>
          )}
        </div>
      </article>
    )}
  </div>
)

export default Education