import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import { Arrow } from '../../Icon'
import { Field, reduxForm, change } from 'redux-form'
import BootstrapTextarea from '../../Form/BootstrapTextarea'

const cn = require('bem-cn')('candidate-tab-full-name')

if (process.env.BROWSER) {
  require('./main.css')
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabResume',
  }),
  connect(state => ({
    form: state.form.CandidateTabResume,
    initialValues: state.candidates.parsedResume.resumeText,
    candidate: state.candidates.current,
  })),
)

  class CandidateTabResume extends Component {
    state = {
      open: true,
    }

    componentWillMount() {
      const { initialize, candidateId, candidate } = this.props
      if (candidateId) {
        const { resume } = candidate
        initialize({
          resume_text: resume.resume_text,
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
        this.props.initialize(nextProps.initialValues)
      }
    }

    render() {
      const { open } = this.state

      return (
        <div className={cn} id="full_name">
          <div className={cn('head').mix('clearfix')}
               onClick={() => this.setState({ open: !open })}>
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
                <div className={cn('data-wrapper', { input: 'text' })}>
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

export default connector(CandidateTabResume)
