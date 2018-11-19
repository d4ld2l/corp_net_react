import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Arrow, Ok, Spread, Trash } from 'components-folder/Icon'
import { removeWithoutDestroy } from '../../../redux/actions/searchSkills'
import * as employeesActions from  '../../../redux/actions/employeesActions'
import { connect } from 'react-redux'


const cn = require('bem-cn')('employee-card-skill')

if (process.env.BROWSER) {
  require('./employee-card-skill.css')
}



class EmployeeCollapseSkillElem extends Component {
  constructor(props) {
    super(props)
    const {confirm} = this.props

    this.state = {
      isProven: confirm,
      isOpen: props.defaultOpen,
      count: 0,
    }
  }

  render() {
    const { isOpen, isProven } = this.state
    const {
      name_skill,
      count_proven_skill,
      arr_user,
      current_user,
      id,
      confirm,
    } = this.props
    return (
      <div>
        <div className={cn('collapse')} style={{ paddingBottom: isOpen ? '0' : '20px' }}>
          <div className={cn('collapse-head')} onClick={this.openCollapse}>
            <p className={cn('name').mix('p1 p1_theme_light_first indent_reset')}>
              {name_skill}
              <sup className={cn('count').mix('p4 p4_theme_light_third')}>{count_proven_skill}</sup>
            </p>
            { current_user ? (
              <span
                className={cn('wrapper-icon').mix(cn('wrapper-icon-trash'))}
                title={'Удалить навык'}
                onClick={(e) => {
                  e.stopPropagation()
                  this.removeSkill(id)
                }}
              >
              <Trash className={cn('trash-icon')} />
            </span>
            ) : (
              <span
                className={cn('wrapper-icon')}
                title={`${isProven ? 'Навык подтвержден' : 'Подтвердить навык'}`}
                onClick={(e) => {
                  e.stopPropagation()
                  this.targetConfirmSkill()
                }}
              >
              {confirm ? (
                <Ok outline className={cn('proven-icon')} />
              ) : (
                <Plus outline={30} className={cn('proven-icon')}
                />
              )}
            </span>
            )}
            <div className={cn('list-user-proven')}>
              {arr_user.slice(0, 7).map((user, index) => (
                <a
                  key={index}
                  // className="not-collapsible"
                  href={`/employees/${user.id}`}
                >
                  <div
                    className={cn('user-proven')}
                    title={user.full_name}
                    style={{
                      background: `url(${user.photo.url}) center center / cover no-repeat`,
                    }}
                  />
                </a>
              ))}
              {arr_user.length > 6 && <Spread className={cn('spread-icon')} />}
            </div>
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
              {arr_user.length > 0 && <h5 className={('indent_15')}>Навык подтвердили:</h5>}
              {arr_user.length > 0 ? (
                arr_user.map((user, index) => (
                  <div className={cn('user-proven-wrapper')} key={index}>
                    <div
                      className={cn('user-proven')}
                      title={user.full_name}
                      style={{
                        background: `url(${user.photo.url}) center center / cover no-repeat`,
                      }}
                    />
                    <div className={cn('user-proven-wrapper-name-post')}>
                      <Link className={cn('user-proven-link').mix('link link_theme_light_first')} to={`/employees/${user.id}`}>
                        {user.full_name}
                      </Link>
                      <p className={cn('user-proven-post').mix('p2 p2_theme_light_second indent_reset')}>{user.position_name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={cn('proven-info-msg').mix('p1 p1_theme_light_first')}>Навык еще не подтвердили</p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  openCollapse = (e) => {
    if (!e.target.classList.contains('employee-card-skill__user-proven')){
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }
  }
  targetConfirmSkill = async () => {
    const {dispatch, user_id, id, confirm} = this.props
    confirm ? await dispatch(employeesActions.unconfirmEmployeeSkill(id)) : await dispatch(employeesActions.confirmEmployeeSkill(id))
  }
  removeSkill = async (currentId) => {
    const { dispatch, user_id, name_skill } = this.props
    dispatch(employeesActions.removeEmployeeSkill(user_id, currentId))
    dispatch(removeWithoutDestroy(name_skill))
  }
}
export default connect()(EmployeeCollapseSkillElem)
