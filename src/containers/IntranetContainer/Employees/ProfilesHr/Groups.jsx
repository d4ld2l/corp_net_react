import React, { Component } from 'react'

import GroupCard from './GroupCard'
import GroupItem from './GroupItem'
import { GROUPS_ITEM_DATA } from './data'
import BtnUpload from './BtnUpload'
import GroupsHeader from './GroupsHeader'

import { v4 } from 'uuid'
import moment from 'moment/moment'
import { getProfilesHrPagination } from "redux-folder/actions/profilesHrActions";
import Loader from "components-folder/Loader";
import {getCandidates} from "../../../../redux/actions/candidatesActions";

const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('../../PersonelRoasterEmployees/css/groups/groups.css')
}
moment.locale('ru')

export default class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: GROUPS_ITEM_DATA,
      showGroupCard: props.defaultOpen,
      showEditGroup: props.defaultOpen,
      groupId: null,
      profile: null,
      showProfile: false,
    }
  }

  componentDidMount() {
    document.querySelectorAll('#profilesHr')[0].addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.querySelectorAll('#profilesHr')[0].removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { dispatch, scroll, page, loaders: { profilesHr } } = this.props
    if (scroll){
      const el = document.querySelectorAll('#profilesHr')[0]
      const scrollBottom = el.scrollHeight - el.offsetTop - el.scrollTop
      if (scrollBottom < 950 && !profilesHr) {
        dispatch(getProfilesHrPagination(page))
      }
    }
  }

  render() {
    const { showGroupCard } = this.state
    const { data, showCardProfile, loaders: { profilesHr } } = this.props
    return (
      <div className={cn('wrapper')}>
        <div
          className={cn('switch-container')}
          style={{ width: showGroupCard || showCardProfile ? '470px' : '100%' }}
        >
          { data.length === 0 && !profilesHr && <div className={cn('empty_search')}> По вашему запросу ничего не найдено </div> }
          { data.length !== 0 && <BtnUpload {...this.props}/> }
          { data.length !== 0 && <GroupsHeader show={showCardProfile} /> }
          <div id='profilesHr' className={cn('scroll global-scroll global-scroll_theme_light')}>
            {
              data.map( it => (
                <GroupItem
                  key={it.id}
                  account={it}
                  {...this.props} />
              ))
            }
            { profilesHr && <Loader/> }
          </div>
        </div>
        { showCardProfile && ( <GroupCard {...this.props} /> )}
      </div>
    )
  }
}
