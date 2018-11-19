import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import isEqual from 'lodash/isEqual'

if (process.env.BROWSER) {
  require('react-select-plus/dist/react-select-plus.css')
  require('./SelectInput.css')
}

export default class GroupedOptionsField extends Component {
  state = {
    set_value: false,
    value: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.input.value, this.state.value) && !this.state.set_value) {
      this.setState({ value: nextProps.input.value, set_value: true })
    }
  }

  handleChange = (value) => {
    const { input: { onBlur, onChange } } = this.props
    onChange(value)
    onBlur(value)
    this.setState({value: value})
  }

  removeValue = value => {
    const { input: { onBlur, onChange } } = this.props
    onChange(this.state.value.filter(item => item !== value))
    onBlur(this.state.value.filter(item => item !== value))
    this.setState({ value: this.state.value.filter(item => item !== value) })
  }

  render () {
    const { value } = this.state
    const { label, options, name, type, input } = this.props
    return (
      <div className="form-group">
        <label className={`form-group__label`}>
          {label}
        </label>
        <div>
          {value && (value.map((item, id) =>
            <span className={'select__mark'} key={id}>
              {options.filter(it => it.options.map(({value}) => (value)).includes(item.value))[0].label + `, ` + item.label}
              <span className={'select__mark-delete'} onClick={() => this.removeValue(item)}>×</span>
          </span>))}
        </div>
        <Select
          onChange={value => this.handleChange(value)}
          onBlur={() => this.handleChange(value)}
          options={value ? value.length >= 1  ? value[0].group.options : options : options}
          searchable={false}
          multi={true}
          removeSelected={false}
          disabled={value ? value.length >= 3 : false}
          value={value}
          name={name}
          type={type}
          placeholder={"Выбрать специализацию"}
        />
      </div>
    );
  }
}
