import React, { Component } from 'react'
import ReactResponsiveSelect from 'react-responsive-select'
import { cn } from './index'

const caretIcon = <div className={'select__dropdown-icon'} />

export default class Select extends Component {
  render() {
    const { authorFilter, dateFilter, stateFilter, typeFilter, changeFilterParam } = this.props

    const { unread, author_id, created_at, state } = this.props

    const selectWrapper = {
      caretIcon: caretIcon,
    }

    return (
      <div className={cn('filtered')}>
        <div className={'select'}>
          <div className={'select__box'}>
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
        </div>
      </div>
    )
  }
}
