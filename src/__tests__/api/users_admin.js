import api from '../../api'

describe('API Users Admin', () => {
  it('should fetch all users admins by params', async () => {
    const response = await api.users_admin.where({ params: { role: 'recruitment_recruiter' } })
    expect(response.data).toMatchSnapshot()
  })
})
