import CandidateContainer from 'containers-folder/Recruitment/Candidate'
import CandidateNew from 'containers-folder/Recruitment/CandidateNew'
import Vacancies from 'containers-folder/Recruitment/Vacancies'
import MainContainer from 'containers-folder/MainContainer'
import TasksContainer from 'containers-folder/TasksContainer'
import NoFoundContainer from 'containers-folder/NoFoundContainer'
import Comparison from 'containers-folder/Recruitment/Comparison'
import VacancyNew from 'containers-folder/Recruitment/VacancyNew'
import Candidates from 'containers-folder/Recruitment/Candidates'
import NewCandidateForm from 'containers-folder/Recruitment/NewCandidateForm'
import VacancyContainer from 'containers-folder/Recruitment/Vacancy'
import Analytics from 'containers-folder/Recruitment/Analytics'
import TaskManagerContainer  from '../../containers/IntranetContainer/TaskManager'


const base = '/recruitment'

const recruitment = [
  {
    path: `${base}/my`,
    component: MainContainer,
    label: 'Мои вакансии',
    showInMenu: true,
    exact: true,
    private: true,
  },
  {
    path: `${base}/vacancies`,
    component: Vacancies,
    label: 'Вакансии',
    showInMenu: true,
    exact: true,
    private: true,
  },
  // {
  //   path: `${base}/candidates/new`,
  //   component: CandidateNew,
  //   label: 'Новый кандидат',
  //   exact: true,
  //   private: true,
  //   showInMenu: false,
  // },
  {
    path: `${base}/candidates/new`,
    component: NewCandidateForm,
    label: 'Новый кандидат',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/candidates/:id`,
    component: CandidateContainer,
    label: 'Кандидат',
    exact: true,
    private: true,
    showInMenu: false,
  },
  // {
  //   path: `${base}/candidates/:id/edit`,
  //   component: CandidateNew,
  //   label: 'Кандидат - Редактирование',
  //   exact: true,
  //   private: true,
  //   showInMenu: false,
  // },
  {
    path: `${base}/candidates/:id/edit`,
    component: NewCandidateForm,
    label: 'Кандидат - Редактирование',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/tasks`,
    component: TasksContainer,
    label: 'Задачи',
    showInMenu: false,
    exact: true,
    private: true,
  },
  {
    path: `${base}/vacancies/:id`,
    component: VacancyContainer,
    label: 'Developer Ruby-on-Rails',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies_new/:id`,
    component: VacancyContainer,
    label: 'Developer Ruby-on-Rails',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit`,
    component: VacancyNew,
    label: 'Редактирование вакансии',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit/recruiter`,
    component: VacancyNew,
    label: 'Редактирование вакансии',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit/recruiter/info`,
    component: VacancyNew,
    label: 'Информация о вакансии',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit/recruiter/full`,
    component: VacancyNew,
    label: 'Общая информация',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit/recruiter/selection`,
    component: VacancyNew,
    label: 'Этапы отбора кандидатов',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/:id/edit/recruiter/settings`,
    component: VacancyNew,
    label: 'Настройки публикации',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/new/recruiter`,
    component: VacancyNew,
    label: 'Создание вакансии',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/new/recruiter/info`,
    component: VacancyNew,
    label: 'Информация о вакансии',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/new/recruiter/full`,
    component: VacancyNew,
    label: 'Общая информация',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/new/recruiter/selection`,
    component: VacancyNew,
    label: 'Этапы отбора кандидатов',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/vacancies/new/recruiter/settings`,
    component: VacancyNew,
    label: 'Настройки публикации',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    path: `${base}/candidates`,
    component: Candidates,
    label: 'Кандидаты',
    showInMenu: true,
    exact: true,
    private: true,
  },
  {
    path: `${base}/candidates/:id/comparison`,
    component: Comparison,
    label: 'Сравнение',
    showInMenu: false,
    exact: true,
    private: true,
  },
  {
    path: `${base}/analytics`,
    component: Analytics,
    label: 'Аналитика',
    showInMenu: false,
    exact: true,
    private: true,
  },
  {
    path: '/recruitment/task',
    component: TaskManagerContainer,
    label: 'Задачи',
    exact: true,
    private: true,
    showInMenu: false,
  },
  {
    component: NoFoundContainer,
  },
]

export default recruitment

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

  addToObj(recruitment)

  return obj[path]
}
