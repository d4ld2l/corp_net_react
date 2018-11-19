import React, { PureComponent } from 'react'
import { change, Field, reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import ReactDOM from 'react-dom'
import moment from 'moment/moment'

import { dateTimeFormat, dateTimeFormatLength, positive, length, required } from '../../../../lib/validation'
import * as bidsActions from '../../../../redux/actions/bidsActions'
import * as dictionariesActions from '../../../../redux/actions/dictionariesActions'
import * as legalUnitsActions from '../../../../redux/actions/legalUnitsActions'
import { getAccount } from 'redux-folder/actions/employeesActions'

import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeField from 'components-folder/Form/DateTimeCalendarIconFIeld'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import { Arrow, Calendar } from 'components-folder/Icon'
import scrollToComponent from 'components-folder/ScrollToComponent'
import Participants from './Participants/index'
import {get, isEmpty} from 'lodash'
import SearchParticipant from '../../../../presenters/searchParticipant'
import { compose } from 'ramda'
import { add, toggleAll } from '../../../../redux/actions/searchParticipants'
import { getStbParticipants } from 'redux-folder/actions/bidsActions'
import Loader from 'components-folder/Loader'


const cn = require('bem-cn')('new-bid-team-building')
if (process.env.BROWSER) {
  require('./styles.css')
}

moment.locale('ru')

const onlyNumberNormalize = value => {
  if (!value) return value
  return value.replace(/[^\d]/g, '')
}

const salaryNormalize = value => {
  const result = onlyNumberNormalize(value)
  return result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

export default class TeamBuilding extends PureComponent {

  componentDidMount() {
    const { dispatch, initialize, bid } = this.props
    Promise.all([
      dispatch(dictionariesActions.getDictionaryLegalUnits()),
      dispatch(dictionariesActions.getDictionaryProjects()),
      dispatch(bidsActions.getAssistants('finance_assistant')),
      dispatch(dictionariesActions.getFilteredDictionaryAccountsOnlyWithLegalUnit({only_with_legal_unit: true,})),
      dispatch(bidsActions.getStbParticipants(bid.id)),
    ]).then(() => {
      const { dictionaries, stb_participants } = this.props

      const bidChargeCode = get(bid, 'team_building_information.project.charge_code', '')
      const chargeCode = dictionaries.projects
        .find(it => it.charge_code === bidChargeCode)
      const project = chargeCode
        ? {
          label: chargeCode.charge_code,
          value: chargeCode.id,
        }
        : {}

      stb_participants.data.map(account =>
          SearchParticipant({
            model_name: 'Account',
            account_id: account.id,
            id: account.account.id,
            __name: account.account.full_name,
            __logo: account.account.photo.url,
            __position: account.account.position_name,
          })
        )
        .forEach(compose(dispatch, add))

      initialize({
        legal_unit_ids: bid.team_building_information.team_building_information_legal_units,
        legal_unit_id: bid.legal_unit.id,
        team_building_information_id: bid.team_building_information.id,
        manager: { value: bid.creator.id, label: bid.creator.full_name },
        project,
        manager_position: bid.creator_position,
        creator_comment: bid.creator_comment,
        service_id: bid.service.id,
        service_name: bid.service.name,
        matching_assistant: { value: bid.assistant.id, label: bid.assistant.full_name },
        additional_info: bid.team_building_information.additional_info,
        approx_cost: bid.team_building_information.approx_cost,
        event_date: moment(bid.team_building_information.event_date),
        city: bid.team_building_information.city,
        event_format: bid.team_building_information.event_format,
        number_of_participants: bid.team_building_information.number_of_participants,
        legal_units: bid.team_building_information.team_building_information_legal_units.map(it => ({
          label: it.legal_unit.name,
          value: it.legal_unit.id,
          tbl_legal_unit_id: it.id,
        }))
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

  checkError() {
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  onManagerChange = async ({ value: accountId }) => {
    const { dispatch } = this.props
    const user = await dispatch(getAccount(accountId))
    const position = get(user,
      'all_legal_unit_employees.find(it => it.default).position.position.name_ru', get(user,
        'all_legal_unit_employees[0].position.position.name_ru', ''))
    const legal_unit_id = get(user,
      'all_legal_unit_employees.find(it => it.default).legal_unit.id', get(user,
        'all_legal_unit_employees[0].legal_unit.id'))
    dispatch(change('EditBid', 'manager_position', position))
    dispatch(change('EditBid', 'legal_unit_id', legal_unit_id))
  }

  render() {
    const { dictionaries, handleSubmit, assistants } = this.props
    const valid = current => current.isAfter(moment().subtract(1, 'day'))

    const legalUnitsOptions = dictionaries.legalUnits.map(it => ({
      label: it.name,
      value: it.id,
    }))

    const employeesForSelect = dictionaries.filteredDictionaryAccountsOnlyWithLegalUnit.map(
      it => ({
        label: it.full_name,
        value: it.id,
      })
    )

    const assistantsForSelect = !isEmpty(assistants) && assistants.map(it => ({
      label: it.full_name,
      value: it.id,
    }))

    return (
      <form className={cn} onSubmit={handleSubmit(this.onSubmit)}>
        <div className={cn('wrapper')}>
          <div className={cn('form')}>
            <div className="required">
              <Field
                name="manager"
                label="Фио"
                component={SelectInput}
                searchable
                onChange={this.onManagerChange}
                validate={[length, required]}
                placeholder="Не выбрана"
                noResultsText="Нет значений"
                options={employeesForSelect}
              />
            </div>
            <div className="required">
              <Field
                component={BootstrapInput}
                name="manager_position"
                type="text"
                validate={[required]}
                label="Должность"
              />
            </div>
            <div className="required">
              <Field
                name="legal_units"
                label="Юридическое лицо"
                component={SelectInput}
                validate={[length, required]}
                placeholder="Не выбрана"
                multi
                noResultsText="Нет значений"
                options={legalUnitsOptions}
              />
            </div>
            <Field
              name="project"
              label="Код проекта"
              searchable
              validate={[length]}
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
            <div className="required">
              <Field
                name="matching_assistant"
                label="Ассистент-исполнитель"
                searchable
                validate={[length, required]}
                component={SelectInput}
                placeholder="Не выбрана"
                noResultsText="Нет значений"
                options={assistantsForSelect}
              />
            </div>
            <div className={cn('calendar').mix('required')}>
              <Field
                label="Дата проведения"
                name={`event_date`}
                component={DateTimeField}
                validate={[dateTimeFormat, dateTimeFormatLength, required]}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                isValidDate={valid}
                strictParsing={true}
              />
            </div>
            <Field
              component={BootstrapInput}
              name="city"
              type="text"
              label="Город"
            />
            <Field
              component={BootstrapInput}
              name="event_format"
              type="text"
              label="Формат проведения"
            />
            <div className={cn('wrapper-information')}>
              <div className={cn('small-field').mix('required')}>
                <Field
                  component={BootstrapInput}
                  name="number_of_participants"
                  label="количество учасников"
                  validate={[required]}
                  type={'text'}
                  normalize={salaryNormalize}
                />
              </div>
              <div className={cn('small-field').mix('required')}>
                <Field
                  component={BootstrapInput}
                  name="approx_cost"
                  label="примерная сумма"
                  validate={[required]}
                  type={'text'}
                  normalize={salaryNormalize}
                />
              </div>
              <p className={'p1_theme_first'}>руб.</p>
            </div>
            <div>
              <Field
                component={BootstrapTextarea}
                name="additional_info"
                type="text"
                label="Дополнительная информация"
              />
            </div>
          </div>
          <Participants {...this.props} />
        </div>
        <div className={cn('button-wrap')}>
          <button
            type="submit"
            className={cn('actions-send').mix('btn btn-primary btn_padding13-16 mr-20')}
            onClick={() => this.checkError()}
          >
            Отправить заявку
          </button>
          <div onClick={this.onReset} className={cn('actions-cancel').mix('btn btn-outline')}>
            Отменить
          </div>
        </div>
      </form>
    )
  }
}
