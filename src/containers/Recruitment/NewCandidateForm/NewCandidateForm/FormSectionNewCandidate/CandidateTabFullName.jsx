import React, {Component} from 'react'
import {Collapse} from 'react-bootstrap'
import {Arrow} from 'components-folder/Icon'
import {Field, change, FieldArray} from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import SelectInput from 'components-folder/Form/SelectInput'
import SelectInputGroup from 'components-folder/Form/SelectInputGroup'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import MultiFileDocumentsCandidate from 'components-folder/Form/MultiFileDocumentsCandidate'
import {required} from "../../../../../lib/validation";

const cn = require('bem-cn')('candidate-tab-full-name')

if (process.env.BROWSER) {
  require('./main.css')
}

export default class CandidateTabFullName extends Component {
  state = {
    open: true,
  }

  vacanciesOptionsForSelect = vacancies =>
    vacancies.map(vacancy => ({label: vacancy.name, value: vacancy.id}))

  sourcesOptionsForSelect = sources =>
    sources.map(source => ({label: source.name, value: source.id}))

  render() {
    const {sources, stageVacancies, dispatch} = this.props
    const {open} = this.state

    return (
      <div className={cn} id="full_name">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Основная информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <div className={cn('data-wrapper', {input: 'text'})}>
                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    name="last_name"
                    type="text"
                    showLabel
                    label="Фамилия"
                    toIndent
                    validate={[required]}
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
                    validate={[required]}
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
                    validate={[required]}
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
              <div className={cn('data-wrapper', {upload: 'file'})}>
                {this.props.form.values &&
                this.props.form.values.fullName.photo && (
                  <div
                    className={cn('photo')}
                    style={{
                      background: `url(${this.props.form.values.fullName
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
                  cleanField={() => dispatch(change('NewCandidateForm', 'fullName.photo', ''))}
                  label="Загрузить фото"
                  className={cn('dropzone')
                    .mix('cur')
                    .toString()}
                  icon={!(this.props.form.values && this.props.form.values.fullName.photo)}
                />

                <hr className={cn('hr')}/>

                <div className={cn('b-upload-file')}>
                  <FieldArray
                    name="documents"
                    component={MultiFileDocumentsCandidate}
                    removable
                    multiple={true}
                    cleanField={() => dispatch(change('NewCandidateForm', 'fullName.documents', ''))}
                    label="Прикрепить документ"
                    className={cn('dropzone')
                      .mix('cur btn btn-primary btn-small')
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
