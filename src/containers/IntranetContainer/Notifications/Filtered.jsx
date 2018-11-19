import React, { Component } from 'react'

import { Arrow, Calendar } from 'components-folder/Icon'
import { Field, reduxForm } from 'redux-form'
import { optionsCustomer } from './data'
import CheckboxField from 'components-folder/Form/CheckboxField'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import { ControlLabel, FormGroup } from 'react-bootstrap'
import { v4 } from 'uuid'

const cn = require('bem-cn')('notifications')
if (process.env.BROWSER) {
  require('./style.css')
}

class Filtered extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  render() {
    const { isOpen } = this.state

    return (
      <div className={cn('collapse').mix(cn('filtered'))}>
        <div className={cn('collapse-head')} onClick={this.openCollapse}>
          <p className={cn('collapse-head-label')}>Фильтр</p>
          {/*<div className={cn('filtered-wrapper-mark')}>*/}
            {/*{[0, 1, 2].map(() => (*/}
              {/*<span className={'select__mark'} key={v4()}>*/}
                {/**Фильтр**/}
                {/**<span className={'select__mark-delete'}>×</span>*/}
              {/*</span>*/}
            {/*))}*/}
          {/*</div>*/}
          <span onClick={this.openCollapse}>
            {isOpen ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </span>
        </div>

        {isOpen && (
          <div className={cn('collapse-body')}>
            <div>
              <div className={cn('filtered-body-wrapper-elem')}>
                <FormGroup>
                  <ControlLabel>Период создания заявки</ControlLabel>
                  <div className={cn('wrapper-calendar')}>
                    <div className={cn('calendar')}>
                      <Field
                        label=""
                        name={`start_date`}
                        component={DateTimeField}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                      />
                      <Calendar className={cn('calendar-icon')} />
                    </div>
                    <div className={cn('dash')}>—</div>
                    <div className={cn('calendar')}>
                      <Field
                        label=""
                        name={`end_date`}
                        component={DateTimeField}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                      />
                      <Calendar className={cn('calendar-icon')} />
                    </div>
                    <CheckboxField
                      label="Только непрочитанные"
                      name={`close_project`}
                      className={cn('nowadays-checkbox')}
                    />
                  </div>

                </FormGroup>
              </div>
            </div>
            <button className={'btn btn-primary btn-margin-right btn_padding13-16'}>Подобрать</button>
            <button className={'btn btn-outline btn_padding13-16'}>Сбросить фильтр</button>
          </div>
        )}
      </div>
    )
  }
  openCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
export default reduxForm({
  form: 'Filtered',
})(Filtered)
