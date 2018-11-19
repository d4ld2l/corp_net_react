import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, color, text, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import Avatar from 'components-folder/Icon/Avatar'

const stories = storiesOf('Components/Icons', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Avatar',
  withNotes('Avatar')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Avatar</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Avatar from 'components-folder/Icon/Avatar'"
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
        <Avatar
          size={170}
          className={text('className', '')}
          style={object('style', { width: '170px' })}
          color={color('color', '#FC5D5D')}
        />
        <Avatar
          size={90}
          className={text('className', '')}
          style={object('style', { width: '90px' })}
          color={color('color', '#FC5D5D')}
        />
        <Avatar
          size={30}
          className={text('className', '')}
          style={object('style', { width: '30px' })}
          color={color('color', '#FC5D5D')}
        />
        <Avatar
          className={text('className', '')}
          style={object('style', { width: '16px' })}
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
          <strong>size</strong> — задать размер и тип аватарки. Значения 170, 90, 30, 16 - по умолчанию и не требует наличия свойства size.
        </p>
      </div>
    </div>
  ))
)
