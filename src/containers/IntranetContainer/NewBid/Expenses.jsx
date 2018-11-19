import React, { PureComponent } from 'react'
import {amountValidation, dateTimeFormat, greaterThan30Days, onlyNumbers, required} from "../../../lib/validation";
import MultiFile from "components-folder/Form/MultiFile";
import {change, Field, FieldArray} from 'redux-form';
import { Row, Col, ControlLabel, FormGroup } from 'react-bootstrap';
import { Calendar, Trash, Append, Plus } from 'components-folder/Icon';
import SelectInput from 'components-folder/Form/SelectInput';
import Loader from 'components-folder/Loader';
import {toastr} from "react-redux-toastr";
import {push} from "react-router-redux";
import * as bidsActions from "../../../redux/actions/bidsActions";
import BootstrapInput from "components-folder/Form/BootstrapInput";
import BootstrapTextarea from "components-folder/Form/BootstrapTextarea";
import DateTimeField from "components-folder/Form/DateTimeFIeld";
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";
import * as customersActions from "../../../redux/actions/customersActions";
import { getAccount } from 'redux-folder/actions/employeesActions'
import isEmpty from 'lodash/isEmpty'

const cn = require('bem-cn')('intranet-new-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

export default class Expenses extends PureComponent {
  state = {
    legal_unit: null,
    legal_units: [],
    participants: [],
    employeesForSelect: [],
    legalUnitsOptions: [],
    assistantsForSelect: [],
  }

  componentDidMount() {
    const { dispatch, initialize, user } = this.props
    Promise.all([
      dispatch(customersActions.getCustomers()),
      dispatch(dictionariesActions.getDictionaryProjects()),
      dispatch(dictionariesActions.getDictionaryAccounts()),
      dispatch(bidsActions.getAssistants('finance_assistant')),])
      dispatch(dictionariesActions.getFilteredDictionaryAccountsOnlyWithLegalUnit({only_with_legal_unit: true}))
      .then(() => {
      const { assistants, dictionaries } = this.props
      const defaults = {}
      const legalUnitsOptions = user.all_legal_unit_employees.map(it => ({
        label: it.legal_unit.name,
        value: it.legal_unit.id,
        position: it.position.position.name_ru,
      }))
      const legalUnit = legalUnitsOptions[0] || null
      dispatch(dictionariesActions.getFilteredDictionaryAccounts({legal_unit_id: legalUnit.value}))
      defaults.manager = {
        label: user.full_name,
        value: user.id,
      }
      if (legalUnit) {
        defaults.legal_unit = legalUnit
        defaults.manager_position = legalUnit.position
      }

      const employeesForSelect = dictionaries.filteredDictionaryAccountsOnlyWithLegalUnit.map(it => ({
        label: it.full_name,
        value: it.id,
      }))

      const assistantsForSelect = assistants.map(it => ({
        label: it.full_name,
        value: it.id,
      }))

      initialize(defaults)
      this.setState({ legalUnitsOptions, employeesForSelect, assistantsForSelect })
    })
  }

  onManagerChange = async ({ value: accountId }) => {
    const { dispatch } = this.props
    const user = await dispatch(getAccount(accountId))
    const legalUnitsOptions = user.all_legal_unit_employees.map(it => ({
      label: it.legal_unit.name,
      value: it.legal_unit.id,
      position: it.position.position.name_ru,
    }))
    this.setState({legalUnitsOptions})
    const legalUnit = legalUnitsOptions[0] || null
    dispatch(change('NewBid', 'legal_unit', legalUnit))
    this.onLegalUnitChange(legalUnit)
  }

  onLegalUnitChange = legal_unit => {
    const { dispatch } = this.props
    dispatch(change('NewBid', 'manager_position', (legal_unit && legal_unit.position) || ''))
    dispatch(change('NewBid', 'matching_user', {}))
    dispatch(change('NewBid', 'participants', [{}]))
    if (legal_unit) {
      dispatch(dictionariesActions.getFilteredDictionaryAccounts({legal_unit_id: legal_unit.value}))
    }
  }

  onReset = () => {
    window.history.back()
  }

  onSubmit = async () => {
    const { dispatch, services: { current: service }, match: { params: { id } } } = this.props
    const bid = await dispatch(bidsActions.createBid(id, service.name))
    if (!bid.errors) {
      dispatch(push(`/bids/${bid.id}`))
      toastr.success('Заявка успешно создана.')
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  selectParticipant = async (participant, field, index) => {
    const { dispatch, legalUnit } = this.props
    const user = await dispatch(getAccount(participant.value))
    const position = user.all_legal_unit_employees.find( it => it.legal_unit_id === legalUnit.value )
      .position.position.name_ru
    dispatch(change('NewBid', `participants[${index}].position`, position))
  }

  checkError() {
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  render() {
    const {
      handleSubmit,
      dictionaries,
      customers,
    } = this.props

    const {
      employeesForSelect,
      legalUnitsOptions,
      assistantsForSelect,
    } = this.state

    if (isEmpty(legalUnitsOptions)){
      return(
        <div><Loader/></div>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className={cn('container')}>
          <div className={cn('main')}>
            <h2 className={cn('main-header')}>Участники</h2>
            <Row>
              <Col lg={7} md={7} sm={12} xs={12}>
                <p className={cn('warning').mix('p4 p4_theme_light_third')}>* — поля обязательны для заполнения</p>
                <Field
                  name="manager"
                  label="Ответственный"
                  component={SelectInput}
                  searchable
                  onChange={this.onManagerChange}
                  placeholder="Не выбрана"
                  noResultsText="Нет значений"
                  options={employeesForSelect}
                />

                <div className={cn('required')}>
                  <Field
                    name="legal_unit"
                    label="Юридическое лицо"
                    component={SelectInput}
                    validate={[required]}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    onChange={this.onLegalUnitChange}
                    options={legalUnitsOptions}
                  />
                </div>

                <Field
                  component={BootstrapInput}
                  name="manager_position"
                  type="text"
                  label="Должность"
                />

                <div className={cn('wrapper-project')}>
                  <div className={cn('required')}>
                    <Field
                      name="project"
                      label="Код проекта"
                      searchable
                      validate={[required]}
                      component={SelectInput}
                      placeholder="Не выбрана"
                      noResultsText="Нет значений"
                      options={dictionaries.projects
                        .filter(({ charge_code }) => charge_code && charge_code.trim() !== '')
                        .map(it => ({
                          label: it.charge_code,
                          value: it.id,
                        }))}
                    />
                  </div>
                </div>
              </Col>

              <Col lg={7} md={7} sm={12} xs={12}>
                <Field
                  name="matching_user"
                  label="Согласующий"
                  searchable
                  component={SelectInput}
                  placeholder="Не выбрана"
                  noResultsText="Нет значений"
                  options={dictionaries.filteredAccounts.map(it => ({
                    label: it.full_name,
                    value: it.id,
                  }))}
                />
                <div className={cn('required')}>
                  <Field
                    name="matching_assistant"
                    label="Ассистент"
                    searchable
                    validate={[required]}
                    component={SelectInput}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    options={assistantsForSelect}
                  />
                </div>

                <FieldArray
                  name="participants"
                  component={({ fields }) => (
                    <div>
                      {fields.length === 0 ? fields.push({}) : null}

                      {fields.map((field, index) => (
                        <div key={field} className={cn('group')}>
                          <Field
                            key={`name_${index}`}
                            name={`${field}.user_id`}
                            label={'Участник'}
                            searchable
                            component={SelectInput}
                            placeholder="Не выбрана"
                            noResultsText="Нет значений"
                            options={dictionaries.filteredAccounts.map(it => ({
                              label: it.full_name,
                              value: it.id,
                            }))}
                            onChange={participant =>
                              this.selectParticipant(participant, field, index, fields)}
                          />
                          <Field
                            key={`position_${index}`}
                            label={'Должность'}
                            component={BootstrapInput}
                            name={`${field}.position`}
                            type="text"
                          />
                          {index !== fields.length - 1 && (
                            <div className={cn('delete')} onClick={() => fields.remove(index)}>
                              <div className={cn('before-straight-angle')} />
                              <Trash className={cn('delete-icon')} />
                              <div className={cn('after-straight-angle')} />
                            </div>
                          )}
                        </div>
                      ))}

                      <div className={cn('wrapper-add-btn')} onClick={() => fields.push({})}>
                        <div className={cn('before-straight-angle')} />
                        <Plus outline={'filled'} className={cn('add')} />
                        <div className={cn('after-straight-angle')} />
                      </div>
                    </div>
                  )}
                />
              </Col>

              <Col lg={7} md={7} sm={12} xs={12}>
                <h5 className={cn('h5')}>Приглашенные участники</h5>

                <div className={cn('required')}>
                  <Field
                    name="customer"
                    label="Название организации"
                    creatable
                    searchable
                    validate={[required]}
                    component={SelectInput}
                    promptTextCreator={label => `Создать организацию "${label}"`}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    options={customers.map(it => ({
                      label: it.name,
                      value: it.id,
                    }))}
                  />
                </div>

                <FieldArray
                  name="other_participants"
                  component={({ fields }) => (
                    <div>
                      {fields.length === 0 ? fields.push({}) || fields.push({}) : null}

                      {fields.map((field, index) => (
                        <div key={field} className={cn('group')}>
                          <div className={index === 0 ? cn('required') : ''}>
                            <Field
                              label={index === 0 ? 'ФИО Ответственного' : 'Участник'}
                              component={BootstrapInput}
                              validate={index === 0 ? [required] : undefined}
                              name={`${field}.name`}
                            />
                          </div>
                          <Field
                            label={index === 0 ? 'Должность ответственного' : 'Должность'}
                            component={BootstrapInput}
                            name={`${field}.position`}
                            type="text"
                          />
                          {index !== fields.length - 1 && (
                            <div className={cn('delete')} onClick={() => fields.remove(index)}>
                              <div className={cn('before-straight-angle')} />
                              <Trash className={cn('delete-icon')} />
                              <div className={cn('after-straight-angle')} />
                            </div>
                          )}
                        </div>
                      ))}

                      <div className={cn('wrapper-add-btn')} onClick={() => fields.push({})}>
                        <div className={cn('before-straight-angle')} />
                        <Plus outline={'filled'} className={cn('add')} />
                        <div className={cn('after-straight-angle')} />
                      </div>
                    </div>
                  )}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={cn('container')}>
          <div className={cn('main')}>
            <h2 className={cn('main-header')}>Детали встречи</h2>
            <Row>
              <Col lg={7} md={7} sm={12} xs={12}>
                <Row>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className={cn('required')}>
                      <Field
                        name="date_time_meeting"
                        label="Дата и время встречи"
                        validate={[required, dateTimeFormat, greaterThan30Days]}
                        component={DateTimeField}
                        dateFormat="DD-MM-YYYY"
                        timeFormat={true}
                      />
                      <Calendar className={cn('calendar-i')} />
                    </div>
                  </Col>
                </Row>

                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    validate={[required]}
                    name="name_meeting"
                    type="text"
                    label="Место"
                  />
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>Например: ОАО «Ресторан»</p>
                </div>

                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    validate={[required]}
                    name="address_meeting"
                    type="text"
                    label="Адрес"
                  />
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>Например: Москва, Тверская ул., д. 5</p>
                </div>

                <FormGroup controlId="formControlsTextarea">
                  <div className={cn('required')}>
                    <Field
                      component={BootstrapTextarea}
                      validate={[required]}
                      name="goal_meeting"
                      label="Цель встречи"
                    />
                  </div>
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>
                    Например: Обсуждение вопросов исполнения контракта
                  </p>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                  <div className={cn('required')}>
                    <Field
                      component={BootstrapTextarea}
                      validate={[required]}
                      name="results_meeting"
                      label="Результат встречи"
                    />
                  </div>
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>
                    Например: Были обсуждены вопросы исполнения контракта
                  </p>
                </FormGroup>

                <Row>
                  <Col lg={5} md={5} sm={11} xs={11}>
                    <div className={cn('required')}>
                      <Field
                        component={BootstrapInput}
                        validate={[required, onlyNumbers, amountValidation]}
                        name="amount"
                        type="text"
                        label="Сумма компенсации"
                        placeholder="0,00"
                      />
                    </div>
                  </Col>
                  <div className={cn('rub').mix('p1 p1_theme_light_first')}>руб.</div>
                </Row>

                <Row className={cn('attachment').toString()}>
                  <Col xs={8}>
                    <FieldArray
                      name="attachment"
                      label={'Прикрепить документы'}
                      component={MultiFile}
                      multiple
                    />
                  </Col>
                </Row>

                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel className={('p3 p3_theme_light')}>Дополнительная информация</ControlLabel>
                  <Field component="textarea" name="creator_comment" className="form-control" />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
        <div className={cn('action')}>
          <button type="submit" className={cn('actions-send')} onClick={() => this.checkError()}>
            Отправить заявку
          </button>
          <div onClick={this.onReset} className={cn('actions-cancel')}>
            Отменить
          </div>
        </div>
      </form>
    )
  }
}
