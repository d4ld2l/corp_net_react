import React, {Component} from 'react'
import DebounceInput from 'react-debounce-input'
import {Close, Loupe, Arrow, Plus} from '../../Icon'

const cn = require('bem-cn')('new-vacancy-form')

class ProjectSelect extends Component {
  state = {
    department: {},
    practice: {},
    practices: [],
    projects: [],
  }
  keyDown = ({key}) => {
    if (key === 'Enter') {
      this.handlerSearch()
    }
  }

  handlerSearch() {
    // const { dispatch, state, value } = this.props
    // if (value.length) {
    //   // dispatch(advancedSearch({ state, value })).then(() => {})
    // }
  }

  handleChange = ({target: {value}}) => {
    // this.props.setValue(value.trim())
    // if (!value.trim().length) {
    //   const { dispatch } = this.props
    //   // dispatch(resetSearch())
    // }
  }
  render() {
  const {department, practice, practices, projects} = this.state
    const {departments, setBlock, setPractice, setProject, setProjectValue, closeBlock} = this.props
    return (
      <div className={cn('project-block')}>
        <h5 className={cn('project-block-title')}>
          <span>Выбрать код проекта</span>
          <span
            onClick={() => closeBlock()}
            className={'cur'}
          ><Close className={cn('icon-close')}/></span>
        </h5>
        {/*<div className={cn('search-field')}>*/}
          {/*<DebounceInput*/}
            {/*minLength={2}*/}
            {/*className={cn('input-search')}*/}
            {/*debounceTimeout={0}*/}
            {/*onChange={this.handleChange}*/}
            {/*onKeyDown={this.keyDown}*/}
          {/*/>*/}
          {/*<Loupe className={cn('icon-magnify')}/>*/}
        {/*</div>*/}
        <div className={cn('project-structure')}>
          <ul className={cn('project-structure-list')}>
            {departments.map(item => (
              <li
                className={cn('project-structure-item').mix('cur').state({active: item.id === department.id})}
                key={item.id}
                onClick={() => {
                  this.setState({
                    practices: item.children,
                    projects: [],
                    department: item,
                  })
                  setProjectValue(item.name_ru)
                  setBlock(item.name_ru)
                }}
              ><span
                className={cn('project-structure-item-title')}>{item.name_ru}
                <span
                  className={cn('project-structure-item-count')}>{item.children.length}</span>
                    </span>
                <Arrow
                  className={cn('project-structure-arrow-icon')}/>
              </li>
            ))}
          </ul>
          <ul className={cn('project-structure-list')}>
            {practices.map(item => (
              <li
                className={cn('project-structure-item').mix('cur').state({active: item.id === practice.id})}
                key={item.id}
                onClick={() => {
                  this.setState({
                    projects: item.children,
                    practice: item,
                  })
                  setProjectValue(`${department.name_ru} / ${item.name_ru}`)
                  setPractice(item.name_ru)
                }}
              ><span
                className={cn('project-structure-item-title')}>{item.name_ru}
                <span
                  className={cn('project-structure-item-count')}>{item.children.length}</span>
                   </span><Arrow
                className={cn('project-structure-arrow-icon')}/>
              </li>
            ))}
          </ul>
          <ul className={cn('project-structure-list')}>
            {projects.map(item => (
              <li
                className={cn('project-structure-item-project').mix('cur')}
                key={item.id}
                onClick={() => {
                  setProjectValue(`${department.name_ru} / ${practice.name_ru} / ${item.name_ru}`)
                  setProject(item.name_ru)
                }}
              >
                <Plus outline={'filled'} className={cn('project-structure-plus-icon')}/>
                <span
                  className={cn('project-structure-item-title')}>{item.name_ru}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProjectSelect
