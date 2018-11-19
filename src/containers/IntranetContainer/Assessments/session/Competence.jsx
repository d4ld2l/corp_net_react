import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { VARIANTS } from './data';
import { cn } from './Container';
import { Field, reduxForm, FormSection } from 'redux-form';
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea';
import RadioButton from 'components-folder/Form/RadioButton';
import scrollToComponent from 'components-folder/ScrollToComponent'
import { reduce, last } from 'lodash'

// import { sendAssessmentSession } from 'redux-folder/actions/assessmentActions'

class Competence extends Component {

  componentDidMount(){
    const { initialize, assessment } = this.props
    let initValues = {}
    assessment.skills.map((it) => {
      let indicators = {}
      it.indicators.map((i)=>(
        indicators[`${i.id}_indicator`] = "0"
      ))
      initValues[`${it.id}_skill`] = indicators
    })

    initialize(initValues)
  }

  render() {
    const {
      onClickNextCompetence,
      onClickPrevCompetence,
      onClickComplete,
      nextCompetence,
      sendAssessmentSession,
      assessment,
    } = this.props

    return (
      <div className={cn('competence').mix('competence')} ref="competence">
        <LeftBlock
          key="leftBlock"
          {...{
            onClickNextCompetence,
            onClickPrevCompetence,
            onClickComplete,
            sendAssessmentSession,
            nextCompetence,
            assessment
          }}
        />
        {/*<RightBlock nextCompetence={nextCompetence} assessment={assessment}/>*/}
      </div>
    )
  }
}

const LeftBlock = ({
                     onClickNextCompetence,
                     onClickPrevCompetence,
                     onClickComplete,
                     nextCompetence,
                     sendAssessmentSession,
                     assessment
                   }) => {
  let step = nextCompetence;
  ++step;

  return (
    <div className={'competence__left-b'}>
      <h2 className={'indent_8'}>
        Компетенция: {assessment.skills[nextCompetence].name}
      </h2>
      <p className={'p4 p3_theme_light indent_13'}>
        {step} из {assessment.skills_count}
      </p>
      <p className={'p3 p3_theme_light indent_5'}>Описание</p>
      <p
        className={'indent_reset competence__description indent_23'}
        dangerouslySetInnerHTML={{
          __html: assessment.skills[nextCompetence].description
        }}
      />
      {assessment.skills.map((skill, index) => (
        <FormSection key={index} name={`${skill.id}_skill`}>
          <table
            hidden={!(index === nextCompetence)}
            className={'competence__table'}>
            <thead className={'competence__thead'}>
              <tr>
                <th />
                {VARIANTS.map((variant, idx) => (
                  <th key={idx + '_' + variant.wording}>
                    <p className={'p3 p3_theme_light indent_5'}>
                      {variant.wording}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={'competence__tbody'}>
            {skill.indicators.map((it, i) => (
              <tr key={i + index} className="competence__indicator">
                <td>
                  <p className={'indent_reset'}>{it.name}</p>
                </td>
                {VARIANTS.map((variant, idx) => (
                  <td key={idx + variant.id}>
                    <div className="competence__radio-form">
                      <Field
                        key={`${skill.id}_${variant.id}_${it.id}`}
                        component={RadioButton}
                        name={`${it.id}_indicator`}
                        type="radio"
                        className="form-control"
                        value={`${variant.id}`}
                        id={`${skill.id}_${variant.id}_${it.id}`}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
          <div
            hidden={!(index === nextCompetence)}
            style={{width: '41.6%'}}
            key={`${index}_comment`}>
            <Field
              component={BootstrapTextarea}
              name={`${skill.id}_comment`}
              type="text"
              label="Комментарий"
            />
          </div>
        </FormSection>
      ))}

      <div style={{ marginTop: '20px' }}>
        {assessment.skills_count === nextCompetence + 1 ? (
          <button
            className={'btn btn-primary btn-margin-right'}
            onClick={() => {
              sendAssessmentSession(assessment.id);
            }}>
            Завершить
          </button>
        ) : (
          <button
            className={'btn btn-primary btn-margin-right'}
            onClick={() => {
              last(document.querySelectorAll(`.indent_8`)).scrollIntoView(
                false
              );
              onClickNextCompetence();
            }}>
            Далее
          </button>
        )}
        <button
          className={'btn btn-primary btn-outline'}
          onClick={() => {
            last(document.querySelectorAll(`.indent_8`)).scrollIntoView(false);
            onClickPrevCompetence();
          }}
          disabled={nextCompetence === 0}>
          Вернуться
        </button>
      </div>
    </div>
  );
};


const RightBlock = ({ nextCompetence, assessment }) => (
  <div className={'competence__right-b'}>
    <h2 className={'indent_13'}>Описание компетенции</h2>
    <p className={'indent_reset'}  dangerouslySetInnerHTML={{ __html: assessment.skills[nextCompetence].description }}>
    </p>
  </div>
);

export default reduxForm({
  form: 'Assessment'
})(Competence);
