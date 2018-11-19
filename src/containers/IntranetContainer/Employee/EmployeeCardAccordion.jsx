import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LeadersCollapse from './LeadersCollapse'
import SubordinatesCollapse from './SubordinatesCollapse'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

const cn = require('bem-cn')('employee-card-accordion')

if (process.env.BROWSER) {
  require('./employee-card-accordion.css')
}

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
  }),
  {}
)

class EmployeeCardAccordion extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { current } = this.props
    const leader =
      current && current.managers_chain && current.managers_chain[current.managers_chain.length - 1]
    const avatar = {
      display: 'inline-block',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: `url(${current && current.photo && current.photo.url
        ? current.photo.url
        : '/public/avatar.png'}) center center/ cover no-repeat`,
    }

    return (
      <div>
        <div className={cn}>
          <h2>Орг. структура</h2>
          {current && <LeadersCollapse current={current} />}
          <div className={cn('wrapper-candidate')}>
            <div className={cn('candidate-info')}>
              <figure className={cn('candidate-figure')}>
                <div style={avatar} />
                <span className={cn('value').mix('p4 p4_theme_light_third')}>{current && current.subordinates_count}</span>
              </figure>
              <h3 className={cn('candidate-name')}>
                {current && current.surname} {current && current.name}
              </h3>
              <p className={cn('candidate-post').mix('p3 p3_theme_light fw_300')}>
                { !isEmpty(current.all_legal_unit_employees) && get(current, 'all_legal_unit_employees[0].position.position.name_ru') }
              </p>
            </div>
            {leader && (
              <div className={cn('card-block')}>
                <figure className={cn('image')}>
                  <img src={leader.photo.url ? leader.photo.url : '/public/avatar.png'} alt="" />
                </figure>
                <div className={cn('info-block')}>
                  <div className={cn('name-value')}>
                    <Link className={('link link_theme_light_first')} to={`/employees/${leader.id}`}>
                      {leader.surname} {leader.name}
                    </Link>
                    <span className={cn('value').mix('p4 p4_theme_light_third')}>{leader.subordinates_count}</span>
                  </div>
                  <p className={cn('post').mix('p3 p3_theme_light fw_300')}>Руководитель</p>
                </div>
              </div>
            )}
          </div>
          {/*<div className={cn('card-block')}>*/}
          {/*<figure className={cn('image')}>*/}
          {/*<img src="/public/avatar.png" alt="" />*/}
          {/*</figure>*/}
          {/*<div className={cn('info-block')}>*/}
          {/*<div className={cn('name-value')}>*/}
          {/*<a href="">Леонтьева Ксения</a>*/}
          {/*<span className={cn('value')}></span>*/}
          {/*</div>*/}
          {/*<p className={cn('post')}>Ассистент</p>*/}
          {/*</div>*/}
          {/*</div>*/}
          {current && <SubordinatesCollapse current={current} />}
          <a className={cn('read-more-candidate').mix('link link_theme_light')} href="../structure/">
            подробнее
          </a>
        </div>
      </div>
    )
  }
}

export default connector(EmployeeCardAccordion)
