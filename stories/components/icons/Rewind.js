import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, color, text, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import Rewind from 'components-folder/Icon/Rewind'

const stories = storiesOf('Components/Icons', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Rewind',
  withNotes('Rewind')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Rewind</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Rewind from 'components-folder/Icon/Rewind'"
            id="connect"
            className={'stories__connect_input'}
          />
          <button className={'stories__connect_btn btn btn-outline btn-small'} onClick={Clipboard}>
            Копировать путь
          </button>
        </div>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>
          Внешний вид: <small>переходите во вкладку KNOBS, вносите изменения</small>
        </h3>
        <Rewind
          className={text('className', '')}
          style={object('style', { width: '30px' })}
          color={color('color', '#FC5D5D')}
        />
        <Rewind type={'outline'} />
        <Rewind type={'filled'} />
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>className</strong> — добавить class к иконке;
        </p>
        <p>
          <strong>color</strong> — задать цвет;
        </p>
        <p>
          <strong>style</strong> — задать стили через style.
        </p>
        <p>
          <strong>type</strong> — outline, filled, если ничего не нужно не указывайте type.
        </p>
      </div>
    </div>
  ))
)