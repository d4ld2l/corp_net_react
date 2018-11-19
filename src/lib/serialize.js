// @flow

export default (params: {}, seconde: boolean): string =>
  `${!seconde ? '?' : '&'}${Object.entries(params)
    .map(it => it.join('='))
    .join('&')}`
