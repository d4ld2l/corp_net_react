import React, { PureComponent, type Node } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'

import block from 'bem-cn'
import { pick } from 'ramda'

import Loader from 'components-folder/Loader'
import { Arrow } from 'components-folder/Icon'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'

import * as departmentsActions from '../../../redux/actions/departmentsActions'

import type { LoadersState, DepartmentsState, StructureState } from '../../../types/states'

import type { Dispatch } from '../../../types/actions'
import type { AssociatePresenterType, DepartmentPresenterType } from '../../../types/presenters'

const cn = block('structure')

if (process.env.BROWSER) {
  require('./style.css')
}

type Props = {
  dispatch: Dispatch,
  loaders: LoadersState,
  departments: DepartmentsState,
  structure: StructureState,
}

type StackItem = DepartmentPresenterType
type Stack = Array<StackItem>

type State = {
  stack: Stack,
}

const connector = connect(pick(['departments', 'structure', 'loaders']))

class Structure extends PureComponent<Props, State> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(departmentsActions.getDepartmentsTree())
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(departmentsActions.releaseDepartmentsTree())
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.structure.length === 0 && nextProps.departments.length === 1) {
      this.stack.reset([nextProps.departments[0]])
    }
  }

  stack = {
    push: (item: StackItem) => this.props.dispatch({ type: 'STRUCTURE_PUSH', payload: item }),
    goBack: () => this.props.dispatch({ type: 'STRUCTURE_GO_BACK' }),
    goTo: (level: number) => this.props.dispatch({ type: 'STRUCTURE_GO_TO', payload: level }),
    reset: (stack: Stack) => this.props.dispatch({ type: 'STRUCTURE_UPDATE', payload: stack }),
  }

  Item = ({ title, onClick }) => {
    const stack = this.props.structure
    const root = !(stack.length > 0)

    return (
      <div className={cn('item')} onClick={onClick}>
        <div className={cn('item-text', { root })}>
          {title}
          {/* TODO: Выводить тольок на первом уровне */}
          {/* <sup className={cn('count-number')}>4</sup> */}
        </div>
        <div className={cn('item-arrow')}>
          <Arrow style={{ transform: 'rotate(-90deg)' }} color="#93959a" />
        </div>
      </div>
    )
  }

  SectionHeader = ({
    title,
    count,
    underline,
    onBackClick,
    onClick,
  }: {
    title: string,
    count?: number,
    underline?: boolean,
    onBackClick?: () => void,
    onClick?: () => void,
  }) => {
    const back = typeof onBackClick !== 'undefined'

    return (
      <div className={cn('section-header')}>
        {onClick && (
          <div className={cn('section-header-back')} onClick={onBackClick}>
            <Arrow style={{ transform: 'rotate(90deg)' }} color={'#fff'} className={cn('section-header-back-icon')} />
          </div>
        )}

        <div onClick={onClick} className={cn('section-header-text-wrap', { back, underline })}>
          <div className={cn('section-header-text')}>
            {title}
            {count !== undefined && <span className={cn('section-header-count')}>{count}</span>}
          </div>
        </div>
      </div>
    )
  }

  RootItems = () => {
    const { departments, structure: stack } = this.props

    if (departments.length === 1) return null

    let active = null

    if (stack.length > 0) {
      active = stack[0]
    }

    return (
      <div className={cn('root-items', { active: !!active })}>
        {departments.map(department => (
          <div
            key={department.id}
            className={cn('item-logo', { active: !!active && active.id === department.id })}
            onClick={() => this.stack.reset([department])}
          >
            <img src={department.logo} className={cn('item-logo-img')} />
          </div>
        ))}
      </div>
    )
  }

  HeaderCrumbs = () => {
    const stack = this.props.structure
    const breadcrumbs = stack.map(it => it.name)
    const size = stack.length
    const onClick = (level: number) => this.stack.goTo(level)

    return (
      <div className={cn('breadcrumbs')}>
        {breadcrumbs.map((it, index) => (
          <div key={`breadcrumb-${index}`} className={cn('breadcrumb')}>
            <Arrow style={{ transform: 'rotate(-90deg)' }} color="#93959a" className={cn('breadcrumb-arrow')} />
            {index !== size - 1 ? (
              <span
                onClick={() => onClick(index + 1)}
                className={cn('breadcrumb-text', { link: true })}
              >
                {it}
              </span>
            ) : (
              <span className={cn('breadcrumb-text')}>{it}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  Header = ({ children, logo = '/public/main-logo.png' }: { logo?: string, children?: Node }) => {
    const { HeaderCrumbs } = this
    const onClick = () => this.stack.reset([])

    return (
      <div className={cn('header')}>
        <div onClick={onClick} className={cn('header-logo')}>
          <img src={window.dcss.getVariable('signin_logo_url')} className={cn('header-logo-img')} alt="logo" />
        </div>
        {children}
      </div>
    )
  }

  People = ({
    id,
    title,
    small,
    name,
    photo,
    position,
  }: {
    id: number,
    title?: string,
    small?: boolean,
    name: string,
    photo: string,
    position: string,
  }) => {
    const avatarSize = small ? 30 : 45

    return (
      <Link to={`/employees/${id}`} className={cn('people')}>
        {title && <div className={cn('people-title')}>{title}</div>}
        <div className={cn('people-wrap')}>
          <div className={cn('people-l')}>
            <img
              width={avatarSize}
              height={avatarSize}
              src={photo}
              className={cn('people-photo-img')}
            />
          </div>
          <div className={cn('people-r')}>
            <div className={cn('people-name')}>{name}</div>
            <div className={cn('people-position', { small })}>{position}</div>
          </div>
        </div>
      </Link>
    )
  }

  Participants = ({
    section,
    collapse = true,
  }: {
    collapse?: boolean,
    section: {
      manager: AssociatePresenterType,
      participants: Array<AssociatePresenterType>,
      dropdownActive?: boolean,
    },
  }) => {
    const { People } = this
    const { manager, participants } = section
    const { dispatch } = this.props
    const onClick = () => dispatch({ type: 'STRUCTURE_TOGGLE_PARTICIPANTS', payload: section })

    return (
      <div className={cn('section-inner')}>
        {!!manager && (
          <People
            id={manager.id}
            title={'Руководитель'}
            photo={manager.avatar}
            name={manager.name}
            position={manager.position}
          />
        )}
        {participants && (
          <div className={cn('section-collapse')}>
            <div
              onClick={onClick}
              className={cn('section-collapse-header', { active: section.dropdownActive })}
            >
              {'Сотрудники'}
              <Arrow
                dir={section.dropdownActive ? 'up' : 'down'}
                className={cn('section-collapse-icon')}
                color="#93959a"
              />
            </div>
            {section.dropdownActive &&
              participants.map(it => (
                <People
                  key={it.id}
                  id={it.id}
                  small
                  photo={it.avatar}
                  name={it.name}
                  position={it.position}
                />
              ))}
          </div>
        )}
      </div>
    )
  }

  LevelOne = () => {
    const { Item, RootItems } = this
    const { departments } = this.props

    return (
      <div className={cn('level-one')}>
        <RootItems />
        <div className={cn('section', { full: true })}>
          {departments.map(department => (
            <Item
              title={department.name}
              key={department.id}
              onClick={() => this.stack.push(department)}
            />
          ))}
        </div>
      </div>
    )
  }

  LevelTwo = () => {
    const stack = this.props.structure
    const { Item, SectionHeader, RootItems } = this
    const current = stack[0]
    const { children: blocks } = current

    return (
      <div className={cn('level-two')}>
        <RootItems />
        <div className={cn('section', { full: true })}>
          <SectionHeader underline title={'Блоки'} count={blocks.length} />
          {blocks.map(block => (
            <Item key={block.id} title={block.name} onClick={() => this.stack.push(block)} />
          ))}
        </div>
      </div>
    )
  }

  LevelThree = () => {
    const stack = this.props.structure
    const { Item, SectionHeader, RootItems, Participants } = this
    const onBackClick = () => this.stack.goTo(1)
    const onClick = () => this.stack.goTo(2)
    const current = stack[1]
    const { children: practices } = current

    return (
      <div className={cn('level-three')}>
        <RootItems />
        {practices.length > 0 ? (
          [
            <div key={'prev'} className={cn('section', { limit: true, border: true })}>
              <SectionHeader onClick={onClick} onBackClick={onBackClick} title={current.name} />
              <Participants section={current} />
            </div>,
            <div key={'current'} className={cn('section', { full: true, pad: true })}>
              <SectionHeader title={'Практики'} count={current.count} />
              {practices.map(practice => (
                <Item
                  key={practice.id}
                  title={practice.name}
                  onClick={() => this.stack.push(practice)}
                />
              ))}
            </div>,
          ]
        ) : (
          <div className={cn('section', { full: true, pad: true, border: true })}>
            <SectionHeader title={current.name} count={current.count} />
            <Participants section={current} />
          </div>
        )}
      </div>
    )
  }

  LevelFour = () => {
    const stack = this.props.structure
    const { Item, SectionHeader, Participants, RootItems } = this
    const prev = stack[1]
    const onPrevBackClick = () => this.stack.goTo(1)
    const onPrevClick = () => this.stack.goTo(2)
    const onCurrentBackClick = () => this.stack.goTo(2)
    const onCurrentClick = () => this.stack.goTo(3)
    const current = stack[2]
    const { children: departments } = current

    return (
      <div className={cn('level-three')}>
        <RootItems />
        <div className={cn('section', { limit: true, border: true })}>
          <SectionHeader onClick={onPrevClick} onBackClick={onPrevBackClick} title={prev.name} />
          <Participants section={prev} />
        </div>

        {departments.length > 0 ? (
          [
            <div key={'current'} className={cn('section', { limit: true, border: true })}>
              <SectionHeader
                onClick={onCurrentClick}
                onBackClick={onCurrentBackClick}
                title={current.name}
              />
              <Participants section={current} />
            </div>,
            <div key={'items'} className={cn('section', { full: true, pad: true })}>
              <SectionHeader title={'Отделы'} count={departments.length} />
              {departments.map(department => (
                <Item
                  key={department.id}
                  title={department.name}
                  onClick={() => this.stack.push(department)}
                />
              ))}
            </div>,
          ]
        ) : (
          <div className={cn('section', { full: true, pad: true, border: true })}>
            <SectionHeader title={current.name} count={current.count} />
            <Participants section={current} />
          </div>
        )}
      </div>
    )
  }

  LevelLast = () => {
    const stack = this.props.structure
    const { SectionHeader, Participants, RootItems } = this
    const last = stack[1]
    const onLastBackClick = () => this.stack.goTo(1)
    const onLastClick = () => this.stack.goTo(2)
    const onPrevBackClick = () => this.stack.goTo(2)
    const onPrevClick = () => this.stack.goTo(3)
    const prev = stack[2]
    const current = stack[3]

    return (
      <div className={cn('level-three')}>
        <RootItems />
        <div className={cn('section', { limit: true, border: true })}>
          <SectionHeader onClick={onLastClick} onBackClick={onLastBackClick} title={last.name} />
          <Participants section={last} />
        </div>
        <div className={cn('section', { limit: true, border: true })}>
          <SectionHeader onClick={onPrevClick} onBackClick={onPrevBackClick} title={prev.name} />
          <Participants section={prev} />
        </div>
        <div className={cn('section', { full: true, pad: true })}>
          <SectionHeader title={current.name} count={current.count} />
          <Participants collapse={false} section={current} />
        </div>
      </div>
    )
  }

  Body = () => {
    const { loaders, structure: stack } = this.props
    const { LevelOne, LevelTwo, LevelThree, LevelFour, LevelLast } = this

    let Component

    const level = stack.length + 1

    switch (level) {
      case 1:
        Component = LevelOne
        break
      case 2:
        Component = LevelTwo
        break
      case 3:
        Component = LevelThree
        break
      case 4:
        Component = LevelFour
        break
      case 5:
        Component = LevelLast
        break
      default:
        Component = LevelOne
        break
    }

    return <div className={cn('body')}>{loaders.departments ? <Loader /> : <Component />}</div>
  }

  Main = () => {
    const { Body, Header, HeaderCrumbs } = this

    return (
      <div className={cn('inner')}>
        <Header>
          <HeaderCrumbs />
        </Header>
        <div className={cn('main')}>
          <Body />
        </div>
      </div>
    )
  }

  render() {
    const { Main } = this

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col xs={11} xsOffset={1}>
            <Helmet>
              <title>{'Организационная структура'}</title>
            </Helmet>
            <Breadcrumbs breadcrumbs={[{ name: 'Организационная структура', active: true }]} />
            <h1 className={'indent_20'}>Организационная структура</h1>
            <Main />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Structure)
