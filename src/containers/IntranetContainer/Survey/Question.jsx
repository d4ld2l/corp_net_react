import React, { PureComponent } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { Field, FieldArray, change } from 'redux-form'
import { SortableHandle } from 'react-sortable-hoc'
import { required } from '../../../lib/validation'

import { Row, Col, Collapse, Clearfix } from 'react-bootstrap'
import SelectInput from 'components-folder/Form/SelectInput'
import CKeditor from 'components-folder/Form/CKeditor'
import ReduxFormDropzone from 'components-folder/Form/ReduxFormDropzone'
import CheckboxGroup from 'components-folder/Form/CheckboxGroup'

import { Arrow, Trash, Clip, Drop } from 'components-folder/Icon'

import InputGroupAnswer from 'components-folder/Form/InputGroupAnswer'

const cn = require('bem-cn')('question')
if (process.env.BROWSER) {
  require('./question.css')
}
moment.locale('ru')

const optionsTypeQuestion = [
  { label: 'Одиночный выбор', value: 'single' },
  { label: 'Множественный выбор', value: 'multiple' },
]

const CheckboxLabel = [{ label: 'Запрет на свой вариант ответа', value: 'ban_own_answer' }]

const SortableDrag = SortableHandle(() => <Drop className={cn('drop-icon')} />)

class Question extends PureComponent {
  state = { name: this.props.value.description || '', open: false }

  onNameChange = name => this.setState({ name })
  onToggle = () => this.setState({ open: !this.state.open })

  requiredTextOrImage(value, allValues, props, name) {
    const index = +name.match(/\d+/)[0]
    const question = allValues.questions[index]
    if (!question) return;

    return (question.description || question.image) ? undefined : 'Заполните текст или изображение'
  }

  checkAnswersCount(value, allValues, props, name) {
    if (value && value[0] === 'ban_own_answer') {
      const index = +name.match(/\d+/)[0]
      const question = allValues.questions[index]
      if (!question) return;

      return question.answer_group.length ? undefined : 'Добавьте ответы'
    }
  }

  render() {
    const { field, type, dispatch, onRemove, total } = this.props
    const { open, name } = this.state
    return (
      <div className={cn} id="question">
        <div className={cn('head')} onClick={this.onToggle}>
          <SortableDrag />
          <h2
            className={cn('h2')}
            dangerouslySetInnerHTML={{
              __html: name.trim() === '' ? 'Вопрос' : name,
            }}
          />

          {open ? (
            <Arrow className={cn('open-icon')} />
          ) : (
            <Arrow className={cn('close-icon')} />
          )}
        </div>

        <div className={cn('inner')}>
          <Collapse in={open}>
            <div>
              <div className={cn('body')}>
                <Row>
                  { total > 1 && (
                    <span className={cn('remove-site').mix('cur')} onClick={onRemove}>
                      <Trash outline className={cn('icon-trash')} />
                    </span>
                  )}

                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className={cn('required')}>
                      <Field
                        component={CKeditor}
                        validate={this.requiredTextOrImage}
                        name={`${field}.description`}
                        // onChange={(_, text) => this.onNameChange(text)}
                        type="text"
                        label="Формулировка вопроса"
                      />
                    </div>

                    <Clearfix />

                    <div className={cn('b-upload-file')}>
                      <Clip className={cn('clip-icon')} />
                      <Field
                        name={`${field}.image`}
                        component={ReduxFormDropzone}
                        // validate={this.requiredTextOrImage}
                        style={{}}
                        removable
                        multiple={false}
                        cleanField={() => dispatch(change('SurveyForm', `${field}.image`, ''))}
                        label="Загрузить изображение"
                        className={cn('dropzone')
                          .mix('cur')
                          .toString()}
                        icon={false}
                      />
                    </div>

                    {type === 'simple' && [
                      <div key={'type'} className={cn('required')}>
                        <Field
                          name={`${field}.type_question`}
                          label="Тип вопроса"
                          validate={[required]}
                          component={SelectInput}
                          placeholder="Не выбрана"
                          noResultsText="Нет категорий"
                          options={optionsTypeQuestion}
                        />
                      </div>,
                      <CheckboxGroup
                        key={'ban'}
                        options={CheckboxLabel}
                        name={`${field}.ban_own_answer`}
                        validate={this.checkAnswersCount}
                      />,
                    ]}
                  </Col>

                  <Col className={'question__answers'} lg={6} md={6} sm={11} xs={11}>
                    <h4>Ответы</h4>

                    <FieldArray
                      name={`${field}.answer_group`}
                      component={InputGroupAnswer}
                      form="SurveyForm"
                      label="Ответ"
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default connect()(Question)
