import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Row, Col } from 'react-bootstrap'
import { Arrow, Finance } from 'components-folder/Icon'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
// import { Star} from 'components-folder/Icon'
import Loader from 'components-folder/Loader'
import { getServices, releaseServices } from 'redux-folder/actions/servicesActions'

const cn = require('bem-cn')('intranet-services')

if (process.env.BROWSER) {
  require('./styles.css')
}

// const connector = connect(pick(['services', 'loaders']))

const connector = connect(
  state => ({
    services: state.services.data,
    loading: state.loaders.services,
    system: state.system,
  }),
  dispatch => ({
    push: (...args) => dispatch(push(...args)),
    getServices: (...args) => dispatch(getServices(...args)),
    releaseServices: (...args) => dispatch(releaseServices(...args)),
  })
)

class Services extends PureComponent {
  state = {
    isToggleStar: true,
    tab: 0,
    category: null,
  }

  changeTab = (tab) => this.setState({ tab })
  onCategoryClick = (category) => this.setState({ category })
  onServiceClick = (service) => this.props.push(`/services/${service.id}`)

  componentDidMount() {
    this.getServices()
  }

  componentWillUnmount() {
    this.releaseServices()
  }

  handleClick = () => {
    this.setState({
      isToggleStar: !this.state.isToggleStar,
    })
  }

  getServices = async () => {
    const { getServices } = this.props
    await getServices()
    const { services: categories } = this.props
    this.onCategoryClick(categories[0])
  }

  releaseServices = () => {
    const { releaseServices } = this.props
    releaseServices()
  }

  renderServices = () => {
    const { services: categories } = this.props

    return (
      <div className={cn('container')}>
        <div className={cn('tabs')}>
          <div
            onClick={() => this.changeTab(0)}
            className={cn('tab', { active: this.state.tab === 0 })}
          >
            Все сервисы
          </div>
        </div>
        <div className={cn('inner')}>
          <div className={cn('nav')}>
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => this.onCategoryClick(category)}
                className={cn('nav-item', { active: this.state.category === category })}
              >
                <Finance className={cn('nav-item-icon')} />

                <div className={cn('nav-item-name')}>
                  {category.name}
                  <div className={cn('nav-item-count').mix('p4 p4_theme_light_third')}>{category.services.length}</div>
                </div>
                <div className={cn('nav-item-arrow')}>
                  <Arrow dir={'right'} className={cn('nav-item-arrow-icon').mix('is-arrow')} />
                </div>
              </div>
            ))}
          </div>

          <div className={cn('items')}>
            {this.state.category &&
              this.state.category.services.map(service => (
                <div key={service.id} className={cn('wrapper-item')}>
                  <div tabIndex={'0'} onClick={() => this.onServiceClick(service)} className={cn('item').mix('link link_theme_light_first')}>
                    {service.name}
                  </div>
                  {/* <div onClick={this.handleClick}>
                    {this.state.isToggleStar ? <Star outline className={cn('star-icon')}/> : <Star className={cn('star-icon')}/>}
                  </div> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading, system: { menu } } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />

            <h1>{menu.find(it => it.id === 'shr_services').label}</h1>
            {loading ? (
              <div className={cn('loader-wrap')}>
                <Loader />
              </div>
            ) : (
              this.renderServices()
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Services)
