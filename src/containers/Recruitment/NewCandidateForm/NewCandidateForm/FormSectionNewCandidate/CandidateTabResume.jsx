import React, {Component} from 'react'
import {Collapse} from 'react-bootstrap'
import {Arrow} from 'components-folder/Icon'
import {Field} from 'redux-form'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'

const cn = require('bem-cn')('candidate-tab-full-name')

if (process.env.BROWSER) {
  require('./main.css')
}

export default class CandidateTabResume extends Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state

    return (
      <div className={cn} id="full_name">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Резюме</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <div className={cn('data-wrapper', {input: 'text'})}>
                <Field component={BootstrapTextarea} name="resume_text" type="text"
                       label="текст резюме"/>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

