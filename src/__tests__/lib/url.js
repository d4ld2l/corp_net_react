import url from '../../lib/url'

describe('Format URL', () => {
  it('should replace id in url', () => {
    const URL = '/hello/{{ id }}.json'
    expect(url(URL, { id: 123 })).toEqual('/hello/123.json')
  })

  it('should work without spaces too', () => {
    expect(url('/hello/{{id}}.json', { id: 123 })).toEqual('/hello/123.json')
    expect(url('/hello/{{   id}}.json', { id: 123 })).toEqual('/hello/123.json')
    expect(url('/hello/{{id   }}.json', { id: 123 })).toEqual('/hello/123.json')
    expect(url('/hello/{{id   }}-{{state}}.json', { id: 123, state: 'hello' })).toEqual(
      '/hello/123-hello.json'
    )
  })
})
