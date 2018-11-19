import React, { Component } from 'react'
import { Field } from 'redux-form'
import Select from 'react-select'
import {Trash, Plus} from '../Icon'

const cn = require('bem-cn')('text-input-group')
if (process.env.BROWSER) {
  require('./TextInputGroup.css')
  require('react-select/dist/react-select.css')
  require('./SelectInput.css')
}

class SelectInputGroup extends Component {
  field = ({ input, meta, options, label }) => {
    const { name, onChange, onBlur } = input
    const { touched, error } = meta
    const inputValue = input.value
    const renderSelect = inputValue.map((element, index) => {
      const handleChange = event => {
        const arr = [...inputValue]
        arr[index] = event.value
        return onChange(arr)
      }

      const handleRemove = event => {
        const arr = [...inputValue]
        arr.splice(index, 1)
        if (!arr.length) {
          arr.push('')
        }
        return onChange(arr)
      }
      return (
        <div key={index} className={cn('select-container')}>
          <Select
            placeholder={'Выбрать'}
            searchable={false}
            clearable={false}
            backspaceRemoves={false}
            value={element}
            onChange={handleChange}
            options={options}
          />
          {([...inputValue][index] || [...inputValue].length > 1) && (
            <span tabIndex={'0'} className={cn('remove').mix('cur')} onClick={handleRemove} title="Удалить">
              <Trash className={cn('icon-trash').mix('icon')} />
            </span>
          )}
        </div>
      )
    })

    const handlerClick = () => {
      const arr = [...inputValue]
      arr.push('')
      return onChange(arr)
    }

    return (
      <div className={cn.mix('form-group')}>
        <label className={cn('label')}>{label}</label>

        <div className={cn('input-wrap')}>
          {renderSelect}
          <span
            className={cn('add-button').mix('no-outline').mix(cn('add-button_position'))}
            onClick={handlerClick}
            title="Добавить"
          >
            <Plus outline={30} className={cn('plus-icon')} />
          </span>
        </div>

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
export default SelectInputGroup
