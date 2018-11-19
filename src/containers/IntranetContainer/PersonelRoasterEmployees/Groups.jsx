
import React, { Component } from 'react'

import GroupCard from './GroupCard'
import GroupItem from './GroupItem'
import { GROUPS_ITEM_DATA } from './data'
import BtnUpload from './BtnUpload'
import GroupsHeader from './GroupsHeader'

import { v4 } from 'uuid'
import moment from 'moment/moment'

const cn = require('bem-cn')('groups')
if (process.env.BROWSER) {
  require('./css/groups/groups.css')
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
    }
  }

  render() {
    const { showGroupCard, showEditGroup, groups, groupId, show } = this.state
    const { disabled, available_to_me } = this.props
    return (
      <div className={cn('wrapper')}>
        <div
          className={cn('switch-container')}
          style={{ width: showGroupCard || showEditGroup ? '470px' : '100%' }}
        >
          <BtnUpload />
          <GroupsHeader show={showGroupCard} />

          {available_to_me
            ? groups.map((it,i) => (
              <GroupItem
                key={`available_to_me${i}:${it.name}:${it.group_id}`}
                group={it}
                director={true}
                setting={false}
                onClick={this.handlerGroupCard}
                show={showGroupCard}
                groupId={groupId}
              />
            ))
            : groups.map((it,i) => (
              <GroupItem
                key={`!available_to_me${i}:${it.name}:${it.group_id}`}
                group={it}
                read={true}
                link_title={true}
                link_connecting_text={true}
                link_concluding={true}
                director={false}
                setting={true}
                onClick={this.handlerGroupCard}
                show={showGroupCard}
                groupId={groupId}
              />
            ))}
        </div>
        {showGroupCard && (
          <GroupCard
            closeSidebar={() => this.setState({ showGroupCard: false })}
            groupId={groupId}
            group={groupId}
          />
        )}
      </div>
    )
  }

  handlerGroupCard = ({ groupId, show, showEditGroupCard }) => {
    this.setState({
      groupId,
      showGroupCard: show,
      showNewGroup: false,
      showEditGroup: showEditGroupCard,
    })
  }

}
