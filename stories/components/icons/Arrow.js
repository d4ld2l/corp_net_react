import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, color, text, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import Arrow from 'components-folder/Icon/Arrow'

const stories = storiesOf('Components/Icons', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Arrow',
  withNotes('Arrow')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Arrow</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Arrow from 'components-folder/Icon/Arrow'"
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
        <Arrow
          dir={'up'}
          className={text('className', '')}
          style={object('style', { width: '40px' })}
          color={color('color', '#FC5D5D')}
        />
        <Arrow
          dir={'right'}
          className={text('className', '')}
          style={object('style', { width: '40px' })}
          color={color('color', '#FC5D5D')}
        />
        <Arrow
          dir={'left'}
          className={text('className', '')}
          style={object('style', { width: '40px' })}
          color={color('color', '#FC5D5D')}
        />
        <Arrow
          className={text('className', '')}
          style={object('style', { width: '40px' })}
          color={color('color', '#FC5D5D')}
        />
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
          <strong>dir</strong> — задать направление. Значения: up, right, left, down - по умолчанию, не трубует наличия свойства dir.
        </p>
      </div>
    </div>
  ))
)
