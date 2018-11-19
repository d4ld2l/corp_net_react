import React, { PureComponent } from 'react'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'
import { pick } from 'ramda'
import { toggleAll, add, extract, release, remove } from '../../../../../redux/actions/searchParticipants'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import { SearchParticipant } from '../../../../../presenters/index'
import api from '../../../../../api/index'
import { Loupe, Close } from 'components-folder/Icon'
import Loader from 'components-folder/Loader'

import type { Dispatch } from '../../../../../types/actions'
import type { SearchParticipantPresenter } from '../../../../../types/presenters'
import type { SearchParticipantsState } from '../../../../../types/states'
import * as ReactDOM from 'react-dom'

const cn = require('bem-cn')('new-bid-team-building-search')

if (process.env.BROWSER) {
  require('../../../NewBid/TeamBuilding/Participants/styles.css')
}

const connector = connect(pick(['searchParticipants']))

class SearchForm extends PureComponent {
  state = {
    fetching: false,
    results: [],
    dropdown: false,
    focused: null,
    search: '',
  }

  // TODO: refactor to axios cancelation
  reqnum = 0

  itemsRefs = {}
  scroll = 0

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(release())
  }

  componentDidUpdate() {
    this._items = ReactDOM.findDOMNode(this._items)
    const _items = this._items

    if (_items.clientHeight > 580) {
      _items.classList.add('global-scroll')
      _items.classList.add('global-scroll_theme_light')
    } else {
      _items.classList.remove('global-scroll')
      _items.classList.remove('global-scroll_theme_light')
    }
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
          break
        }
        default:
          break
      }
    }
  }

  /*onCheckAll = () => {
    const { dispatch } = this.props
    dispatch(toggleAll())
  }*/

  onDropdownItemSelect = it => {
    const { dispatch } = this.props
    // this.checkbox.focus()
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
          <div className={cn('item-departments')}>
            Блок Инновационные решения / Практика спорт
          </div>
        </div>
        <div onClick={() => onRemove(it)} className={cn('item-remove')} title="Удалить">
          <Close className={cn('item-remove-icon')} color={'#ff2f51'} />
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
        <div className={cn('group').mix('form-group')}>
          <h2 className={('indent_10')}>Участники <sup className={cn('member-count').mix('p3')}>{participants.length}</sup></h2>
          <label className={cn('group-label', { disabled: checked })} htmlFor={'name'}>
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
            <Close className={cn('input-icon-clear')} />
            {this.state.results.length === 0
              ? this.state.dropdown && (
              <div
                ref={ref => {
                  this.dropdown = ref
                }}
                className={cn('input-dropdown')}
                style={{ overflow: 'hidden' }}
              >
                <Loader />
              </div>
            )
              : this.state.dropdown &&
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
          <div className={cn('input-description', { disabled: checked }).mix('p1_theme_light_second')}>
            Введите имя участника или название подразделение
          </div>
        </div>
        {/*<div className={cn('check-all')}>
          <Checkbox
            exposeRef={ref => {
              this.checkbox = ref
            }}
            checked={checked}
            onClick={this.onCheckAll}
          >
            <span className={cn('check-all-label')}>Все сотрудники</span>
          </Checkbox>
        </div>*/}
        {!checked && (
          <div>
          <div className={cn('items')} ref={node => (this._items = node)}>
            {participants.map(it => (
              <Item
                onClick={this.onItemClick}
                item={it}
                onRemove={this.onItemRemove}
                key={it.key()}
              />
            ))}
          </div>
            {/*<div className={cn('button-box')}>
              <button className={('btn btn-outline btn_padding-9-21')}>показать еще</button>
            </div>*/}
          </div>
        )}
      </div>
    )
  }
}

export default connector(SearchForm)
