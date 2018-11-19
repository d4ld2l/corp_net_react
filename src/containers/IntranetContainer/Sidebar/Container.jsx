import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import distanceInWords from 'date-fns/distance_in_words'
import isToday from 'date-fns/is_today'
import isTomorrow from 'date-fns/is_tomorrow'
import ru from 'date-fns/locale/ru'
import { getUsersCounter } from '../../../redux/actions/systemActions'
import { reverse, take, isEmpty } from 'lodash'
import { Breadcrumb } from 'react-bootstrap'

const cn = require('bem-cn')('intranet-sidebar')

if (process.env.BROWSER) {
  require('./Container.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    group: state.news.group,
    birthdays: state.birthdays.current,
    counter: state.system.counter,
    enabledComponents: state.system.enabledComponents,
  }),
  {}
)

function departmentsChainUni(position, chain) {
  const arr = []
  if (position){
    arr.push(position)
  }
  take(reverse(chain), 2).map( it => {arr.push(it.name_ru)})
  return arr
}

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    const { dispatch } = this.props
    Promise.all([dispatch(getUsersCounter())]).then(() => {})
  }

  renderIntranetNews = group => {
    return (
      <div className={cn('news')}>
        <h3 className={cn('news-title')}>Новости групп</h3>

        <div className={cn('news-list')}>
          {group.map((e, i) => (
            <div className={cn('news-list-item')} key={i}>
              <div className={cn('news-list-info')}>
                <span className={cn('news-list-time')}>
                  {moment(e.created_at).format('DD.MM.YYYY, HH:mm')}
                </span>

                <span className={cn('news-list-comment')} style={{ display: 'none' }}>
                  10
                </span>
                <span className={cn('news-list-views')} style={{ display: 'none' }}>
                  203
                </span>
              </div>

              <div className={cn('news-list-title')}>{e.title}</div>
              {e.community && <p className={cn('news-list-group')}>{e.community.name}</p>}
              <p className={cn('news-list-author')}>
                {e.author.name} {e.author.surname}
              </p>
            </div>
          ))}
        </div>

        <div className={cn('news-all')}>Все новости групп</div>
      </div>
    )
  }

  renderIntranetBirthday = () => {
    const { birthdays, enabledComponents } = this.props
    const key = birthdays && Object.keys(birthdays)[0]
    const date = moment(key).format('DD MMM')

    let distance

    if (isToday(key)) {
      distance = 'Сегодня'
    } else if (isTomorrow(key)) {
      distance = 'Завтра'
    } else {
      distance = distanceInWords(new Date(), key, { locale: ru })
    }

    const arr = birthdays && birthdays[key]
    return (
      <div className={cn('birthday')}>
        <h1 className={cn('birthday-title')}>Ближайшие именинники</h1>
        <div className={cn('birthday-date-container')}>
          <h1 className={cn('birthday-date')}>{date}</h1>
          <span className={cn('birthday-date-from').mix('p2 p2_theme_light_second')}>
            &mdash; {distance}
          </span>
        </div>
        <div className={cn('birthday-list')}>
          {arr &&
            arr.map(e => (
              <div className={cn('birthday-list-item')} key={e.id}>
                <div
                  className={cn('birthday-list-avatar')}
                  style={{
                    background: `url(${e.photo.url ? e.photo.url : '/public/avatar.png'}) center center / cover no-repeat`,
                  }}
                />
                <div className={cn('birthday-list-info')}>
                  <Link
                    to={`/employees/${e.id}`}
                    className={cn('birthday-list-name').mix('link link_theme_light_first')}
                  >
                    <h3>{e.full_name}</h3>
                  </Link>
                  {
                    [
                      <span className={cn('birthday-list-role').mix('p2 p2_theme_light_second')} key="position">
                        {e.position_name}
                      </span>,
                      <span className={cn('birthday-list-role').mix('p2 p2_theme_light_second')} key="department">
                        {e.departments_chain && e.departments_chain.map(it => it.name_ru).join(' / ')}
                      </span>
                    ]

                  }
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  renderIntranetInterest = () => {
    const { counter } = this.props
    return (
      <div className={cn('interest')}>
        <div>
          Количество пользователей за сегодня: {counter.stats && counter.stats.today_active_users}
        </div>
        <div>
          Общее количество пользователей: {counter.stats && counter.stats.total_active_users}
        </div>
      </div>
    )
  }

  render() {
    const { group } = this.props
    return (
      <div className={cn}>
        {/*{this.renderIntranetNews(group)}*/}
        {this.renderIntranetInterest()}
        {this.renderIntranetBirthday()}
      </div>
    )
  }
}

export default connector(Container)
