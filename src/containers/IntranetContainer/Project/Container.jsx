import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Plus, Pencil, Attention } from 'components-folder/Icon'
import Tabs from './Tabs'
import Loader from 'components-folder/Loader'
import { getProject } from '../../../redux/actions/projectsDataActions'

const cn = require('bem-cn')('project')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

export default class Container extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(getProject(match.params.id))
  }

  render() {
    const { project, match, loaders } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            {loaders.project || (project && project.id.toString()) !== match.params.id ? (
              <Loader />
            ) : (
              [
                <Breadcrumbs key="breadcrumbs" breadcrumbs={[{ name: project.title, active: true  }]} />,
                <Header key="header" {...this.props} />,
                <Status key="status" {...this.props} />,
                <Tabs key="tabs" {...this.props} />,
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
    const { project, user } = this.props

    return (
      <div className={cn('head')}>
        <h1 className={cn('head-title')}>{project.title}</h1>
        <div className={cn('wrap-btn')}>
          <Link to={`/projects/new`} title="Создать новый проект" className={'btn_mr_10'}>
            <Plus outline={40} />
          </Link>
          {(project.manager_id === user.id ||
            user.roles.find(({ name }) => name === 'admin')) && (
            <Link to={`/projects/${project.id}/edit`} title="Редактировать проект">
              <Pencil outline className={cn('add-icon')} />
            </Link>
          )}
        </div>
      </div>
    )
  }
}

class Status extends Component {
  render() {
    const { project } = this.props

    return (
      <div
        className={cn('status')}
        style={
          project.status === 'closed'
            ? { backgroundColor: '#93959a' }
            : { backgroundColor: '#575b97' }
        }
      >
        <span className={cn('status-label')}>
          {project.status == 'active' ? 'Активный' : 'Завершен'}
        </span>
      </div>
    )
  }
}
