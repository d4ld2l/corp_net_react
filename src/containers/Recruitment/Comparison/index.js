import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { pick } from 'ramda'
import isUndefined from 'lodash/isUndefined'

import Wrapper from 'components-folder/Wrapper'
import Header from 'components-folder/Recruitment/Comparison/Header'
import ControlPanel from 'components-folder/Recruitment/Comparison/ControlPanel'
import PdfLayout from 'components-folder/Recruitment/Comparison/Layouts/PdfLayout'
import NormalLayout from 'components-folder/Recruitment/Comparison/Layouts/NormalLayout'
import Loader from 'components-folder/Loader'

import * as comparisonActions from 'redux-folder/actions/comparisonAction'
import { releaseCurrentCandidate } from 'redux-folder/actions/candidatesActions'

import { cn } from 'components-folder/Recruitment/Comparison/common'

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(pick(['candidates', 'comparison', 'loaders', 'vacancies', 'user']), {
  releaseCurrentCandidate,
  ...comparisonActions
})

class Comparison extends Component {
  componentDidMount() {
    const { initComparison, match: { params: { id = 0 } } } = this.props
    initComparison(id)
  }

  componentWillUnmount() {
    this.props.releaseCurrentCandidate()
  }

  render() {
    if (
      this.props.loaders.currentCandidate ||
      !this.props.candidates.current ||
      !this.props.candidates.current.similar_candidates ||
      this.props.candidates.select.length === 0 ||
      isUndefined(this.props.comparison.positionInArray)
    )
      return (
        <div className="container">
          <Loader />
        </div>
      )

    const { comparison: { candidates, isAnyPdf } } = this.props

    if (isAnyPdf) 
      return (
      <Wrapper className={cn}>
        <Header {...this.props}/>
        <div className={cn('wrapper-pdf')}>
          <div className={cn('resume-left')}>
            {candidates[0].isPdf
              ? <PdfLayout candidate={candidates[0]} {...this.props}/>
              : <NormalLayout {...this.props}/>
            }
          </div>
          <div className={cn('resume-right')}>
            {candidates[1].isPdf
              ? <PdfLayout candidate={candidates[1]} {...this.props}/>
              : <NormalLayout {...this.props}/>
            }
          </div>
        </div>
        <ControlPanel {...this.props}/>
      </Wrapper>
      )

    return (
      <Wrapper className={cn}>
        <Header {...this.props}/>
        <NormalLayout {...this.props}/>
        <ControlPanel {...this.props}/>
      </Wrapper>
    )
  }
}

export default connector(Comparison)
