import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Select from 'react-select'
import {Modal, Button} from 'react-bootstrap'
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";
import {
  selectLinkedVacancies,
  linkCandidatesToVacancy,
  getMyVacancies,
} from '../../../redux/actions/vacanciesActions'
import {linkCandidateToVacancy, getCandidates} from '../../../redux/actions/candidatesActions'
import { isEmpty, get, orderBy } from 'lodash'

const connector = connect(
  state => ({
    selectVacancies: state.vacancies.selectVacancies,
    currentSelectVacancies: state.vacancies.currentSelectVacancies,
    currentCandidate: state.candidates.current,
    dictionaryVacancies: state.dictionaries.dictionaryVacancies,
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        selectLinkedVacancies,
        getMyVacancies,
      },
      dispatch,
    ),
    dispatch
  })
)

class LinkedCandidateModal extends Component {
  state = {
    selectDictionaryVacancies: [],
  }

  async componentDidMount() {
    const {dispatch} = this.props

    await dispatch(dictionariesActions.getDictionaryVacancies({status: 'worked'}))

    const {dictionaryVacancies, currentCandidate} = this.props
    let selectDictionaryVacancies = dictionaryVacancies
    let vacancy_ids

    if (get(currentCandidate, 'candidate_vacancies')) {
      vacancy_ids = currentCandidate.candidate_vacancies.map(({vacancy_id}) => (vacancy_id))
    } else if (get(currentCandidate, 'candidate_vacancies_active')) {
      vacancy_ids = currentCandidate.candidate_vacancies_active.map(({vacancy}) => (vacancy.id))
    }

    if (vacancy_ids) {
      selectDictionaryVacancies = selectDictionaryVacancies.filter((it) => !vacancy_ids.includes(it.id))
    }

    selectDictionaryVacancies = orderBy(selectDictionaryVacancies, 'id', 'desc')

    selectDictionaryVacancies = selectDictionaryVacancies.map(it => ({
      label: it.name,
      value: it.id
    }))

    this.setState({selectDictionaryVacancies})
  }

  componentWillMount() {
    const {getMyVacancies} = this.props
    getMyVacancies()
  }

  render() {
    const {
      show,
      currentSelectVacancies,
      dispatch,
      onHide,
      candidateId,
      candidates,
      selectLinkedVacancies,
      clearLinkedCandidates,
      getLightCandidate,
    } = this.props

    const {selectDictionaryVacancies} = this.state
    return (
      <Modal show={show ? true : false} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Привязать кандидата к вакансии</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <label>Вакансия</label>

            <Select
              value={isEmpty(currentSelectVacancies) ? '' : currentSelectVacancies}
              placeholder={isEmpty(selectDictionaryVacancies) ? 'Нет вакансий' : 'Выбрать'}
              searchable={false}
              disabled={isEmpty(selectDictionaryVacancies)}
              options={selectDictionaryVacancies}
              onChange={value => selectLinkedVacancies(value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          {currentSelectVacancies && (
            <Button
              bsStyle="primary"
              disabled={!currentSelectVacancies.value}
              onClick={() => {
                candidateId
                  ? dispatch(
                  linkCandidateToVacancy({
                    candidateId,
                    vacancyId: currentSelectVacancies.value,
                  }, getLightCandidate)
                  ).then(() => getCandidates())
                  : dispatch(
                  linkCandidatesToVacancy({
                    candidates,
                    vacancyId: currentSelectVacancies.value,
                  })
                  ).then(() => getCandidates())
                onHide()
                if (clearLinkedCandidates)
                  clearLinkedCandidates()
              }}
            >
              Сохранить
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connector(LinkedCandidateModal)
