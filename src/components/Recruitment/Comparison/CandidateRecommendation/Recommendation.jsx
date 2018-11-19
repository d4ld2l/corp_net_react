import React from 'react'

import {
  Post,
  Phone,
  Skype,
} from 'components-folder/Icon/'

import { cn } from '../common'

export const Recommendation = ({
  recommender_name,
  company_and_position,
  phone,
  email,
  skype,
  recommender_name_dublicate,
  company_and_position_dublicate,
  phone_dublicate,
  email_dublicate,
  skype_dublicate,
}) => (
  <div className={cn('recommendation')}>
    {recommender_name ? (
      <div>
        {recommender_name_dublicate && (
          <p className={cn('recommendations-name').mix(cn('recommendations-name_dublicate'))}>
            {recommender_name_dublicate}
          </p>
        )}
        <p className={cn('recommendations-name')}>{recommender_name}</p>

        {company_and_position_dublicate && (
          <p className={cn('recommendations-post').mix(cn('recommendations-post_dublicate'))}>
            {company_and_position_dublicate}
          </p>
        )}
        <p className={cn('recommendations-post')}>{company_and_position}</p>

        <div className={cn('recommendations-address')}>
          {phone_dublicate && (
            <div className={cn('recommendations-info').mix(cn('recommendations-info_dublicate'))}>
              <div>
                <Phone className={cn('recommendations-icon')} />
              </div>
              <div>
                <a className={cn('recommendations-text')} href={`tel:${phone_dublicate}`}>
                  {phone_dublicate}
                </a>
              </div>
            </div>
          )}
          {phone && (
            <div className={cn('recommendations-info')}>
              <div>
                <Phone className={cn('recommendations-icon')} />
              </div>
              <div>
                <a className={cn('recommendations-text')} href={`tel:${phone}`}>
                  {phone}
                </a>
              </div>
            </div>
          )}

          {email_dublicate && (
            <div className={cn('recommendations-info').mix(cn('recommendations-info_dublicate'))}>
              <div>
                <Post className={cn('recommendations-icon')} />
              </div>
              <div>
                <a
                  className={cn('recommendations-text', { email_dublicate: 'link' })}
                  href={`mailto:${email_dublicate}`}
                >
                  {email_dublicate}
                </a>
              </div>
            </div>
          )}
          {email && (
            <div className={cn('recommendations-info')}>
              <div>
                <Post className={cn('recommendations-icon')} />
              </div>
              <div>
                <a
                  className={cn('recommendations-text', { email: 'link' })}
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            </div>
          )}

          {skype_dublicate && (
            <div className={cn('recommendations-info').mix(cn('recommendations-info_dublicate'))}>
              <div>
                <Skype className={cn('recommendations-icon')} />
              </div>
              <div>
                <a className={cn('recommendations-text')} href={`tel:${skype_dublicate}`}>
                  {skype_dublicate}
                </a>
              </div>
            </div>
          )}
          {skype && (
            <div className={cn('recommendations-info')}>
              <div>
                <Skype className={cn('recommendations-icon')} />
              </div>
              <div>
                <a className={cn('recommendations-text')} href={`tel:${skype}`}>
                  {skype}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    ) : (
      <p>Информации нет</p>
    )}
  </div>
)

export default Recommendation
