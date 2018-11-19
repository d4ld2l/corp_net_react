import api from '../../api'

describe('API Permissions', () => {
  it('should fetch my permissions', async () => {
    const response = await api.permissions.my()
    expect(response.data).toMatchSnapshot()
  })
})
