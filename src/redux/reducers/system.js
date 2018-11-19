import { get, pickBy, keys, remove, map } from 'lodash'
import toCamelCase from 'to-camel-case'

const base = '/recruitment'

const initialState = {
  counter: {},
  settings:{},
  enabled_components:{
    recruitment_core: true,
    recruitment_tasks: true,
    shr_bids: true,
    shr_calendar: true,
    shr_communities: true,
    shr_core: true,
    shr_data_storage: true,
    shr_discussions: true,
    shr_feed: true,
    shr_game: true,
    shr_news: true,
    shr_org: true,
    shr_projects: true,
    shr_resume: true,
    shr_services: true,
    shr_skills: true,
    shr_surveys: true,
    shr_tasks: true,
    shr_teams: true,
    shr_personnel: true,
    shr_assessment: true,
  },
  menu: [
    {
      path: '/',
      label: 'Главная',
      icon: 'menuDashboard',
      size: 'size-dashboard',
      enable: true,
    },
    {
      path: '/news',
      label: 'Рупор Лиги',
      icon: 'menuAbout',
      size: 'size-about',
      id: 'shr_news',
      labelKey: 'news',
    },
    {
      path: '/services',
      label: 'Сервисы',
      icon: 'menuServices',
      size: 'size-services',
      id: 'shr_services',
      labelKey: 'services',
    },
    {
      path: '/surveys',
      label: 'Опросы',
      icon: 'menuSurveys',
      size: 'size-surveys',
      id: 'shr_surveys',
      labelKey: 'surveys',
    },
    {
      path: '/employees',
      label: 'Сотрудники',
      icon: 'menuPersonal',
      size: 'size-employees',
      enabled: true,
      labelKey: 'employees',
    },
    {
      path: '/recruitment/my',
      label: 'Рекрутинг',
      icon: 'menuRecruiting',
      size: 'size-recruitment',
      id: 'recruitment_core',
      labelKey: 'hr',
    },
    {
      path: '/projects',
      label: 'Проекты',
      icon: 'menuProject',
      size: 'size-recruitment',
      id: 'shr_projects',
      labelKey: 'projects',
    },
    {
      path: '/tasks',
      label: 'Задачи',
      icon: 'menuCalendar',
      size: 'size-calendar',
      id: 'shr_tasks',
      labelKey: 'tasks',
    },
    {
      path: '/calendar',
      label: 'Календарь',
      icon: 'menuCalendar',
      size: 'size-calendar',
      depended_id: 'shr_tasks',
      id: 'shr_calendar',
      labelKey: 'calendar',
    },
    {
      path: '/community',
      label: 'Кухня Лиги',
      icon: 'menuCommunity',
      size: 'size-community',
      id: 'shr_feed',
      labelKey: 'community',
    },
    {
      path: '/discussion',
      label: 'Обсуждения',
      icon: 'menuChat',
      size: 'size-chats',
      id: 'shr_discussions',
      labelKey: 'discussion',
    },
    {
      path: '/chats',
      label: 'Чаты',
      icon: 'menuChat',
      size: 'size-chats',
      id: 'core',
      labelKey: 'discussion',
    },
    {
      path: '/assessments',
      label: 'Оценка',
      icon: 'menuAssessment',
      size: 'size-chats',
      id: 'shr_assessment',
      labelKey: 'assessment',
      enable: true,
    },
    {
      path: process.env.DATA_STORAGE_URL,
      label: 'Балкон',
      target: true,
      icon: 'menuDataStorage',
      size: 'size-chats',
      id: 'shr_data_storage',
      labelKey: 'storage',
    },
    {
      path: 'https://lk.krsk2019.ru/suz/documents',
      label: 'Адаптация',
      target: true,
      icon: 'uniLogo',
      size: 'size-chats',
      id: 'core',
      labelKey: 'adaptation',
    },
    {
      path: 'https://lk.krsk2019.ru/suz/training_plans',
      label: 'Обучение',
      target: true,
      icon: 'uniLogo',
      size: 'size-chats',
      id: 'core',
      labelKey: 'training',
    },
  ],
  topMenu: [
    {
      paths: ['/recruitment/my', '/recruitment/vacancies', '/recruitment/candidates/:id',
        '/recruitment/candidates/:id/edit', '/recruitment/vacancies/:id', '/recruitment/vacancies/:id/edit',
        '/recruitment/vacancies/new/recruiter', '/recruitment/candidates', '/recruitment/candidates/:id/comparison','/recruitment/task', '/recruitment/vacancies/:id/edit/recruiter/info', '/recruitment/analytics'],
      coreId: 'recruitment_core',
      listMenu: ['recruitmentMyVacancy', 'recruitmentCandidates',
        'recruitmentAnalytics', 'recruitmentTasks', 'recruitmentVacancy'],
    },
    {
      paths: ['/employees/:id', '/employees/:id/edit', '/employees', '/structure', '/distribution'],
      coreId: 'shr_core',
      listMenu: ['shrOrg', 'shrEmployees', 'shrTeams'],
    },
    {
      paths: ['/services', '/services/:id', '/services/:id/bids/new', '/bids', '/bids/:id', '/bids/:id/edit'],
      coreId: 'shr_core',
      listMenu: ['shrServices', 'shrBids'],
    },
    {
      paths: ['/tasks', '/calendar', '/calendar/events/:id/edit', '/calendar/events/:id', '/calendar/new-event'],
      coreId: 'shr_core',
      listMenu: ['shrTasks', 'shrCalendar'],
    },
    {
      paths: ['/'],
      rootRoute: true,
      coreId: 'recruitment_core',
      listMenu: ['recruitmentMyVacancy', 'recruitmentVacancy', 'recruitmentCandidates',
        'recruitmentAnalytics', 'recruitmentTasks'],
    }
  ],
  appendMenuPaths: ['/recruitment/my', '/recruitment/candidates/:id/edit', '/recruitment/candidates/:id',
    '/recruitment/vacancies', '/recruitment/vacancies/:id', '/recruitment/vacancies/:id/edit',
    '/recruitment/vacancies/new/recruiter', '/recruitment/candidates', '/recruitment/:id/comparison',
    '/recruitment/:id/comparison/pdf', '/vacancies/:id/edit/recruiter/info', '/recruitment/analytics'
  ],
  rootRoute: {
    path: '/',
    component: 'MainContainer',
    label: 'Главная страница',
    enabled: true,
  },
  intranetBreadcrumbs: [
    {
      paths: ['/news', '/news/:id'],
      id: 'shr_news',
      label: 'Новости',
      labelKey: 'news',
    },
    {
      paths: ['/services', '/services/:id', '/services/:id/bids/new'],
      id: 'shr_services',
      label: 'Каталог сервисов',
      labelKey: 'services',
    },
    {
      paths: ['/bids', '/bids/:id', '/bids/:id/edit'],
      id: 'shr_bids',
      label: 'Мои заявки',
    },
    {
      paths: ['/surveys', '/surveys/:id/publication', '/surveys/:id/edit'],
      id: 'shr_surveys',
      label: 'Опросы',
      labelKey: 'surveys',
    },
    {
      paths: ['/employees',
        '/employees/:id', '/employees/:id/edit',
        '/employees/:id/edit/resume',
        '/personel-roaster-employees', '/structure', '/distribution'],
      enabled: true,
      label: 'Список сотрудников',
    },
    {
      paths: ['/projects', '/projects/:id', '/projects/:id/edit'],
      id: 'shr_projects',
      label: 'Проекты',
      labelKey: 'projects',
    },
    {
      paths: ['/tasks'],
      id: 'shr_tasks',
      label: 'Список задач',
      labelKey: 'tasks',
    },
    {
      paths: ['/calendar', '/calendar/new-event', '/calendar/events/:id', '/calendar/events/:id/edit'],
      id: 'shr_calendar',
      label: 'Календарь',
      labelKey: 'calendar',
    },
    {
      paths: ['/discussion'],
      id: 'shr_discussions',
      label: 'Обсуждения',
      labelKey: 'community',
    },
    {
      paths: ['/settings'],
      enabled: true,
      label: 'Настройки',
    },
    {
      paths: ['/recruitment/vacancies', '/recruitment/vacancies/:id', '/recruitment/vacancies/new/recruiter',
        '/recruitment/vacancies/:id/edit'],
      id: 'recruitment_core',
      label: 'Вакансии',
    },
    {
      paths: ['/recruitment/candidates', '/recruitment/candidates/:id', '/recruitment/candidates/:id/comparison',
        '/recruitment/candidates/:id/edit'],
      id: 'recruitment_core',
      label: 'Кандидаты',
    },
    {
      paths: ['/recruitment/analytics'],
      id: 'recruitment_core',
      label: 'Воронка подбора',
    },
    {
      paths: ['/community'],
      id: 'shr_feed',
      label: 'Кухня Лиги',
      labelKey: 'community',
    },
    {
      paths: ['/assessments', '/assessments/:id/session', '/assessments/:id'],
      id: 'shr_assessment',
      label: 'Оценка',
      labelKey: 'assessment',
    }
  ],
  intranetRoutes: [
    {
      path: '/employees',
      component: 'EmployeesContainer',
      label: 'Сотрудники',
      enabled: true,
    },
    {
      path: '/employees/:id',
      component: 'EmployeeContainer',
      label: 'Сотрудники',
      enabled: true,
    },
    {
      path: '/employees/:id/edit',
      component: 'EmployeeEditContainer',
      label: 'Редактирование сотрудника',
      enabled: true,
    },
    {
      path: '/employees/:id/edit/resume',
      component: 'EmployeeEditResumeContainer',
      label: 'Редактирование сотрудника',
      enabled: true,
    },
    {
      path: '/settings',
      component: 'SettingsContainer',
      label: 'Настройки',
      enabled: true,
    },
    {
      path: '/news',
      component: 'NewsContainer',
      label: 'Новости',
      id: 'shr_news',
    },
    {
      path: '/news/:id',
      component: 'NewContainer',
      label: 'Main new',
      id: 'shr_news',
    },
    {
      path: '/services',
      component: 'ServicesContainer',
      label: 'Сервисы',
      id: 'shr_services',
    },
    {
      path: '/services/:id',
      component: 'ServiceContainer',
      label: 'Сервис',
      id: 'shr_services',
    },
    {
      path: '/bids',
      component: 'BidsContainer',
      label: 'Мои заявки',
      id: 'shr_bids',
    },
    {
      path: '/services/:id/bids/new',
      component: 'NewBidContainer',
      label: 'Создание заявки',
      id: 'shr_bids',
    },
    {
      path: '/bids/:id',
      component: 'BidContainer',
      label: 'Заявка',
      id: 'shr_bids',
    },
    {
      path: '/bids/:id/edit',
      component: 'EditBidContainer',
      label: 'Редактирование заявки',
      id: 'shr_bids',
    },
    {
      path: '/structure',
      component: 'StructureContainer',
      label: 'Структура',
      id: 'shr_org',
    },
    {
      path: '/community',
      component: 'CommunityContainer',
      label: 'Кухня Лиги',
      id: 'shr_feed',
    },
    {
      path: '/chats',
      component: 'ChatContainer',
      label: 'Чат',
      id: 'core',
    },
    {
      path: '/surveys/new',
      component: 'SurveyFormContainer',
      label: 'Создать опрос',
      id: 'shr_surveys',
    },
    {
      path: '/surveys',
      component: 'SurveysContainer',
      label: 'Опросы',
      id: 'shr_surveys',
    },
    {
      path: '/surveys/:id',
      component: 'SurveyContainer',
      label: 'Опрос',
      id: 'shr_surveys',
    },
    {
      path: '/surveys/:id/edit',
      component: 'SurveyFormContainer',
      mycontext: 'edit',
      label: 'Редактирование опроса',
      id: 'shr_surveys',
    },
    {
      path: '/surveys/:id/publication',
      component: 'PublicationSurveyContainer',
      label: 'Публикация',
      id: 'shr_surveys',
    },
    {
      path: '/calendar',
      component: 'CalendarContainer',
      label: 'Календарь',
      id: 'shr_calendar',
    },
    {
      path: '/calendar/events/:id',
      component: 'ContainerEvent',
      label: 'Событие',
      id: 'shr_calendar',
    },
    {
      path: '/calendar/events/:id/edit',
      component: 'ContainerEditEvent',
      label: 'Редактирование события',
      id: 'shr_calendar',
    },
    {
      path: '/calendar/new-event',
      component: 'ContainerNewEvent',
      label: 'Создать событие',
      id: 'shr_calendar',
    },
    {
      path: '/distribution',
      component: 'DistributionContainer',
      label: 'Команды',
      id: 'shr_teams',
    },
    {
      path: '/projects',
      component: 'ProjectsContainer',
      label: 'Проекты',
      id: 'shr_projects',
    },
    {
      path: '/projects/new',
      component: 'NewProjectContainer',
      label: 'Новый проект',
      id: 'shr_projects',
    },
    {
      path: '/projects/:id/edit',
      component: 'NewProjectContainer',
      label: 'Редактировкаие проекта',
      id: 'shr_projects',
    },
    {
      path: '/projects/:id',
      component: 'ProjectContainer',
      label: 'Проект',
      id: 'shr_projects',
    },
    {
      path: '/discussion',
      component: 'DiscussionContainer',
      label: 'Обсуждение',
      id: 'shr_discussions',
    },
    {
      path: '/tasks',
      component: 'TaskManagerContainer',
      label: 'Задачи',
      id: 'shr_tasks',
    },
    {
      path: '/personel-roaster-employees',
      component: 'PersonelRoasterEmployeesContainer',
      label: 'Кадровый реестр сотрудников',
      id: 'shr_org',
    },
    {
      path: '/assessments',
      component: 'AssessmentsRegisterContainer',
      label: 'Оценка',
      id: 'shr_assessment',
    },
    {
      path: '/assessments/:id/session',
      component: 'AssessmentSessionContainer',
      label: 'Оценка',
      id: 'shr_assessment',
    },
    {
      path: '/assessments/:id',
      component: 'AssessmentSessionCard',
      label: 'Оценка',
      id: 'shr_assessment',
    },
  ],
  recruitmentRoutes: [
    {
      path: `${base}/my`,
      component: 'MainContainerRecruitment',
      label: 'Главная страница',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies`,
      component: 'Vacancies',
      label: 'Вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/candidates/new`,
      component: 'CandidateNew',
      label: 'Новый кандидат',
      id: 'recruitment_core',
    },
    {
      path: `${base}/candidates/:id`,
      component: 'CandidateContainer',
      label: 'Кандидат',
      id: 'recruitment_core',
    },
    {
      path: `${base}/candidates/:id/edit`,
      component: 'CandidateNew',
      label: 'Кандидат - Редактирование',
      id: 'recruitment_core',
    },
    {
      path: `${base}/task`,
      component: 'TasksContainer',
      label: 'Задачи',
      id: 'recruitment_tasks',
    },
    {
      path: `${base}/vacancies/:id`,
      component: 'VacancyContainer',
      label: 'Developer Ruby-on-Rails',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies_new/:id`,
      component: 'VacancyContainer',
      label: 'Developer Ruby-on-Rails',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit`,
      component: 'VacancyNew',
      label: 'Редактирование вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit/recruiter`,
      component: 'VacancyNew',
      label: 'Редактирование вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit/recruiter/info`,
      component: 'VacancyNew',
      label: 'Информация о вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit/recruiter/full`,
      component: 'VacancyNew',
      label: 'Общая информация',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit/recruiter/selection`,
      component: 'VacancyNew',
      label: 'Этапы отбора кандидатов',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/:id/edit/recruiter/settings`,
      component: 'VacancyNew',
      label: 'Настройки публикации',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/new/recruiter`,
      component: 'VacancyNew',
      label: 'Создание вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/new/recruiter/info`,
      component: 'VacancyNew',
      label: 'Информация о вакансии',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/new/recruiter/full`,
      component: 'VacancyNew',
      label: 'Общая информация',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/new/recruiter/selection`,
      component: 'VacancyNew',
      label: 'Этапы отбора кандидатов',
      id: 'recruitment_core',
    },
    {
      path: `${base}/vacancies/new/recruiter/settings`,
      component: 'VacancyNew',
      label: 'Настройки публикации',
      id: 'recruitment_core',
    },
    {
      path: `${base}/candidates`,
      component: 'Candidates',
      label: 'Кандидаты',
      id: 'recruitment_core',
    },
    {
      path: `${base}/candidates/:id/comparison`,
      component: 'Comparison',
      label: 'Сравнение',
      id: 'recruitment_core',
    },
    {
      path: `${base}/analytics`,
      component: 'Analytics',
      label: 'Аналитика',
      id: 'recruitment_core',
    },
  ],
}

const rootRouteComponent = (enabled_components) => {
  if (enabled_components.shr_core) {
    if (enabled_components.shr_news){
      return 'MainContainer'
    } else {
      return 'EmployeesContainer'
    }
  } else {
    return 'MainContainerRecruitment'
  }
}

const showItemTest = (it, enabled_components) => {
  if (it.depended_id){
    return get(enabled_components, it.depended_id) ?
      false : get(enabled_components,it.id, it.enabled)
  } else {
    return get(enabled_components,it.id, it.enabled)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APPLICATION_SETTINGS_UPDATE_RES':
      const enabledComponents = get(action.payload, 'enabled_components', state.enabledComponents)
      const menuLabels = get(action.payload, 'menu')
      const disabledTopMenu = map(keys(pickBy(enabledComponents, val => !val)), it => toCamelCase(it))

      return { ...state,
        settings: action.payload,
        enabledComponents: enabledComponents,
        menu: state.menu.map(it => ({
          ...it,
          enabled: showItemTest(it, enabledComponents)
        })).map(it => ({
          ...it,
          label: get(menuLabels, `[${it.labelKey}].value`, it.label)
        })),
        topMenu: state.topMenu.map(it => ({
          ...it,
          listMenu: enabledComponents[it.coreId] ? remove(it.listMenu, i => !disabledTopMenu.includes(i)) : []
        })).map(it => ({
          ...it,
          listMenu: it.rootRoute ? (enabledComponents.shr_core ? [] : it.listMenu) : it.listMenu,
        })),
        intranetRoutes: state.intranetRoutes.map(it => ({
          ...it,
          enabled: showItemTest(it, enabledComponents)
        })),
        recruitmentRoutes: state.recruitmentRoutes.map(it => ({
          ...it,
          enabled: showItemTest(it, enabledComponents)
        })),
        rootRoute: {
          ...state.rootRoute,
          component: rootRouteComponent(enabledComponents),
        },
        intranetBreadcrumbs: state.intranetBreadcrumbs.map(it => ({
          ...it,
          label: get(menuLabels, `[${it.labelKey}].value`, it.label),
          enabled: showItemTest(it, enabledComponents),
        }))
      }
    case 'GET_USERS_COUNTER_RES':
      return { ...state, counter: action.payload }
    default:
      return state
  }
}
