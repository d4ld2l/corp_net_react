import reducer from '../../redux/reducers/vacancies'

describe('vacancies reducer', () => {
  const initialState = {
    data: [],
    current: {},
    currentCandidates: [],
    selectVacancies: [],
    currentSelectVacancies: null,
  }

  it('should match GET_VACANCIES_RES snapshot', () => {
    const action = {
      type: 'GET_VACANCIES_RES',
      payload: [
        {
          additional_tests: null,
          candidate_vacancies: [],
          comment: null,
          comment_for_employee: null,
          created_at: '2017-10-10T13:28:34.222Z',
          creator: {
            company_id: null,
            created_at: '2017-08-21T15:26:16.373Z',
            email: 'msemenova@phoenixit.ru',
            id: 48,
            profile: {
              birthday: null,
              city: 'Москва',
              created_at: '2017-08-21T15:26:16.375Z',
              email_private: null,
              fb_url: null,
              id: 43,
              linkedin_url: null,
              middlename: 'Михайловна',
              name: 'Марина',
              password: null,
              phone_number_private: null,
              photo: {
                for_community: {
                  url:
                    '/assets/for_community_missing-b4f8a53e68d54f5cbac13188d8bf4b02d19b8f53a3675d3ee3b20dbe774f8155.png',
                },
                for_profile: {
                  url:
                    '/assets/for_profile_missing-3657db474bfb89493ca65924eb79e5524e1d9f39ce157404483d14d94d69db44.png',
                },
                thumb: {
                  url:
                    '/assets/thumb_missing-f015378f0e113aa915f555c42fef4271455cce2836370ddbdb9c4b8c0a6d368e.png',
                },
                url:
                  '/assets/missing-408c62833ba40df558fa15d6dea581b920e7fb644468c06b2d565dc1eaf686f8.png',
              },
              sex: null,
              skype: null,
              surname: 'Семенова',
              telegram: null,
              updated_at: '2017-08-21T15:26:16.375Z',
              user_id: 48,
              vk_url: null,
            },
            provider: 'email',
            status: null,
            uid: 'msemenova@phoenixit.ru',
            updated_at: '2017-10-17T12:32:47.907Z',
          },
          creator_id: 48,
          current_stage_id: null,
          demands: 'Чтоб нормально работало все блин',
          duties: 'Наконец- то',
          ends_at: '2017-10-26',
          experience: ['no_experience'],
          file: {
            url: null,
          },
          id: 87,
          job_subdivision: 'Практика Спорт',
          level_of_salary_from: 10000,
          level_of_salary_to: 20000,
          manager_id: null,
          name: 'Проверка_СозданиеВакансии',
          owner: {
            company_id: null,
            created_at: '2017-07-19T12:13:11.270Z',
            email: 'admin@example.com',
            id: 1,
            profile: {
              birthday: null,
              city: 'Москва',
              created_at: '2017-07-19T12:13:31.436Z',
              email_private: '',
              fb_url: '',
              id: 1,
              linkedin_url: '',
              middlename: 'Администратор',
              name: 'Системный',
              password: null,
              phone_number_private: '',
              photo: {
                for_community: {
                  url:
                    '/assets/for_community_missing-b4f8a53e68d54f5cbac13188d8bf4b02d19b8f53a3675d3ee3b20dbe774f8155.png',
                },
                for_profile: {
                  url:
                    '/assets/for_profile_missing-3657db474bfb89493ca65924eb79e5524e1d9f39ce157404483d14d94d69db44.png',
                },
                thumb: {
                  url:
                    '/assets/thumb_missing-f015378f0e113aa915f555c42fef4271455cce2836370ddbdb9c4b8c0a6d368e.png',
                },
                url:
                  '/assets/missing-408c62833ba40df558fa15d6dea581b920e7fb644468c06b2d565dc1eaf686f8.png',
              },
              sex: 'male',
              skype: '',
              surname: 'Старший',
              telegram: '',
              updated_at: '2017-07-25T20:30:26.851Z',
              user_id: 1,
              vk_url: '',
            },
            provider: 'email',
            status: 'Meleys',
            uid: 'admin@example.com',
            updated_at: '2017-10-17T15:35:23.122Z',
          },
          owner_id: 1,
          place_of_work: 'Москва',
          positions_count: 1,
          reason_for_opening: 'Очень надо',
          schedule: ['full_day'],
          show_salary: null,
          status: 'paused',
          type_of_contract: 'indefinite',
          type_of_employment: ['full_time'],
          type_of_salary: 'gross',
          updated_at: '2017-10-12T09:22:45.973Z',
          users_vacancies: [],
          vacancy_stages: [],
        },
      ],
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })
})
