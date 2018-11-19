import React, { Component } from 'react'
import moment from 'moment/moment'

import SendPassword from './SendPassword'
import {reduxForm, Field, SubmissionError} from "redux-form";
import {toastr} from "react-redux-toastr";
import compose from "ramda/src/compose";
import { generateNewPassword } from 'redux-folder/actions/loginActions'
import { FormGroup, ControlLabel } from 'react-bootstrap';
import BootstrapInput from "components-folder/Form/BootstrapInput";


const cn = require('bem-cn')('login')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Необходимо заполнить поле'
  }

  return errors
}

const connector = compose(
  reduxForm({
    form: 'ResetPasswordForm',
    validate,
  }),
)



class ResetPasswordForm extends Component {
  state = {
    email: '',
    success: false,
    res: null,
  }

  onSubmit = async () => {
    const { generateNewPassword } = this.props
    const { email } = this.state
    const res = await generateNewPassword(email)
    if (res.success){
      toastr.success(res.message)
      this.setState({ success: true, res })
    }
    else{
      toastr.error(res.message)
    }
  }

  render() {
    const { success, email } = this.state
    const { handleSubmit } = this.props
    return(
      <div className={cn('change-password')}>
        <form
          className={cn('form form')}
          onSubmit={handleSubmit(this.onSubmit)}
        >
          {!success ? (
            <div>
            <h1 className={'form__header'}>Сбросить пароль</h1>
            <p>Ничего страшного. Мы все иногда забываем.</p>
            <fieldset className='form__fieldset margin-bottom-16'>
              <FormGroup>
                <ControlLabel>Почта</ControlLabel>
                <div className="required">
                  <Field
                    type="text"
                    component={BootstrapInput}
                    name='email'
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                    className={cn(`${handleSubmit ?  'error-border' : ''}`).mix('form-control')}
                  />
                </div>
              </FormGroup>
            </fieldset>

            <button className={'form__send btn btn-primary btn_padding13-18'} type="submit">
              Отправить
            </button>

            <button className={'btn btn-outline btn_padding13-18'} type="submit" onClick={this.props.clickToShow}>
              Отмена
            </button>
            </div>
          ):(
            <SendPassword {...this.props} {...this.state}/>
          )}
        </form>
      </div>
    )
  }
  clickSend = () => {
    this.setState({
      send: !this.state.send
    })
  }
}
export default connector(ResetPasswordForm)

