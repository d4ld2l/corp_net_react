import React, { Component } from 'react'
import { Loupe, Settings, Arrow, Copy, Close } from 'components-folder/Icon/'
import { v4 } from 'uuid'
import moment from 'moment/moment'
import get from 'lodash/get'
import { getProfileHr } from "redux-folder/actions/profilesHrActions";
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/groups/groups.css')
}
moment.locale('ru')

export default class GroupItem extends Component {
  state = {
    open: false,
    showExternalData: false,
  }

  renderDefaultLegalUnit = (account, showLink) => {
    const it = account.default_legal_unit_employee || get(account, 'legal_unit_employees[0]')
    const legalUnits =  account.default_legal_unit_employee ?
      get(account, 'legal_unit_employees', []) :
      (get(account, 'legal_unit_employees.length', 0) > 1 ? account.legal_unit_employees.slice(1,account.legal_unit_employees.length) : [])

    return (
      <div className={cn('table-data')}>
        <div className={cn('table-item').mix(cn('table-item_name'))}>
          <p className={('p1 p1_theme_light_first indent-reset')}>{ get(it, 'legal_unit_name', '') }</p>
          {legalUnits.length > 0 && showLink && (
            <a className={cn('table-link').mix('p2 link_theme_light_first indent-reset')} onClick={e => this.setState({showExternalData: true})}>Ещё {legalUnits.length} юр. лиц</a>
          )}
        </div>
        <div className={cn('table-item').mix(cn('table-item_practice'))}>
          <p className={('p1 p1_theme_light_first indent-reset')}>{ get(it, 'department_name', '') }</p>
        </div>
        <div className={cn('table-item').mix(cn('table-item_rate'))}>
          <p className={('p1 p1_theme_light_first indent-reset')}>{ get(it, 'wage_rate', '') }</p>
        </div>
        <div className={cn('table-item').mix(cn('table-item_unit'))}>
          <p className={('p1 p1_theme_light_first indent-reset')}>{ get(it, 'structure_unit', '') }</p>
        </div>
      </div>
    )
  }

  handlerShowCard = (e) => {
    if (!e.target.classList.contains('groups__table-link')){
      const { dispatch, account } = this.props
      dispatch({type: 'TOGGLE_SHOW_CARD_PROFILE', payload: true})
      dispatch(getProfileHr(account.id))
    }
  }


  render() {
    const { open, showExternalData } = this.state
    const {
      group,
      director,
      show,
      groupId,
      account,
      showCardProfile,
    } = this.props
    const legalUnits =  account.default_legal_unit_employee ?
      get(account, 'legal_unit_employees', []) :
      (get(account, 'legal_unit_employees.length', 0) > 1 ? account.legal_unit_employees.slice(1,account.legal_unit_employees.length) : [])

    return (
      <div
        className={cn('item').mix(
          cn(director ? 'item_fs' : 'item_sb').mix(
            cn(groupId === group && show && 'item_active')
          )
        )}
        onClick={(e) => this.handlerShowCard(e)}
      >
        <div
          className={cn('table-item').mix(cn('table-item_logo'))}
          style={{
            background: `url('${account.photo && account.photo.url}') center center / cover no-repeat`,
          }}
        />
        <div className={cn('table-item').mix(cn('table-item_info'))}>
          <Link to={`/employees/${account.id}`} className={cn('name-title').mix('p1 link_theme_light_first')}>
            {account.full_name}
          </Link>
          <time className={cn('table-date').mix('p2 p2_theme_light_second indent-reset')}>{account.birthday && moment(account.birthday).format('DD.MM.YYYY')}</time>
        </div>
        {showCardProfile ? (
          <div className={cn('table-item').mix(cn('table-item_quantity'))}>
            {get(account, 'legal_unit_employees.length', 0) + (account.default_legal_unit_employee ? 1 : 0)}
          </div>
          ) : showExternalData ? (
            <div className={cn('table')}>
              {this.renderDefaultLegalUnit(account, false)}
                {legalUnits.map((it,i) => (
                  <div className={cn('table-data').mix(cn('table-data_inner'))} key={`${i}:${it.id}`}>
                    <div className={cn('table-item').mix(cn('table-item_name'))}>
                      <p className={cn('table-link')}>{it.legal_unit_name}</p>
                    {(legalUnits.length === (i + 1)) && (
                      <a className={cn('table-link').mix('p1 link_theme_light_first indent-reset')} onClick={e => this.setState({showExternalData: false})}>Скрыть</a>
                    )}
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_practice'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.department_name}</p>
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_rate'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.wage_rate}</p>
                    </div>
                    <div className={cn('table-item').mix(cn('table-item_unit'))}>
                      <p className={('p1 p1_theme_light_first indent-reset')}>{it.structure_unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            ): (
                this.renderDefaultLegalUnit(account, true)
            )}
        <div
          className={cn('item-open-sidebar')}
          title={'Раскрыть карточку группы рассылки'}
          // onClick={() => this.handlerShowCard()}
        >
          <Arrow
            className={cn('item-arrow-icon').mix(
              cn(groupId === group && showCardProfile && 'item-arrow-icon_active')
            )}
          />
        </div>
      </div>
    )
  }

  setCandidate(groupId) {
    this.props.setCandidate(groupId)
  }
}
