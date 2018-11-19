import React, { Component } from 'react'
import {
  Arrow,
} from 'components-folder/Icon/'

const cn = require('bem-cn')('customers')

class DescriptionCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  render() {
    const { isOpen } = this.state
    const { text } = this.props

    return (
      <div>
        <div className={cn('collapse')} style={{ paddingBottom: isOpen ? '0' : '20px' }}>
          <div className={cn('collapse-head')} onClick={this.openCollapse}>
            <h2 className={cn('name')}>Описание</h2>
            <span onClick={this.openCollapse}>
              {isOpen ? (
                <Arrow className={cn('open-icon')} />
              ) : (
                <Arrow className={cn('close-icon')} />
              )}
            </span>
          </div>

          {isOpen && (
            <div className={cn('body')}>
              <p className={'p1 p1_theme_light_first indent_reset'}>
                {text}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  openCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}

export default DescriptionCollapse
