import api from '../../api'

describe('API Vacancy Stage Group', () => {
  it('should fetch vacancy stage group', async () => {
    const response = await api.vacancy_stage_group()
    expect(response.data).toMatchSnapshot()
  })
})
