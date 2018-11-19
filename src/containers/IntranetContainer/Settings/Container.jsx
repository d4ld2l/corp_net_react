import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { clearSearchFilter, toggleTab } from '../../../redux/actions/projectsDataActions'
import SettingBox from './SettingBox'
import ChangePasswordForm from './ChangePasswordForm'

import { v4 } from 'uuid'


const cn = require('bem-cn')('settings')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

type Props = {
  dispatch: *,
  changePassword: *,
}

export default class Container extends Component<Props>  {
  componentDidMount(){
    const { dispatch, match, changePassword } = this.props
    dispatch(clearSearchFilter())
    dispatch(toggleTab(true))
  }
  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch(clearSearchFilter())
    dispatch(toggleTab(true))
  }
  constructor(props) {
    super(props)
    this.state = {
      isShown: props.defaultOpen,
    }
  }
  render() {
    const { isShown } = this.state

    return(
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>Настройки</title>
            </Helmet>
            <Breadcrumbs />
            <Header />
            <div className={cn('body')}>
              {!isShown && <SettingBox toggleClick={this.toggleClick}/>}
              {isShown && <ChangePasswordForm toggleClick={this.toggleClick} {...this.props}/>}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  toggleClick = () => {
      this.setState({
        isShown: !this.state.isShown
      })
  }
}


const Header = () => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>Настройки</h1>
  </div>
)
