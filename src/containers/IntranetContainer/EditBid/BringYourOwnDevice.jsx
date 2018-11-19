import React, { PureComponent } from 'react'
import {amountValidation, onlyNumbers, required} from "../../../lib/validation";
import SelectInput from "components-folder/Form/SelectInput";
import MultiFile from "components-folder/Form/MultiFile";
import {change, Field, FieldArray} from "redux-form";
import { Row, Col, ControlLabel, FormGroup } from 'react-bootstrap'
import {toastr} from "react-redux-toastr";
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";
import isEmpty from "lodash/isEmpty";
import get from 'lodash/get'
import Loader from 'components-folder/Loader';
import BootstrapInput from "components-folder/Form/BootstrapInput";
import { getAccount } from 'redux-folder/actions/employeesActions'
import * as customersActions from "../../../redux/actions/customersActions";
import * as bidsActions from "../../../redux/actions/bidsActions";
import * as dictionariesActions from "../../../redux/actions/dictionariesActions";

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
      dispatch(bidsActions.getAssistants('byod_assistant')),
      dispatch(dictionariesActions.getFilteredDictionaryAccountsOnlyWithLegalUnit({only_with_legal_unit: true}))
    ]).then(() => {
      const { dictionaries, assistants } = this.props
      let legal_unit, manager, project, matching_user

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
      const bidChargeCode = get(bid, 'byod_information.project.charge_code', '')
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

      initialize({
        legal_unit: { value: bid.legal_unit.id, label: bid.legal_unit.name },
        manager: { value: bid.creator.id, label: bid.creator.full_name },
        project,
        matching_user,
        manager_position: bid.creator_position,
        creator_comment: bid.creator_comment,
        service_id: bid.service.id,
        service_name: bid.service.name,
        matching_assistant: { value: bid.assistant.id, label: bid.assistant.full_name },
        byod_type: bid.byod_information.byod_type,
        device_model: bid.byod_information.device_model,
        device_inventory_number: bid.byod_information.device_inventory_number,
        compensation_amount: bid.byod_information.compensation_amount,
        attachment: bid.byod_information.documents,
        byod_information_id: bid.byod_information.id,
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

  onReset = () => {
    window.history.back()
  }

  onSubmit = async () => {
    const { updateBid, push, bid } = this.props
    const data = await updateBid(bid.id)

    if (!data.errors) {
      push(`/bids/${bid.id}`)
      toastr.success('Заявка успешно обновлена.')
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  checkError(){
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  onLegalUnitChange = legal_unit => {
    const { dispatch } = this.props
    dispatch(change('EditBid', 'manager_position', (legal_unit && legal_unit.position) || ''))
    dispatch(change('EditBid', 'matching_user', {}))
    if (legal_unit) {
      dispatch(dictionariesActions.getFilteredDictionaryAccounts({legal_unit_id: legal_unit.value}))
    }
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

    if (isEmpty(dictionaries.accounts)){
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

                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    name="manager_position"
                    type="text"
                    validate={[required]}
                    label="Должность"
                  />
                </div>

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

                <div className={cn('required')}>
                  <Field
                    component={BootstrapInput}
                    validate={[required]}
                    name="device_model"
                    type="text"
                    label="Модель ноутбука"
                  />
                  <p className={cn('example-input').mix('p2 p2_theme_light_second')}>Например: hp probook 430 g4 y7z52ea</p>
                </div>

                <Field
                  component={BootstrapInput}
                  name="device_inventory_number"
                  type="text"
                  label="Инвентаризационный номер"
                />

                <Row>
                  <Col lg={5} md={5} sm={11} xs={11}>
                    <div className={cn('required')}>
                      <Field
                        component={BootstrapInput}
                        validate={[required, onlyNumbers, amountValidation]}
                        name="compensation_amount"
                        type="text"
                        label="Сумма компенсации"
                      />
                    </div>
                  </Col>
                  <div className={cn('rub')}>руб.</div>
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
                  <ControlLabel>Дополнительная информация </ControlLabel>
                  <Field
                    component="textarea"
                    name="creator_comment"
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>

        <div className={cn('action')}>
          <button type="submit" className={cn('actions-send')} onClick={() => this.checkError()}>
            Сохранить заявку
          </button>
          <div onClick={this.onReset} className={cn('actions-cancel')}>
            Отменить
          </div>
        </div>
      </form>
    )
  }
}
