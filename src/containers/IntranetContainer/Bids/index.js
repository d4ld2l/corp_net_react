import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { compose } from 'ramda'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { push } from 'react-router-redux'
import { Row, Col, Clearfix } from 'react-bootstrap'
// import SelectInput from 'components-folder/Form/SelectInput'
// import DateTimeField from 'components-folder/Form/DateTimeFIeld'
// import { Arrow, Calendar } from 'components-folder/Icon'
import { Field, reduxForm } from 'redux-form'
import Loader from 'components-folder/Loader'
import { getAuthorBids, getExecutorBids } from 'redux-folder/actions/bidsActions'
import get from 'lodash/get'

const cn = require('bem-cn')('intranet-bids')

if (process.env.BROWSER) {
  require('./styles.css')
}

const connector = compose(
  connect(
    state => ({
      bids: state.bids.data,
      counters: state.bids.counters,
      loading: state.loaders.bids,
      loadingMore: state.loaders.bidsMore,
      scroll: state.bids.scroll
    }),
    dispatch => ({
      getAuthorBids: (...args) => dispatch(getAuthorBids(...args)),
      getExecutorBids: (...args) => dispatch(getExecutorBids(...args))
    })
  ),
  reduxForm({ form: 'Bids' })
)

class Bids extends PureComponent {
  state = {
    tab: 'author',
    qfilter: 'all',
    status_codes: null,
    // filter: false
  }

  getBids = (tab = 'author', options) => {
    if (tab === 'executor') {
      this.props.getExecutorBids(options)
    } else {
      this.props.getAuthorBids(options)
    }
  }

  changeTab = async (tab) => {
    this.setState({ tab, qfilter: 'all' })
    this.getBids(tab)
  }

  onBlockToggle = (name: string) => {
    this.setState({ [name]: !this.state[name] })
  }

  changeQFilter = (counter) => {
    const status_codes = counter.codes
    this.setState({ qfilter: counter.name, status_codes: counter.codes })
    this.getBids(this.state.tab, { status_codes })
  }

  onBidClick = (bid) => {
    this.props.dispatch(push(`/bids/${bid.id}`))
  }

  componentDidMount() {
    this.getBids()
  }

  handleScroll = (event) => {
    const { scroll, loading, loadingMore }  = this.props
    const { tab, status_codes }  = this.state

    const el = event.target
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight

    if (bottom && scroll && !loading && !loadingMore) {
      console.log('page load')
      this.getBids(tab, { scope: tab, status_codes, loadMore: true })
    }
  }

  renderBids = () => {
    const { bids, counters, loading, loadingMore } = this.props
    const total = counters.map(counter => counter.bids_count).reduce((acc, val) => acc + val, 0)

    return (
      <div className={cn('container')}>
        <div className={cn('tabs')}>
          <div
            onClick={() => this.changeTab('author')}
            className={cn('tab', { active: this.state.tab === 'author' }).mix('p1 p1_theme_light_first')}
          >
            Мои заявки
          </div>
          <div
            onClick={() => this.changeTab('executor')}
            className={cn('tab', { active: this.state.tab === 'executor' }).mix('p1 p1_theme_light_first')}
          >
            Назначенные заявки
          </div>
        </div>

        {/* <div className={cn('inner')}>
          <h4 onClick={() => this.onBlockToggle('filter')} className={cn('h4')}>
            Фильтр
            <Arrow dir={this.state.filter ? 'up' : 'down'} className={cn('arrow')} color="#93959a" />
          </h4>
          { this.state.filter && <div className={cn('block')}>
            <Row>
              <Col xs={5}>
                <Field
                  name="services_select"
                  label="Сервис"
                  component={SelectInput}
                  placeholder="Не выбрано"
                  noResultsText="Нет категорий"
                />
              </Col>
              <Col xs={5} xsOffset={1}>
                <div className={cn('wrapper-calendars')}>
                  <div className={cn('wrapper-calendar')}>
                    <Field
                      name="period_creation_application_one"
                      label="Период создания заявки"
                      component={DateTimeField}
                      dateFormat="DD-MM-YYYY"
                      timeFormat={true}
                    />
                    <Calendar className={cn('calendar-icon')} />
                  </div>
                  <div className={cn('dash')}>—</div>
                  <div className={cn('wrapper-calendar')}>
                    <Field
                      name="period_creation_application_two"
                      label="&nbsp;"
                      component={DateTimeField}
                      dateFormat="DD-MM-YYYY"
                      timeFormat={true}
                    />
                    <Calendar className={cn('calendar-icon')} />
                  </div>
                </div>
              </Col>
              <Clearfix />
              <Col xs={5}>
                <Field
                  name="performer"
                  label="Исполнитель"
                  component={SelectInput}
                  placeholder="Не выбран"
                  noResultsText="Нет категорий"
                />
              </Col>
              <Clearfix />
              <Col xs={5}>
                <button
                  type="button"
                  className="btn btn-primary btn-margin-right btn-margin-top"
                >
                  Подобрать
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-margin-top"
                >
                  Сбросить фильтр
                </button>
              </Col>
            </Row>
          </div> }
        </div> */}

        <div className={cn('main')}>
          <div className={cn('qfilters')}>
            <div
              onClick={() => this.changeQFilter({ name: 'all' })}
              className={cn('qfilter', { active: this.state.qfilter === 'all' })}
            >
              <span className={cn('qfilter-link')}>Все {total}</span>
            </div>

            {counters.map(counter => (
              <div
                key={counter.name}
                onClick={() => this.changeQFilter(counter)}
                className={cn('qfilter', { active: this.state.qfilter === counter.name })}
              >
                <span className={cn('qfilter-link')}>
                  {counter.name} {counter.bids_count}
                </span>
              </div>
            ))}
          </div>

          {loading ? <Loader /> : (
            <div className={cn('table')} onScroll={this.handleScroll}>
              <div className={cn('table-head')}>
                <div className={cn('table-head-col', { col: 'number' }).mix('p3 p3_theme_light')}>№</div>
                <div className={cn('table-head-col', { col: 'request' }).mix('p3 p3_theme_light')}>Заявка и сервис</div>
                <div className={cn('table-head-col', { col: 'date' }).mix('p3 p3_theme_light')}>Дата и время создания</div>
                <div className={cn('table-head-col', { col: 'executor' }).mix('p3 p3_theme_light')}>
                  {this.state.tab === 'author' ? 'Исполнитель' : 'Автор'}
                </div>
                <div className={cn('table-head-col', { col: 'status' }).mix('p3 p3_theme_light')}>Статус</div>
              </div>

              {bids.map((bid, index) => (
                <div key={bid.id} onClick={() => this.onBidClick(bid)} className={cn('table-row')}>
                  <div className={cn('table-col', { col: 'number' }).mix('p1 p1_theme_light_first')}>{index + 1}.</div>
                  <div className={cn('table-col', { col: 'request' }).mix('p1 p1_theme_light_first')}>
                    Заявка № {bid.id}
                    {bid.service && (
                      <div className={cn('table-col-request-desc').mix('p2 p2_theme_light_second')}>{bid.service.name}</div>
                    )}
                  </div>
                  <div className={cn('table-col', { col: 'date' }).mix('p1 p1_theme_light_first')}>
                    {moment(bid.created_at).format('DD.MM.YYYY, HH:mm')}
                  </div>
                  <div className={cn('table-col', { col: 'executor' })}>
                    <div className={cn('table-col-person')}>
                      {this.state.tab === 'author' && [
                        <div key={'photo'} className={cn('table-col-person-avatar')}>
                          <img
                            className={cn('table-col-person-avatar-img')}
                            src={bid.manager.photo && bid.manager.photo.for_profile.url}
                            width={30}
                            height={30}
                          />
                        </div>,
                        <div key={'name'} className={cn('table-col-person-name-position')}>
                          {bid.manager && (
                            <div className={cn('table-col-person-name').mix('p1 p1_theme_light_first')}>{bid.manager.full_name}</div>
                          )}
                          <div className={cn('table-col-person-position').mix('p3 p3_theme_light')}>
                            {bid.manager.position_name}
                          </div>
                        </div>,
                      ]}

                      {this.state.tab === 'executor' && [
                        <div key={'photo'} className={cn('table-col-person-avatar')}>
                          <img
                            className={cn('table-col-person-avatar-img')}
                            src={bid.author.photo && bid.author.photo.for_profile.url}
                            width={30}
                            height={30}
                          />
                        </div>,
                        <div key={'name'} className={cn('table-col-person-name-position').mix('p1 p1_theme_light_first')}>
                          {bid.author && (
                            <div className={cn('table-col-person-name').mix('p1 p1_theme_light_first')}>{bid.author.full_name}</div>
                          )}
                          <div className={cn('table-col-person-position').mix('p3 p3_theme_light')}>
                            {bid.author.position_name}
                          </div>
                        </div>,
                      ]}
                    </div>
                  </div>
                  <div className={cn('table-col', { col: 'status' })}>{ get(bid, 'bid_stage.name') }</div>
                </div>
              ))}

              {loadingMore && <Loader />}
            </div>
          )}

        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <h1>Мои заявки</h1>
            {this.renderBids()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Bids)
