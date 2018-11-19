import api from '../../api'

describe('API Vacancies', () => {
  it('should fetch all vacancies', async () => {
    const response = await api.vacancies.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find vacancy by id', async () => {
    const response = await api.vacancies.findById(87)
    expect(response.data).toMatchSnapshot()
  })

  it('should find vacancy by params', async () => {
    const response = await api.vacancies.findBy({ vacancy: { place_of_work: 'Воронеж' } })
    expect(response.data).toMatchSnapshot()
  })
})
