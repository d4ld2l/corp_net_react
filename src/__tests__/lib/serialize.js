import serialize from '../../lib/serialize'

describe('serialize', () => {
  it('should serialize object to query params', () => {
    expect(serialize({ hello: 'world' })).toEqual('?hello=world')
    expect(serialize({ hello: undefined })).toEqual('?hello=')
    expect(serialize({})).toEqual('?')
    expect(serialize({ '123': 456 })).toEqual('?123=456')
    expect(serialize({ hello: 'world' })).not.toEqual('?hello=wrong')
  })
})
