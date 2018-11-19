import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('upcoming-birthdays')

if (process.env.BROWSER) {
  require('./Container.css')
}

export default class UpcomingBirthdays extends Component {
  render() {
    const avatar = {
      background: 'url(http://placehold.it/30/9bcd65/ffffff) center center/ cover no-repeat #eee',
    }

    return (
      <div className={cn()}>
        <h2>Ближайшие дни рождения</h2>
        <section className={cn('wrapper-birthday-employee')}>
          {/* TODO: не забудьте дзаполнить dateTime*/}
          <time className={cn('birthday')} dateTime="2017-12-18">
            18.12.2017, понедельник
          </time>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
        </section>

        <section className={cn('wrapper-birthday-employee')}>
          {/* TODO: не забудьте дзаполнить dateTime*/}
          <time className={cn('birthday')} dateTime="2017-12-18">
            18.12.2017, понедельник
          </time>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
        </section>

        <section className={cn('wrapper-birthday-employee')}>
          {/* TODO: не забудьте дзаполнить dateTime*/}
          <time className={cn('birthday')} dateTime="2017-12-18">
            18.12.2017, понедельник
          </time>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
          <div className={cn('employee')}>
            <div className={cn('employee-avatar')} style={avatar} />
            <section className={cn('employee-data')}>
              <Link
                to={`/employees/`}
                className={cn('employee-last-first-name')}
                title="Перейти на страницу сотрудника"
              >
                Васильев Семен
              </Link>
              <p className={cn('employee-post')}>Должность</p>
            </section>
          </div>
        </section>
      </div>
    )
  }
}
