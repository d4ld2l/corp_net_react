import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, color, text, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import CheckboxCircle from 'components-folder/Icon/CheckboxCircle'

const stories = storiesOf('Components/Icons', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'CheckboxCircle',
  withNotes('CheckboxCircle')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>CheckboxCircle</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import CheckboxCircle from 'components-folder/Icon/CheckboxCircle'"
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
        <CheckboxCircle
          className={text('className', '')}
          style={object('style', { width: '50px' })}
        />
        <CheckboxCircle
          active
          className={text('className', '')}
          style={object('style', { width: '50px' })}
        />
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>className</strong> — добавить class к иконке;
        </p>
        <p>
          <strong>style</strong> — задать стили через style.
        </p>
        <p>
          <strong>status=active</strong> — задать активные стили.
        </p>
        <p>
          <strong>status=transparent</strong> — задать прозрачный фон.
        </p>
      </div>
    </div>
  ))
)
