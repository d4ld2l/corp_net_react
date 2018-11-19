import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose, pick } from 'ramda'
import { Link } from 'react-router-dom'
import { reduxForm, formValueSelector } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import BringYourOwnDevice from './BringYourOwnDevice'
import Expenses from './Expenses'
import TeamBuilding from './TeamBuilding'
import Loader from 'components-folder/Loader'
import * as servicesActions from '../../../redux/actions/servicesActions'
import * as customersActions from '../../../redux/actions/customersActions'
import * as legalUnitsActions from '../../../redux/actions/legalUnitsActions'
import * as projectsActions from '../../../redux/actions/projectsActions'
import { toastr } from 'react-redux-toastr'
import ReactDOM from 'react-dom'
import scrollToComponent from 'components-folder/ScrollToComponent'

const cn = require('bem-cn')('intranet-new-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

const selector = formValueSelector('NewBid')

const connector = compose(
  connect(state => ({
    ...pick([
      'services',
      'user',
      'users',
      'loaders',
      'employees',
      'projects',
      'customers',
      'legal_units',
      'assistants',
      'dictionaries',
    ])(state),
    attachment: selector(state, 'attachment'),
    manager: selector(state, 'manager'),
    legalUnit: selector(state, 'legal_unit'),
  })),
  reduxForm({ form: 'NewBid' })
)

class NewBid extends PureComponent {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props
    dispatch({type: 'RELEASE_BID'})
    Promise.all([dispatch(servicesActions.getService(id))]).then(() => {
      this.setState({ fetching: false })
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(servicesActions.releaseServices())
    dispatch(customersActions.releaseCustomers())
    dispatch(legalUnitsActions.releaseLegalUnits())
    dispatch(projectsActions.releaseProjects())
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFailed && this.props.submitFailed) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  state = {
    fetching: true,
  }

  renderForm = () => {
    const { services: { current: service } } = this.props

    switch (service.name) {
      case 'Bring your own device':
        return <BringYourOwnDevice {...this.props} />
      case 'Оформление представительских расходов':
        return <Expenses {...this.props} />
      case 'Проведение TeamBuilding':
        return <TeamBuilding {...this.props} />
      default:
        return <Expenses {...this.props} />
    }
  }

  render() {
    const { services: { current: service } } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            {this.state.fetching ? <div></div> :
              <Breadcrumbs
                breadcrumbs={[
                  { name: !this.state.fetching && service.name, location: `/services/${service.id}` },
                  { name: 'Создание заявки', active: true },
                ]}
              />}
            <h1>Создание заявки</h1>
            {this.state.fetching ? <Loader /> : this.renderForm()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(NewBid)
