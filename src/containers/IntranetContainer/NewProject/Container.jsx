import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import NewProject from './NewProject'
import { getProject } from '../../../redux/actions/projectsDataActions'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('new-project')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class Container extends Component {
  componentDidMount() {
    const { dispatch, match, project } = this.props
    if (match.params.id) {
      if ((project.id && project.id.toString()) !== match.params.id) {
        dispatch(getProject(match.params.id))
      }
    }
  }

  render() {
    const { loaders, match: { params: { id } }, project } = this.props
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            {loaders.project && id ? (
              <Loader />
            ) : (
              [
                <Helmet>
                  <title>{id ? project.title : 'Новый проект'}</title>
                </Helmet>,
                <Breadcrumbs breadcrumbs={[{ name: id ? project.title : 'Новый проект', active: true }]} />,
                <Header {...this.props} />,
                <NewProject {...this.props} />,
              ]
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    const { match: { params: { id } }, project } = this.props
    return (
      <div className={cn('head')}>
        <h1 className={cn('head-title')}>{id ? project.title : 'Новый проект'}</h1>
      </div>
    )
  }
}
