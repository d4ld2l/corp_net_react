
// export const PERSONEL_ROASTER_DATA = [
//   {
//     group_id: '39719284',
//     logo: 'https://pp.userapi.com/c846418/v846418997/35a9d/t4mpfd4FmVE.jpg',
//     title: 'Название группы',
//     subtitle: 'Блок Инновационные решения / Практика омниканальных решений',
//     date: '12.04.1999',
//     time: '14:22',
//     director: 'Гаври́ла Але́ксич',
//     count_companies: 15,
//     name: 'Алевтина Кондрашова',
//     company_name:'ООО "ЛИГА"',
//     practice_name:'Практика омникальных решений',
//     rate:'1/10',
//     unit:'Москва',
//   },
//   {
//     group_id: '22235737',
//     logo: 'https://pp.userapi.com/c7006/v7006385/3b055/wEa4dBJIXm4.jpg',
//     title: 'Практика спорт',
//     subtitle: 'Ценностные приоритеты разработчиков как фактор качества рекламных идей, Мария Кураева. Исследовалось влияние ценностных приоритетов разработчиков на качество рекламных идей.',
//     date: '12.12.2010',
//     time: '18:32',
//     director: 'Сергей Эйзенштейн',
//     count_companies: 54,
//     name: 'Георгия Каштановна Корж',
//     company_name:'ООО "РТ.Решение"',
//     practice_name:'Практика решений по вопросам миграции',
//     rate:'1/10',
//     unit:'Москва',
//   },
//   {
//     group_id: '51319050',
//     logo: 'https://pp.userapi.com/c846418/v846418997/35a9d/t4mpfd4FmVE.jpg',
//     title: 'Social HR',
//     subtitle: 'Сейчас на рынке присутствует огромное кол-во команд программистов под разные стеки технологий. Каждая команда уникальна и у всех есть свои плюсы, редко находятся минусы.',
//     date: '12.05.2018',
//     time: '09:51',
//     director: 'Александр Семенович Невский',
//     count_companies: 13,
//     name: 'Каштан Петрович Алехин',
//     company_name:'ООО "Философия.ИТ"',
//     practice_name:'Практика по автоматизации процессов в сфере недвижимости и финансов',
//     rate:'1/10',
//     unit:'Москва',
//   },
// ]
export const GROUPS_ITEM_DATA = [
  {
    group_id: '39719284',
    logo: 'https://static.euronews.com/articles/stories/03/07/36/84/603x339_story-dafaa8c9-c5d1-5bc5-9cd6-6afa8ddc4f5d_759583.jpg',
    name: 'Алевтина Кондрашова',
    date: '22.11.1992',
    phone: '+7 (921) 123-13-12',
    email:'a.levtina@proenixit,ru',
    skype:'kondrik228',
    currentPositions: [
      {
        name:'ООО "Философия.ИТ"',
        practice:'Практика омникальных решений',
        rate:'1/10',
        unit:'Обособленное поразделение в г.Воронеже',
      },
      {
        name:'ООО "ЛИГА"',
        practice:'Практика омникальных решений',
        rate:'5/10',
        unit:'Санкт-Петербург',
      }
    ],
  },
  {
    group_id: '22235737',
    logo: 'https://pp.userapi.com/c7006/v7006385/3b055/wEa4dBJIXm4.jpg',
    name: 'Георгия Каштановна Корж',
    date: '12.04.1999',
    phone: '+7 (921) 453-19-72',
    email:'makskorzh@proenixit,ru',
    skype:'hleb1414',
    currentPositions: [
      {
        name:'ООО "Философия.ИТ"',
        practice:'Практика решений по вопросам миграции',
        rate:'1/10',
        unit:'Москва',
      }
    ],
  },
  {
    group_id: '51319050',
    logo: 'https://pp.userapi.com/c846418/v846418997/35a9d/t4mpfd4FmVE.jpg',
    name: 'Каштан Петрович Алехин',
    date: '20.04.1989',
    phone: '+7 (911) 355-33-12',
    email:'kashtanova@proenixit,ru',
    skype:'kashtan228',
    currentPositions: [
      {
        name:'ООО "Философия.ИТ"',
        practice:'Практика по автоматизации процессов в сфере недвижимости и финансов',
        rate:'1/10',
        unit:'Москва',
      }
    ],
  },

]

export const GROUPS_HEADER = [
  {
    id: 'empty',
    name: ''
  },
  {
    id: 'info',
    name: 'фио и дата рождения'
  },
  {
    id: 'legal-person',
    name: 'юр.лицо'
  },

  {
    id: 'practice',
    name: 'практика'
  },
  {
    id: 'rate',
    name: 'ставка'
  },
  {
    id: 'unit',
    name: 'подразделение'
  },
  {
    id: 'quantity',
    name: 'кол-во юр. лиц'
  },
]


export const EMPLOYMENT_TAB = [
  {
    title: 'ООО "Р.Т. Решение"',
    id: 'first-legal-person',
  },
  {
    title: 'ООО "AT Consulting"',
    id: 'second-legal-person',
  },
]

// export const EMPLOYMENT_INFO = [
//   {
//     tab_name: 'табельный номер',
//     tab_number: '00001212120120',
//     unit_name: 'Подразделение',
//     unit: 'Блок Инновационных решений BSS/GSS / Практика омниканальных решений',
//     position_name: 'Должность',
//     position: 'Должность',
//     rate_name: 'Ставка',
//     rate: '1',
//     type_contract_name: 'Тип договора',
//     type_contract: 'Срочный',
//     salary_name: 'заработная плата',
//     salary: '100 000 руб',
//     date_of_start_contract_name: 'Дата начала трудового договора',
//     date_of_start_contract: '19.04.2017',
//     state_name: 'Состояние',
//     state: 'Работа',
//     office_name: 'Офис',
//     office: 'Москва',
//     type_of_employment_name: 'Вид занятости',
//     type_of_employment: 'Программист',
//   },
// ]


