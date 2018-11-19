import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse, FormGroup, ControlLabel } from 'react-bootstrap'

import { Arrow, Trash, Calendar } from 'components-folder/Icon/'

import SelectInput from 'components-folder/Form/SelectInput'
import { Field, FieldArray, reduxForm } from 'redux-form'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CKeditor from 'components-folder/Form/CKeditor'
import CheckboxField from 'components-folder/Form/CheckboxField'
import { dateTimeFormat, greaterThanStart } from '../../../lib/validation'

const cn = require('bem-cn')('b-collapse')
if (process.env.BROWSER) {
  require('./b-collapse.css')
}
moment.locale('ru')

const renderFieldsProject = ({ fields, meta: { touched, error, submitFailed }, options }) => (
  <div>
    {fields.length === 0 ? fields.push({}) : null}
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <Field
          name={`${exp}.education_level_id`}
          label="Название проекта"
          component={SelectInput}
          options={options}
        />
        <p className={cn('info-msg').mix('p2 p2_theme_light_third')}>Код проекта: INV_OCS_N_MINSV_UNI</p>

        <FormGroup>
          <ControlLabel className={('p3 p3_theme_light')}>период работы на проекте</ControlLabel>
          <div className={cn('wrapper-calendar')}>
            <div className={cn('calendar')}>
              <Field
                label=""
                name={`begin_date`}
                component={DateTimeField}
                validate={[dateTimeFormat]}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
              />
              <Calendar className={cn('calendar-icon')} />
            </div>
            <div className={cn('dash')}>—</div>
            <div className={cn('calendar')}>
              <Field
                label=""
                name={`end_date`}
                component={DateTimeField}
                validate={[dateTimeFormat, greaterThanStart]}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
              />
              <Calendar className={cn('calendar-icon')} />
            </div>
            <CheckboxField
              label="По настоящее время"
              name={`for_now`}
              className={cn('nowadays-checkbox')}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <ControlLabel className={('p3 p3_theme_light')}>Роль в проекте</ControlLabel>
          <Field
            type="text"
            component="input"
            name={`${exp}.faculty_name`}
            className="form-control"
          />
        </FormGroup>

        <div className={cn('wrapper-ckeditor')}>
          <Field
            label="Обязанности"
            component={CKeditor}
            name={`${exp}.experience_description`}
            className="form-control"
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
            Удалить проект {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline" onClick={() => fields.push({})}>
      Добавить проект
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

class ProjectsCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
    }
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Проекты</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_close')} />
          ) : (
            <Arrow className={cn('arrow-icon_open')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('body')}>
              <Trash outline className={cn('trash-outline')}/>
              <FieldArray name="project" component={renderFieldsProject} />
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default reduxForm({
  form: 'ProjectsCollapse',
})(ProjectsCollapse)
