import { connect } from 'react-redux'
import Container from './Container'

import {
  setMilestonesTemplate,
  addLeftMilestone,
  deleteMilestone,
  renameMilestoneTitle,
  changeMilestones,
  addRightMilestone,
  setCurrentMilestonesTemplate,
  changeMilestonesGroups,
  chnageMilestoneNotification,
  chnageMilestoneEvaluation,
  setMilestones,
} from '../../../../redux/actions/recruiterActions'

import { createVacancy } from '../../../../redux/actions/vacanciesActions'

const mapStateToProps = state => {
  return {
    state,
    recruiter: state.recruiter,
    milestones: state.recruiter.newRequest.milestones,
    activeMilestone: state.recruiter.newRequest.milestones.find(item => item.active) || false,
    milestonesTemplate: state.recruiter.newRequest.selectMilestonesTemplate,
    currentMilestonesTemplate: state.recruiter.newRequest.currentMilestonesTemplate,
    milestonesGroups: state.recruiter.newRequest.milestonesGroups,
    currentMilestonesGroup: state.recruiter.newRequest.currentMilestonesGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    setMilestonesTemplate: payload => dispatch(setMilestonesTemplate(payload)),
    changeMilestones: payload => dispatch(changeMilestones(payload)),
    addLeftMilestone: payload => dispatch(addLeftMilestone(payload)),
    deleteMilestone: payload => dispatch(deleteMilestone(payload)),
    renameMilestoneTitle: payload => dispatch(renameMilestoneTitle(payload)),
    addRightMilestone: payload => dispatch(addRightMilestone(payload)),
    setCurrentMilestonesTemplate: payload => dispatch(setCurrentMilestonesTemplate(payload)),
    changeMilestonesGroups: payload => dispatch(changeMilestonesGroups(payload)),
    changeMilestoneNotification: payload => dispatch(chnageMilestoneNotification(payload)),
    changeMilestoneEvaluation: payload => dispatch(chnageMilestoneEvaluation(payload)),
    createVacancy: payload => dispatch(createVacancy(payload)),
    setMilestones: payload => dispatch(setMilestones(payload)),
  }
}

const Selection = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Selection
