import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Checkbox from '../../Checkbox/Checkbox'
import CandidatesList from './CandidatesList'
import CandidateSidebar from './CandidateSidebar'
import { Settings } from 'components-folder/Icon'
import ListContextMenu from './ListContextMenu'
import { LinkedCandidateModal } from 'components-folder/Modals/LinkedCandidateModal'

import type { LoadersState, VacanciesState } from '../../../types/states'

import type { CandidateWithIncludesRaw } from '../../../types/raws'
import {
  toggleLinkedCandidateModal,
  toggleSidebar,
 } from '../../../redux/actions/candidatesActions'
import path from 'ramda/src/pathOr'
import xorBy from 'lodash/xorBy'

const cn = require('bem-cn')('candidates-table')

if (process.env.BROWSER) {
  require('./CandidatesTable.css')
}

const connector = connect(state => ({
  loaders: state.loaders,
  vacancies: state.vacancies,
  role: state.role,
  user: state.user,
  candidatesReducer: state.candidates,
  showLindkedModal: path(false, ['candidates', 'openLinkedCandidateModal'], state),
}))

class CandidatesTable extends Component {
  state = {
    listMenu: false,
    linkedCandidates: [],
    checked: false,
  }

  handlerToggleSidebar({ candidateId, show }) {
    this.props.dispatch(toggleSidebar({
      candidateId,
      showSidebar: show,
    }))
  }

  checkedAll = () => {
    const { checked } = this.state
    checked
      ? this.setState({ checked: !checked, linkedCandidates: [] })
      : this.setState({
        checked: !checked,
        linkedCandidates: this.props.candidates.map(({ id }) => ({
          candidate_id: id,
        })),
      })
  }

  setCandidate = (candidate_id) => {
    this.setState({
      linkedCandidates: xorBy(this.state.linkedCandidates, [{ candidate_id }], 'candidate_id'),
    }, () => {
      this.setState({
        checked: this.props.candidates.length === this.state.linkedCandidates.length
      })
    })
  }

  clearLinkedCandidates() {
    this.setState({linkedCandidates: []})
  }

  render() {
    const { listMenu, linkedCandidates, checked } = this.state
    const {
      vacancy,
      user,
      stageId,
      role,
      showLindkedModal,
      dispatch,
      candidates,
      getCandidates,
      candidatesReducer: {
        sidebar: {
          showSidebar,
          candidateId
        }
      },
    } = this.props
    return (
      <div className={cn}>
        <div className={cn('wrap')} style={{ width: showSidebar ? '470px' : '100%' }}>
          <div className={cn('candidates-panel')}>
            <div className={cn('candidates-select-all')}>
              <Checkbox onClick={this.checkedAll} checked={checked} />
              {role.create_candidate && (
                <Link
                  to="/recruitment/candidates/new"
                  className={cn('add-candidate').mix('btn btn-primary')}
                >
                  Создать кандидата
                </Link>
              )}
            </div>
            <span
              onClick={(e) => this.setState({ listMenu: !listMenu })}
              className={cn('settings').mix('cur')}
            >
              <Settings className={`${cn('settings-icon').state({ active: listMenu })}`} />
            </span>

            {listMenu && (
              <ListContextMenu
                dispatch={dispatch}
                className={cn('context-menu')}
                handlerClose={(e) => {
                  if (!e.target.closest('.' + cn('settings'))) {
                    this.setState({ listMenu: false })
                  }
                }}
                linkedCandidates={linkedCandidates}
              />
            )}

            <LinkedCandidateModal
              show={showLindkedModal}
              candidateId={null}
              candidates={linkedCandidates}
              clearLinkedCandidates={this.clearLinkedCandidates.bind(this)}
              onHide={() => dispatch(toggleLinkedCandidateModal(false))}
            />
          </div>

          <CandidatesList
            onClick={this.handlerToggleSidebar.bind(this)}
            show={showSidebar}
            candidateId={candidateId}
            ownerId={user.id}
            stageId={stageId}
            candidates={candidates}
            setCandidate={this.setCandidate}
            getCandidates={getCandidates}
            linkedCandidates={linkedCandidates.map(it => it.candidate_id)}
          />
        </div>
        {showSidebar && (
          <div className={cn('sidebar')}>
            <CandidateSidebar
              key={candidateId}
              candidateId={candidateId}
              ownerId={user.id}
              vacancy={vacancy}
              {...this.props}
            />
          </div>
        )}
      </div>
    )
  }
}

export default connector(CandidatesTable)
