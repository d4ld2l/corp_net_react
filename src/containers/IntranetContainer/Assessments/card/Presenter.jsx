import React, { Component } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Col, Row } from 'react-bootstrap';
import Loader from 'components-folder/Loader';
import { chunk, isNull } from 'lodash';
import { Helmet } from 'react-helmet';
import Breadcrumbs from 'components-folder/Breadcrumbs/';
import Collapse from 'components-folder/Redesign/Collapse/Collapse'
import moment from 'moment';

export const cn = require('bem-cn')('assessment-result');
if (process.env.BROWSER) {
  require('./css/style.css');
}

moment.locale('ru');

export default class Presenter extends Component {
  componentDidMount() {
    const {
      loadAssessmentCard,
      match: {
        params: { id }
      }
    } = this.props;
    loadAssessmentCard(id);
  }

  render() {
    const { sessionResult, loaderAssessmentSession } = this.props;
    const avgScoreArr =
      !loaderAssessmentSession && sessionResult &&
      sessionResult.skills.map(it => [
        it.indicators.common.map(it => it.avg_score),
        it.indicators.self.map(it => it.avg_score),
        it.indicators.not_self.map(it => it.avg_score),
        it.indicators.manager.map(it => it.avg_score),
        it.indicators.associate.map(it => it.avg_score),
        it.indicators.subordinate.map(it => it.avg_score)
      ]);

    const labels = [
      {
        name: 'Общая',
        color: window.dcss.getVariable('dusty_orange'),
        color_radar: window.dcss.getVariable('dusty_orange_7'),
        hidden: true
      },
      {
        name: 'Самооценка',
        color: window.dcss.getVariable('golden_rod'),
        color_radar: window.dcss.getVariable('golden_rod_7'),
        hidden: false
      },
      {
        name: 'Все оценки, кроме самостоятельной',
        color: window.dcss.getVariable('turtle_green'),
        color_radar: window.dcss.getVariable('turtle_green_7'),
        hidden: false
      },
      {
        name: 'Оценка руководителей',
        color: window.dcss.getVariable('greenblue'),
        color_radar: window.dcss.getVariable('greenblue_7'),
        hidden: true
      },
      {
        name: 'Оценка коллег',
        color: window.dcss.getVariable('water_blue'),
        color_radar: window.dcss.getVariable('water_blue_7'),
        hidden: true
      },
      {
        name: 'Оценка подчиненных',
        color: window.dcss.getVariable('twilight'),
        color_radar: window.dcss.getVariable('twilight_7'),
        hidden: true
      }
    ];

    if (!loaderAssessmentSession && sessionResult && sessionResult.session.status !== 'closed') {
      return (
        <div className={'container'}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <Helmet>
                <title>Результат оценки</title>
              </Helmet>
              {loaderAssessmentSession ? (
                <Loader />
              ) : (
                <div>
                  <Breadcrumbs
                    breadcrumbs={[
                      { name: `${sessionResult.session.name}`, active: true }
                    ]}
                  />
                  <div className={cn} style={{ marginTop: '10px' }}>
                    <h2>Результаты обрабатываются</h2>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <div className={'container'}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Helmet>
              <title>Результат оценки</title>
            </Helmet>
            {loaderAssessmentSession ? (
              <Loader />
            ) : (
              <div>
                <Breadcrumbs
                  breadcrumbs={[
                    { name: `${sessionResult.session.name}`, active: true }
                  ]}
                />
                <Header
                  name={sessionResult.session.name}
                  assessmentCount={sessionResult.evaluations_count}
                />
                <Collapse label={'Выводы'} className={cn('result')} isExpanded={false}>
                  <p className={'p3 p3_theme_light indent_3'}>Явные сильные стороны</p>
                  <p
                    className={cn('description').mix('indent_reset indent_15')}
                    dangerouslySetInnerHTML={{
                      __html: (sessionResult.session.obvious_fortes === null) ? '—' : sessionResult.session.obvious_fortes
                    }}
                  />
                  <p className={'p3 p3_theme_light indent_3'}>Скрытые сильные стороны</p>
                  <p
                    className={cn('description').mix('indent_reset indent_15')}
                    dangerouslySetInnerHTML={{
                      __html: (sessionResult.session.hidden_fortes === null) ? '—' : sessionResult.session.hidden_fortes
                    }}
                  />
                  <p className={'p3 p3_theme_light indent_3'}>Зоны развития</p>
                  <p
                    className={cn('description').mix('indent_reset indent_15')}
                    dangerouslySetInnerHTML={{
                      __html: (sessionResult.session.growth_direction === null) ? '—' : sessionResult.session.growth_direction
                    }}
                  />
                  <p className={'p3 p3_theme_light indent_3'}>Слепое пятно</p>
                  <p
                    className={cn('description').mix('indent_reset indent_15')}
                    dangerouslySetInnerHTML={{
                      __html: (sessionResult.session.blind_spots === null) ? '—' : sessionResult.session.blind_spots
                    }}
                  />
                  <p className={'p3 p3_theme_light indent_3'}>Общий вывод</p>
                  <p
                    className={cn('description').mix('indent_reset')}
                    dangerouslySetInnerHTML={{
                      __html: (sessionResult.session.conclusion === null) ? '—' : sessionResult.session.conclusion
                    }}
                  />
                </Collapse>
                <div className={cn} style={{ marginTop: '10px' }}>
                  <h2>Общий график</h2>
                  <div className={cn('general-chart')}>
                    <div>
                      <Radar
                        data={{
                          labels: sessionResult.skills.map(it => it.name),
                          datasets: labels.map((label, index) => ({
                            label: label.name,
                            backgroundColor: label.color_radar,
                            borderColor: label.color_radar,
                            borderWidth: 1,
                            hoverBackgroundColor: label.color_radar,
                            hoverBorderColor: label.color_radar,
                            hidden: label.hidden,
                            data: sessionResult.skills.map(
                              it =>
                                [
                                  it.avg_score_common,
                                  it.avg_score_self,
                                  it.avg_score_not_self,
                                  it.avg_score_manager,
                                  it.avg_score_associate,
                                  it.avg_score_subordinate
                                ][index]
                            )
                          }))
                        }}
                        options={{
                          scale: {
                            ticks: {
                              beginAtZero: true,
                              max: 6
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={cn('wrapper-skills')}>
                    {sessionResult.skills.map((skills, i) => (
                      <div
                        key={skills.name + `_${i}`}
                        className={cn('wrapper-skill')}>
                        <h2 className={'indent_15'}>{skills.name}</h2>
                        <p className={'p3 p3_theme_light indent_3'}>Описание</p>
                        <p
                          className={cn('description').mix('indent_reset indent_23')}
                          dangerouslySetInnerHTML={{
                            __html: skills.description
                          }}
                        />
                        <p className={'p3 p3_theme_light indent_3'}>Комментарии</p>
                        {!skills.comments.length > 0 ?
                          <p className={'indent_23'}>Их забыли оставить, будь первым!</p> :
                          <ul className={cn('list').mix('indent_23')}>
                            {chunk(skills.comments, 1).map((comment, commentIndex) =>
                              <li key={comment + '_' + commentIndex} className={cn('inner')}>
                                <p
                                  className={cn('comment').mix('indent_reset')}
                                  dangerouslySetInnerHTML={{
                                    __html: comment
                                  }}
                                />
                              </li>
                            )}
                          </ul>
                        }
                        <div className={cn('skill')}>
                          <div style={{ minWidth: '230px', maxWidth: '230px' }}>
                            <p className={'p3 p3_theme_light indent_3'}>Средний балл</p>
                            <ul className={cn('list')}>
                              <li className={cn('inner')}>
                                <p>
                                  Общая оценка:{' '}
                                  {isNull(skills.avg_score_common)
                                    ? '—'
                                    : skills.avg_score_common}
                                </p>
                              </li>
                              <li className={cn('inner')}>
                                <p>
                                  Самооценка:{' '}
                                  {isNull(skills.avg_score_self)
                                    ? '—'
                                    : skills.avg_score_self}
                                </p>
                              </li>
                              <li className={cn('inner')}>
                                <p>
                                  Все оценки, кроме самостоятельной:{' '}
                                  {isNull(skills.avg_score_not_self)
                                    ? '—'
                                    : skills.avg_score_not_self}
                                </p>
                              </li>
                              <li className={cn('inner')}>
                                <p>
                                  Оценка руководителей:{' '}
                                  {isNull(skills.avg_score_manager)
                                    ? '—'
                                    : skills.avg_score_manager}
                                </p>
                              </li>
                              <li className={cn('inner')}>
                                <p>
                                  Оценка коллег:{' '}
                                  {isNull(skills.avg_score_subordinate)
                                    ? '—'
                                    : skills.avg_score_subordinate}
                                </p>
                              </li>
                              <li className={cn('inner')}>
                                <p>
                                  Оценка подчиненных:{' '}
                                  {isNull(skills.avg_score_associate)
                                    ? '—'
                                    : skills.avg_score_associate}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div style={{ flex: '1', height: '300px' }}>
                            <Bar
                              data={{
                                labels: sessionResult.session.skills[i].indicators.reverse().map(indicator =>
                                  chunk(indicator.name.split(' '), 3)
                                ),
                                datasets: labels.map((label, index) => ({
                                  label: label.name,
                                  backgroundColor: label.color,
                                  borderColor: label.color,
                                  borderWidth: 1,
                                  hoverBackgroundColor: label.color,
                                  hoverBorderColor: label.color,
                                  data: avgScoreArr[i][index]
                                }))
                              }}
                              width={100}
                              height={100}
                              options={{
                                maintainAspectRatio: false,
                                showLabels: false,
                                scales: {
                                  yAxes: [
                                    {
                                      ticks: {
                                        min: 0,
                                        max: 6
                                      }
                                    }
                                  ],
                                  xAxes: [
                                    {
                                      ticks: {
                                        minRotation: 0,
                                        maxRotation: 0,
                                        fontSize: 10
                                      }
                                    }
                                  ]
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const Header = ({ name, assessmentCount }) => (
  <div className={cn('head')}>
    <h1 className={cn('head-title')}>{name}</h1>
    <p className={'indent_reset'}>Количество оценок: {assessmentCount}</p>
  </div>
);
