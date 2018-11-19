export const experienceOptions = [
  { label: 'Нет опыта', value: 'no_experience' },
  { label: 'От 1 года', value: 'from_1_year' },
  { label: 'До 3 лет', value: 'for_3_years' },
  { label: 'От 3 до 6 лет', value: 'from_3_to_6_years' },
  { label: 'Более 6 лет', value: 'from_6_years' },
]

export const scheduleOptions = [
  { label: 'Полный день', value: 'full_day' },
  { label: 'Сменный график', value: 'exchangeable' },
  { label: 'Гибкий график', value: 'flextime' },
  { label: 'Удаленная работа', value: 'remote' },
  { label: 'Вахтовый метод', value: 'rotating' },
]

export const typeOfEmploymentOptions = [
  { label: 'Полная занятость', value: 'full_time' },
  { label: 'Частичная занятость', value: 'part_time' },
  { label: 'Проектная/Временная работа', value: 'temporary' },
  { label: 'Волонтерство', value: 'volunteering' },
  { label: 'Стажировка', value: 'probation' },
]

export const typeOfContractOptions = [
  { label: 'Срочный', value: 'fixed_term' },
  { label: 'Бесрочный', value: 'indefinite' },
]

export const typeOfSalaryOptions = [
  { label: 'После вычета налогов', value: 'net' },
  { label: 'До вычета налогов', value: 'gross' },
]

export const editorConfig = {
  toolbar: 'Basic',
  toolbar_Basic: [
    {
      name: 'basicstyles',
      items: ['Bold', 'Italic', 'Strike', 'RemoveFormat']
    },
    {
      name: 'paragraph',
      items: ['NumberedList', 'BulletedList', '-']
    },
    {
      name: 'links',
      items: ['Link']
    },
  ],
}
