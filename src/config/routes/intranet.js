import NewsContainer from '../../containers/IntranetContainer/News'
import ServicesContainer from '../../containers/IntranetContainer/Services'
import ServiceContainer from '../../containers/IntranetContainer/Service'
import BidsContainer from '../../containers/IntranetContainer/Bids'
import BidContainer from '../../containers/IntranetContainer/Bid'
import NewBidContainer from '../../containers/IntranetContainer/NewBid'
import EditBidContainer from '../../containers/IntranetContainer/EditBid'
import NewContainer from '../../containers/IntranetContainer/New'
import MainContainer from '../../containers/IntranetContainer/Main'
import EmployeesContainer from '../../containers/IntranetContainer/Employees'
import EmployeeContainer from '../../containers/IntranetContainer/Employee'
import EmployeeEditContainer from '../../containers/IntranetContainer/EmployeeEdit'
import EmployeeEditResumeContainer from '../../containers/IntranetContainer/EmployeeEdit/ResumeEdit'
import ChatContainer from '../../containers/IntranetContainer/Chat'
import SurveysContainer from '../../containers/IntranetContainer/Surveys'
import SurveyContainer from '../../containers/IntranetContainer/Survey'
import SurveyFormContainer from '../../containers/IntranetContainer/Survey/SurveyFormContainer'
import PublicationSurveyContainer from '../../containers/IntranetContainer/Survey/PublicationSurvey'
import CalendarContainer from '../../containers/IntranetContainer/Calendar'
import ContainerEvent from '../../containers/IntranetContainer/Calendar/ContainerEvent'
import ContainerNewEvent from '../../containers/IntranetContainer/Calendar/ContainerNewEvent'
import ContainerEditEvent from '../../containers/IntranetContainer/Calendar/ContainerEditEvent'
import StructureContainer from '../../containers/IntranetContainer/Structure'
import CommunityContainer from '../../containers/IntranetContainer/Community'
import DistributionContainer from '../../containers/IntranetContainer/Distribution'
import ProjectsContainer from '../../containers/IntranetContainer/Projects'
import ProjectContainer from '../../containers/IntranetContainer/Project'
import NewProjectContainer from '../../containers/IntranetContainer/NewProject'
import NotificationsContainer from '../../containers/IntranetContainer/Notifications'
import SettingsContainer  from '../../containers/IntranetContainer/Settings'
import DiscussionContainer  from '../../containers/IntranetContainer/Discussion'
import TaskManagerContainer  from '../../containers/IntranetContainer/TaskManager'
import PersonelRoasterEmployeesContainer  from '../../containers/IntranetContainer/PersonelRoasterEmployees'
// import EmployeeEditProjectContainer from '../../containers/IntranetContainer/EmployeeEdit/ProjectEdit'

const intranet = [
  {
    path: '/',
    component: MainContainer,
    label: 'Главная страница',
    showInMenu: true,
    exact: true,
    private: true,
    icon: 'menuRing',
  },
  {
    path: '/news',
    component: NewsContainer,
    label: 'Новости',
    showInMenu: true,
    exact: true,
    private: true,
    icon: 'menuNews',
  },
  {
    path: '/news/:id',
    component: NewContainer,
    label: 'Main new',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/services',
    component: ServicesContainer,
    label: 'Сервисы',
    showInMenu: true,
    exact: true,
    private: true,
    icon: 'menuServices',
  },
  {
    path: '/services/:id',
    component: ServiceContainer,
    label: 'Сервис',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/bids',
    component: BidsContainer,
    label: 'Мои заявки',
    showInMenu: true,
    exact: true,
    private: true,
    icon: 'menuServices',
  },
  {
    path: '/services/:id/bids/new',
    component: NewBidContainer,
    label: 'Создание заявки',
    showInMenu: true,
    exact: true,
    private: true,
    icon: 'menuServices',
  },
  {
    path: '/bids/:id',
    component: BidContainer,
    label: 'Заявка',
    showInMenu: false,
    exact: true,
    private: true,
    icon: 'menuServices',
  },
  {
    path: '/bids/:id/edit',
    component: EditBidContainer,
    label: 'Редактирование заявки',
    showInMenu: false,
    exact: true,
    private: true,
    icon: 'menuServices',
  },
  {
    path: '/employees',
    component: EmployeesContainer,
    label: 'Сотрудники',
    exact: true,
    private: true,
    showInMenu: true,
    icon: 'menuGroup',
  },
  {
    path: '/structure',
    component: StructureContainer,
    label: 'Структура',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/employees/:id',
    component: EmployeeContainer,
    label: 'Сотрудник',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/employees/:id/edit',
    component: EmployeeEditContainer,
    label: 'Редактирование сотрудника',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/employees/:id/edit/resume',
    component: EmployeeEditResumeContainer,
    label: 'Редактирование сотрудника',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/community',
    component: CommunityContainer,
    label: 'Кухня Лиги',
    exact: true,
    private: true,
    showInMenu: true,
  },
  {
    path: '/chats',
    component: ChatContainer,
    label: 'Чат',
    exact: false,
    private: false,
    showInMenu: false,
  },
  {
    path: '/surveys/new',
    component: SurveyFormContainer,
    label: 'Создать опрос',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/surveys',
    component: SurveysContainer,
    label: 'Опросы',
    exact: true,
    private: true,
    showInMenu: true,
  },
  {
    path: '/surveys/:id',
    component: SurveyContainer,
    label: 'Опрос',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/surveys/:id/edit',
    component: SurveyFormContainer,
    mycontext: 'edit',
    label: 'Редактирование опроса',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/surveys/:id/publication',
    component: PublicationSurveyContainer,
    label: 'Публикация',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/calendar',
    component: CalendarContainer,
    label: 'Календарь',
    exact: true,
    private: true,
    showInMenu: true,
  },
  {
    path: '/calendar/events/:id',
    component: ContainerEvent,
    label: 'Событие',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/calendar/events/:id/edit',
    component: ContainerEditEvent,
    label: 'Редактирование события',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/calendar/new-event',
    component: ContainerNewEvent,
    label: 'Создать событие',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/distribution',
    component: DistributionContainer,
    label: 'Команды',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/projects',
    component: ProjectsContainer,
    label: 'Проекты',
    exact: true,
    private: true,
    showInMenu: true,
  },
  {
    path: '/projects/new',
    component: NewProjectContainer,
    label: 'Новый проект',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/projects/:id/edit',
    component: NewProjectContainer,
    label: 'Редактировкаие проекта',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/projects/:id',
    component: ProjectContainer,
    label: 'Проект',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/settings',
    component: SettingsContainer,
    label: 'Настройки',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/discussion',
    component: DiscussionContainer,
    label: 'Обсуждение',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/tasks',
    component: TaskManagerContainer,
    label: 'Задачи',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: '/personel-roaster-employees',
    component: PersonelRoasterEmployeesContainer,
    label: 'Кадровый реестр сотрудников',
    exact: true,
    private: true,
    showInMenu: false,
  },
]

export default intranet

export const path2name = path => {
  const obj = {}

  function addToObj(src) {
    src.map(e => {
      obj[e.path] = e.label

      if (e.routes) {
        addToObj(e.routes)
      }
    })
  }

  addToObj(intranet)

  return obj[path]
}
