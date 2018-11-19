import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Arrow, Skype, Post, Phone, Star, Attention, Rectangle } from 'components-folder/Icon'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Loader from 'components-folder/Loader'
import { getService } from 'redux-folder/actions/servicesActions'
import get from 'lodash/get'


const cn = require('bem-cn')('intranet-service')

if (process.env.BROWSER) {
  require('./styles.css')
}

// const connector = connect(pick(['service', 'role', 'loaders']))

const connector = connect(
  state => ({
    service: state.services.current,
    loading: state.loaders.services,
    role: state.role,
    user: state.user
  }),
  dispatch => ({
    getService: (...args) => dispatch(getService(...args)),
  })
)

class Service extends PureComponent {
  state = {
    description: true,
    documents: false,
    description_process: false,
    isToggleStar: true,
    supporting_documents: false,
    process_descriptions: false,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.props.getService(id | 0)
  }


  onBlockToggle = (name: string) => {
    this.setState({ [name]: !this.state[name] })
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleStar: !prevState.isToggleStar,
    }))
  }

  get contacts() {
    const { service: { contacts } } = this.props
    return contacts
  }

  renderContact = (contact) => {
    return (
      <div key={contact.id} className={cn('sidebar-item')}>
        <div className={cn('sidebar-item-l')}>
          <div
            className={cn('sidebar-item-avatar')}
            style={{
              background: `url(${contact.photo.url})center center / cover no-repeat`,
            }}
          />
        </div>
        <div className={cn('sidebar-item-r')}>
          <h3 className={cn('sidebar-item-name').mix('indent_5')}>{contact.full_name}</h3>
          <div className={cn('sidebar-item-position').mix('p2 p2_theme_light_second')}>{contact.position_name}</div>
          <div className={cn('sidebar-item-contacts')}>
            {!!contact.phone && (
              <div className={cn('sidebar-item-contact')}>
                <div className={cn('sidebar-item-contact-icon')}>
                  <Phone className={cn('phone-icon')} />
                </div>
                <a href={`tel:${contact.phone}`} className={cn('sidebar-item-contact-text').mix('link link_theme_light_first')}>
                  {contact.phone}
                </a>
              </div>
            )}

            {!!contact.email_address && (
              <div className={cn('sidebar-item-contact')}>
                <div className={cn('sidebar-item-contact-icon')}>
                  <Post className={cn('post-icon')} />
                </div>
                <a href={`mailto:${contact.email_address}`} className={cn('sidebar-item-contact-text').mix('link link_theme_light_first')}>
                  {contact.email_address}
                </a>
              </div>
            )}

            {!!contact.skype && (
              <div className={cn('sidebar-item-contact')}>
                <div className={cn('sidebar-item-contact-icon')}>
                  <Skype className={cn('skype-icon')} />
                </div>
                <a href={`tel:${contact.skype}`} className={cn('sidebar-item-contact-text').mix('link link_theme_light_first')}>
                  {contact.skype}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading, role, service, user } = this.props
    if (loading) {
      return (
        <div className={cn.mix('container')}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Breadcrumbs />
            </Col>
          </Row>
          <Loader />
        </div>
      )
    }

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: service.name, active: true }]} />
            <h1 className={cn('title')}>
              {/* <span onClick={this.handleClick}>
                {this.state.isToggleStar ? <Star outline className={cn('star-icon')}/> : <Star className={cn('star-icon')}/>}
              </span> */}
              {service.name}{' '}
              {service.is_bid_required &&
              ((service.name == 'Оформление представительских расходов' && role.create_apl_expences && get(user, 'all_legal_unit_employees[0].legal_unit.full_name')) ||
              (service.name == 'Bring your own device' && role.create_byod && get(user, 'all_legal_unit_employees[0].legal_unit.full_name')) ||
              (service.name == 'Проведение TeamBuilding' && role.stb_crud && get(user, 'all_legal_unit_employees[0].legal_unit.full_name'))) && (
                <Link to={`/services/${service.id}/bids/new`} className={cn('new-bid-button').mix('btn btn-primary')}>
                  Оставить заявку
                </Link>
              )}
            </h1>

            <h2 className={cn('title')}>
              {
                service.notifications.length > 0 && service.notifications.map((notification) => {
                  if (notification.show_notification) {
                    return (
                      <div>
                        <span className={cn('notification')}>
                          <Rectangle className={cn('rectangle-icon')}/>
                          <span className={cn('exclamation')}>!</span>
                          <span className={cn('text-notification')}>{`  ${notification.body}`.toUpperCase()}</span>
                        </span>
                      </div>
                    )
                  }
                })
              }
            </h2>

            {/*{<div className={cn('message-warning')}>*/}
              {/*<div className={cn('wrapper-attention')}>*/}
                {/*<span className={cn('attention-text')}>!</span>*/}
                {/*<Attention className={cn('attention-icon')}/>*/}
              {/*</div>*/}
              {/*<p className={cn('message-warning-text')}>статус изменения срока исполнения</p>*/}
            {/*</div>}*/}

            <div className={cn('container')}>
              <div className={cn('inner')}>
                <h2 onClick={() => this.onBlockToggle('description')} className={cn('h2')}>
                  Описание сервиса
                  <Arrow
                    dir={this.state.description ? 'up' : 'down'}
                    className={cn('arrow')}
                    color="#d2d8d9"
                  />
                </h2>
                {this.state.description && (
                  <div className={cn('block')}>
                    {service.description && (
                      <p
                        className={'p1_theme_light indent_15'}
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    )}

                    {service.is_provided_them && [
                      <h2 className={'indent_13'}>
                        Кому и когда предоставляется сервис
                      </h2>,
                      <p
                        className={'indent_15'}
                        dangerouslySetInnerHTML={{ __html: service.is_provided_them }}
                      />,
                    ]}

                    {service.order_service && [
                      <h2 className={'indent_13'}>
                        Как заказать предоставление сервиса
                      </h2>,
                      <p
                        className={'indent_15'}
                        dangerouslySetInnerHTML={{ __html: service.order_service }}
                      />,
                    ]}

                    {service.results && [
                      <h2 className={'indent_13'}>
                        Результат, сроки, ограничения
                      </h2>,
                      <div className={'indent_15'}>
                        <div>
                          <strong>Результат:</strong>{' '}
                          <div
                            className={cn('wrapper-text')}
                            dangerouslySetInnerHTML={{ __html: service.results }}
                          />
                        </div>
                        <div>
                          <strong>Сроки:</strong>{' '}
                          <div
                            className={cn('wrapper-text')}
                            dangerouslySetInnerHTML={{ __html: service.term_for_ranting }}
                          />
                        </div>
                        <div>
                          <strong>Ограничения:</strong>{' '}
                          <div
                            className={cn('wrapper-text')}
                            dangerouslySetInnerHTML={{ __html: service.restrictions }}
                          />
                        </div>
                      </div>,
                    ]}
                  </div>

                )}


                    <h2 onClick={() => this.onBlockToggle('documents')} className={cn('h2')}>
                      Документы (бланки, дополнительная информация)
                      <Arrow
                        dir={this.state.documents ? 'up' : 'down'}
                        className={cn('arrow')}
                        color="#d2d8d9"
                      />
                    </h2>
                    {this.state.documents && service.documents.length > 0 && (
                      <div className={cn('block-document')}>
                        {service.documents.map(doc => (
                          <div className={cn('document')} key={doc.id}>
                            <a href={doc.url} download className={cn('document-title')}>
                            {doc.name}
                            </a>
                            {/*<p className={cn('document-text')}>{doc.extension}</p>*/}
                          </div>
                          ))}

                      </div>
                      )}

                    <h2 onClick={() => this.onBlockToggle('supporting_documents')} className={cn('h2')}>
                      Подтверждающие документы
                      <Arrow
                        dir={this.state.supporting_documents ? 'up' : 'down'}
                        className={cn('arrow')}
                        color="#d2d8d9"
                      />
                    </h2>
                    {this.state.supporting_documents && (
                      <div className={cn('block')}>
                        {service.supporting_documents && (
                          <p
                            className={cn('paragraph')}
                            dangerouslySetInnerHTML={{ __html: service.supporting_documents }}
                          />
                        )}
                      </div>
                    )}

                    <h2 onClick={() => this.onBlockToggle('process_descriptions')} className={cn('h2')}>
                      Описание процесса
                      <Arrow
                        dir={this.state.process_descriptions ? 'up' : 'down'}
                        className={cn('arrow')}
                        color="#d2d8d9"
                      />
                    </h2>
                    {this.state.process_descriptions && (
                      <div className={cn('block')}>
                        {service.process_description && (
                          <p
                            className={cn('paragraph')}
                            dangerouslySetInnerHTML={{ __html: service.process_description }}
                          />
                        )}
                      </div>
                    )}
              </div>
              <div className={cn('sidebar')}>
                <h2>Контактные лица</h2>
                <div className={cn('sidebar-items')}>
                  {this.contacts.map(contact => this.renderContact(contact))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Service)
