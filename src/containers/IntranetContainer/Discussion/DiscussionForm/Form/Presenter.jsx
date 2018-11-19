import React, { Component } from 'react'
import { xorBy } from 'lodash'
import { Field, FieldArray } from 'redux-form'

import Loader from 'components-folder/Loader'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import BootstrapCheckbox from 'components-folder/Form/BootstrapCheckbox'
import MultiFile from '../../MultiFile'
import Checkbox from '../../Checkbox'
import SelectInput from '../SelectInput'

import { Close, Loupe } from 'components-folder/Icon'
import DiscussionMembers from '../DiscussionMembers'

import { cn } from '../index'

export default class Presenter extends Component {
  componentDidMount() {
    const {
      accounts,
      activeDiscussion: { id, name, body, photos, documents, discussers, available_to_all },
      initialize,
    } = this.props

    if (id) {
      const attachment = [
        ...photos.map(({ id, name, file: { url } }) => ({
          id,
          name,
          url,
          type: 'photos_attributes',
        })),
        ...documents.map(({ id, name, file: { url } }) => ({
          id,
          name,
          url,
          type: 'documents_attributes',
        })),
      ]
      const oldDiscussers = discussers.map(({ id, account_id }) => ({
        record_id: id,
        account_id,
        ...accounts.find(({ id }) => id === account_id),
      }))

      initialize({
        name,
        body,
        attachment,
        discussers: oldDiscussers,
        available_to_all,
      })
    }
  }

  handleCancel() {
    const { activeDiscussion, showCard, closeAll } = this.props
    if (activeDiscussion.id) {
      showCard(activeDiscussion)
    } else {
      closeAll()
    }
  }

  render() {
    const { accounts, discussers, available_to_all, user, submiting, valid } = this.props
    const { submit } = this.props
    return (
      <form>
        {submiting && (
          <div className={cn('loader_form')}>
            <Loader />
          </div>
        )}
        <div className={cn('note-info')}>
          <fieldset className={cn('fieldset').mix('required')}>
            <Field required name="name" id="name" label="Название" component={BootstrapInput} />
          </fieldset>
          <fieldset className={cn('fieldset').mix('required')}>
            <Field required name="body" id="body" label="Описание" component={BootstrapTextarea} />
            <FieldArray name="attachment" component={MultiFile} />
          </fieldset>
        </div>
        <div className={cn('members')}>
          <h4>Участники</h4>
          <Field
            name="members"
            id="members"
            label="Выбрать сотрудника"
            disabled={available_to_all}
            isLoading={accounts.length === 0}
            component={SelectInput}
            className={cn('search-input')}
            options={xorBy(accounts, [user, ...discussers], 'id').map(it => ({
              label: it.full_name,
              value: it.id,
              employee: it,
            }))}
          />
          <div className={cn('checkbox-wrap')}>
            <span className={'p2 p2_theme_light_second'}>Введите имя участника</span>
            <Field
              type="checkbox"
              name="available_to_all"
              id="available_to_all"
              label="Все сотрудники"
              className={cn('checkbox-body')}
              component={BootstrapCheckbox}
            />
          </div>
          <div className={cn}>
            <FieldArray hidden={available_to_all} name="discussers" component={DiscussionMembers} />
          </div>
          <div className={cn('button-container')}>
            <div
              className={`btn btn-primary btn_padding13-18 mr-12 ${!valid && 'disabled'}`}
              onClick={submit}
            >
              сохранить
            </div>
            <div
              className={'btn btn-outline btn_padding13-18'}
              onClick={this.handleCancel.bind(this)}
            >
              отменить
            </div>
          </div>
        </div>
      </form>
    )
  }
}
