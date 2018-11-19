import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { Switch, Route, withRouter } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import { Helmet } from 'react-helmet'
import Header from 'components-folder/Layout/Header'
import HeaderUni from 'containers-folder/IntranetContainer/Header'
import Grid from 'components-folder/Grid'
import LoginContainer from 'containers-folder/LoginContainer'
import Aside from 'containers-folder/IntranetContainer/Aside'
import UpDownScroll from 'components-folder/UpDownScroll'
import NewsContainer from 'containers-folder/IntranetContainer/News'
import ServicesContainer from 'containers-folder/IntranetContainer/Services'
import ServiceContainer from 'containers-folder/IntranetContainer/Service'
import BidsContainer from 'containers-folder/IntranetContainer/Bids'
import BidContainer from 'containers-folder/IntranetContainer/Bid'
import NewBidContainer from 'containers-folder/IntranetContainer/NewBid'
import EditBidContainer from 'containers-folder/IntranetContainer/EditBid'
import NewContainer from 'containers-folder/IntranetContainer/New'
import MainContainer from 'containers-folder/IntranetContainer/Main'
import EmployeesContainer from 'containers-folder/IntranetContainer/Employees'
import EmployeeContainer from 'containers-folder/IntranetContainer/Employee'
import EmployeeEditContainer from 'containers-folder/IntranetContainer/EmployeeEdit'
import EmployeeEditResumeContainer from 'containers-folder/IntranetContainer/EmployeeEdit/ResumeEdit'
import ChatContainer from 'containers-folder/IntranetContainer/Chat'
import SurveysContainer from 'containers-folder/IntranetContainer/Surveys'
import SurveyContainer from 'containers-folder/IntranetContainer/Survey'
import SurveyFormContainer from 'containers-folder/IntranetContainer/Survey/SurveyFormContainer'
import PublicationSurveyContainer from 'containers-folder/IntranetContainer/Survey/PublicationSurvey'
import CalendarContainer from 'containers-folder/IntranetContainer/Calendar'
import ContainerEvent from 'containers-folder/IntranetContainer/Calendar/ContainerEvent'
import ContainerNewEvent from 'containers-folder/IntranetContainer/Calendar/ContainerNewEvent'
import ContainerEditEvent from 'containers-folder/IntranetContainer/Calendar/ContainerEditEvent'
import StructureContainer from 'containers-folder/IntranetContainer/Structure'
import CommunityContainer from 'containers-folder/IntranetContainer/Community'
import DistributionContainer from 'containers-folder/IntranetContainer/Distribution'
import ProjectsContainer from 'containers-folder/IntranetContainer/Projects'
import ProjectContainer from 'containers-folder/IntranetContainer/Project'
import NewProjectContainer from 'containers-folder/IntranetContainer/NewProject'
import SettingsContainer  from 'containers-folder/IntranetContainer/Settings'
import DiscussionContainer  from 'containers-folder/IntranetContainer/Discussion'
import PersonelRoasterEmployeesContainer  from 'containers-folder/IntranetContainer/PersonelRoasterEmployees'
import CandidateContainer from 'containers-folder/Recruitment/Candidate'
import CandidateNew from 'containers-folder/Recruitment/NewCandidateForm'
import Vacancies from 'containers-folder/Recruitment/Vacancies'
import MainContainerRecruitment from 'containers-folder/MainContainer'
import NoFoundContainer from 'containers-folder/NoFoundContainer'
import Comparison from 'containers-folder/Recruitment/Comparison'
import VacancyNew from 'containers-folder/Recruitment/VacancyNew'
import Candidates from 'containers-folder/Recruitment/Candidates'
import VacancyContainer from 'containers-folder/Recruitment/Vacancy'
import Analytics from 'containers-folder/Recruitment/Analytics'
import TaskManagerContainer  from 'containers-folder/IntranetContainer/TaskManager'
import AssessmentsRegisterContainer  from 'containers-folder/IntranetContainer/Assessments/register'
import AssessmentSessionContainer  from 'containers-folder/IntranetContainer/Assessments/session'
import AssessmentSessionCard  from 'containers-folder/IntranetContainer/Assessments/card'
import NotificationsContainer from 'containers-folder/IntranetContainer/Notifications'


if (process.env.BROWSER) {
  // --- import modifiers style ---
  require('css.modifiers')

  // --- import plugin css ---
  require('react-datetime/css/react-datetime.css')
  require('react-tagsinput/react-tagsinput.css')
  require('react-redux-toastr/lib/css/react-redux-toastr.min.css')
  require('react-ios-switch/build/bundle.css')

  // --- import fonts css ---
  // require('opensans-npm-webfont/open_sans.css');
  // require('opensans-npm-webfont/open_sans_semibold.css');
  // require('opensans-npm-webfont/open_sans_light.css');

  // --- import bootstrap style ---
  require('bootstrap-only-css/lib/alerts.css')
  require('bootstrap-only-css/lib/close.css')
  require('bootstrap-only-css/lib/code.css')
  require('bootstrap-only-css/lib/component-animations.css')
  require('bootstrap-only-css/lib/dropdowns.css')
  require('bootstrap-only-css/lib/forms.css')
  require('bootstrap-only-css/lib/grid.css')
  require('bootstrap-only-css/lib/input-groups.css')
  require('bootstrap-only-css/lib/labels.css')
  require('bootstrap-only-css/lib/list-group.css')
  require('bootstrap-only-css/lib/modals.css')
  require('bootstrap-only-css/lib/normalize.css')
  require('bootstrap-only-css/lib/pager.css')
  require('bootstrap-only-css/lib/pagination.css')
  require('bootstrap-only-css/lib/print.css')
  require('bootstrap-only-css/lib/responsive-embed.css')
  require('bootstrap-only-css/lib/responsive-utilities.css')
  require('bootstrap-only-css/lib/scaffolding.css')
  require('bootstrap-only-css/lib/type.css')
  require('bootstrap-only-css/lib/utilities.css')
  // require('bootstrap-only-css/lib/jumbotron.css');
  // require('bootstrap-only-css/lib/wells.css');
  // require('bootstrap-only-css/lib/tables.css');
  // require('bootstrap-only-css/lib/thumbnails.css');
  // require('bootstrap-only-css/lib/tooltip.css');
  // require('bootstrap-only-css/lib/progress-bars.css');
  // require('bootstrap-only-css/lib/panels.css');
  // require('bootstrap-only-css/lib/popovers.css');
  // require('bootstrap-only-css/lib/navs.css');
  // require('bootstrap-only-css/lib/media.css');
  // require('bootstrap-only-css/lib/badges.css');
  // require('bootstrap-only-css/lib/breadcrumbs.css');
  // require('bootstrap-only-css/lib/buttons.css');
  // require('bootstrap-only-css/lib/carousel.css');

  // --- import common style ---
  require('./style/style.css')
  require('containers-folder/IntranetContainer/Container.css')
}

const cn = require('bem-cn')('intranet-container')

const matchingContainer = {
  NoFoundContainer: NoFoundContainer,
  MainContainer: MainContainer,
  EmployeesContainer: EmployeesContainer,
  EmployeeContainer: EmployeeContainer,
  EmployeeEditContainer: EmployeeEditContainer,
  EmployeeEditResumeContainer: EmployeeEditResumeContainer,
  SettingsContainer: SettingsContainer,
  NewsContainer: NewsContainer,
  NewContainer: NewContainer,
  ServicesContainer: ServicesContainer,
  ServiceContainer: ServiceContainer,
  BidsContainer: BidsContainer,
  NewBidContainer: NewBidContainer,
  BidContainer: BidContainer,
  EditBidContainer: EditBidContainer,
  StructureContainer: StructureContainer,
  CommunityContainer: CommunityContainer,
  ChatContainer: ChatContainer,
  SurveyFormContainer: SurveyFormContainer,
  SurveyContainer: SurveyContainer,
  ContainerEditEvent: ContainerEditEvent,
  PublicationSurveyContainer: PublicationSurveyContainer,
  CalendarContainer: CalendarContainer,
  ContainerNewEvent: ContainerNewEvent,
  DistributionContainer: DistributionContainer,
  ProjectsContainer: ProjectsContainer,
  NewProjectContainer: NewProjectContainer,
  ProjectContainer: ProjectContainer,
  DiscussionContainer: DiscussionContainer,
  TaskManagerContainer: TaskManagerContainer,
  PersonelRoasterEmployeesContainer: PersonelRoasterEmployeesContainer,
  SurveysContainer: SurveysContainer,
  ContainerEvent: ContainerEvent,
  MainContainerRecruitment: MainContainerRecruitment,
  Vacancies: Vacancies,
  CandidateNew: CandidateNew,
  CandidateContainer: CandidateContainer,
  TasksContainer: TaskManagerContainer,
  VacancyContainer: VacancyContainer,
  VacancyNew: VacancyNew,
  Candidates: Candidates,
  Comparison: Comparison,
  Analytics: Analytics,
  AssessmentsRegisterContainer: AssessmentsRegisterContainer,
  AssessmentSessionContainer: AssessmentSessionContainer,
  AssessmentSessionCard: AssessmentSessionCard,
}

const PrivateRoute = ({ component, module, menu, ...rest }) => {
  const Component = matchingContainer[component]
  return (
    <main>
      {
        module === 'intranet' && (
          <Helmet>
            <title>Social HR</title>
          </Helmet>
        )
      }
      <Header />
      <UpDownScroll />
      <Grid />

      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />

      <div className={cn}>
        {
          menu && (
            <div className={cn('aside')}>
              <Aside />
            </div>
          )
        }
        <div className={cn('container')}>
          <div className={cn('content')}>
            <Route {...rest} render={props => <Component {...props} />} />
          </div>
        </div>
      </div>
    </main>
  )
}

const connector = compose(withRouter, connect(state => ({ state })))

class Root extends Component {
  render() {
    const { state: { system: { intranetRoutes, recruitmentRoutes, enabledComponents, rootRoute } } } = this.props
    if (!enabledComponents){
      return (
        <Switch>
          <Route path="/login" component={LoginContainer} />
        </Switch>
      )
    }
    return (
      <Switch>
        <Route path="/login" component={LoginContainer} />

        <PrivateRoute key={`rootRoute`}
                      exact={true}
                      private={true}
                      module={enabledComponents.shr_core ? 'intranet' : 'recruitment'}
                      menu={enabledComponents.shr_core}
                      {...rootRoute} />
        {enabledComponents.shr_core && intranetRoutes.filter(it => it.enabled).map((route, i) =>
          <PrivateRoute key={`intranet${i}`}
                        exact={true}
                        private={true}
                        module="intranet"
                        menu={enabledComponents.shr_core}
                        {...route} />)}
        {enabledComponents.recruitment_core && recruitmentRoutes.filter(it => it.enabled).map((route, i) =>
          <PrivateRoute key={`recruitment${i}`}
                        exact={true}
                        private={true}
                        module="recruitment"
                        menu={enabledComponents.shr_core}
                        {...route} />)}
        <PrivateRoute key={'NoFoundContainer'}
                      exact={true}
                      private={true}
                      menu={enabledComponents.shr_core}
                      component="NoFoundContainer" />
      </Switch>
    )
  }
}

export default connector(Root)
