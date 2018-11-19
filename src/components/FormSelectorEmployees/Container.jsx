import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import SelectInput from '../Form/SelectInput'
import BootstrapTextarea from '../Form/BootstrapTextarea'
import SelectorEmployeesForm from './SelectorEmployeesForm'

import { Row, Col, Modal, Button } from 'react-bootstrap'

const cn = require('bem-cn')('form-selector-employees')
if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(
  state => ({
    employees: state.employees.data.map(emp => ({ label: emp.full_name, value: emp.id })),
  }),
  {}
)

class Container extends Component {
  submit = values => {
    // print the form values to the console
  }

  render() {
    const {
      open,
      fields,
      label,
      meta: { touched, error, submitFailed },
      comment,
      full_name,
      employees,
    } = this.props

    return (
      <div className={cn}>
        <Row className={cn('row')}>
          {fields.map((e, i) => (
            <Col xs={12} key={i} className={cn('col')}>
              {/*<div className={cn('item')}>*/}
              {/*<div className={cn('card')}>*/}
              {/*<div className={cn('avatar')}></div>*/}
              {/*<div className={cn('user-name')}>*/}
              {/*{e.full_name}*/}
              {/*</div>*/}
              {/*</div>*/}

              {/*<div className={cn('user-comment')}>*/}
              {/*{e.comment}*/}
              {/*</div>*/}
              {/*</div>*/}
              <Field
                name="full_name"
                component={SelectInput}
                type="text"
                label="Укажите сотрудника"
                options={employees}
              />

              <Field name="comment" component={BootstrapTextarea} type="text" label="Комментарий" />
              <button type="button" title="Remove Member" onClick={() => fields.remove(i)} />
            </Col>
          ))}

          <Col xs={4} className={cn('col')}>
            <div className={cn('item')}>
              <div
                className={cn('add-card').mix('cur')}
                // onClick={() => this.props.openModal()}
                onClick={() => fields.push({})}
              >
                <div className={cn('action-title')}>
                  Добавить<br />сотрудника
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12}>{touched && error && <p className="error">{error}</p>}</Col>
        </Row>

        {/*<Modal*/}
        {/*show={open}*/}
        {/*bsSize="large"*/}
        {/*aria-labelledby="contained-modal-title-lg"*/}
        {/*onHide={this.props.closeModal}*/}
        {/*>*/}
        {/*<Modal.Header closeButton>*/}
        {/*<Modal.Title id="contained-modal-title-lg">Добавление нового сотрудника</Modal.Title>*/}
        {/*</Modal.Header>*/}

        {/*<Modal.Body>*/}
        {/*<SelectorEmployeesForm />*/}
        {/*</Modal.Body>*/}

        {/*<Modal.Footer>*/}
        {/*<Button onClick={() => {*/}
        {/*// this.props.addEmployees({ comment, full_name, checked: false });*/}
        {/*this.props.closeModal();*/}
        {/*}}>Добавить</Button>*/}
        {/*</Modal.Footer>*/}
        {/*</Modal>*/}
      </div>
    )
  }
}

export default connector(Container)
