import React, { Component } from 'react'
import PDF from 'react-pdf-js'
import get from 'lodash/get'

import CandidateHeader from '../CandidateHeader'

import { cn } from '../common'

export default class PDFLayout extends Component {
  state = {
    pages: null,
    page: 1,
  }

  onDocumentComplete = (pages) => {
    this.setState({page: 1, pages});
  }

  onPageComplete = (page) => {
    this.setState({page});
  }

  handlePrevious = () => {
    this.setState({page: this.state.page - 1});
  }

  handleNext = () => {
    this.setState({page: this.state.page + 1});
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}>
      <a href="javascript://"><i className="fa fa-arrow-left"/> Назад</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="javascript://"><i
        className="fa fa-arrow-left"/> Назад</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a
      href="javascript://">Дальше <i className="fa fa-arrow-right"/></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="javascript://">Дальше <i
        className="fa fa-arrow-right"/></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  render(){
    const { candidate } = this.props
    let pagination = null;
    if (this.state.pages > 1) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <CandidateHeader
          candidate={candidate}
          {...this.props}
        />
        <div className={cn('resume-block')}>
          <div>
            {get(candidate, 'candidate.resume.raw_resume_doc', undefined) && (
              <div>
                <PDF
                  file={candidate.candidate.resume.raw_resume_doc.file.url}
                  onDocumentComplete={this.onDocumentComplete}
                  onPageComplete={this.onPageComplete}
                  page={this.state.page}
                />
                {pagination}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}