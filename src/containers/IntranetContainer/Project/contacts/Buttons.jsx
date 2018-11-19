import React from 'react'

const cn = require('bem-cn')('customers')

const Buttons = (props) => {
  const { handleShow, customerId, total, show } = props

  return (
    <div className={cn('btn-new-customer-wrapper')}>
      <button
        className={'btn btn-primary btn-small btn-margin-right'}
        title={customerId ? 'Добавить  новый контакт' : 'Не задан заказчик проекта'}
        onClick={() => handleShow({ show: 'new', current: {} })}
        disabled={ show === 'new' || !customerId }
      >
        Добавить Контакт
      </button>

      { total > 0 && (
        <a
          className={'btn btn-outline btn-small'}
          title={'Скачать список контактов'}
          href={`/api/customers/${customerId}/contacts.xlsx`}
        >
          Скачать контакты
        </a>
      )}

    </div>
  )
}

export default Buttons
