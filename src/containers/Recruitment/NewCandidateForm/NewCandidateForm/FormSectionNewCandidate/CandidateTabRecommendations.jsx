import React, {Component} from 'react'
import {Field, FieldArray, clear} from 'redux-form'
import {Collapse} from 'react-bootstrap'
import {Arrow, Trash} from 'components-folder/Icon'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import {isNumber, join, parseInt, split, isEqual, flatten, fill, isArray} from 'lodash'
import {
  candidateRecommendationsCompany,
  candidateRecommendationsPhoneOrMail, phoneFormatInRecommendation, emailFormatInRecommendation
} from "../../../../../lib/validation";

const cn = require('bem-cn')('candidate-tab-recommendations')

if (process.env.BROWSER) {
  require('./main.css')
}

const renderFields = ({fields, meta: {touched, error, submitFailed}}) => (
  <div>
    {fields.map((exp, index) => (
      <div key={index} className={cn('wrapper-data')}>
        <div className={cn('wrapper-recommendations')}>
          <Field
            type="text"
            name={`${exp}.recommender_name`}
            component={BootstrapInput}
            showLabel
            label={'ФИО'}
            toIndent
          />
          <Field
            type="text"
            name={`${exp}.company_and_position`}
            component={BootstrapInput}
            showLabel
            label={'Должность и место работы'}
            toIndent
            showWink
            validate={[candidateRecommendationsCompany]}
          />
          <Field
            type="text"
            name={`${exp}.phone`}
            component={BootstrapInput}
            showLabel
            label={'Телефон'}
            toIndent
            validate={[candidateRecommendationsPhoneOrMail, phoneFormatInRecommendation]}
          />

          <Field
            type="text"
            name={`${exp}.email`}
            component={BootstrapInput}
            showLabel
            label={'Почта'}
            toIndent
            validate={[candidateRecommendationsPhoneOrMail, emailFormatInRecommendation]}
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')}/>
            Удалить рекомендацию {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline cur" onClick={() => fields.push({})}>
      Добавить рекомендации
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

export default class CandidateTabRecommendations extends Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state

    return (
      <div className={cn} id="recommendations">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Рекомендации</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <FieldArray name="resume_recommendations_attributes" component={renderFields}/>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
