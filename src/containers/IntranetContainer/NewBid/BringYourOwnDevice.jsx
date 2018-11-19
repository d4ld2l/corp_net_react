import React, { PureComponent } from 'react'
import {amountValidation, onlyNumbers, required} from "../../../lib/validation";
import SelectInput from "components-folder/Form/SelectInput";
import MultiFile from "components-folder/Form/MultiFile";
import {change, Field, FieldArray} from "redux-form";
import { Row, Col, ControlLabel, FormGroup } from 'react-bootstrap'
import {toastr} from "react-redux-toastr";
import {push} from "react-router-redux";
import * as bidsActions from "../../../redux/actions/bidsActions";
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";
import * as employeesActions from "../../../redux/actions/employeesActions";
import * as projectsActions from "../../../redux/actions/projectsActions";
import * as customersActions from "../../../redux/actions/customersActions";
import * as legalUnitsActions from "../../../redux/actions/legalUnitsActions";
import { getAccount } from 'redux-folder/actions/employeesActions'
import isEmpty from "lodash/isEmpty";
import Loader from 'components-folder/Loader';
import Input from 'components-folder/Input/'
import BootstrapInput from "components-folder/Form/BootstrapInput";
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";
import CommonAddFile from 'components-folder/Form/CommonAddFile'

const cn = require('bem-cn')('intranet-new-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

const optionsByodType = [
  {
    value: 'buy_out',
    label: 'Выкуп ноутбука из helpDesk',
  },
  {
    value: 'new_device',
    label: 'Покупка нового ноутбука',
  },
]

export default class BringYourOwnDevice extends PureComponent {

  componentDidMount() {
    const { dispatch, initialize, user } = this.props
    Promise.all([
      dispatch(dictionariesActions.getDictionaryProjects()),
      dispatch(dictionariesActions.getDictionaryAccounts()),
      dispatch(bidsActions.getAssistants('byod_assistant')),
      dispatch(dictionariesActions.getFilteredDictionaryAccountsOnlyWithLegalUnit({only_with_legal_unit: true}))
    ]).then(() => {
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

      defaults.compensation_amount = '50000'
      defaults.byod_type = 'buy_out'

      initialize(defaults)
      this.setState({ legalUnitsOptions, employeesForSelect, assistantsForSelect })
    })
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

  checkError() {
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    }
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

  state = {
    legal_unit: null,
    legal_units: [],
    participants: [],
    employeesForSelect: [],
    legalUnitsOptions: [],
    assistantsForSelect: [],
  }

  render() {
    const {
      handleSubmit,
      dictionaries,
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
            <Row>
              <Col lg={7} md={7} sm={12} xs={12}>
                <p className={cn('warning').mix('p4 p4_theme_light_third')}>* — поля обязательны для заполнения</p>
                <div className={cn('required')}>
                  <Field
                    name="byod_type"
                    label="Тип заявки"
                    searchable
                    validate={[required]}
                    component={SelectInput}
                    options={optionsByodType}
                  />
                </div>
                <div className={cn('required')}>
                  <Field
                    name="manager"
                    label="ФИО"
                    component={SelectInput}
                    searchable
                    validate={[required]}
                    onChange={this.onManagerChange}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    options={employeesForSelect}
                  />
                </div>

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
                  name="manager_position"
                  validate={[required]}
                  component={BootstrapInput}
                  type="text"
                  showLabel
                  label="Должность"
                  toIndent
                  required
                />

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
              </Col>

              <Col lg={7} md={7} sm={12} xs={12}>
                <div className={cn('required')}>
                  <Field
                    name="matching_user"
                    label="Согласующий"
                    searchable
                    validate={[required]}
                    component={SelectInput}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    options={dictionaries.filteredAccounts.map(it => ({
                      label: it.full_name,
                      value: it.id,
                    }))}
                  />
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>
                    Согласовывать может директор практики или руководитель ЦФО
                  </p>
                </div>
                <div className={cn('required')}>
                  <Field
                    name="matching_assistant"
                    label="Ассистент-Исполнитель"
                    searchable
                    validate={[required]}
                    component={SelectInput}
                    placeholder="Не выбрана"
                    noResultsText="Нет значений"
                    options={assistantsForSelect}
                  />
                </div>

                <Field
                  validate={[required]}
                  name="device_model"
                  component={Input}
                  type="text"
                  showLabel
                  labelText="Модель ноутбука"
                  showWink
                  winkText={'Например: hp probook 430 g4 y7z52ea'}
                  toIndent
                  required
                />

                <Field
                  name="device_inventory_number"
                  component={Input}
                  type="text"
                  showLabel
                  labelText="Инвентаризационный номер"
                  toIndent
                />

                <Row>
                  <Col lg={5} md={5} sm={11} xs={11}>
                    <Field
                      validate={[required, onlyNumbers, amountValidation]}
                      name="compensation_amount"
                      component={BootstrapInput}
                      type="text"
                      showLabel
                      label="Сумма компенсации"
                      toIndent
                      required
                    />
                  </Col>
                  <div className={cn('rub').mix('p1 p1_theme_light_first')}>руб.</div>
                </Row>

                <Row className={cn('attachment').toString()}>
                  <Col xs={8}>
                    <FieldArray
                      name="attachment"
                      component={MultiFile}
                      multiple
                      label={'Прикрепить документы'}
                    />
                    <p className={cn('example-input').mix('p2 p2_theme_light_second')}>Прикрепите фискальный чек и накладную с описанием товара</p>
                  </Col>
                </Row>


                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel className={('p3 p3_theme_light_second')}>Дополнительная информация</ControlLabel>
                  <Field component="textarea" name="creator_comment" className="form-control"/>
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
