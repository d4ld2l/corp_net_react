import api from '../../api'

describe('API Events', () => {
  it('should fetch all events', async () => {
    const response = await api.events.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find event by id', async () => {
    const response = await api.events.findById(2)
    expect(response.data).toMatchSnapshot()
  })

  it('should return event types', async () => {
    const response = await api.events.types()
    expect(response.data).toMatchSnapshot()
  })

  it('should search participants')
})
