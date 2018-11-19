import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { compose, pick } from 'ramda'

import { GROUP_DATA } from './data'

import { Row, Col } from 'react-bootstrap'
import { change, Field, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import Loader from 'components-folder/Loader'
import { FormGroup } from 'react-bootstrap'

import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'
import { required, dateTimeFormat, greaterThan30Days, onlyNumbers, amountValidation } from '../../../lib/validation'

import { createDistribution, updateDistribution } from '../../../redux/actions/distributionActions'

import EmployeeNewGroup from './EmployeeNewGroup'
import { add, toggleAll } from '../../../redux/actions/searchParticipants'
import { SearchParticipant } from '../../../presenters'
import {toastr} from 'react-redux-toastr'


const cn = require('bem-cn')('distribution')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

// const validate = values => {
//   const errors = {}
//
//   if (!values.name_group) {
//     errors.name_group = 'Обязательное поле'
//   }
//
//   if (!values.description_group) {
//     errors.description_group = 'Обязательное поле'
//   }
//
//   return errors
// }

const connector = compose(
  connect(pick(['searchParticipants', 'user'])),
  reduxForm(),
)
class NewGroup extends PureComponent {
  state = {
    open: false,
  }

  componentDidMount(){
    const { group, initialize, dispatch } = this.props
    if (group) {
      const data = {
        name: group.name,
        description: group.description,
      }

      initialize(data)
      group.account_mailing_lists
        .map(({account}) => SearchParticipant({ model_name: 'Account', ...account }))
        .forEach(compose(dispatch, add))
    }
  }

  onSubmit = async () => {
    const { dispatch, searchParticipants, group, form, closeSidebar } = this.props

    if (!searchParticipants.all && searchParticipants.participants.length === 0) {
      return Promise.resolve()
    }
    if (group) {
      if (form == 'EditDistribution'){
        dispatch(updateDistribution(group.id, group.account_mailing_lists)).then(() => {
            closeSidebar()
            toastr.success('Команда успешно обновлена.')
          }
        )
      } else {
        dispatch(createDistribution()).then(() => {
            closeSidebar()
            toastr.success('Команда успешно создана.')
          }
        )
      }
    } else {
      dispatch(createDistribution()).then(() => {
          closeSidebar()
          toastr.success('Команда успешно создана.')
        }
      )
    }
  }

  render() {
    const { open } = this.state
    const { closeSidebar, showEditGroupCard, handleSubmit, group, form } = this.props
    return (
      <div className={cn('group-card-wrapper').mix(cn('group-card-wrapper_new'))}>
        <div className={cn('group-card-head-wrapper')}>
          <h2 className={('indent_reset')}>{(group && form == 'NewDistribution') ? `Новая команда на основе ${group.name}` : showEditGroupCard ? 'Редактирование команды' : 'Новая команда'}</h2>
          <div className={cn('group-card-func-elements').mix(cn('group-card-func-elements_new'))}>
            <span
              onClick={closeSidebar}
              className={cn('group-card-closed-thin-icon-wrapper').mix('cur')}
              title={'Закрыть карточку команды'}
            >
              <Close className={cn('group-card-closed-thin-icon')} />
            </span>
          </div>
        </div>
        <div className={cn('b-wrapper')}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="required">
              <Field component={BootstrapInput}
                     name="name"
                     type="text"
                     label="Название команды"
                     validate={[required]} />
            </div>
            <div className="required">
              <Field
                component={BootstrapTextarea}
                name="description"
                type="text"
                label="Описание"
                validate={[required]}
              />
              <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Вы можите указать особенность команды</p>
            </div>
            {/*<Field*/}
            {/*name="photo"*/}
            {/*component={ReduxFormDropzoneAvatarCandidate}*/}
            {/*style={{}}*/}
            {/*removable*/}
            {/*multiple={false}*/}
            {/*// cleanField={() => dispatch(change('Container', 'photo', ''))}*/}
            {/*label="Загрузить аватар"*/}
            {/*className={cn('dropzone')*/}
            {/*.mix('cur')*/}
            {/*.toString()}*/}
            {/*icon={true}*/}
            {/*/>*/}
            <EmployeeNewGroup />

            <div>
              <button type="submit" className={'btn btn-primary btn-margin-right '}>Сохранить</button>
              <button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default connector(NewGroup)
