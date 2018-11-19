import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js-infinite';
import get from 'lodash/get'
import { Arrow } from 'components-folder/Icon'
import EducationCollapse from './EducationCollapse'
import RecommendationsCollapse from './RecommendationsCollapse'
import GeneralInfoCollapse from './GeneralInfoCollapse'
import ExperienceCollapse from './ExperienceCollapse'
import { setInitialResumeView, switchResumeView } from 'redux-folder/actions/candidatesActions'
// import PDF from 'react-pdf-js'

const cn = require('bem-cn')('candidate-resume-tabs')

if (process.env.BROWSER) {
  require('./candidate-resume-tabs.css')
}

const connector = connect(
  ({ candidates: { resumeTabSwitcher } }) => ({
    resumeTabSwitcher
  }),
  {
    setInitialResumeView,
    switchResumeView
  }
)

class ResumeTab extends Component {
  state = {
    pages: null,
    page: 1,
  }

  componentDidMount(){
    this.props.setInitialResumeView()
  }

  // onDocumentComplete = (pages) => {
  //   this.setState({ page: 1, pages });
  // }
  //
  // onPageComplete = (page) => {
  //   this.setState({ page });
  // }
  //
  // handlePrevious = () => {
  //   this.setState({ page: this.state.page - 1 });
  // }
  //
  // handleNext = () => {
  //   this.setState({ page: this.state.page + 1 });
  // }
  //
  // renderPagination = (page, pages) => {
  //   let previousButton = <li className="previous" onClick={this.handlePrevious}>
  //     <a href="#"><i className="fa fa-arrow-left"/> Назад</a></li>;
  //   if (page === 1) {
  //     previousButton = <li className="previous disabled"><a href="#"><i
  //       className="fa fa-arrow-left"/> Назад</a></li>;
  //   }
  //   let nextButton = <li className="next" onClick={this.handleNext}><a
  //     href="#">Дальше <i className="fa fa-arrow-right"/></a></li>;
  //   if (page === pages) {
  //     nextButton = <li className="next disabled"><a href="#">Дальше <i
  //       className="fa fa-arrow-right"/></a></li>;
  //   }
  //   return (
  //     <nav>
  //       <ul className="pager">
  //         {previousButton}
  //         {nextButton}
  //       </ul>
  //     </nav>
  //   );
  // }

  renderResume(resume) {
    // let pagination = null;
    // if (this.state.pages > 1) {
    //   pagination = this.renderPagination(this.state.page, this.state.pages);
    // }

    return (
      <div key={`resumeTabSwitcher${resume.id}`}>
        {resume.raw_resume_doc_id ? (
          <div>
            {resume.raw_resume_doc && (
              <div className={cn('pdf-scroll').mix('global-scroll global-scroll_theme_light')}>
                {/*<PDF*/}
                  {/*file={resume.raw_resume_doc.file.url}*/}
                  {/*onDocumentComplete={this.onDocumentComplete}*/}
                  {/*onPageComplete={this.onPageComplete}*/}
                  {/*page={this.state.page}*/}
                {/*/>*/}
                {/*{pagination}*/}

                <PDF file={resume.raw_resume_doc.file.url} scale={1} />
              </div>
            )}
          </div>
          ) : (
          <div>
            <ExperienceCollapse resume={resume}/>
            <GeneralInfoCollapse resume={resume}/>
            <EducationCollapse resume={resume}/>
            <RecommendationsCollapse resume={resume}/>
          </div>
        )}
      </div>
    )
  }

  renderVersionButtons(){
    const { candidate, switchResumeView, resumeTabSwitcher } = this.props
    if (candidate.old_resumes.length > 0)
      return (
        <div className={cn('wrapper-btn')}>
            <button
              key={`switchResumeViewResume`}
              className={cn('color_waterBlue').is({ active: resumeTabSwitcher === `resume` })}
              onClick={() => {
                switchResumeView(`resume`)
              }}
            >
              Резюме 1
            </button>
          {candidate.old_resumes.map((it, i) => (
            <button
              key={`switchResumeView${i}`}
              className={cn('color_waterBlue').is({ active: resumeTabSwitcher === `old_resumes[${i}]` })}
              onClick={() => {
                switchResumeView(`old_resumes[${i}]`)
              }}
            >
              Резюме {i+2}
            </button>
          ))}
        </div>
      )
    return (<span/>)

  }

  render() {
    const { candidate, resumeTabSwitcher } = this.props
    return (
      <div>
        {this.renderVersionButtons.call(this)}
        {this.renderResume.call(this, get(candidate, resumeTabSwitcher, candidate.resume))}
      </div>
    )
  }
}

export default connector(ResumeTab)
