import api from '../../api'

describe('API Departments', () => {
  it('should fetch departments tree', async () => {
    const response = await api.departments.tree()
    expect(response.data).toMatchSnapshot()
  })
})
