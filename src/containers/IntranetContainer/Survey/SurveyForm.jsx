import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import get from 'lodash/get'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import moment from 'moment'
import uuid from 'uuid/v1'
import { Link } from 'react-router-dom'

import { Field, FieldArray, reduxForm, change } from 'redux-form'
import { Row, Col, Collapse, Clearfix } from 'react-bootstrap'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import { required, dateTimeFormat, lessThanNow } from '../../../lib/validation'

import Loader from 'components-folder/Loader'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CKeditor from 'components-folder/Form/CKeditor'
import ReduxFormDropzone from 'components-folder/Form/ReduxFormDropzone'
// import ReduxFormDropzoneAvatar from 'components-folder/Form/ReduxFormDropzoneAvatar'
import CheckboxGroup from 'components-folder/Form/CheckboxGroup'
import { getCurrentSurvey } from '../../../redux/actions/surveysActions'
import * as surveysActions from '../../../redux/actions/surveysActions'
import { add, toggleAll } from '../../../redux/actions/searchParticipants'
import { SearchParticipant } from '../../../presenters'

import { Arrow, Calendar, Clip } from 'components-folder/Icon'

import { TwitterPicker } from 'react-color'
import ParticipantSurvey from './ParticipantSurvey'
import Question from './Question'
import {toastr} from 'react-redux-toastr'
import scrollToComponent from 'components-folder/ScrollToComponent';
import ReactDOM from 'react-dom'
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('new-survey-collapse')
if (process.env.BROWSER) {
  require('./new-survey-collapse.css')
}
moment.locale('ru')

const optionsTypeSurvey = [
  { label: 'Опрос', value: 'simple' },
  { label: 'Голосование', value: 'complex' },
]

const CheckboxLabel = [{ label: 'Провести опрос анонимно', value: 'anonymously' }]

const colors = [
  '#FF7B91',
  '#7D82CD',
  '#F7C853',
  '#F9BB0E',
  '#F4990A',
  '#F58223',
  '#E14A3B',
  '#E583B9',
  '#D16CA8',
  '#B77942',
  '#52CEF9',
  '#16b8f5',
  '#43acf5',
  '#158cdf',
  '#4bd4b3',
  '#20c58f',
  '#3aafa9',
  '#278f86',
  '#a78de5',
  '#9176d8',
  '#9bcd65',
  '#88ba4f',
  '#5b9f0d',
  '#417505',
]

const connector = compose(
  connect(state => ({
    searchParticipants: state.searchParticipants,
    current: state.surveys.current,
    loaders: state.loaders,
  })),
  reduxForm({
    form: 'SurveyForm',
    touchOnChange: true,

  })
)

class SurveyForm extends PureComponent {
  componentDidMount() {
    const { match, dispatch, current } = this.props

    if (match.params.id) { // edit
      this.setState({ id: match.params.id })
      this.initialize()
    } else { // new
      dispatch(change('SurveyForm', 'questions', [{ id: uuid() }]))
    }

  }

  initialize = async () => {
    const { dispatch, initialize, match } = this.props
    await dispatch(getCurrentSurvey(match.params.id))
    const { current } = this.props
    this.setState({ type: current.survey_type })

    current.participants_list
      .map((account) => SearchParticipant({ model_name: 'Account', ...account, id: account.account_id }))
      .forEach(compose(dispatch, add))

    if (current.available_to_all) {
      dispatch(toggleAll())
    }

    initialize({
      name: current.name,
      type_survey: current.survey_type,
      ends_at: current.ends_at && moment(current.ends_at),
      description: current.note,
      anonymously: current.anonymous ? ['anonymously'] : [],
      background: current.background,
      questions: current.questions.map(question => ({
        id: question.id,
        ban_own_answer: question.ban_own_answer ? ['ban_own_answer'] : [],
        answer_group: sortBy(question.offered_variants, 'position').map(answer => ({
          id: answer.id,
          answer: answer.wording,
        })),
        description: question.wording,
        type_question: question.question_type,
      })),
    })

    this.setState({
      fetching: false,
      color: current.background,
    })
  }

  state = {
    edit: false,
    open: true,
    type: 'simple',
    displayColorPicker: false,
    color: '#20c58f',
    fetching: false, // true
  }

  SortableItem = SortableElement(props => <Question type={this.state.type} {...props} />)

  SortableList = SortableContainer(({ items }) => {
    const all = items.getAll()
    const total = items.length

    return (
      <Row className={cn('list')}>
        {items.map((item, index) => {
          const value = items.get(index)

          return (
            <Col key={index} xs={11} xsOffset={1}>
              <this.SortableItem
                open={true}
                key={value.id}
                value={value}
                index={index}
                field={item}
                total={total}
                onRemove={() => items.remove(index) }
              />
            </Col>
          )
        })}
      </Row>
    )
  })

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = color => {
    this.setState({ color: color.hex })
    this.props.dispatch(change('SurveyForm', 'background', color.hex))
  }

  onSubmit = async () => {
    const { dispatch, searchParticipants } = this.props
    const { id } = this.state

    if (!searchParticipants.all && searchParticipants.participants.length === 0) {
      return Promise.resolve()
    }

    this.setState({ fetching: true })
    const survey_status = await dispatch(id ? surveysActions.saveSurvey(id) : surveysActions.createSurvey())

    if (survey_status === 200){
      toastr.success(`Опрос успешно ${id ? 'обновлён' : 'создан'}.`)
      dispatch(push('/surveys'))
      this.setState({ fetching: false })
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  componentDidUpdate(prevProps){
    let error_elem = ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0] || ReactDOM.findDOMNode(this).getElementsByClassName('participant-survey__error')[0]
    if (!prevProps.submitFailed && this.props.submitFailed){
      scrollToComponent(error_elem, { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  checkError(){
    let error_elem = ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0] || ReactDOM.findDOMNode(this).getElementsByClassName('participant-survey__error')[0]
    if (error_elem){
      scrollToComponent(error_elem, { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  onTypeChange = (_, selected) => this.setState({ type: selected.value })

  onReset = () => window.history.back()

  renderQuestions = ({ fields }) => {
    return (
      <div>
        <Col xs={12}>
          <this.SortableList
            items={fields}
            helperClass={'new-survey-collapse__sortable-list'}
            lockAxis={'y'}
            onSortEnd={({ oldIndex, newIndex }) => fields.move(oldIndex, newIndex)}
            useDragHandle
          />
        </Col>

        <Col xs={11} xsOffset={1}>
          <div
            onClick={() => fields.push({ id: uuid() })}
            className={cn('btn-add-question').mix('btn btn-outline')}
          >
            ДОБАВИТЬ ВОПРОС
          </div>
        </Col>
      </div>
    )
  }

  render() {
    const { open } = this.state
    const { current, handleSubmit, dispatch, loaders, match } = this.props

    const color = {
      background: `${this.state.color}`,
    }

    if (this.state.fetching || (match.params.id && loaders.survey)) {
      return <Loader />
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <div className={cn} id="information">
              <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
                <h2 className={cn('head-h2')}>Общая информация</h2>

                {open ? (
                  <Arrow className={cn('open-icon')} />
                ) : (
                  <Arrow className={cn('close-icon')} />
                )}
              </div>

              <Collapse in={this.state.open}>
                <div>
                  <div className={cn('body')}>
                    <Row>
                      <Col xs={7}>
                        <Row>
                          <Col xs={12}>
                            <p className={'p3 p4_theme_light_third indent_15'}>* — поля обязательны для заполнения</p>
                            <div className={cn('required')}>
                              <Field
                                component={BootstrapInput}
                                validate={[required]}
                                name="name"
                                type="text"
                                label="Название"
                              />
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className={cn('required')}>
                              <Field
                                name="type_survey"
                                label="Тип опроса"
                                validate={[required]}
                                component={SelectInput}
                                placeholder="Не выбрана"
                                noResultsText="Нет категорий"
                                onChange={this.onTypeChange}
                                options={optionsTypeSurvey}
                              />
                            </div>
                          </Col>

                          <Col xs={6}>
                            <Field
                              name="ends_at"
                              label="Дата завершения"
                              validate={[dateTimeFormat, lessThanNow]}
                              component={DateTimeField}
                              dateFormat="DD-MM-YYYY"
                              timeFormat={true}
                            />
                            <Calendar className={cn('calendar-icon')} />
                          </Col>

                          <Col xs={12}>
                            <Field
                              component={CKeditor}
                              name="description"
                              type="text"
                              label="Описание"
                            />
                            <Clearfix />

                            <div className={cn('b-upload-file')}>
                              <Clip className={cn('clip-icon')} />
                              <Field
                                name="document"
                                component={ReduxFormDropzone}
                                style={{}}
                                removable
                                cleanField={() => dispatch(change('SurveyForm', 'document', ''))}
                                label="Добавить правила прохождения опроса"
                                className={cn('dropzone')
                                  .mix('cur')
                                  .toString()}
                                icon={false}
                              />
                            </div>

                            <CheckboxGroup options={CheckboxLabel} name="anonymously" />

                            <div className={cn('design')}>
                              <h4>Оформление опроса</h4>
                              <div className={cn('design-body')}>
                                <div className={cn('b-upload-file')}>
                                  <Clip className={cn('clip-icon')} />
                                  <Field
                                    name="symbol"
                                    component={ReduxFormDropzone}
                                    style={{}}
                                    removable
                                    cleanField={() => dispatch(change('SurveyForm', 'symbol', ''))}
                                    label="Загрузить эмблему"
                                    className={cn('dropzone')
                                      .mix('cur')
                                      .toString()}
                                    icon={false}
                                  />
                                </div>
                              </div>
                              <p className={cn('control-text').mix('p2 p2_theme_light_second')}>
                                Размер файла не больше 1 МБ, формат изображения — JPG, PNG или GIF.
                              </p>
                            </div>
                          </Col>

                          <Col xs={6}>
                            <label className={cn('label')}>Цвет фона</label>
                            <div className={cn('swatch')} onClick={this.handleClick}>
                              <div className={cn('color-select')} style={color} />
                              {this.state.color}
                            </div>
                            {this.state.displayColorPicker ? (
                              <div className={cn('popover')}>
                                <div className={cn('cover')} onClick={this.handleClose} />
                                <TwitterPicker
                                  color={this.state.color}
                                  onChange={this.handleChange}
                                  colors={colors}
                                />
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={5} className={'new-survey-collapse__participants'}>
                        <ParticipantSurvey />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Collapse>
            </div>
          </Col>

          <FieldArray name={'questions'} component={this.renderQuestions} />

          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <div className={cn('actions')}>
              <button type="submit" className={'btn btn-primary btn-margin-right'} onClick={()=> this.checkError()}>
                {this.state.fetching ? 'Подождите...' : 'Сохранить'}
              </button>
              <div onClick={this.onReset} className={'btn btn-outline'}>
                Отменить
              </div>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default connector(SurveyForm)
