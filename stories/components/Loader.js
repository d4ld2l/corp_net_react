import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../src/style/base.css'

import Loader from 'components-folder/Loader'
import 'components-folder/Loader/style.css'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Loader',
  withNotes('Отрабатывает во время загрузки исполнимых файлов и запуск соответствующих новых процессов.')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Loader</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Loader from 'components-folder/Loader'"
            id="connect"
            className={'stories__connect_input'}
          />
          <button className={'stories__connect_btn btn btn-outline btn-small'} onClick={Clipboard}>
            Копировать путь
          </button>
        </div>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Внешний вид:</h3>
        <Loader />
      </div>
    </div>
  ))
)
