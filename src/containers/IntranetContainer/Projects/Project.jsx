import React, { Component } from 'react'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('projects')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  render() {
    const { isOpen } = this.state
    const { project } = this.props
    return (
      <div key={v4()} className={cn('collapse')}>
        <div
          className={cn('collapse-head')}
          onClick={this.openCollapse}
          style={isOpen ? { borderColor: 'transparent' } : {}}
        >
          <div className={cn('name')}>
            <Link
              to={`/projects/${project.id}`}
              className={'link link_theme_light_first fw_500 indent_5'}
            >
              {project.title}
            </Link>
            <p className={cn('name-code').mix('p2 p2_theme_light_second indent_10')}>
              {project.charge_code}
            </p>
            <p className={cn('name-count-employees').mix('p4 p4_theme_light_third indent_reset')}>
              {project.accounts_count} участников
            </p>
          </div>
          <div className={cn('customer')}>
            <p className={cn('customer-name').mix('p1 p1_theme_light_first indent_reset')}>
              {project.customer_projects[0] && project.customer_projects[0].customer.name}
            </p>
          </div>
          <div className={cn('period')}>
            <time className={cn('period-date').mix('p1 p1_theme_light_first indent_5')}>
              {project.begin_date
                ? `${moment(project.begin_date).format('DD.MM.YYYY')} - ${project.end_date
                    ? moment(project.end_date).format('DD.MM.YYYY')
                    : 'наст. вр.'}`
                : '-'}
            </time>
            <div
              className={cn('period-status')}
              style={
                project.status !== 'active'
                  ? { backgroundColor: '#93959a' }
                  : { backgroundColor: '#575b97' }
              }
            >
              <span className={cn('period-status-label').mix('p4 p4_theme_dark_second')}>
                {project.status === 'active' ? 'Активный' : 'Завершен'}
              </span>
            </div>
          </div>
          <div className={cn('manager')}>
            {project.manager ? (
              <div>
                <div className={cn('manager-wrapper')}>
                  <div
                    className={cn('manager-photo')}
                    title={project.manager.full_name}
                    style={{
                      background: `url(${project.manager.photo
                        .url}) center center / cover no-repeat`,
                    }}
                  />
                  <Link
                    to={`/employees/${project.manager_id}`}
                    className={cn('manager-name').mix('link link_theme_light_first')}
                  >
                    {project.manager.full_name}
                  </Link>
                </div>
                <p className={cn('manager-position').mix('p2 p2_theme_light_second indent_reset')}>
                  {project.manager.departments_chain &&
                    project.manager.departments_chain.map(({ name_ru }) => name_ru).join(' / ')}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>

          <span onClick={this.openCollapse}>
            {isOpen ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </span>
        </div>

        {isOpen && (
          <div className={cn('collapse-body')}>
            <div className={cn('wrapper-data')}>
              <p className={cn('label').mix('p3 p3_theme_light')}>Продукты</p>
              <p className={cn('text').mix('p1 p1_theme_light_first indent_25')}>
                {project.products.map(({ name }) => name).join(', ')}
              </p>
            </div>
            <div className={cn('wrapper-data')}>
              <p className={cn('label').mix('p3 p3_theme_light')}>Технологии</p>
              <p className={cn('text').mix('p1 p1_theme_light_first indent_25')}>
                {project.technologies.map(({ name }) => name).join(', ')}
              </p>
            </div>
            <div className={cn('wrapper-data')}>
              <p className={cn('label').mix('p3 p3_theme_light')}>Описание проекта</p>
              <p className={cn('text').mix('p1 p1_theme_light_first indent_25')}>
                {project.description}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
  openCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
