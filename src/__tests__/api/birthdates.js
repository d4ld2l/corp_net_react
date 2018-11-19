import api from '../../api'

describe('API Birthdates', () => {
  it('should fetch nearest birthdates', async () => {
    const response = await api.birthdates.nearest()
    expect(response.data).toMatchSnapshot()
  })
})
