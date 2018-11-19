import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose, pick } from 'ramda'
import { Collapse, ControlLabel, FormGroup } from 'react-bootstrap'
import { fillSkills } from '../../../redux/actions/searchSkills'
import { Arrow, Calendar } from 'components-folder/Icon/'
import { Field, FieldArray, reduxForm } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import RadioButtonGroup from 'components-folder/RadioButtonGroup/RadioButtonGroup'
import GeneralInformationSkills from './GeneralInformationSkills'
import { required } from 'lib-folder/validation'

const cn = require('bem-cn')('b-collapse')
if (process.env.BROWSER) {
  require('./b-collapse.css')
}
moment.locale('ru')

const connector = compose(
  connect(pick(['employees', 'system'])),
  reduxForm({
    form: 'GeneralInformationCollapse',
    touchOnChange: true,
  })
)

class GeneralInformationCollapse extends Component {
  state = { open: true }

  componentDidMount() {
    const { employees: { current }, initialize, dispatch, system: { enabledComponents } } = this.props
    dispatch(fillSkills(current.account_skills))
    const { birthday, city, account_skills, sex } = current

    initialize({
      skill_list: enabledComponents.shr_skills && account_skills.map(it => ({...it, skill_attributes: it.skill})),
      city,
      sex,
      birthday: moment(birthday),
    })
  }

  render() {
    const { open } = this.state
    const { system: { enabledComponents } } = this.props

    return (
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Общая информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_close')} />
          ) : (
            <Arrow className={cn('arrow-icon_open')} />
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('body')}>
              <div className={cn('wrapper-line-up')}>
                <div className={cn('wrapper-birthdate')}>
                  <div className={cn('required')}>
                    <Field
                      name="birthday"
                      label="Дата рождения"
                      component={DateTimeField}
                      dateFormat="DD.MM.YYYY"
                      validate={[required]}
                      timeFormat={false}
                    />
                  </div>
                  <Calendar className={cn('calendar-icon')} />
                </div>

                <FormGroup>
                  <ControlLabel className={('p3 p3_theme_light')}>Пол</ControlLabel>
                  <Field
                    component={RadioButtonGroup}
                    options={[
                      {
                        active: false,
                        disabled: false,
                        value: 'male',
                        label: 'Мужской',
                      },
                      {
                        active: true,
                        disabled: false,
                        value: 'female',
                        label: 'Женский',
                      },
                    ]}
                    name="sex"
                    layout={'block'}
                  />
                </FormGroup>
              </div>

              <div className={cn('wrapper-input-data')}>
                <Field name="city" component={BootstrapInput} label="Город" />
                {/* <Field name="office" component={BootstrapInput} label="Офис" /> */}
              </div>

              {
                enabledComponents.shr_skills &&
                (
                  <div className={cn('skills-list')}>
                    <GeneralInformationSkills />
                  </div>
                )
              }
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default connector(GeneralInformationCollapse)
