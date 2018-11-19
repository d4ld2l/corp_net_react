import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import compose from 'ramda/src/compose'
import { Collapse } from 'react-bootstrap'
import { Arrow } from '../../Icon'
import { Field, reduxForm, change } from 'redux-form'
import BootstrapInput from '../../Form/BootstrapInput'
import SelectInput from '../../Form/SelectInput'
import SelectInputGroup from '../../Form/SelectInputGroup'
import ReduxFormDropzoneDocumentCandidate from '../../Form/ReduxFormDropzoneDocumentCandidate'
import ReduxFormDropzoneAvatarCandidate from '../../Form/ReduxFormDropzoneAvatarCandidate'
import type { VacancyRaw, ResumeSourceRaw } from '../../../types/raws'

const cn = require('bem-cn')('candidate-tab-full-name')

if (process.env.BROWSER) {
  require('./main.css')
}

type Props = {
  vacancies: Array<{
    name: string,
    id: number,
  }>,
  sources: Array<{}>,
  stageVacancies: Array<VacancyRaw>,
  sources: Array<ResumeSourceRaw>,
}

type State = {
  open: boolean,
}

const validate = values => {
  const errors = {}

  if (!values.last_name) {
    errors.last_name = 'Обязательное поле'
  }

  if (!values.first_name) {
    errors.first_name = 'Обязательное поле'
  }

  if (!values.city) {
    errors.city = 'Обязательное поле'
  }
  return errors
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabFullName',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: {
      candidate_vacancies_attributes: [''],
    },
  }),
  connect(state => ({
    form: state.form.CandidateTabFullName,
    sources: state.candidates.sources,
    initialValues: state.candidates.parsedResume.fullName,
    candidate: state.candidates.current,
  }))
)

class CandidateTabFullName extends Component<Props, State> {
  state = {
    open: true,
  }

  componentWillMount() {
    const { initialize, candidateId, candidate } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        city: resume.city,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        middle_name: candidate.middle_name,
        resume_source_id: resume.resume_source_id,
        candidate_vacancies_attributes:
          candidate.candidate_vacancies.length > 0
            ? candidate.candidate_vacancies.map(item => item.vacancy_id)
            : [''],
        photo: resume.photo.url,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  vacanciesOptionsForSelect = vacancies =>
    vacancies.map(vacancy => ({ label: vacancy.name, value: vacancy.id }))

  sourcesOptionsForSelect = sources =>
    sources.map(source => ({ label: source.name, value: source.id }))

  render() {
    const { open } = this.state
    const { sources, stageVacancies, dispatch } = this.props

    return (
      <div className={cn} id="full_name">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Основная информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')} />
          ) : (
            <Arrow className={cn('arrow-icon_close')} />
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <div className={cn('data-wrapper', { input: 'text' })}>
                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    name="last_name"
                    type="text"
                    showLabel
                    label="Фамилия"
                    toIndent
                    required
                  />
                </div>

                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    name="first_name"
                    type="text"
                    showLabel
                    label="Имя"
                    toIndent
                    required
                  />
                </div>

                <Field
                  component={BootstrapInput}
                  name="middle_name"
                  type="text"
                  showLabel
                  label="Отчество"
                  toIndent
                />
                <div className={cn('required')}>
                  <Field
                    name="city"
                    component={BootstrapInput}
                    type="text"
                    showLabel
                    label="Город"
                    toIndent
                    required
                  />
                </div>

                <Field
                  name="resume_source_id"
                  label="Источник резюме"
                  component={SelectInput}
                  options={this.sourcesOptionsForSelect(sources)}
                />
                <SelectInputGroup
                  name="candidate_vacancies_attributes"
                  label="Привязать к вакансии"
                  options={this.vacanciesOptionsForSelect(stageVacancies)}
                />
              </div>
              <div className={cn('data-wrapper', { upload: 'file' })}>
                {this.props.form.values &&
                  this.props.form.values.photo && (
                    <div
                      className={cn('photo')}
                      style={{
                        background: `url(${this.props.form.values
                          .photo}) center top / cover no-repeat`,
                      }}
                    />
                  )}
                <Field
                  name="photo"
                  component={ReduxFormDropzoneAvatarCandidate}
                  style={{}}
                  removable
                  multiple={false}
                  cleanField={() => dispatch(change('CandidateTabFullName', 'photo', ''))}
                  label="Загрузить фото"
                  className={cn('dropzone')
                    .mix('cur')
                    .toString()}
                  icon={!(this.props.form.values && this.props.form.values.photo)}
                />
                <hr className={cn('hr')} />

                <div className={cn('b-upload-file')}>
                  <Field
                    name={`documents`}
                    component={ReduxFormDropzoneDocumentCandidate}
                    removable
                    multiple={true}
                    cleanField={() => dispatch(change('CandidateTabFullName', 'documents', ''))}
                    label="Прикрепить документ"
                    className={cn('dropzone')
                      .mix('cur  btn btn-primary btn-small')
                      .toString()}
                    icon={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabFullName)
