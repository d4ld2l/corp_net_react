import type { EventRaw } from '../types/raws'
import type { EventPresenter } from '../types/presenters'

export default (raw: EventRaw): EventPresenter => ({
  ...raw,
  title: raw.name,
  start: new Date(raw.starts_at),
  end: new Date(raw.ends_at),
  desc: raw.description,
})
