import React, { Component } from 'react'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import type { CandidateVacancyRaw } from '../../../types/raws'
import { Close } from '../../Icon/'

const cn = require('bem-cn')('candidate-sidebar')

if (process.env.BROWSER) {
  require('../../Recruitment/Candidate/candidate-sidebar.css')
}

type Props = {
  show: boolean,
  userId: number,
  currentVacancy: CandidateVacancyRaw,
}
type State = {
  stage: number,
}

export default class ChangeStageCandidateWindow extends Component<Props, State> {
  state = {
    stage: this.getStage(),
  }

  getStage() {
    return this.props.currentVacancy.current_vacancy_stage_id
  }

  getStages() {
    return this.props.currentVacancy.vacancy.vacancy_stages.map(stage => {
      return { label: stage.name, value: stage.id }
    })
  }

  render() {
    const { show, onHide, changeStage } = this.props
    return (
      <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <div className={cn('wrapper-modal')}>
          <div className={cn('modal-header')}>
            <h1 className="indent-reset">Перевод кандидата на другой этап</h1>
            <div
              className={cn('modal-close')}
              onClick={() => {
                onHide()
              }}
            >
              <Close className={cn('closed-icon')} />
            </div>
          </div>

          <div className={cn('modal-body')}>
            <div className="form-group">
              <label>Перевести на этап</label>
              <Select
                searchable={false}
                value={this.state.stage}
                options={this.getStages()}
                onChange={stage => this.setState({ stage: stage.value })}
              />
            </div>

            {/* <div className="form-group">
              <label>Комментарий</label>
              <textarea className={cn('textarea')}></textarea>
            </div> */}
          </div>
          {this.state.stage && (
            <button
              className="btn btn-primary"
              onClick={() => {
                changeStage(this.state.stage)
                onHide()
              }}
            >
              Перевести
            </button>
          )}
        </div>
      </Modal>
    )
  }
}
