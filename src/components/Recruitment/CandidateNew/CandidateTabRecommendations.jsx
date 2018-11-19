import React, { Component } from 'react'
import compose from 'ramda/src/compose'
import { Field, FieldArray, reduxForm, clear } from 'redux-form'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import { Arrow, Trash } from '../../Icon'
import BootstrapInput from '../../Form/BootstrapInput'
import { isNumber, join, parseInt, split, isEqual, flatten, fill, isArray, isEmpty } from 'lodash'

const cn = require('bem-cn')('candidate-tab-recommendations')

if (process.env.BROWSER) {
  require('./main.css')
}

const validate = values => {
  let errors = {}
  errors.resume_recommendations_attributes = []
  values.resume_recommendations_attributes.map(
    ({ recommender_name, company_and_position, phone, email }, i) => {
      errors.resume_recommendations_attributes.push(undefined)
      if (recommender_name) {
        if (!company_and_position) {
          if (!errors.resume_recommendations_attributes[i]){
            errors.resume_recommendations_attributes[i] = {}
          }
          errors.resume_recommendations_attributes[i].company_and_position = 'Обязательное поле'
        }

        if (!phone && !email) {
          if (!errors.resume_recommendations_attributes[i]){
            errors.resume_recommendations_attributes[i] = {}
          }
          errors.resume_recommendations_attributes[i].phone = 'Обязательное поле'
          errors.resume_recommendations_attributes[i].email = 'Обязательное поле'
        }
      }
    }
  )
  return errors
}

const renderFields = ({ fields, meta: { touched, error, submitFailed } }) => (
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
            required
          />
          <Field
            type="text"
            name={`${exp}.company_and_position`}
            component={BootstrapInput}
            showLabel
            label={'должность и место работы'}
            toIndent
            required
            showWink
            winkText={'Укажите место работы и должность'}
          />
          <Field
            type="text"
            name={`${exp}.phone`}
            component={BootstrapInput}
            showLabel
            label={'Телефон'}
            toIndent
            required
          />

          <Field
            type="text"
            name={`${exp}.email`}
            component={BootstrapInput}
            showLabel
            label={'Почта'}
            toIndent
            required
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
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

type Props = {}

type State = {
  open: boolean,
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabRecommendations',
    validate,
    initialValues: {
      resume_recommendations_attributes: [{}],
    },
  }),
  connect(state => ({
    form: state.form.CandidateTabRecommendations,
    initialValues: state.candidates.parsedResume.recommendations,
    candidate: state.candidates.current,
  }))
)

class CandidateTabRecommendations extends Component<Props, State> {
  state = {
    open: true,
  }

  componentDidMount() {
    const { initialize, candidateId, candidate } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        resume_recommendations_attributes:
          resume.resume_recommendations.length > 0 ? resume.resume_recommendations : [''],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="recommendations">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Рекомендации</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')} />
          ) : (
            <Arrow className={cn('arrow-icon_close')} />
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <FieldArray name="resume_recommendations_attributes" component={renderFields} />
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabRecommendations)
