import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { clearSearchFilter, toggleTab } from '../../../redux/actions/projectsDataActions'
import Search from './Search'
import Filtered from './Filtered'
import Groups from './Groups'
import BtnUpload from './BtnUpload'
import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'

import { v4 } from 'uuid'



const cn = require('bem-cn')('personel-roaster-employees')
if (process.env.BROWSER) {
  require('./css/style.css')
}
moment.locale('ru')

export default class Container extends Component {
  componentDidMount(){
    const { dispatch, match } = this.props
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
              <title>Список сотрудников</title>
            </Helmet>
            <Breadcrumbs />
            <Header />
            <div className={cn('top-container')}>
              <Search {...this.props}/>
              <Filtered {...this.props} />
              <p className={cn('number').mix('p1 p1_theme_light_first indent_reset')}>Кол-во сотрудников: 1 500</p>
            </div>
            <Groups />
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
    <h1 className={cn('head-title')}>Список сотрудников</h1>
  </div>
)
