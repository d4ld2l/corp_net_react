import api from '../../api'

describe('API Candidates', () => {
  it('should fetch all candidates', async () => {
    const response = await api.candidates.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find candidate by id', async () => {
    const response = await api.candidates.findById(1)
    expect(response.data).toMatchSnapshot()
  })
})
