import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import VacancyCandidatesSidebar from './VacancyCandidatesSidebar'
import VacancyCandidatesSearchForm from './VacancyCandidatesSearchForm'
import VacancyCandidatesTable from './VacancyCandidatesTable'
import { toggleLinkedCandidateModal } from 'redux-folder/actions/candidatesActions'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import { ChangeStageCandidateModal } from 'components-folder/Modals/ChangeStageCandidateModal'
import { Settings } from 'components-folder/Icon'
import ListContextMenu from './ListContextMenu'
import isEmpty from 'lodash/isEmpty'
import { getVacancyCandidates, setSearchVacancyCandidates, transferCandidates } from 'redux-folder/actions/vacancyCardActions'
import {connect} from "react-redux";
import path from "ramda/src/pathOr";
import {toastr} from "react-redux-toastr";
const cn = require('bem-cn')('candidates-list')

if (process.env.BROWSER) {
  require('./style/CandidatesList.css')
}

class CandidatesList extends Component {
  state = {
    listMenu: false,
    linkedCandidates: [],
  }

  componentDidMount(){
    const { dispatch, match: { params: { id }}  } = this.props
    dispatch(getVacancyCandidates(id, 1))
  }

  handlerSearch = (value) => {
    const { dispatch } = this.props
    dispatch(setSearchVacancyCandidates(value))
  }

  handlerTransferNextStage(stageId, linkedCandidates){
    const { dispatch } = this.props
    dispatch(transferCandidates(stageId, linkedCandidates))
  }

  getLinkedCandidates = (currentCandidates) => {
    const check = currentCandidates.filter( (it) => it.isChecked === true).map((candidate) => candidate.candidate.id)
    if (isEmpty(check)) {
      this.setState({ listMenu: false})
      toastr.error('Вы не выбрали ни одного кандидата')
    } else {
      this.setState({ linkedCandidates: check, listMenu: true})
    }
  }


  render() {
    const {
      role,
      currentCandidates,
      loadingVacancyCandidates,
      loadingVacancyCandidate,
      page,
      scroll,
      showCandidateCard,
      currentCandidate,
      showLindkedModal,
      dispatch,
      current,
      checkAllVacancyCandidate,
      hiddenCandidateList,
      match,
    } = this.props
    const { listMenu, linkedCandidates } = this.state
    return (
      <div hidden={hiddenCandidateList}>
        <VacancyCandidatesSearchForm handlerSearch={this.handlerSearch}/>
        <div className={cn()}>
          <div className={cn('wrap')} style={{ width: showCandidateCard ? '470px' : '100%' }}>
            <div className={cn('candidates-container')}>
              <div className={cn('candidates-select-all')}>
                <Checkbox onClick={() => dispatch({ type: 'TOGGLE_CHECK_ALL_VACANCY_CANDIDATES' })} checked={checkAllVacancyCandidate} />
                <Link
                  to="/recruitment/candidates"
                  className={cn('button-new').mix('btn btn-primary')}
                >
                  Добавить кандидата
                </Link>
              </div>
              <span
                onClick={() => this.getLinkedCandidates(currentCandidates)}
                className={cn('settings').mix('cur')}
                hidden={showCandidateCard}
              >
              <Settings className={`${cn('settings-icon').state({ active: listMenu })}`} />
              </span>

              {listMenu && (
                <ListContextMenu
                  handlerClose={() => this.setState({ listMenu: false })}
                  className={cn('context-menu')}
                />
              )}
              <ChangeStageCandidateModal
              show={showLindkedModal}
              vacancyStages={current.vacancy_stages.map(stage => ({ label: stage.name, value: stage.id }) )}
              sendStage={(stageId) => this.handlerTransferNextStage(stageId, linkedCandidates)}
              onHide={() => dispatch(toggleLinkedCandidateModal(false))}
              />
            </div>
            <VacancyCandidatesTable
              {
                ...{
                  currentCandidates,
                  loadingVacancyCandidates,
                  page,
                  scroll,
                  showCandidateCard,
                  currentCandidate,
                  current,
                  match,
                  dispatch,
                }
              }
            />
          </div>
          {showCandidateCard && (
            <div className={cn('sidebar')}>
              <VacancyCandidatesSidebar
                key={currentCandidate.id}
                {
                  ...{
                    currentCandidate,
                    loadingVacancyCandidate,
                    role,
                    dispatch,
                    current,
                  }
                }
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default CandidatesList
