import api from '../../api'

describe('API Employees', () => {
  it('should fetch all employees', async () => {
    const response = await api.employees.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find employee by id', async () => {
    const response = await api.employees.findById(56)
    expect(response.data).toMatchSnapshot()
  })

  it('should search employees by params', async () => {
    const response = await api.employees.search({ params: { q: 'Аксенов Сергей' } })
    expect(response.data).toMatchSnapshot()
  })
})
