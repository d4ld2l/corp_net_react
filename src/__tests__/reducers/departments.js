import reducer from '../../redux/reducers/departments'

describe('departments reducer', () => {
  const initialState = []

  it('should match GET_DEPARTMENTS_TREE_RES snapshot', () => {
    const action = {
      type: 'GET_DEPARTMENTS_TREE_RES',
      payload: [
        {
          id: 2,
          name: 'Университет',
          code: 'Университет',
          uuid: 'Университет',
          company_id: null,
          created_at: '2017-08-21T13:36:26.676Z',
          updated_at: '2017-10-05T14:38:34.649Z',
          logo: {},
          departments_tree: [
            {
              id: 2,
              company_id: 3,
              code: 'root',
              name_ru: 'Допинг-контроль',
              parent_id: null,
              region: 36,
              created_at: '2017-08-04T14:20:10.796Z',
              updated_at: '2017-10-05T14:51:58.167Z',
              legal_unit_id: 1,
              manager_id: null,
              logo: {},
              children: [],
              participants: [],
              participants_count: 1,
            },
          ],
        },
      ],
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })
})
