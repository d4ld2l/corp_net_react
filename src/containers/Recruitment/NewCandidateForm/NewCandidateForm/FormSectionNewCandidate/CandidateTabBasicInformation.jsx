import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'
import {Collapse, FormGroup, ControlLabel} from 'react-bootstrap'
import {Arrow, Calendar} from 'components-folder/Icon'
import {RadioButtonGroup} from 'components-folder/RadioButtonGroup'
import TagsField from 'components-folder/Form/TagsField'
import SelectInputGroupLanguage from 'components-folder/Form/SelectInputGroupLanguage'
import CKeditor from 'components-folder/Form/CKeditor'
import {editorConfig} from './data'
import DateTimeCalendarIconFIeld from "components-folder/Form/DateTimeCalendarIconFIeld";

const cn = require('bem-cn')('candidate-tab-basic-information')

if (process.env.BROWSER) {
  require('./main.css')
}

export default class CandidateTabBasicInformation extends Component {
  state = {
    open: true,
    sex: [
      {
        active: false,
        disabled: false,
        value: 'male',
        label: 'Мужской',
      },
      {
        active: false,
        disabled: false,
        value: 'female',
        label: 'Женский',
      },
    ],
  }

  render() {
    const {open, sex} = this.state
    const {languages, languagesLevel} = this.props
    return (
      <div className={cn} id="basic_information">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Общая информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <div>
                <div className={cn('wrapper-line-up')}>
                  <div className={cn('wrapper-birthdate')}>
                    <Field
                      name="birthdate"
                      label="Дата рождения"
                      component={DateTimeCalendarIconFIeld}
                      dateFormat="DD.MM.YYYY"
                      timeFormat={false}
                    />
                  </div>

                  <FormGroup>
                    <ControlLabel>Пол</ControlLabel>
                    <Field component={RadioButtonGroup} options={sex} name="sex"
                           layout={'block'}/>
                  </FormGroup>
                </div>
                {/* <div className={cn('wrapper-line-up')}>
                      <div className={cn('marital-status')}>
                        <Field
                          label="Семейное положение"
                          name="marital_status"
                          component={SelectInput}
                          placeholder="Выбрать"
                          noResultsText="Нет значений"
                          options={marital_status_option}
                        />
                      </div>

                      <div className={cn('children')}>
                        <Field
                          label="Дети"
                          name="children"
                          component={SelectInput}
                          placeholder="Выбрать"
                          noResultsText="Нет значений"
                          options={children_option}
                        />
                      </div>
                  </div> */}

                <div className={cn('skills-list')}>
                  <h4>Навыки</h4>
                  <FormGroup>
                    <ControlLabel>Навыки</ControlLabel>
                    <Field name="skills" component={TagsField}/>
                  </FormGroup>

                  <Field
                    component={CKeditor}
                    name="skills_description"
                    className="form-control"
                    label="Основные навыки"
                    config={editorConfig}
                  />
                  <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>
                    Если необходимо, опишите некоторые навыки более подробно
                  </p>
                </div>

                <div className={cn('skills-language')}>
                  <h4>Знание языков</h4>
                  <FieldArray
                    name="language_skills_attributes"
                    component={SelectInputGroupLanguage}
                    languages={languages}
                    languagesLevel={languagesLevel}
                  />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

