import React, { Component } from 'react'

import Scale from './Scale'
import ScaleTooltip from './ScaleTooltip'

const cn = require('bem-cn')('scale-profile')

if (process.env.BROWSER) {
  require('./css/scale-profile.css')
}

export default class ScaleProfile extends Component {
  componentDidMount() {
    const scale = document.querySelector('.scale-profile'),
      tooltip = document.querySelector('.tooltip')
    scale &&
      scale.addEventListener('mousemove', event => {
        const rect = scale.getBoundingClientRect(),
          offsetX = event.clientX - rect.left,
          offsetY = event.clientY - rect.top
        tooltip && (tooltip.style.left = offsetX + 15 + 'px')
        tooltip && (tooltip.style.top = offsetY + 15 + 'px')
        tooltip && (tooltip.style.display = 'block')
      })

    scale &&
      scale.addEventListener('mouseout', () => {
        tooltip && (tooltip.style.display = 'none')
      })
  }

  countScale = (contact, resume, skills, project) => {
    switch (true) {
      case contact && resume && skills && project:
        return '100%'
      case contact && resume && skills:
      case contact && resume && project:
      case contact && skills && project:
      case resume && skills && project:
        return '75%'
      case contact && resume:
      case contact && skills:
      case contact && project:
      case resume && skills:
      case resume && project:
      case skills && project:
        return '50%'
      case contact:
      case resume:
      case skills:
      case project:
        return '25%'
      default:
        break
    }
  }

  render() {
    const { current } = this.props

    const phone = current.account_phones.length > 0
    const email = current.account_emails.length > 0
    const other_ways =
      (current.skype !== null && current.skype !== '') || current.account_messengers.length > 0
    const social = current.social_urls.length > 0
    const contact = phone && email && other_ways && social

    const work = current.resumes.length > 0 && current.resumes[0].resume_work_experiences.length > 0
    const education = current.resumes.length > 0 && current.resumes[0].resume_educations.length > 0
    const language = current.resumes.length > 0 && current.resumes[0].language_skills.length > 0
   const resume = work && education && language

    const skills = current.account_skills.length > 0

    const role =
      current.account_projects.length > 0 &&
      current.account_projects
        .map(
          it =>
            it.project_work_periods.length > 0 &&
            (it.project_work_periods.role !== null && it.project_work_periods.role !== '')
        )
        .includes(true)
    const duties =
      current.account_projects.length > 0 &&
      current.account_projects
        .map(
          it =>
            it.project_work_periods.length > 0 &&
            (it.project_work_periods.duties !== null && it.project_work_periods.duties !== '')
        )
        .includes(true)
    const project = role && duties

    return (
      <div>
        <div className={cn}>
          <h3 className={cn('header').mix('fw_400')}>
            Завершенность профиля {this.countScale(contact, resume, skills, project)}
          </h3>
          <Scale contact={contact} resume={resume} skills={skills} project={project} />
          <ScaleTooltip
            phone={phone}
            email={email}
            other_ways={other_ways}
            social={social}
            contact={contact}
            work={work}
            education={education}
            language={language}
            resume={resume}
            skills={skills}
            role={role}
            duties={duties}
            project={project}
          />
        </div>
    </div>
    )
  }
}
