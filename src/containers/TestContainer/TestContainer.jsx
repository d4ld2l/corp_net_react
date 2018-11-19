import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Checkbox from 'components-folder/Checkbox/Checkbox'

import { Tab, Row, Col, Nav, NavItem, Button, ButtonToolbar } from 'react-bootstrap'

const cn = require('bem-cn')('test-container')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class TestContainer extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>HR - Test page</title>
        </Helmet>

        <div className={cn('container').mix('container')}>
          <h1>Style guide</h1>

          <h3>...Кнопки...</h3>

          <ButtonToolbar>
            <Button>Default button</Button>

            <Button disabled>Default button disabled</Button>

            <Button bsStyle="primary">Primary button</Button>

            <Button bsStyle="primary" disabled>
              Primary button disabled
            </Button>

            <Button bsStyle="link">Link button</Button>

            <Button bsStyle="link" disabled>
              Link button disabled
            </Button>
          </ButtonToolbar>

          <h3>...Типографика...</h3>

          <h1>Заголовок H1</h1>
          <h2>Заголовок H2</h2>
          <h3>Заголовок H3</h3>
          <h4>Заголовок H4</h4>
          <h5>Заголовок H5</h5>
          <h6>Заголовок H6</h6>

          <h3>...Чекбоксы...</h3>

          <Checkbox
            checked={this.state.checked}
            onClick={checked => {
              this.setState({ checked })
            }}
          >
            Крутой чекбокс
          </Checkbox>

          <Checkbox disabled>disabled</Checkbox>

          <Checkbox disabled checked>
            disabled checked
          </Checkbox>
        </div>
      </div>
    )
  }
}
