import React, { Component } from 'react'

// const cn = require('bem-cn')('task')
//
// if (process.env.BROWSER) {
//   require('../css/style.css')
// }

export const COLUMNS = [
  {
    id: 'mark',
    name: '',
  },
  {
    id: 'title',
    name: 'НАЗВАНИЕ ЗАДАЧИ',
  },
  {
    id: 'execution_date',
    name: 'СРОК ИСПОЛНЕНИЯ',
  },
  {
    id: 'executor',
    name: 'Исполнитель',
  },
  {
    id: 'subtasks_count',
    name: 'Кол-во сабтасков',
  },
  {
    id: 'priority',
    name: 'Приоритет',
  },
]

export default class TaskHeader extends Component {
  render() {
    const { openCard, openForm, cn, inCurtain } = this.props
    let columns = COLUMNS

    // if (except && except.length) {
    //   columns = columns.filter(col => !except.includes(col.id))
    // }

    if (inCurtain) {
      columns = columns.filter(col => ['title', 'execution_date', 'priority'].includes(col.id))
    }

    // header

    const wrapperClass = cn('header').mix((openCard || openForm) && cn('header')({ active: true }))
                                     // .state(inCurtain && { 'in-curtain': true })

    return (
      <div className={wrapperClass}>
        {columns.map((column, index) => (
          <div key={index} className={cn('header-label').mix('p3 p3_theme_light')}>
            {column.name}
          </div>
        ))}
      </div>
    )
  }
}
