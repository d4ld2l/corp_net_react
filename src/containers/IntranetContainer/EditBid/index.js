import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose, pick } from 'ramda'
import { Link } from 'react-router-dom'
import {push} from "react-router-redux"
import {change, reduxForm, formValueSelector} from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Loader from 'components-folder/Loader'

import { getBid, updateBid, releaseBid, getAssistants, getUsers, getStbParticipants } from 'redux-folder/actions/bidsActions'
import { getCustomers, releaseCustomers } from 'redux-folder/actions/customersActions'
import { getLegalUnits, releaseLegalUnits } from 'redux-folder/actions/legalUnitsActions'
import { getProjects, releaseProjects } from 'redux-folder/actions/projectsActions'
import { getService } from "redux-folder/actions/servicesActions";
import { getDictionaryAccounts, getDictionaryProjects } from "redux-folder/actions/dictionariesActions";

import BringYourOwnDevice from './BringYourOwnDevice'
import Expenses from './Expenses'
import TeamBuilding from './TeamBuilding/'
import {toastr} from 'react-redux-toastr'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'
import {isEmpty} from 'lodash'

const cn = require('bem-cn')('intranet-new-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

const selector = formValueSelector('EditBid')

const connector = compose(
  // connect(pick(['bids', 'loaders', 'service', 'users', 'employees', 'projects', 'customers', 'legal_units', 'assistants'])),
  connect(
    state => ({
      bid: state.bids.current,
      loading: state.loaders.bids,
      users: state.users,
      projects: state.projects,
      dictionaries: state.dictionaries,
      legal_units: state.legal_units,
      assistants: state.assistants,
      customers: state.customers,
      legalUnit: state.legal_unit,
      stb_participants: state.stbParticipants.current,
    }),
    dispatch => ({
      push: (...args) => dispatch(push(...args)),
      change: (...args) => dispatch(change(...args)),
      getBid: (...args) => dispatch(getBid(...args)),
      updateBid: (...args) => dispatch(updateBid(...args)),
      getService: (...args) => dispatch(getService(...args)),
      getCustomers: (...args) => dispatch(getCustomers(...args)),
      getLegalUnits: (...args) => dispatch(getLegalUnits(...args)),
      getDictionaryProjects: (...args) => dispatch(getDictionaryProjects(...args)),
      getDictionaryAccounts: (...args) => dispatch(getDictionaryAccounts(...args)),
      getAssistants: (...args) => dispatch(getAssistants(...args)),
      getUsers: (...args) => dispatch(getUsers(...args)),
      releaseBid: (...args) => dispatch(releaseBid(...args)),
      releaseCustomers: (...args) => dispatch(releaseCustomers(...args)),
      releaseLegalUnits: (...args) => dispatch(releaseLegalUnits(...args)),
      releaseProjects: (...args) => dispatch(releaseProjects(...args)),
    })
  ),
  reduxForm({ form: 'EditBid', touchOnChange: true })
)

class EditBid extends PureComponent {
  state = {
    fetching: true,
  }

  loadBid = async() => {
    const { getBid, getService, match: { params: { id } } } = this.props
    const bid = await getBid(id)
    await getService(bid.service.id)
    // return Promise.resolve()
  }

  componentDidMount() {
    const { dispatch, releaseBid, releaseCustomers, releaseLegalUnits } = this.props
    Promise.all([
        releaseBid(),
        releaseCustomers(),
        releaseLegalUnits(),
      ]
    ).then(() => {
      Promise.resolve(
        this.loadBid.call(this).then(() => {this.setState({ fetching: false })})
      )
    })
  }

  componentWillUnmount() {
    const { releaseBid, releaseCustomers, releaseLegalUnits, releaseProjects, dispatch } = this.props
    releaseBid()
    releaseCustomers()
    releaseLegalUnits()
    releaseProjects()
    dispatch({type: 'RESET_STB_PARTICIPANTS'})
  }

  componentDidUpdate(prevProps){
    if (!prevProps.submitFailed && this.props.submitFailed){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  renderForm = () => {
    const { bid, legal_units } = this.props

    switch (bid.service.name) {
      case 'Bring your own device':
        return <BringYourOwnDevice {...this.props}/>;
      case 'Оформление представительских расходов':
        return <Expenses {...this.props}/>;
      case 'Проведение TeamBuilding':
        return <TeamBuilding key="tbl" {...this.props}/>;
      default:
        return <Expenses {...this.props}/>;
    }
  }

  render() {
    const {
      bid,
      loading,
      match: { params: { id } },
    } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: this.state.fetching ? 'Редактивароние заявки №'+id :
              'Редактирование заявки №'+bid.id, active: true }]}/>
            <h1>Редактирование заявки</h1>
            {loading ? <Loader /> : this.renderForm()}
          </Col>
        </Row>
      </div>
    )
  }

}

export default connector(EditBid)
