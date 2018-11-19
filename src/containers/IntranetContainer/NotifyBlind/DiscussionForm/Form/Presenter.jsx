import React, { Component } from 'react'
import { xorBy } from 'lodash'
import { reduxForm, FieldArray, change, Field } from 'redux-form'

import { ClosedThin } from 'components-folder/Icon/'
import Input from 'components-folder/Input/'
import Textarea from 'components-folder/Textarea/Textarea'

import Loader from 'components-folder/Loader'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import BootstrapCheckbox from 'components-folder/Form/BootstrapCheckbox'
import MultiFile from '../../MultiFile'
import { Close, Loupe } from 'components-folder/Icon'
import DiscussionMembers from './DiscussionMembers'
import SelectInput from './SelectInput'

import DiscussionAddImgFile from 'components-folder/Form/DiscussionAddImgFile'
import ReduxFormDropzoneAvatarDiscussion from 'components-folder/Form/ReduxFormDropzoneAvatarDiscussion'

import { cn as parentCn } from '../index'
const cn = require('bem-cn')('notify-create-discussion-stage')

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
        <div className={cn}>
          <Field
            required
            showLabel
            className={cn('input_one')}
            name="name"
            id="name"
            labelText="Название"
            component={Input}
          />
          <Field
            required
            showLabel
            className={cn('textarea')}
            name="body"
            id="body"
            labelText="Описание"
            component={Textarea}
          />
          <FieldArray name="attachment" component={MultiFile} />
        </div>
        <div className={cn} style={{ marginTop: '-20px' }}>
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
          <Field
            type="checkbox"
            name="available_to_all"
            id="available_to_all"
            label="Все сотрудники"
            className={cn('checkbox-body')}
            component={BootstrapCheckbox}
          />
          <FieldArray hidden={available_to_all} name="discussers" component={DiscussionMembers} />
          <div
            className={`btn btn-primary btn-margin-right ${!valid && 'disabled'}`}
            onClick={submit}
          >
            сохранить
          </div>
          <div className={'btn btn-outline btn-white'} onClick={this.handleCancel.bind(this)}>
            отменить
          </div>
        </div>
      </form>
    )
  }
}
