import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Modal, Button } from 'react-bootstrap'
import {
  getSelectCandidates,
  updateCurrentCandidate,
} from '../../../redux/actions/candidatesActions'
import { getCurrentVacancy } from '../../../redux/actions/vacanciesActions'
import { toastr } from 'react-redux-toastr'

const connector = connect(state => ({
  state,
  vacancy: state.vacancies.current,
}))

class ChangeStageCandidateModal extends Component {
  state = {
    stage: this.props.currentVacancyStageId,
  }

  render() {
    const { show, onHide, vacancyStages, sendStage } = this.props
    const { stage } = this.state
    return (
      <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Перевести на этап</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <label>Этап</label>

            <Select
              searchable={false}
              value={stage}
              options={vacancyStages}
              onChange={stage => this.setState({ stage: stage.value })}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          { stage && ( <Button  onClick={() => {
            sendStage(stage)
            onHide()
          }}> Сохранить </Button> ) }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connector(ChangeStageCandidateModal)
