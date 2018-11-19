import React, { PureComponent } from 'react'

const cn = require('bem-cn')('checkbox')
if (process.env.BROWSER) {
  require('./Checkbox.css')
}

type Props = {
  checked: boolean,
  disabled: boolean,
  className: string,
  children?: React.Node,
}

class Checkbox extends PureComponent<Props> {
  static defaultProps = {
    checked: false,
    disabled: false,
    onClick: () => {},
  }

  render() {
    const { checked, disabled, error, className, children, exposeRef } = this.props

    return (
      <label
        tabIndex={!disabled ? 0 : null}
        className={cn({ checked, disabled, error }).mix(className)}
        onClick={this.handleClick}
        title={checked ? 'Выбрано' : 'Нажмите, чтобы выбрать'}
      >
        {children && (
          <div className={cn('text')}>
            {children}
            {error && <span className={cn('text').mix(cn('text_error'))}>{error}</span>}
          </div>
        )}
        <div
          ref={ref => {
            exposeRef && exposeRef(ref)
          }}
          className={cn('control')}
        />
      </label>
    )
  }

  handleClick = event => {
    const { checked } = this.props

    if (!this.props.disabled) {
      this.props.onClick(!checked)
    }
  }
}
export default Checkbox
