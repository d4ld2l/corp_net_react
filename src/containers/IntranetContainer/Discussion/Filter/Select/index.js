import React, { Component } from 'react'
import ReactResponsiveSelect from 'react-responsive-select'

const cn = require('bem-cn')('discussion-select')
if (process.env.BROWSER) {
  require('./style.css')
}

const caretIcon = <div className={cn('dropdown-icon')} />

export default class Select extends Component {
  render() {
    const {
      authorFilter,
      categoryFilter,
      dateFilter,
      stateFilter,
      typeFilter,
      changeFilterParam,
    } = this.props

    const { unread, author_id, discussable_type, created_at, state } = this.props

    const selectWrapper = {
      caretIcon: caretIcon,
    }

    return (
      <form>
        <div className={cn('box')}>
          <ReactResponsiveSelect
            {...selectWrapper}
            name="author"
            options={authorFilter}
            prefix="Автор: "
            multiselect={true}
            selectedValues={author_id && author_id.split(',')}
            onChange={obj => {
              const params = obj.options.map(it => it.value).join(',')
              changeFilterParam({
                author_id: params === 'Any' ? undefined : params,
              })
            }}
          />
          <ReactResponsiveSelect
            {...selectWrapper}
            name="category"
            options={categoryFilter}
            prefix="Категория: "
            multiselect={true}
            selectedValues={discussable_type && discussable_type.split(',')}
            onChange={obj => {
              const params = obj.options.map(it => it.value).join(',')
              changeFilterParam({
                discussable_type: params === 'Any' ? undefined : params,
              })
            }}
          />
          <ReactResponsiveSelect
            {...selectWrapper}
            name="date"
            options={dateFilter}
            prefix="Дата создания: "
            multiselect={false}
            selectedValue={created_at}
            onChange={obj => {
              if (obj.altered) {
                changeFilterParam({
                  created_at: obj.value === 'Any' ? undefined : obj.value,
                })
              }
            }}
          />
          <ReactResponsiveSelect
            {...selectWrapper}
            name="unread"
            options={typeFilter}
            prefix="Непрочитанные: "
            multiselect={false}
            selectedValue={unread}
            onChange={obj => {
              if (obj.altered) {
                changeFilterParam({
                  unread: obj.value === 'Any' ? undefined : obj.value,
                })
              }
            }}
          />
          <ReactResponsiveSelect
            {...selectWrapper}
            multiselect={false}
            name="state"
            options={stateFilter}
            prefix="Состояние: "
            selectedValue={state}
            onChange={obj => {
              if (obj.altered) {
                changeFilterParam({
                  state: obj.value === 'Any' ? undefined : obj.value,
                })
              }
            }}
          />
        </div>
      </form>
    )
  }
}
