import React, { Component } from 'react'
import { parseInt } from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import EmployeeCard from '../EmployeeCard'
import ResumeCollapse from './ResumeCollapse'
import { Row, Col } from 'react-bootstrap'
import { getEmployee, updateResumeEmployee, getLanguages,
  getLanguagesLevel, getEducationLevel} from '../../../../redux/actions/employeesActions'
import Loader from 'components-folder/Loader'

import Breadcrumbs from 'components-folder/Breadcrumbs/'
import {toastr} from 'react-redux-toastr'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'

const cn = require('bem-cn')('intranet-employee-edit')

if (process.env.BROWSER) {
  require('../Container.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
    fetching: state.loaders.employee,
    user: state.user,
  }),
  {
    getEmployee,
  }
)

class Container extends Component {

  componentDidMount() {
    const { dispatch, getEmployee, match: { params: { id } } } = this.props
    Promise.all([
      dispatch(getLanguages()),
      dispatch(getLanguagesLevel()),
      dispatch(getEducationLevel()),
      getEmployee(id)
    ])
  }

  componentWillReceiveProps({match, dispatch, user}) {
    if (user.user_id && user.id !== parseInt(match.params.id)) {
      toastr.error('У вас нет доступа к данному действию!')
      dispatch(push(`/employees/${match.params.id}`))
    }
  }

  // componentDidUpdate(prevProps){
  //   if (!prevProps.submitFailed && this.props.submitFailed){
  //     scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
  //     toastr.error('Проверьте правильность заполненых полей.')
  //   }
  // }
  //
  // onSubmit = async () => {
  //   const { dispatch, current, state } = this.props
  //   try {
  //     console.log(state.form.ResumeCollapse.syncErrors)
  //     if ((!state.form.ResumeCollapse.syncErrors)) {
  //       const res = await dispatch(updateResumeEmployee(current.id))
  //       if (res && !(res.success === false)) {
  //         dispatch(push(`/employees/${current.id}`))
  //         toastr.success('Профиль успешно отредактирован.')
  //         return
  //       }
  //       toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
  //     }
  //     scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
  //     toastr.error('Проверьте правильность заполненых полей.')
  //   } catch (error) {}
  // }


  // onReset = () => window.history.back()

  render() {
    const { current, fetching } = this.props

    if (fetching) return <Loader />

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: !!current.name && (
              current.surname + ' ' + current.name + ' ' + current.middlename), active: true }]}/>
            <EmployeeCard />
            <ResumeCollapse />
            {/*<div className={cn('actions')}>*/}
              {/*<div onClick={this.onSubmit} className={cn('actions-send')}>*/}
                {/*Сохранить*/}
              {/*</div>*/}
              {/*<div onClick={this.onReset} className={cn('actions-cancel')}>*/}
                {/*Отменить*/}
              {/*</div>*/}
            {/*</div>*/}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Container)
