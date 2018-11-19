import React, { Component } from 'react'
import HistoryList from './HistoryList'
import {connect} from "react-redux";
import type {CandidateWithIncludesRaw} from "../../../types/raws";

const cn = require('bem-cn')('candidate-history-tabs')
if (process.env.BROWSER) {
  require('./candidate-history-tabs.css')
}

class HistoryTab extends Component {

  render() {
    const {candidate} = this.props

    return (
      <div className={cn()}>
        <h2 className="indent-reset">История взаимодействия с кандидатом</h2>
        <HistoryList candidate={candidate}/>
      </div>
    )
  }
}
export default HistoryTab
