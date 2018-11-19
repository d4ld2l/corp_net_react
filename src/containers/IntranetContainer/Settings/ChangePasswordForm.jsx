import React, { Component } from 'react'
import moment from 'moment/moment'
import compose from "ramda/src/compose";
import {connect} from "react-redux";
import {reduxForm, Field,SubmissionError} from "redux-form";
import BootstrapInput from "components-folder/Form/BootstrapInput";
import { FormGroup, ControlLabel } from 'react-bootstrap'
import {toastr} from "react-redux-toastr";
import {push} from "react-router-redux";
import {getCandidates} from "../../../redux/actions/candidatesActions";
import {clearSearchFilter, toggleTab} from "../../../redux/actions/projectsDataActions";

const cn = require('bem-cn')('settings')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

const validate = values => {
  const errors = {}
  if (values.password && values.passConfirmation) {
    if (values.password !== values.passConfirmation ) {
      errors.passConfirmation = 'Введенные пароли не совпадают'
    }
  }
  if (!values.currentPass) {
    errors.currentPass = 'Необходимо заполнить поле'
  }
  if (!values.password) {
    errors.password = 'Необходимо заполнить поле'
  }
  if (!values.passConfirmation) {
    errors.passConfirmation = 'Необходимо заполнить поле'
  }

  return errors
}

type Props = {
  dispatch: *,
  changePassword: *,
}

type State = {
  currentPass: string,
  password: string,
  passConfirmation: string,
}

const connector = compose(
  reduxForm({
    form: 'ChangePasswordForm',
    validate,
  }),
)

class ChangePasswordForm extends Component<Props, State> {
  state = {
    currentPass: '',
    password: '',
    passConfirmation: '',
  }

  onSubmit = async () => {
    const { changePassword, initialize } = this.props
    const { password, passConfirmation, currentPass } = this.state
    const res = await changePassword({ currentPass, password, passConfirmation })
    if (res.success){
      toastr.success('Пароль был успешно изменён')
      initialize({
        currentPass: '',
        password: '',
        passConfirmation: '',
      })
    }else{
      if (res.errors.current_password){
        toastr.error('Текущий пароль имеет неверное значение')
        throw new SubmissionError({
          currentPass: 'Имеет неверное значение',
          _error: 'Login failed!'
        })
      }

      if (res.errors.password){
        toastr.error('Новый пароль ' + res.errors.password[0])
        throw new SubmissionError({
          password: res.errors.password[0],
          _error: 'Login failed!'
        })
      }
    }
  }

  render() {
    const { handleSubmit } = this.props
    const { password, passConfirmation, currentPass } = this.state
    return (
      <div>
        <h2 className={'form_header'}>Смена пароля</h2>
          <form
            className={cn('form form')}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <fieldset className={'form__fieldset'}>
              <FormGroup>
                <ControlLabel>Текущий пароль</ControlLabel>
                <div className="required">
                  <Field
                    type="password"
                    component={BootstrapInput}
                    name='currentPass'
                    className="form-control"
                    value={currentPass}
                    onChange={e => this.setState({ currentPass: e.target.value })}
                    autoFocus
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Новый пароль</ControlLabel>
                <div className="required">
                  <Field
                    type="password"
                    component={BootstrapInput}
                    name='password'
                    value={password}
                    onChange={(e) => {this.setState({ password: e.target.value })}}
                    className="form__input form-group"
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Повтор нового пароля</ControlLabel>
                <div className="required">
                  <Field
                    type="password"
                    component={BootstrapInput}
                    name='passConfirmation'
                    value={passConfirmation}
                    onChange={(e) => {this.setState({ passConfirmation: e.target.value })}}
                    className="form__input form-group"
                  />
                </div>
              </FormGroup>
            </fieldset>

            <button className={'form__send btn btn-primary btn_padding13-18'} type="submit">
              Отправить
            </button>
            <button className={'btn btn-outline btn_padding13-18'} onClick={this.props.toggleClick}>
              Отмена
            </button>
          </form>
      </div>
    )
  }
  }
export default connector(ChangePasswordForm)
