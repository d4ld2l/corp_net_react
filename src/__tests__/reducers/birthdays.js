import reducer from '../../redux/reducers/birthdays'

describe('birthdays reducer', () => {
  const initialState = {
    current: {},
  }

  it('should match GET_BIRTHDAYS_CURRENT_RES snapshot', () => {
    const action = {
      type: 'GET_BIRTHDAYS_CURRENT_RES',
      payload: {
        '2018-01-05': [
          {
            birthday: '1993-01-05',
            email: 'yuivannikov@phoenixit.ru',
            full_name: 'Иванников Юрий Юрьевич',
            id: 24,
            photo: {
              for_community: {
                url: '/uploads/profile/photo/24/for_community_Pickles.jpg',
              },
              for_profile: {
                url: '/uploads/profile/photo/24/for_profile_Pickles.jpg',
              },
              thumb: {
                url: '/uploads/profile/photo/24/thumb_Pickles.jpg',
              },
              url: '/uploads/profile/photo/24/Pickles.jpg',
            },
          },
        ],
      },
    }

    expect(reducer(initialState, action)).toMatchSnapshot()
  })
})
