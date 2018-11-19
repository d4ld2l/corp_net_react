import React, { Component } from 'react'

import { Plus, Arrow, Ok, Spread, Trash } from 'components-folder/Icon'
import {connect} from "react-redux";
import moment from "moment/moment";
import EmployeeCollapseSkillElem from './EmployeeCollapseSkillElem'
import EmployeeSkillForm from './EmployeeSkillForm'
import { getDictionarySkills } from 'redux-folder/actions/dictionariesActions'
import {fillSkills} from "../../../redux/actions/searchSkills";
import * as employeesActions from "../../../redux/actions/employeesActions";


const cn = require('bem-cn')('employee-card-skill')

if (process.env.BROWSER) {
  require('./employee-card-skill.css')
}

moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
    user: state.user,
    state
  }),
  dispatch => (
    {
      dispatch: dispatch,
    }
  )
)

class EmployeeCardTabSkill extends Component {
  componentDidMount() {
    const { current, dispatch } = this.props
    dispatch(fillSkills(current.account_skills))
  }

  render() {
    const {current, user } = this.props
    return (
      <div className={cn('wrapper')}>
        { current.id === user.id && <EmployeeSkillForm user_id={current.id} /> }
        { current.account_skills.length > 0  ? current.account_skills.map((skill, index) => (
            <EmployeeCollapseSkillElem
              key={index}
              name_skill={skill.skill.name}
              count_proven_skill={skill.skill_confirmations_count}
              arr_user={skill.skill_confirmations.map(({account}) => account)}
              current_user={current.id === user.id}
              user_id={current.id}
              confirm = {!((skill.skill_confirmations.map((it)=> (it.account.id))).indexOf(user.id) < 0)}
              id={skill.id}/>
          )) : (
            <h3>Пользователь еще не заполнил навыки.</h3>
          )
        }
      </div>
    )
  }

}

export default connector(EmployeeCardTabSkill)

