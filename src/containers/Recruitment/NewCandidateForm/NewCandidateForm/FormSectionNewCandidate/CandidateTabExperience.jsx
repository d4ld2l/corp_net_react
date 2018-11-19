import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'
import {Collapse, FormGroup} from 'react-bootstrap'
import CheckboxField from 'components-folder/Form/CheckboxField'
import {Arrow, Trash} from 'components-folder/Icon'
import DateTimeCalendarIconFIeld from 'components-folder/Form/DateTimeCalendarIconFIeld'
import CKeditor from 'components-folder/Form/CKeditor'
import {editorConfig} from './data'
import {get} from 'lodash'
import BootstrapInput from "components-folder/Form/BootstrapInput";
import {workExperienceStartDate} from "../../../../../lib/validation";

const cn = require('bem-cn')('candidate-tab-experience')
if (process.env.BROWSER) {
  require('./main.css')
}

const renderFields = ({fields, meta: {touched, error, submitFailed}}) => (
  <div>
    {fields.map((exp, index) => (
      <div key={index} className={cn('wrapper-data')}>
        <Field
          type="text"
          name={`${exp}.position`}
          component={BootstrapInput}
          showLabel
          label={'Должность'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.company_name`}
          component={BootstrapInput}
          showLabel
          label={'Название компании'}
          toIndent
        />

        <Field
          type="text"
          name={`${exp}.region`}
          component={BootstrapInput}
          showLabel
          label={'Регион'}
          toIndent
        />

        <Field
          type="text"
          name={`${exp}.website`}
          component={BootstrapInput}
          showLabel
          label={'Сайт'}
          toIndent
        />
        <FormGroup>
          <div className={cn('wrapper-calendar')}>
            <div className={cn('calendar')}>
              <Field
                label="Начало (Обязательное поле)"
                name={`${exp}.start_date`}
                component={DateTimeCalendarIconFIeld}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                validate={[workExperienceStartDate]}
              />
            </div>
            <div className={cn('dash')}>—</div>
            <div className={cn('calendar')}>
              <Field
                label="Окончание"
                name={`${exp}.end_date`}
                component={DateTimeCalendarIconFIeld}
                dateFormat="DD.MM.YYYY"
                inputProps={{ disabled: get(fields.getAll(), `[${index}].nowadays`)}}
                timeFormat={false}
              />
            </div>
            <CheckboxField
              label="По настоящее время"
              name={`${exp}.nowadays`}
              className={cn('nowadays-checkbox')}
            />
          </div>
        </FormGroup>

        <Field
          label="Обязанности"
          component={CKeditor}
          name={`${exp}.experience_description`}
          className="form-control"
          config={editorConfig}
        />

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')}/>
            Удалить место работы {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline cur" onClick={() => fields.push({})}>
      Добавить место работы
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

export default class CandidateTabExperience extends Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state

    return (
      <div className={cn} id="experience">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Опыт работы</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <FieldArray name="resume_work_experiences_attributes" component={renderFields} />
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
