import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import EmployeeCardTabProjectsInner from './EmployeeCardTabProjectsInner'
import { Pencil } from 'components-folder/Icon'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('employee-card-tab-project')

if (process.env.BROWSER) {
  require('./employee-card-tab-project.css')
}

const connector = connect(state => ({
  current: state.employees.current,
}))

class EmployeeCardTabProjects extends Component {
  render() {
    const { current } = this.props

    return (
      <div className={cn}>
        {/*<Link to={`/employees/${current.id}/edit/project`} title={'Редактировать проекты'}>*/}
          {/*<Pencil outline className={cn('pencil-outline')} />*/}
        {/*</Link>*/}

        <div className={cn('block-head-project')}>
          {
            isEmpty(current.account_projects) ? (
              <h3 className={cn('head').mix('indent_10')}>Пользователь не участвует ни в одном проекте</h3>
            ) : (
              <div>
                <h3 className={cn('head').mix('indent_10')}>Последние проекты</h3>

                <Row>
                  <Col xs={6}>
                    <p className={cn('label').mix('p3 p3_theme_light')}>Название и код проекта</p>
                  </Col>
                  <Col xs={2}>
                    <p className={cn('label').mix('p3 p3_theme_light')}>Период</p>
                  </Col>
                  <Col xs={4}>
                    <p className={cn('label').mix('p3 p3_theme_light')}>Роли</p>
                  </Col>
                </Row>
              </div>
            )
          }

        </div>
        {current.account_projects &&
          current.account_projects.map(elem => (
            <EmployeeCardTabProjectsInner elem={elem} key={elem.id} />
          ))}
      </div>
    )
  }
}

export default connector(EmployeeCardTabProjects)
