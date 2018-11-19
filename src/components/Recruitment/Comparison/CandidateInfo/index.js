import React, { Component } from 'react'

import Groupment from '../Groupment'
import Label from '../Label'
import CandidateInfo from './CandidateInfo'
import SkillWrapper from './SkillWrapper'
import Skill from './Skill'
import Langauge from './Langauge'

import { cn } from '../common'

export default class CandidateInfoWrapper extends Component{
  formatMartialCondition(martialCondition, sex) {
    const maleMartialConditions = {
      never_married: "Не женат",
      married: "Женат",
      divorced: "Разведен",
    }
    const femaleMartialConditions = {
      never_married: "Не замужем",
      married: "Замужем",
      divorced: "Разведена",
    }
    switch(sex){
      case 'male':
        return maleMartialConditions[martialCondition]
      case 'female':
        return femaleMartialConditions[martialCondition]
      default:
        return martialCondition[maleMartialConditions]
    }
  }

  renderCandidateInfo(i, candidate){
    if (candidate.resume.skills.length > 0          || 
        candidate.resume.skills_description         || 
        candidate.resume.language_skills.length > 0 ||
        candidate.resume.sex                        ||
        candidate.resume.martial_condition          ||
        candidate.resume.have_children
    )
      return(
        <CandidateInfo key={`CandidateInfo${i}${candidate.id}`}>
          {candidate.resume.skills.length > 0 && (
            <Label label={'ключевые навыки'}>
              <SkillWrapper>
                {candidate.resume.skills.map((skill, i) => (
                  <Skill key_skill_name={skill.name} key={`skill${skill.id}${i}${candidate.id}`} />
                ))}
              </SkillWrapper>
            </Label>
          )}
          {candidate.resume.skills_description && (
            <Label
              label={'навыки'}
              dangerouslyText={candidate.resume.skills_description}
            />
          )}
          {candidate.resume.language_skills.length > 0 && (
            <Label label={'Языки'}>
              {candidate.resume.language_skills.map((lang, i) => (
                <Langauge 
                  key={`lang${lang.id}${i}${candidate.id}`}
                  language_name={`${lang.language.name} — ${lang.language_level.name}`}
                />
              ))}
            </Label>
          )}
          {candidate.resume.sex && (
            <Label label={'Пол'} text={candidate.resume.sex === 'male' ? 'Мужской' : 'Женский'} />
          )}
          {candidate.resume.martial_condition && ['never_married','married','divorced'].includes(candidate.resume.martial_condition) && (
            <Label label={'Семейное положение'} text={this.formatMartialCondition(candidate.resume.martial_condition, candidate.resume.sex)} />
          )}
          {candidate.resume.have_children && (
            <Label label={'Дети'} text={candidate.resume.have_children ? "Есть" : "Отсутствуют"} />
          )}
        </CandidateInfo>
      )
    return (
      <CandidateInfo key={`CandidateInfo${i}${candidate.id}`}>
        <span>Информации нет</span>
      </CandidateInfo>
    )
  }

  render(){
    const { comparison: { nonPdfItemsToDisplay = [], candidates = [], isAnyPdf = false } } = this.props
    return (
      <div>
        <Groupment
          candidate_one_title={'Информация о кандидате'}
          groupment={true}
          candidates={candidates}
          isAnyPdf={isAnyPdf}
        />
        <div className={cn('candidate-wrapper-children')}>
          {nonPdfItemsToDisplay.map((it,i) => this.renderCandidateInfo.call(this, i, it.candidate, it.options))}
        </div>
      </div>
    )
  }
}






