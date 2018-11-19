import React, { Component } from 'react'
import { Field, change } from 'redux-form'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

// import { required } from '../../lib/validation'
import BootstrapInput from '../Form/BootstrapInput'

import { Clip, Trash, Plus } from '../Icon'

import ReduxFormDropzone from '../Form/ReduxFormDropzone'
// import uuid from "uuid/v1"

const cn = require('bem-cn')('input-group-answer')
if (process.env.BROWSER) {
  require('./InputGroupAnswer.css')
  require('react-select/dist/react-select.css')
  require('./SelectInput.css')
  require('../../containers/IntranetContainer/Survey/answer.css')
}

type Props = {
  label: string,
  fields: {},
  meta: {},
}

class InputGroupAnswer extends Component<Props> {
  constructor(props) {
    super(props)

    const { fields } = this.props
    fields.length === 0 && fields.push({})
  }

  requiredTextOrImage(value, allValues, props, name) {
    const [questionIndex, answerIndex] = name.match(/\d+/g)
    const question = allValues.questions[questionIndex]
    if (!question) return;

    const answer = question.answer_group[answerIndex]
    if (!answer) return;

    return (answer.answer || answer.image) ? undefined : 'Заполните текст или изображение'
  }

  render() {
    const { label, dispatch, form, fields, meta: { touched, error, submitFailed } } = this.props

    return (
      <div className={cn('wrapper-input-answer')}>

        {fields.map((exp, index) => (
          <div
            key={index}
            className={`form-group input-group-answer__field${index === 0
              ? ' text-input-group__required'
              : ''}`}
          >
            <Field
              type="text"
              component={BootstrapInput}
              validate={this.requiredTextOrImage}
              name={`${exp}.answer`}
              label={label}
            />
            <span className={cn('remove-site').mix('cur')} onClick={() => fields.remove(index)}>
              <Trash className={cn('icon-trash')} />
            </span>

            <div className={cn('b-upload-file')}>
              <Clip className={cn('clip-icon')} />
              <Field
                name={`${exp}.image`}
                component={ReduxFormDropzone}
                style={{}}
                multiple={false}
                removable
                cleanField={() => dispatch(change(form, `${exp}.image`, ''))}
                label="Загрузить изображение"
                className={cn('dropzone')
                  .mix('cur')
                  .toString()}
                icon={false}
              />
            </div>
          </div>
        ))}

        <a className={cn('link-add')} onClick={() => fields.push({})}>
          <Plus outline={'filled'} className={cn('plus-icon')} />
        </a>

        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    )
  }
}
export default connect()(InputGroupAnswer)
