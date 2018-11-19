import React, { Component } from 'react'
import moment from 'moment/moment'
import {toastr} from "react-redux-toastr";
import {reduxForm, SubmissionError, Field} from "redux-form";
import compose from "ramda/src/compose";
import BootstrapInput from "components-folder/Form/BootstrapInput";
import { FormGroup, ControlLabel } from 'react-bootstrap';
import {push} from "react-router-redux";



const cn = require('bem-cn')('login')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

// const validate = values => {
//   const errors = {}
//
//   if (values.password && values.passConfirmation) {
//     if (values.password !== values.passConfirmation ) {
//       errors.passConfirmation = 'Введенные пароли не совпадают'
//     }
//   }
//
//   if (!values.password) {
//     errors.password = 'Необходимо заполнить поле'
//   }
//
//   if (!values.passConfirmation) {
//     errors.passConfirmation = 'Необходимо заполнить поле'
//   }
//
//   return errors
// }

const connector = compose(
  reduxForm({
    form: 'NewPassword',
    // validate,
  }),
)

class NewPassword extends Component {
  state = {
    password: '',
    passConfirmation: '',
    success: false,
    res: null,
    error: false,
  }

  onSubmit = async () => {
    const { resetNewPassword, dispatch } = this.props
    const { password, passConfirmation } = this.state
    let url = new URL('http://hr.dev.shr.phoenixit.ru/login' + this.props.location.search);
    let token = url.searchParams.get("token");
    const res = await resetNewPassword({ password, passConfirmation, token})
    if (res.success){
      toastr.success(res.message)
      // toastr.success('Пароль был успешно изменён')
      this.setState({ success: true, res })
      this.props.clickToShowLoginWithToken()
      dispatch(push('/login'))
    }
    else{
      this.setState({error: true})
      if (res.message) {toastr.error(res.message)}

      if (res.errors.password){
        toastr.error('Новый пароль ' + res.errors.password[0])
        throw new SubmissionError({
          password: res.errors.password[0],
          _error: 'Login failed!'
        })
      }
      if (res.errors.password_confirmation){
        toastr.error('Введенный пароль ' + res.errors.password_confirmation[0])
        throw new SubmissionError({
          password_confirmation: res.errors.password_confirmation[0],
          _error: 'Login failed!'
        })
      }

    }
  }
  render() {
    const { handleSubmit, dispatch } = this.props
    const { password, passConfirmation, error } = this.state
    return(
      <div className={cn('change-password')}>
        <form className={cn('form form')}
              onSubmit={handleSubmit(this.onSubmit)}
        >
        <div className={'form__new-pass'}>
          <h1 className={'form__header'}>Задать новый пароль</h1>
              <p className={'form-new-pass-txt'}>Надежный пароль состоит из комбинации букв и знаков. Он должен быть не короче 6&nbsp;знаков</p>
              <fieldset className={'form__fieldset '}>
                <div className="form-group">
                  <label>Новый пароль</label>
                  <input
                    type="password"
                    name="password"
                    className={cn(`${error ?  'error-border' : ''}`).mix('form-control')}
                    value={password}
                    autoFocus
                    onChange={(e) => {this.setState({ password: e.target.value })}}
                  />
                </div>
                <div className="form-group">
                  <label>Повтор нового пароля</label>
                  <input
                    type="password"
                    name="passConfirmation"
                    className={cn(`${error ?  'error-border' : ''}`).mix('form-control')}
                    value={passConfirmation}
                    onChange={(e) => {this.setState({ passConfirmation: e.target.value })}}
                  />
                </div>
              </fieldset>

              <button className={'form__send btn btn-primary btn_padding13-18'}  type="submit">
                Отправить
              </button>
              <button className={'btn btn-outline btn_padding13-18'}  onClick={ (e) => {e.preventDefault();
                this.props.clickToShowLoginWithToken()
                dispatch(push('/login'))}}>
                Отмена
              </button>
        </div>
        </form>
      </div>
    )
  }
}
export default connector(NewPassword)

