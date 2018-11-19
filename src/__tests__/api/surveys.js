import api from '../../api'

describe('API Surveys', () => {
  it('should fetch all surveys', async () => {
    const response = await api.surveys.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find survey by id', async () => {
    const response = await api.surveys.findById(9)
    expect(response.data).toMatchSnapshot()
  })
})
