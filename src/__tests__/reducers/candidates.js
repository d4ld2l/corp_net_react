import reducer from '../../redux/reducers/candidates'

describe('candidates reducer', () => {
  const initialState = {
    data: [],
    current: {},
    openLinkedCandidateModal: false,
    sources: [],
  }

  it('should match GET_CANDIDATES_RES snapshot', () => {
    const action = {
      type: 'GET_CANDIDATES_RES',
      payload: [
        {
          birthdate: null,
          candidate_vacancies: [
            {
              candidate_id: 1,
              created_at: '2017-08-11T18:21:18.446Z',
              current_vacancy_stage_id: 16,
              id: 1,
              updated_at: '2017-08-11T18:21:18.446Z',
              vacancy_id: 43,
            },
            {
              candidate_id: 1,
              created_at: '2017-08-14T14:13:47.194Z',
              current_vacancy_stage_id: 56,
              id: 5,
              updated_at: '2017-08-17T11:24:27.863Z',
              vacancy_id: 48,
            },
          ],
          created_at: '2017-08-10T08:45:27.030Z',
          first_name: 'Откорней',
          id: 1,
          last_name: 'Докончиков',
          middle_name: 'Муфлонович',
          updated_at: '2017-08-10T08:45:27.030Z',
          vacancy_id: null,
        },
        {
          birthdate: '1989-02-28',
          candidate_vacancies: [],
          created_at: '2017-08-10T09:38:52.457Z',
          first_name: null,
          id: 2,
          last_name: null,
          middle_name: null,
          updated_at: '2017-08-10T09:38:52.457Z',
          vacancy_id: null,
        },
        {
          birthdate: '1994-11-17',
          candidate_vacancies: [
            {
              candidate_id: 3,
              created_at: '2017-08-11T19:04:17.983Z',
              current_vacancy_stage_id: 16,
              id: 3,
              updated_at: '2017-08-11T19:04:17.983Z',
              vacancy_id: 43,
            },
            {
              candidate_id: 3,
              created_at: '2017-08-14T14:14:30.730Z',
              current_vacancy_stage_id: 63,
              id: 6,
              updated_at: '2017-08-17T10:11:30.822Z',
              vacancy_id: 50,
            },
          ],
          created_at: '2017-08-10T09:54:52.718Z',
          first_name: 'Виктория',
          id: 3,
          last_name: 'Сабурова',
          middle_name: 'Игоревна',
          updated_at: '2017-08-10T09:54:52.718Z',
          vacancy_id: null,
        },
      ],
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })

  it('should match GET_CURRENT_CANDIDATE_RES snapshot', () => {
    const action = {
      type: 'GET_CURRENT_CANDIDATE_RES',
      payload: {
        birthdate: '1994-11-17',
        candidate_vacancies: [
          {
            candidate_id: 3,
            created_at: '2017-08-11T19:04:17.983Z',
            current_vacancy_stage_id: 16,
            id: 3,
            updated_at: '2017-08-11T19:04:17.983Z',
            vacancy_id: 43,
          },
          {
            candidate_id: 3,
            created_at: '2017-08-14T14:14:30.730Z',
            current_vacancy_stage_id: 63,
            id: 6,
            updated_at: '2017-08-17T10:11:30.822Z',
            vacancy_id: 50,
          },
        ],
        created_at: '2017-08-10T09:54:52.718Z',
        first_name: 'Виктория',
        id: 3,
        last_name: 'Сабурова',
        middle_name: 'Игоревна',
        updated_at: '2017-08-10T09:54:52.718Z',
        vacancy_id: null,
      },
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })

  it('should match UPDATE_CURRENT_CANDIDATE_RES snapshot', () => {
    const action = {
      type: 'UPDATE_CURRENT_CANDIDATE_RES',
      payload: {
        birthdate: '1994-11-17',
        candidate_vacancies: [],
        created_at: '2017-08-10T09:54:52.718Z',
        first_name: 'Виктория',
        id: 3,
        last_name: 'Сабурова',
        middle_name: 'Игоревна',
        updated_at: '2017-08-10T09:54:52.718Z',
        vacancy_id: null,
      },
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })

  it('should match RELEASE_CURRENT_CANDIDATE snapshot', () => {
    const state = {
      data: [
        {
          birthdate: null,
          candidate_vacancies: [
            {
              candidate_id: 1,
              created_at: '2017-08-11T18:21:18.446Z',
              current_vacancy_stage_id: 16,
              id: 1,
              updated_at: '2017-08-11T18:21:18.446Z',
              vacancy_id: 43,
            },
            {
              candidate_id: 1,
              created_at: '2017-08-14T14:13:47.194Z',
              current_vacancy_stage_id: 56,
              id: 5,
              updated_at: '2017-08-17T11:24:27.863Z',
              vacancy_id: 48,
            },
          ],
          created_at: '2017-08-10T08:45:27.030Z',
          first_name: 'Откорней',
          id: 1,
          last_name: 'Докончиков',
          middle_name: 'Муфлонович',
          updated_at: '2017-08-10T08:45:27.030Z',
          vacancy_id: null,
        },
      ],
      current: {
        birthdate: '1994-11-17',
        candidate_vacancies: [],
        created_at: '2017-08-10T09:54:52.718Z',
        first_name: 'Виктория',
        id: 3,
        last_name: 'Сабурова',
        middle_name: 'Игоревна',
        updated_at: '2017-08-10T09:54:52.718Z',
        vacancy_id: null,
      },
      openLinkedCandidateModal: true,
      sources: [],
    }
    const action = { type: 'RELEASE_CURRENT_CANDIDATE' }
    expect(reducer(state, action)).toMatchSnapshot()
  })

  it('should match TOGGLE_LINKED_CANDIDATE_MODAL snapshot', () => {
    const action = {
      type: 'TOGGLE_LINKED_CANDIDATE_MODAL',
      payload: true,
    }
    expect(reducer(initialState, action)).toMatchSnapshot()
  })
})
