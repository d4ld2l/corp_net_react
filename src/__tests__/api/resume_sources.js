import api from '../../api'

describe('API Resume Sources', () => {
  it('should fetch all resume sources', async () => {
    const response = await api.resume_sources()
    expect(response.data).toMatchSnapshot()
  })
})
