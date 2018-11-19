import api from '../../api'

describe('API News', () => {
  it('should fetch all news', async () => {
    const response = await api.news.all()
    expect(response.data).toMatchSnapshot()
  })

  it('should find news by id', async () => {
    const response = await api.news.findById(35)
    expect(response.data).toMatchSnapshot()
  })

  it('should return news categories', async () => {
    const response = await api.news.categories()
    expect(response.data).toMatchSnapshot()
  })

  it('should return news by params', async () => {
    const response = await api.news.where({ params: { news_category_id: 6 } })
    expect(response.data).toMatchSnapshot()
  })
})
