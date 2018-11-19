import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { push } from 'react-router-redux'
import ReduxToastr from 'react-redux-toastr'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import ResetPasswordForm from './ResetPasswordForm'
import NewPassword from './NewPassword'
import Loader from "components-folder/Loader"
import { Eye } from 'components-folder/Icon'

const cn = require('bem-cn')('login')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Container extends Component {
  state = {
    email: '',
    password: '',
    forgotPass: false,
    token: null,
    togglePass: true,
  }

  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props
    let url = new URL('http://hr.dev.shr.phoenixit.ru/login' + this.props.location.search);
    let token = url.searchParams.get("token");
    this.setState({
      token: token,
    })
    if (process.env.BROWSER) {
      isAuthenticated && dispatch(push('/'))
    }
  }

  clickToShow = () => {
    this.setState({
      forgotPass: !this.state.forgotPass,
    })
  }



  clickToShowLoginWithToken = () => {
    this.setState({
      token: null,
    })
  }

  togglePass = () => {
    const { togglePass } = this.state
    this.setState({ togglePass: !togglePass })
  }



  render() {
    const { loginUser, pathname, state, isSignin, loaders } = this.props
    const { email, password, forgotPass, token, togglePass } = this.state
    const search = state.router.location.search
    const reset_password_form = this.state.forgotPass && (
      <ResetPasswordForm
        clickToShow={this.clickToShow}
        {...this.props}/>
    )
    const new_password_form = token && (
      <NewPassword
        clickToShowLoginWithToken={() => this.clickToShowLoginWithToken()}
      {...this.props}/>)
    return (
      <div className={cn('wrap')}>
        <Helmet>
          <title>Логин</title>
        </Helmet>

        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <div className={cn('container')}>
            <div className={cn('inner')}>
              <div className={cn('cover')} />
              {!forgotPass && !token &&
              (<form
                  className={cn('form form')}
                  onSubmit={event => {
                    event.preventDefault()
                    loginUser({ email, password, pathname, search })
                  }}
                >
                <legend className={'form__legend'}>
                  <img
                    src={window.dcss.getVariable('signin_logo_url')}
                    alt="main-logo-cosmo"
                    className={'form__logo'}
                  />
                </legend>
                {
                  loaders.login ? (
                      //<Loader/>
                    <div className={'form__loader-wrapper'}>
                      <img
                        src={window.dcss.getVariable('signin_animation_url')}
                        alt="main-logo-cosmo"
                        className={'form__loader'}
                      />
                    </div>
                  ) : (
                    <div>
                      <fieldset className={'form__fieldset'}>
                        <div className="form-group">
                          <label>Логин</label>
                          <input
                            type="text"
                            name="user"
                            placeholder="Логин"
                            className={cn(`${isSignin ?  'error-border' : ''}`).mix('form-control')}
                            value={email}
                            autoFocus
                            onChange={e => this.setState({ email: e.target.value })}
                          />
                        </div>

                        <div className={'form__input form-group'}>
                          <label>Пароль</label>
                          <div className={cn('wrapper')}>
                            <input
                              type={togglePass ? 'password' : 'text' }
                              name="pass"
                              className={cn(`${isSignin ?  'error-border' : ''}`).mix('form-control')}
                              placeholder="Пароль"
                              value={password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                            <span
                              onClick={this.togglePass}
                              className={cn('eye').mix(!togglePass && cn('eye_active'))}
                              title={togglePass ? 'Показать пароль' : 'Скрыть пароль' }
                              tabIndex={'0'}
                            >
                              <Eye hide={togglePass && true} className={'is-eye'}/>
                            </span>
                          </div>
                        </div>
                        { isSignin ? <p className={cn('error-msg')}>Неверный логин или пароль</p> : '' }
                        <div className={('form__remember-restore')}>
                          <Checkbox
                            checked={this.state.checked}
                            onClick={checked => {
                              this.setState({ checked })
                            }}
                          >
                            Запомнить меня
                          </Checkbox>

                          <a className={'form__remember-restore__link'} onClick={this.clickToShow}>Забыли пароль?</a>
                        </div>
                      </fieldset>

                      <button className="btn btn-primary" type="submit">
                        Войти
                      </button>
                    </div>
                  )
                }
                </form>)}
            {reset_password_form}
            {new_password_form}
          </div>
        </div>
      </div>
    )
  }
}
