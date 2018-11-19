import React, { PureComponent } from 'react'
import {amountValidation, dateTimeFormat, greaterThan30Days, onlyNumbers, required} from "../../../lib/validation";
import {change, Field, FieldArray} from 'redux-form';
import { Row, Col, ControlLabel, FormGroup } from 'react-bootstrap';
import { Calendar, Trash, Plus } from 'components-folder/Icon';
import SelectInput from 'components-folder/Form/SelectInput';
import Loader from 'components-folder/Loader';
import {toastr} from "react-redux-toastr";
import MultiFile from "components-folder/Form/MultiFile";
import moment from 'moment'
import * as bidsActions from "../../../redux/actions/bidsActions";
import BootstrapInput from "components-folder/Form/BootstrapInput";
import BootstrapTextarea from "components-folder/Form/BootstrapTextarea";
import DateTimeField from "components-folder/Form/DateTimeFIeld";
import * as customersActions from "../../../redux/actions/customersActions";
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";
import { getAccount } from 'redux-folder/actions/employeesActions'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

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

  async componentDidMount() {
    const { bid, initialize, dispatch } = this.props
    Promise.all([
      dispatch(customersActions.getCustomers()),
      dispatch(dictionariesActions.getDictionaryProjects()),
      dispatch(dictionariesActions.getDictionaryAccounts()),
      dispatch(bidsActions.getAssistants('finance_assistant')),
      dispatch(dictionariesActions.getFilteredDictionaryAccountsOnlyWithLegalUnit({only_with_legal_unit: true}))
    ]).then(() => {
      const { dictionaries, assistants } = this.props
      let legal_unit, manager, project, participants, other_participants, customer, matching_user, participantInfo

      manager = {
        label: bid.manager.full_name,
        value: bid.manager.id,
      }

      legal_unit = {
        label: bid.legal_unit.name,
        value: bid.legal_unit.id,
      }
      dispatch(dictionariesActions.getFilteredDictionaryAccounts({legal_unit_id: legal_unit.value}))

      const manager_position =  bid.manager.position_name
      const bidChargeCode = get(bid, 'representation_allowance.information_about_participant.project.charge_code', '')
      const chargeCode = dictionaries.projects
        .filter(({ charge_code }) => charge_code && charge_code.trim() !== '').find( it => it.charge_code === bidChargeCode)
      project = chargeCode ? {
        label: chargeCode.charge_code,
        value: chargeCode.id,
      } : {}

      if (bid.matching_user) {
        matching_user = {
          label: bid.matching_user.full_name,
          value: bid.matching_user.id,
        }
      }

      participantInfo = get(bid, 'representation_allowance.information_about_participant')
      participants = []
      if (participantInfo && participantInfo.non_responsible_participants) {
        participants = participants.concat(
          participantInfo.non_responsible_participants.map(it => ({
            user_id: {
              label: it.account.full_name,
              value: it.account.id,
            },
            position: it.account.position_name,
          }))
        )
      }

      if (participantInfo && participantInfo.not_responsible_counterparties) {
        other_participants = [].concat(
          participantInfo.responsible_counterparty,
          participantInfo.not_responsible_counterparties.map(it => ({
            name: it.name,
            position: it.position,
          }))
        )
      }

      if (participantInfo && participantInfo.customer) {
        customer = this.getCustomers().find(
          it => it.value === participantInfo.customer.id
        )
      }


      const meetingInfo = get(bid, 'representation_allowance.meeting_information', {})
      initialize({
        legal_unit: { value: bid.legal_unit.id, label: bid.legal_unit.name },
        manager: { value: bid.creator.id, label: bid.creator.full_name },
        project,
        participants,
        other_participants,
        customer,
        matching_user,
        manager_position: bid.creator_position,
        service_id: bid.service.id,
        service_name: bid.service.name,
        matching_assistant: { value: bid.assistant.id, label: bid.assistant.full_name },
        date_time_meeting: meetingInfo.starts_at && moment(meetingInfo.starts_at),
        address_meeting: meetingInfo.address,
        name_meeting: meetingInfo.place,
        goal_meeting: meetingInfo.aim,
        results_meeting: meetingInfo.result,
        amount: meetingInfo.amount,
        comment_meeting: bid.creator_comment,
        attachment: get(bid, 'representation_allowance.meeting_information.document', []),
        meeting_information_id: get(bid, 'representation_allowance.meeting_information.id'),
        representation_allowance_id: get(bid, 'representation_allowance.id'),
      })

      Promise.resolve(
        dispatch(getAccount(manager.value))
      ).then((user) => {
        const legalUnitsOptions = user.all_legal_unit_employees.map(it => ({
          label: it.legal_unit.name,
          value: it.legal_unit.id,
          position: it.position.position.name_ru,
        }))

        const employeesForSelect = dictionaries.filteredDictionaryAccountsOnlyWithLegalUnit.map(it => ({
          label: it.full_name,
          value: it.id,
        }))

        const assistantsForSelect = assistants.map(it => ({
          label: it.full_name,
          value: it.id,
        }))

        this.setState({ legalUnitsOptions, employeesForSelect, assistantsForSelect })
      })
    })
  }

  getCustomers = () => {
    const { customers } = this.props

    return (
      this.customers ||
      (this.customers = customers.map(it => ({
        label: it.name,
        value: it.id,
      })))
    )
  }

  onManagerChange = async ({ value: accountId }) => {
    const { dispatch, legalUnit: currentLegalUnit } = this.props
    const user = await dispatch(getAccount(accountId))
    const legalUnitsOptions = user.all_legal_unit_employees.map(it => ({
      label: it.legal_unit.name,
      value: it.legal_unit.id,
      position: it.position.position.name_ru,
    }))
    this.setState({legalUnitsOptions})
    const legalUnit = legalUnitsOptions[0] || null
    if (currentLegalUnit.value !== (legalUnit && legalUnit.value)) {
      dispatch(change('EditBid', 'legal_unit', legalUnit))
      this.onLegalUnitChange(legalUnit)
    }
  }

  onLegalUnitChange = legal_unit => {
    const { dispatch } = this.props
    dispatch(change('EditBid', 'manager_position', (legal_unit && legal_unit.position) || ''))
    dispatch(change('EditBid', 'matching_user', {}))
    dispatch(change('EditBid', 'participants', [{}]))
    if (legal_unit) {
      dispatch(dictionariesActions.getFilteredDictionaryAccounts({legal_unit_id: legal_unit.value}))
    }
  }

  selectParticipant = async (participant, field, index) => {
    const { dispatch, legalUnit } = this.props
    const user = await dispatch(getAccount(participant.value))
    const position = user.all_legal_unit_employees.find( it => it.legal_unit_id === legalUnit.value )
      .position.position.name_ru
    dispatch(change('EditBid', `participants[${index}].position`, position))
  }

  // checkError(){
  //   if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]){
  //     scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
  //     toastr.error('Проверьте правильность заполненых полей.')
  //   }
  // }

  onSubmit = async () => {
    const { updateBid, bid, push } = this.props
    const data = await updateBid(bid.id)

    if (!data.errors && !data.error) {
      push(`/bids/${bid.id}`)
      toastr.success('Заявка успешно обновлена.')
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  onReset = () => {
    window.history.back()
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

    if (isEmpty(dictionaries.accounts)){
      return(
        <div><Loader/></div>
      )
    }

    return(
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
                  <div className={cn('rub')}>руб.</div>
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
                  <ControlLabel>Дополнительная информация </ControlLabel>
                  <Field
                    component="textarea"
                    name="comment_meeting"
                    className="form-control"
                  />
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
