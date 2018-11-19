import React, { Component } from 'react'
import { parseInt } from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import EmployeeCard from './EmployeeCard'
import { Row, Col } from 'react-bootstrap'
import { getEmployee, updateEmployee } from '../../../redux/actions/employeesActions'
import Loader from 'components-folder/Loader'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { toastr } from 'react-redux-toastr'
import scrollToComponent from 'components-folder/ScrollToComponent'
import GeneralInformationCollapse from './GeneralInformationCollapse'
import ContactInformationCollapse from './ContactInformationCollapse'

import ProjectsCollapse from './ProjectsCollapse'

import ReactDOM from 'react-dom'

const cn = require('bem-cn')('intranet-employee-edit')

if (process.env.BROWSER) {
  require('./Container.css')
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
  componentWillMount() {
    const { getEmployee, match } = this.props
    getEmployee(match.params.id)
  }

  componentWillReceiveProps({ match, dispatch, user }) {
    if (user.id && user.id !== parseInt(match.params.id)) {
      toastr.error('У вас нет доступа к данному действию!')
      dispatch(push(`/employees/${match.params.id}`))
    }
  }

  onSubmit = async () => {
    const { dispatch, current, state } = this.props
    try {
      if (
        !state.form.ContactInformationCollapse.syncErrors &&
        !state.form.GeneralInformationCollapse.syncErrors
      ) {
        const res = await dispatch(updateEmployee(current.id))
        if (res && !(res.success === false)) {
          dispatch(push(`/employees/${current.id}`))
          toastr.success('Профиль успешно отредактирован.')
          return
        }
        toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
      }
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    } catch (error) {}
  }

  onReset = () => window.history.back()

  render() {
    const { current, fetching } = this.props

    if (fetching) return <Loader />

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs
              breadcrumbs={[
                {
                  name: current.full_name,
                  location: `/employees/${current.id}`,
                },
                { name: 'Редактирование карточки сотрудника', active: true },
              ]}
            />
            <EmployeeCard />
            <GeneralInformationCollapse />
            <ContactInformationCollapse />
            {/*<ProjectsCollapse />*/}
            <div className={cn('actions')}>
              <div onClick={this.onSubmit} className={cn('actions-send')}>
                Сохранить
              </div>
              <div onClick={this.onReset} className={cn('actions-cancel')}>
                Отменить
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Container)
