import React, { PureComponent } from 'react'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'
import { pick } from 'ramda'
import { Trash } from 'components-folder/Icon'
import { toggleAll, add, extract, release, remove } from '../../../redux/actions/searchParticipants'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import { SearchParticipant } from '../../../presenters'
import api from '../../../api'
import { Loupe } from 'components-folder/Icon/'

import type { Dispatch } from '../../../types/actions'
import type { UserRaw, DepartmentRaw } from '../../../types/raws'
import type { SearchParticipantPresenter } from '../../../types/presenters'
import type { SearchParticipantsState } from '../../../types/states'

const cn = require('bem-cn')('participant-survey')

if (process.env.BROWSER) {
  require('./participant-survey.css')
}

type Props = {
  dispatch: Dispatch,
  searchParticipants: SearchParticipantsState,
}

type State = {
  fetching: boolean,
  results: Array<SearchParticipantPresenter>,
  dropdown: boolean,
  search: string,
}

const connector = connect(pick(['searchParticipants']))

class ParticipantSurvey extends PureComponent<Props, State> {
  state = {
    fetching: false,
    results: [],
    dropdown: false,
    focused: null,
    search: '',
  }

  reqnum = 0

  itemsRefs = {}
  scroll = 0

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(release())
  }

  onChange = async ({ target: { value: search } }) => {
    if (search.trim().length < 2) {
      this.setState({ results: [], dropdown: false, focused: null, search })
      return Promise.resolve()
    }

    this.setState({ fetching: true, dropdown: true, search })

    if (search.trim() !== '') {
      this.reqnum = this.reqnum + 1
      const reqid = this.reqnum
      try {
        const { data: results } = await api.events.searchParticipants(search)
        if (reqid === this.reqnum) {
          const newResults = results.filter( it => it.name || it.full_name ).map(SearchParticipant) || []
          const stateChanges = { fetching: false }

          if (
            newResults.map(it => it.key()).join() !== this.state.results.map(it => it.key()).join()
          ) {
            stateChanges.results = newResults
            stateChanges.focused = newResults[0]
            this.scroll = 0
            if (this.dropdown) this.dropdown.scrollTop = 0
          }

          this.setState(stateChanges)
        }
      } catch (e) { console.error(e) }
    }
  }

  scrollToItem = it => {
    const element = this.itemsRefs[it.key()]

    if (element) {
      const wrapTop = this.dropdown.offsetTop - 50
      const wrapHeight = this.dropdown.offsetHeight
      const wrapBottom = wrapTop + wrapHeight
      const top = element.offsetTop - this.dropdown.scrollTop
      const height = element.offsetHeight
      const bottom = top + height

      if (bottom > wrapBottom) {
        this.scroll = this.dropdown.scrollTop + bottom - wrapBottom
      } else if (top < wrapTop) {
        this.scroll = this.dropdown.scrollTop + top
      }

      this.dropdown.scrollTop = this.scroll
    }
  }

  focusItem = it => {
    this.scrollToItem(it)
    this.setState({ focused: it })
  }

  onBlur = () => setTimeout(() => this.setState({ dropdown: false }), 200)

  onFocus = () => {
    if (this.state.search.trim() !== '')
      this.setState({ dropdown: true }, () => {
        if (this.dropdown) {
          this.dropdown.scrollTop = this.scroll
        }
      })
  }

  onKeyDown = (event: *) => {
    if (this.state.dropdown && this.state.results.length > 0) {
      switch (event.keyCode) {
        case 40: {
          event.preventDefault()

          let focused = this.state.results[0]

          if (this.state.focused) {
            const index = this.state.results.findIndex(it => it.key() === this.state.focused.key())
            focused = this.state.results[index + 1] || focused
          }

          this.focusItem(focused)
          break
        }
        case 38: {
          event.preventDefault()

          let focused = this.state.results[this.state.results.length - 1]

          if (this.state.focused) {
            const index = this.state.results.findIndex(it => it.key() === this.state.focused.key())
            focused = this.state.results[index - 1] || focused
          }

          this.focusItem(focused)
          break
        }
        case 13: {
          event.preventDefault()

          if (this.state.focused) {
            this.onDropdownItemSelect(this.state.focused)
          }
          this.setState({ dropdown: false})
          break
        }
        default:
          break
      }
    }
  }

  onCheckAll = () => {
    const { dispatch } = this.props
    dispatch(toggleAll())
  }

  onDropdownItemSelect = it => {
    const { dispatch } = this.props
    this.checkbox.focus()
    dispatch(add(it))
  }

  onDropdownItemMove = it => {
    if (this.state.focused && it.key() === this.state.focused.key()) return
    this.scroll = this.dropdown.scrollTop
    this.setState({ focused: it })
  }

  DropdownItem = ({
    item: it,
    onClick,
    onMouseMove,
  }: {
    item: SearchParticipantPresenter,
    onClick: SearchParticipantPresenter => void,
  }) => {
    return (
      <div
        ref={ref => {
          this.itemsRefs[it.key()] = ref
        }}
        onClick={() => onClick(it)}
        onMouseMove={() => onMouseMove(it)}
        className={cn('dropdown-item', {
          focused: this.state.focused ? it.key() === this.state.focused.key() : false,
        })}
      >
        <div className={cn('dropdown-item-avatar')}>
          <img className={cn('dropdown-item-avatar-img')} width={32} height={32} src={it.logo()} />
        </div>
        <div className={cn('dropdown-item-name')}>
          {it.name()}

          {it.isUser() &&
            it.position() && <div className={cn('dropdown-item-position')}>{it.position()}</div>}
        </div>
      </div>
    )
  }

  onItemRemove = (it: SearchParticipantPresenter) => {
    const { dispatch } = this.props
    dispatch(remove(it))
  }

  onItemClick = (it: SearchParticipantPresenter) => {
    const { dispatch } = this.props
    dispatch(extract(it))
  }

  Item = ({
    item: it,
    onClick,
    onRemove,
  }: {
    item: SearchParticipantPresenter,
    onClick: SearchParticipantPresenter => void,
    onRemove: SearchParticipantPresenter => void,
  }) => {
    return (
      <div
        onClick={it.isDepartment() ? () => onClick(it) : undefined}
        className={cn('item', { department: it.isDepartment() })}
      >
        <div className={cn('item-avatar')}>
          <img className={cn('item-avatar-img')} width={32} height={32} src={it.logo()} />
        </div>
        <div className={cn('item-name')}>
          {it.name()}
          {it.isUser() && [
            it.position() && (
              <div key="position" className={cn('item-position')}>
                {it.position()}
              </div>
            ),
            // it.departments() && (
            //   <div key="departments" className={cn('item-departments')}>
            //     {it.departments()}
            //   </div>
            // ),
          ]}
        </div>
        <div onClick={() => onRemove(it)} className={cn('item-remove')}>
          <Trash className={cn('item-remove-icon')} color={'#ff2f51'} />
        </div>
      </div>
    )
  }

  render() {
    const { searchParticipants: { all: checked, getParticipants } } = this.props
    const participants = getParticipants()
    const { DropdownItem, Item } = this

    return (
      <div className={cn}>
        <h2 className={'indent_13'}>
          Участники <sup className={cn('value-participant').mix('p4 p4_theme_light_third')}>*</sup>
        </h2>
        <div className={cn('group').mix('form-group')}>
          <label className={cn('group-label', { disabled: checked }).mix('p3 p3_theme_light')} htmlFor={'name'}>
            Участники
          </label>
          <div className={cn('input-wrap')}>
            <Loupe className={cn('input-icon')} />
            <DebounceInput
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onClick={this.onFocus}
              onKeyDown={this.onKeyDown}
              debounceTimeout={200}
              disabled={checked}
              id="name"
              type={'text'}
              autoComplete="off"
              value={this.state.search}
              className={cn('input', { focused: this.state.dropdown, disabled: checked }).mix(
                'form-control'
              )}
            />
            {this.state.dropdown &&
              this.state.results.length !== 0 && (
                <div
                  ref={ref => {
                    this.dropdown = ref
                  }}
                  className={cn('input-dropdown')}
                >
                  {this.state.results.map((it, index) => (
                    <DropdownItem
                      onClick={this.onDropdownItemSelect}
                      onMouseMove={this.onDropdownItemMove}
                      item={it}
                      key={it.key()}
                    />
                  ))}
                </div>
              )}

            {this.state.dropdown &&
              !this.state.fetching &&
              this.state.results.length === 0 && (
                <div className={cn('input-dropdown')}>
                  <div className={cn('dropdown-item-placeholder')}>Не найдено</div>
                </div>
              )}
          </div>
          <div className={cn('input-description', { disabled: checked }).mix('p2 p2_theme_light_second')}>
            Введите имя участника или название подразделения
          </div>
        </div>
        <div className={cn('check-all')}>
          <Checkbox
            exposeRef={ref => {
              this.checkbox = ref
            }}
            checked={checked}
            onClick={this.onCheckAll}
          >
            <span className={cn('check-all-label')}>Все сотрудники</span>
          </Checkbox>
        </div>
        {!checked && (
          <div className={cn('items')}>
            {participants.length === 0 && (
              <div className={cn('error').mix('p2 p2_theme_light_third')}>Добавьте хотя бы одного участника</div>
            )}

            {participants.map(it => (
              <Item
                onClick={this.onItemClick}
                item={it}
                onRemove={this.onItemRemove}
                key={it.key()}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default connector(ParticipantSurvey)
