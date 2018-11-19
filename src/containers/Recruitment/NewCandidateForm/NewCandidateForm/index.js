import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormSection, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {isEqual, isEmpty, get} from 'lodash'
import {Row, Col} from 'react-bootstrap'
import CandidateTabGetResume from './FormSectionNewCandidate/CandidateTabGetResume'
import CandidateTabFullName from './FormSectionNewCandidate/CandidateTabFullName'
import CandidateTabContactInformation from './FormSectionNewCandidate/CandidateTabContactInformation'
import CandidateTabBasicInformation from './FormSectionNewCandidate/CandidateTabBasicInformation'
import CandidateTabExperience from './FormSectionNewCandidate/CandidateTabExperience'
import CandidateTabAchievements from './FormSectionNewCandidate/CandidateTabAchievements'
import CandidateTabExpectations from './FormSectionNewCandidate/CandidateTabExpectations'
import CandidateTabRecommendations from './FormSectionNewCandidate/CandidateTabRecommendations'
import CandidateTabResume from './FormSectionNewCandidate/CandidateTabResume'
import scrollToComponent from "components-folder/ScrollToComponent";
import {
  createCandidate, parsingReset,
  updateCandidate,
} from '../../../../redux/actions/candidatesActions'
import type {Dispatch} from '../../../../types/actions'
import type {ResumeSourceRaw, VacancyRaw} from '../../../../types/raws'
import compose from "ramda/src/compose";
import {toastr} from "react-redux-toastr";
import ReactDOM from "react-dom";
import moment from "moment/moment";
import {candidateRecommendation} from "../../../../lib/validation";


const cn = require('bem-cn')('new-candidate')

if (process.env.BROWSER) {
  require('./style.css')
  require('./new-candidate.css')
}

type Props = {
  dispatch: Dispatch,
  stageVacancies: Array<VacancyRaw>,
  state: {},
  candidateId: number,
  sources: Array<{}>,
  sources: Array<ResumeSourceRaw>,
}

const connector = compose(reduxForm({
    form: 'NewCandidateForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: {
      fullName: {
        candidate_vacancies_attributes: [''],
      },
      contactInformation: {
        additional_contacts_attributes: [''],
        preferred_contact_type: '0-phone',
        phones: [''],
        emails: [''],
      },
      achievements: {
        resume_educations_attributes: [''],
        resume_courses_attributes: [''],
        resume_certificates_attributes: [''],
      },
      experience: {
        resume_work_experiences_attributes: [''],
      },
      tabRecommendations: {
        resume_recommendations_attributes: [{}],
      },
      basicInformation: {
        language_skills_attributes: [''],
      },
      tabExpectations: {
        salary_level: null,
        experience: null,
        working_schedule: null,
        employment_type: null,
        comment: null,
        desired_position: null,
      },
      tabResume: {
        resume_text: null,
      }
    },
  }),
  connect(state => ({
    sources: state.candidates.sources,
    form: state.form.NewCandidateForm,
    languagesLevel: state.candidates.languagesLevel,
    languages: state.candidates.languages,
    initialValues: state.candidates.parsedResume,
    candidate: state.candidates.current,
    specialization: state.candidates.specialization,
    education: state.candidates.educationLevel,
    state,
  })))

function preferredContact(contacts) {
  if (contacts.length === 0) return '0-phone'
  const contact = contacts.find(item => item.preferred)
  if (!contact) return '0-phone'
  let prefer = ''
  let emails = 0
  let phones = 0
  contacts.forEach((item) => {
    if (item.preferred && item.contact_type === 'email') {
      prefer = `${emails}-${item.contact_type}`
    }
    if (item.preferred && item.contact_type === 'phone') {
      prefer = `${phones}-${item.contact_type}`
    }
    if (item.contact_type === 'email') emails = emails + 1
    if (item.contact_type === 'phone') phones = phones + 1
  })
  return prefer
}

class NewCandidateForm extends Component<Props> {

  componentDidMount() {
    const {initialize, candidateId, candidate, specialization} = this.props

    if (candidateId) {
      const {resume} = candidate
      let group = {}
      if (resume.professional_specializations.length > 0) {
        group = this.specializationOptionsForSelect(specialization).filter(it => it.options.map(({value}) => (value)).includes(resume.professional_specializations[0].id))[0]
      }
      initialize({
        fullName: {
          city: resume.city,
          first_name: candidate.first_name,
          last_name: candidate.last_name,
          middle_name: candidate.middle_name,
          resume_source_id: resume.resume_source_id,
          candidate_vacancies_attributes:
            candidate.candidate_vacancies.length > 0
              ? candidate.candidate_vacancies.map(item => item.vacancy_id)
              : [''],
          photo: resume.photo.url,
          documents: get(resume, 'resume_documents') ? resume.resume_documents.map(item => item) : [''],
        },
        contactInformation: {
          emails: resume.resume_contacts.filter(item => item.contact_type === 'email').length > 0 ?
            resume.resume_contacts.filter(item => item.contact_type === 'email').map(item => ({email: item.value})) : [''],
          phones: resume.resume_contacts.filter(item => item.contact_type === 'phone').length > 0 ?
            resume.resume_contacts.filter(item => item.contact_type === 'phone').map(item => ({phone: item.value})) : [''],
          skype: resume.resume_contacts.find(item => item.contact_type === 'skype') ?
            resume.resume_contacts.find(item => item.contact_type === 'skype').value : '',
          preferred_contact_type: preferredContact(resume.resume_contacts),
          additional_contacts_attributes:
            resume.additional_contacts.length > 0 ? resume.additional_contacts : [''],
        },
        achievements: {
          education_level_id: resume.education_level_id,
          resume_educations_attributes:
            resume.resume_educations && resume.resume_educations.length > 0
              ? resume.resume_educations.map(item => {
                return {
                  ...item,
                  end_year: item.end_year && `${item.end_year}`,
                }
              })
              : [''],
          resume_certificates_attributes:
            resume.resume_certificates && resume.resume_certificates.length > 0
              ? resume.resume_certificates.map(item => {
                return {
                  company_name: item.company_name ? item.company_name : null,
                  name: item.name ? item.name : null,
                  end_date: item.end_date && `${moment(item.end_year).format('YYYY')}`,
                }
              })
              : [''],
          resume_courses_attributes:
            resume.resume_courses && resume.resume_courses.length > 0
              ? resume.resume_courses.map(item => {
                return {
                  company_name: item.company_name ? item.company_name : null,
                  name: item.name ? item.name : null,
                  end_year: item.end_year && `${moment(item.end_year).format('YYYY')}`,
                }
              })
              : [''],
        },
        tabRecommendations: {
          resume_recommendations_attributes:
            resume.resume_recommendations.length > 0 ? resume.resume_recommendations : [''],
        },
        basicInformation: {
          birthdate: !isEmpty(candidate.birthdate) ? moment(candidate.birthdate).format('DD.MM.YYYY') : null,
          sex: resume.sex,
          skills: resume.skills,
          skills_description: resume.skills_description,
          language_skills_attributes:
            resume.language_skills.length > 0 ? resume.language_skills : [''],
        },
        tabResume: {
          resume_text: resume.resume_text,
        },
        tabExpectations: {
          salary_level: resume.salary_level && resume.salary_level.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
          experience: resume.experience,
          working_schedule: resume.working_schedule,
          employment_type: resume.employment_type,
          comment: resume.comment,
          desired_position: resume.desired_position,
          professional_specialization_ids: resume.professional_specializations.length > 0 ? resume.professional_specializations.map((it) => ({
            group: group,
            label: it.name,
            value: it.id,
          })) : null,
        },
        experience: {
          resume_work_experiences_attributes:
            resume.resume_work_experiences.length > 0
              ? resume.resume_work_experiences.map(item => {
                return {
                  ...item,
                  nowadays: !item.end_date,
                }
              })
              : [''],
        },
      })
    }

  }

  specializationOptionsForSelect = specialization =>
    specialization.map(item => {
      return {
        label: item.name,
        options: item.professional_specializations.map(spec => {
          return {label: spec.name, value: spec.id}
        }),
      }
    })

  onSubmit = () => {
    const {dispatch, state, candidateId} = this.props
    if (candidateId) {
      dispatch(updateCandidate({state}))
    } else {
      dispatch(createCandidate({state}))
    }
  }

  checkError() {
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFailed && this.props.submitFailed) {
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], {
        offset: 0,
        duration: 1000,
      })
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props
    dispatch(parsingReset())
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  render() {
    const {
      specialization,
      education,
      stageVacancies,
      candidateId,
      handleSubmit,
      dispatch,
      sources,
      form,
      languages,
      languagesLevel,
      contactInformation,
      candidate
    } = this.props

    const checkedLanguageIds = form.values.basicInformation.language_skills_attributes.map( it => get(it, 'language_id.value') )
    const languageForChoose = languages.filter( it => !checkedLanguageIds.includes(it.id) )

    return (
      <div className='candidate'>
        <div className={cn}>
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            onKeyPress={e => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >

            <FormSection name="candidateDocuments">
              <CandidateTabGetResume dispatch={dispatch}/>
            </FormSection>
            <FormSection name="fullName">
              <CandidateTabFullName form={form} dispatch={dispatch} sources={sources} stageVacancies={stageVacancies}/>
            </FormSection>
            <FormSection name="contactInformation">
              <CandidateTabContactInformation candidateId={candidateId} candidate={candidate}
                                              contactInformation={contactInformation}/>
            </FormSection>
            <FormSection name="tabResume">
              <CandidateTabResume candidateId={candidateId}/>
            </FormSection>
            <FormSection name="basicInformation">
              <CandidateTabBasicInformation candidateId={candidateId} languages={languageForChoose}
                                            languagesLevel={languagesLevel}/>
            </FormSection>
            <FormSection name="experience">
              <CandidateTabExperience/>
            </FormSection>
            <FormSection name="achievements">
              <CandidateTabAchievements candidateId={candidateId} education={education}/>
            </FormSection>
            <FormSection name="tabExpectations">
              <CandidateTabExpectations candidateId={candidateId} specialization={specialization}/>
            </FormSection>
            <FormSection name="tabRecommendations">
              <CandidateTabRecommendations candidateId={candidateId}/>
            </FormSection>

            <Row>
              <Col xs={12}>
                <button className={'btn btn-primary btn-margin-right '} onClick={() => this.checkError()}>Сохранить
                </button>

                <Link to={'/recruitment/candidates'}
                      className="btn btn-outline">Отменить</Link>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    )
  }
}

export default connector(NewCandidateForm)

