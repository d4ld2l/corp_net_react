import React, { Component } from 'react'
import * as employeesActions from  '../../../redux/actions/employeesActions'
import DebounceInput from 'react-debounce-input'
import { Trash, Plus } from 'components-folder/Icon'
import {add, addNewSkill, release} from '../../../redux/actions/searchSkills'
import api from '../../../api'
import { get, isEmpty } from 'lodash'
import { Loupe } from 'components-folder/Icon/'
import {pick} from "ramda";
import {connect} from "react-redux";
import {toastr} from "react-redux-toastr";

const cn = require('bem-cn')('b-collapse')

if (process.env.BROWSER) {
  require('./employee-card-skill-form.css')
}

const connector = connect( pick(['searchSkills']) )

class EmployeeSkillForm extends Component {
  state = {
    fetching: false,
    results: [],
    dropdown: false,
    focused: null,
    checked: false,
    search: '',
    corrrectSkill: [],
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
        const { data: results } = await api.dictionaries.searchSkills(search)
        if (reqid === this.reqnum) {
          const newResults = results.filter( it => it.name ) || []
          const stateChanges = { fetching: false }
          if (
            newResults.map(it => it.id).join() !== this.state.results.map(it => it.id).join()
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
    const element = this.itemsRefs[it.id]

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
            const index = this.state.results.findIndex(it => it.id === this.state.focused.id)
            focused = this.state.results[index + 1] || focused
          }

          this.focusItem(focused)
          break
        }
        case 38: {
          event.preventDefault()

          let focused = this.state.results[this.state.results.length - 1]

          if (this.state.focused) {
            const index = this.state.results.findIndex(it => it.id === this.state.focused.id)
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
    } else {
      if (event.keyCode === 13){
        this.addNewSkill({name: this.state.search})
      }
    }
  }

  onDropdownItemSelect = it => {
    const { dispatch, user_id, searchSkills: {skills} } = this.props
    if ((it.name !== '') && isEmpty(skills.filter(item => item.name === it.name ))) {
      dispatch(employeesActions.createEmployeeSkill(user_id, it.name, it.id))
      dispatch(add(it))
      return
    }
    toastr.error('Навык уже был добавлен')
  }

  addNewSkill = it => {
    const { dispatch, user_id } = this.props
    if (it.name !== '') {
      dispatch(employeesActions.createEmployeeSkill(user_id, it.name, it.id))
      dispatch(addNewSkill(it))
      this.setState({ search: '', dropdown: false })
    }
  }

  onDropdownItemMove = it => {
    if (this.state.focused && it.id === this.state.focused.id) return
    this.scroll = this.dropdown.scrollTop
    this.setState({ focused: it })
  }

  DropdownItem = ({
                    item: it,
                    onClick,
                    onMouseMove,
                  }) => {
    return (
      <div
        ref={ref => {
          this.itemsRefs[it.id] = ref
        }}
        onClick={() => onClick(it)}
        onMouseMove={() => onMouseMove(it)}
        className={cn('dropdown-item', {
          focused: this.state.focused ? it.id === this.state.focused.id : false,
        })}
      >
        <div className={cn('dropdown-item-name')}>
          {it.name}
        </div>
      </div>
    )
  }

  render() {
    const { DropdownItem } = this
    return (
      <div>
        <h5 className={('indent_15')}>Добавить навыки</h5>
        <div className={cn('group').mix('form-group')}>
          <div className={cn('input-wrap')}>
            <Loupe className={cn('input-icon')} />
            <DebounceInput
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onClick={this.onFocus}
              onKeyDown={this.onKeyDown}
              debounceTimeout={200}
              id="name"
              type={'text'}
              autoComplete="off"
              value={this.state.search}
              className={cn('input', { focused: this.state.dropdown }).mix('form-control')}
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
                    key={it.id}
                  />
                ))}
              </div>
            )}

            {this.state.dropdown &&
            !this.state.fetching &&
            this.state.results.length === 0 && (
              <div className={cn('input-dropdown')}>
                <div className={cn('dropdown-item-placeholder')}>Нажмите "Enter" чтобы добавить новый навык</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connector(EmployeeSkillForm)
