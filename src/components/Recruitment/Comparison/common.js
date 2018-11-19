import React from 'react'
import {
  Flag,
} from 'components-folder/Icon/'
import Label from './Label'

export const cn = require('bem-cn')('comparison')

export function renderContactLink(contact, preferred, key) {
  let label, link_attr, title = ''

  switch (contact.contact_type) {
    case 'email':
      label = 'email'
      link_attr = 'mailto:'
      title = 'ПозвонНаписатьить'
      break
    case 'skype':
      label = 'skype'
      link_attr = 'tel:'
      title = 'Написать / Позвонить'
      break
    case 'phone':
      label = 'Телефон'
      link_attr = 'tel:'
      title = 'Позвонить'
      break
    default:
      label = 'Телефон'
      link_attr = 'tel:'
      title = 'Позвонить'
  }

  return (
    <Label label={label}
          link={contact.value}
          link_attr={link_attr}
          title={title}
          key={key}>
      {
        preferred ? (
          <span>
          <Flag className={cn('candidate-icon-flag')} />
        </span>) : ('')
      }
    </Label>
  )
}

export function formatDateDiff(period) {
  const years = Math.floor(period / 12)
  const months = period - years * 12
  const wordYears =
    years > 0
      ? years === 1 || (years > 20 && years % 10 === 1) ? 'год' : years < 5 ? 'года' : 'лет'
      : ''
  const wordMonths =
    months > 0 ? (months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев') : ''
  return `${years > 0 ? years : ''} ${wordYears} ${months > 0 ? months : ''} ${wordMonths}`
}
