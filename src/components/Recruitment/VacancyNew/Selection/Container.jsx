import React, {Component} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import path from 'ramda/src/pathOr'
import {Plus, Trash} from '../../../Icon'
import {arrayMove} from 'react-sortable-hoc'
import SelectMilestoneGroup from '../../../Form/SelectMilestoneGroup'
import Notification from './Notification'
import Evaluation from './Evaluation'
import SortableList from './SortableList'
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('new-recruiter-request-selection-tab')
if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(state => ({
  disabledCreate:
  !!(
    path(false, ['createVacancyChangeFullForm', 'syncErrors'], state.form) ||
    path(false, ['createVacancyChangeInfoForm', 'syncErrors'], state.form)
  ) ||
  (state.vacancies.current.vacancy_stages && state.vacancies.current.vacancy_stages.length > 0),
  vacancy: state.vacancies.current,
  selectMilestones: state.recruiter.newRequest.selectMilestonesTemplate
}))

class Container extends Component {
  componentDidMount() {
    const {vacancyId, vacancy, currentMilestonesTemplate, recruiter } = this.props
    const template = recruiter.newRequest.milestonesTemplate.find(it => it.name == "Базовый") || recruiter.newRequest.milestonesTemplate[0]
    if (vacancyId && vacancy.vacancy_stages.length) {
      this.handlerChangeMilestonesTemplate({value: template.id, label: template.name})
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.changeMilestones(arrayMove(this.props.milestones, oldIndex, newIndex))
  }

  handlerChangeMilestonesTemplate = async item => {
    const {
      setCurrentMilestonesTemplate,
      setMilestonesTemplate,
      setMilestones,
      vacancyId,
      vacancy,
    } = this.props
    await setCurrentMilestonesTemplate(item)
    await setMilestonesTemplate(item.value)
    if (vacancyId && vacancy.vacancy_stages.length) {
      await setMilestones(vacancy.vacancy_stages)
    }
  }

  handlerChangeMilestoneNotification = value => {
    const {activeMilestone, changeMilestoneNotification} = this.props
    changeMilestoneNotification({
      position: activeMilestone.position,
      value,
    })
  }

  handlerChangeMilestoneEvaluation = value => {
    const {activeMilestone, changeMilestoneEvaluation} = this.props
    changeMilestoneEvaluation({
      position: activeMilestone.position,
      value,
    })
  }

  handlerCreate = (status = 'new') => {
    const {createVacancy, state} = this.props

    createVacancy({state, status})
  }

  render() {
    const {
      activeMilestone,
      milestonesTemplate,
      milestonesGroups,
      currentMilestonesGroup,
      disabledCreate,
      currentMilestonesTemplate,
      milestones,
      addLeftMilestone,
      addRightMilestone,
      deleteMilestone,
      renameMilestoneTitle,
      changeMilestonesGroups,
    } = this.props
    return (
      <div className={cn}>
        <div className={cn('wrap')}>
          <div className={cn('select').mix('form-group')}>
            <label htmlFor="">Выберите шаблон</label>
            <Select
              searchable={false}
              value={currentMilestonesTemplate}
              options={milestonesTemplate}
              onChange={this.handlerChangeMilestonesTemplate}
              disabled={disabledCreate}
              placeholder="Выбрать"
              onInputKeyDown={event => {
                if(event.key === 'Backspace' || event.key === 'Delete'){
                  event.preventDefault()
                }
              }}
            />
          </div>

          {currentMilestonesTemplate && (
            <div className={cn('sortable')}>
              <SortableList
                axis={'x'}
                distance={1}
                items={milestones}
                onSortEnd={this.onSortEnd}
                addRightMilestone={addRightMilestone}
              />

              {activeMilestone && (
                <div className={cn('info-wrap')}>
                  <div className={cn('add-before')}>
                    {activeMilestone.can_create_left && (
                      <div
                        onClick={() => {
                          addLeftMilestone({milestone: activeMilestone})
                        }}
                        className={cn('add-before-button').mix('cur')}
                      >
                        <Plus outline={30} className={cn('add-before-icon')}/>
                        <span
                          className={cn('add-before-text')}>Добавить этап до</span>
                      </div>
                    )}
                  </div>

                  <div className={cn('info')}>
                    {activeMilestone.editable && (
                      <span
                        className={cn('cur')}
                        onClick={() => {
                          deleteMilestone()
                        }}
                      ><Trash className={cn('delete').mix('cur')}/></span>
                    )}

                    <div className="form-group">
                      <label htmlFor="">Название этапа</label>
                      <input
                        type="text"
                        value={activeMilestone.name}
                        className="form-control"
                        disabled={!activeMilestone.editable}
                        onChange={e => {
                          renameMilestoneTitle({
                            activeMilestone,
                            value: e.target.value,
                          })
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Группа этапов</label>
                      <SelectMilestoneGroup
                        value={currentMilestonesGroup}
                        options={milestonesGroups}
                        onChange={value =>
                          changeMilestonesGroups({
                            position: activeMilestone.position,
                            value
                          })}
                      />
                    </div>
                    <div className={cn('margin')} />

                    {/*<Notification*/}
                    {/*needNotification={activeMilestone.need_notification}*/}
                    {/*onChange={this.handlerChangeMilestoneNotification}*/}
                    {/*/>*/}

                    <Evaluation
                      evaluationOfCandidate={activeMilestone.evaluation_of_candidate}
                      onChange={this.handlerChangeMilestoneEvaluation}
                    />
                  </div>

                  <div className={cn('add-after')}>
                    {activeMilestone.can_create_right && (
                      <div
                        onClick={() => {
                          addRightMilestone({milestone: activeMilestone})
                        }}
                        className={cn('add-after-button').mix('cur')}
                      >
                        <Plus outline={30} className={cn('add-after-icon')}/>
                        <span className={cn('add-after-text')}>Добавить этап после</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connector(Container)
