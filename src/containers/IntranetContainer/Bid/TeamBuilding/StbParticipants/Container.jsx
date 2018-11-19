import React, { Component } from 'react'
import moment from 'moment'

import Header from './Header'
import Participants from './Participants'
import Loader from 'components-folder/Loader'
import { isEmpty } from 'lodash'

export const cn = require('bem-cn')('list-of-participants')
if (process.env.BROWSER) {
  require('./style.css')
}

moment.locale('ru')

export default class Container extends Component {
  render() {
    const { stb_participants, loading_stbParticipants, stbParticipantsSearch } = this.props

    return (
      <div className={cn}>
        <div className={cn('body')}>
          <Header />
          {loading_stbParticipants ? (
            <Loader />
          ) : stb_participants.data.length > 0 ? (
            <Participants {...this.props} />
          ) : (
            <p style={{ padding: '20px' }}>
              {
                isEmpty(stbParticipantsSearch.query) ?
                'Участников еще не добавили' :
                'Участники не найдены'
              }
            </p>
          )}
        </div>
      </div>
    )
  }
}
