import React, { Component } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import SortableItem from './SortableItem'

const cn = require('bem-cn')('new-recruiter-request-selection-tab')

class SortableListSrc extends Component {
  render() {
    const { items } = this.props
    return (
      <ul className={cn('milestones-list').mix('lsn pl0 mb0')}>
        {items.map((value, index) => (
          <SortableItem
            key={index}
            index={index}
            value={value}
            disabled={!value.editable}
            sizeWidth={`${100 / items.length}%`}
            addRightMilestone={this.props.addRightMilestone}
          />
        ))}
      </ul>
    )
  }
}

const SortableList = SortableContainer(SortableListSrc)

export default SortableList
