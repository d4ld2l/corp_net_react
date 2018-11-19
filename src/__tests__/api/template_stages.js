import api from '../../api'

describe('API Template Stages', () => {
  it('should fetch template stages', async () => {
    const response = await api.template_stages()
    expect(response.data).toMatchSnapshot()
  })
})
