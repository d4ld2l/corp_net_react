// @flow

import replace from 'ramda/src/replace'
import keys from 'ramda/src/keys'
import __ from 'ramda/src/__'
import reduce from 'ramda/src/reduce'
import prop from 'ramda/src/prop'
import compose from 'ramda/src/compose'

export default (url: string, params: Object = {}): string =>
  compose(
    reduce(
      (acc, key) =>
        compose(replace(new RegExp(`{{ *${key}+ *}}`, 'g'), __, acc), prop(__, params))(key),
      url
    ),
    keys
  )(params)
