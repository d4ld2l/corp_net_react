import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Loupe, Plus } from 'components-folder/Icon'

const cn = require('bem-cn')('sidebar-working-with-candidate')

if (process.env.BROWSER) {
  require('./sidebar-working-with-candidate.css')
}

const connector = connect(state => ({
  role: state.role,
}))

class SidebarWorkingWithCandidate extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { role } = this.props
    return (
      <div className={cn}>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Link
              to="/recruitment/candidates"
              className={cn('button-find').mix('btn btn-primary btn-block btn-lg')}
            >
              <Loupe className={cn('icon-magnify')} />
              Найти
            </Link>
          </div>
          {role.create_candidate && (
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <Link
                to="/recruitment/candidates/new"
                className={cn('button-new').mix('btn btn-primary btn-block btn-lg')}
              >
                <Plus className={cn('icon-plus')} />
                Добавить
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connector(SidebarWorkingWithCandidate)
