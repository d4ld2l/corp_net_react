import api from '../../api'

describe('API Tags', () => {
  it('should fetch all tags', async () => {
    const response = await api.tags.all()
    expect(response.data).toMatchSnapshot()
  })
})
