import React from 'react'

export const header = [
  {
    path: '/bids/:id',
    exact: true,
    activeClassName: true,
    header: () => <span>Заявка</span>,
  },
  {
    path: '/surveys/:id',
    exact: true,
    activeClassName: true,
    header: () => <span>Опрос</span>,
  },
  {
    path: '/recruitment/vacancies/:id',
    exact: true,
    activeClassName: true,
    header: () => <span>Вакансия</span>,
  },
  {
    path: '/projects/:id',
    exact: true,
    activeClassName: true,
    header: () => <span>Проект</span>,
  },
  {
    path: '/calendar/events/:id',
    exact: true,
    activeClassName: true,
    header: () => <span>Событие</span>,
  },
  {
    path: '/distribution',
    exact: true,
    activeClassName: true,
    header: () => <span>Команда</span>,
  },
]
