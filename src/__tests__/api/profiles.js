import api from '../../api'

describe('API Profiles', () => {
  it('should fetch my profile', async () => {
    const response = await api.profiles.me()
    expect(response.data).toMatchSnapshot()
  })
})
