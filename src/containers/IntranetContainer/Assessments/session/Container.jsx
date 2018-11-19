import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import { Row, Col } from 'react-bootstrap';
import Breadcrumbs from 'components-folder/Breadcrumbs/';
import InfoBar from './InfoBar';
import Welcome from './Welcome';
import Competence from './Competence';
import Goodbye from './Goodbye';
import { getAssessmentSession, resetAssessmentSession } from 'redux-folder/actions/assessmentActions'
import Loader from 'components-folder/Loader';
import { get } from 'lodash'

export const cn = require('bem-cn')('assessment');
if (process.env.BROWSER) {
  require('./css/style.css');
}

moment.locale('ru');

export default class Container extends Component {

  componentDidMount(){
    const { dispatch, match } = this.props
    dispatch(resetAssessmentSession())
    dispatch(getAssessmentSession(match.params.id))
  }

  render() {
    const {
      beginAssessment,
      completeAssessment,
      toAssessments,
      nextCompetenceIndex,
      prevCompetenceIndex,
      begin_assessment,
      complete_assessment,
      to_assessment,
      nextCompetence,
      assessment,
      sendAssessmentSession,
      loaderAssessmentSession
    } = this.props;
    const {
      system: { menu }
    } = this.props.state;
    const background = `${assessment.color}`;
    const condition =
      background === '#ededed' ||
      background === '#ffffff' ||
      background === '#fff' ||
      background === '' ||
      background === null;

    const backgroundAssessment = {
      backgroundColor: background
    };

    return (
      <div>
        <div className={cn('background')} style={backgroundAssessment} />
        <div className={'container'}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Helmet>
                <title>
                  {menu.find(it => it.id === 'shr_assessment').label}
                </title>
              </Helmet>
              {loaderAssessmentSession ? (
                <Loader />
              ) : (
              <div>
                <Breadcrumbs
                  breadcrumbs={[
                    { name: `${assessment.name}`, active: true }
                  ]}
                  style={
                    condition
                      ? { color: `#93959a` }
                      : { color: `rgba(255, 255, 255, 0.5)` }
                  }
                />
                <Header
                  style={condition ? { color: `#34363c` } : { color: `#fff` }}
                  name={assessment.name}
                />
                <InfoBar assessment={assessment} />
                {!begin_assessment && (
                  <Welcome
                    onClick={() => beginAssessment()}
                    description={assessment.description}
                    emblem={get(assessment,'logo.url')}
                  />
                )}
                {begin_assessment &&
                !complete_assessment && (
                  <Competence
                    key="competence"
                    sendAssessmentSession={(id) => sendAssessmentSession(id)}
                    onClickComplete={() => completeAssessment()}
                    onClickNextCompetence={() =>
                      nextCompetenceIndex(nextCompetence)
                    }
                    onClickPrevCompetence={() =>
                      prevCompetenceIndex(nextCompetence)
                    }
                    nextCompetence={nextCompetence}
                    assessment={assessment}
                  />
                )}
                {begin_assessment &&
                complete_assessment &&
                !to_assessment &&
                <Goodbye
                  onClick={() => toAssessments()}
                  goodbeyText={assessment.final_step_text}
                  emblem={assessment.logo.url}
                />
                }
              </div>)
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const Header = ({ name, style }) => (
  <div className={cn('head')}>
    <h1 style={style} className={cn('head-title')}>
      {name}
    </h1>
  </div>
);
