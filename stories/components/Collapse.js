import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import 'style-folder/base.css'
import Collapse from 'components-folder/Redesign/Collapse/Collapse'
import 'components-folder/Redesign/Collapse/collapse.css'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Collapse',
  withNotes('Поле ввода')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Collapse</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Collapse from 'components-folder/Redesign/Collapse/Collapse'"
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
        <Collapse label={'Образование'}>
          <p style={{ margin: 0 }}>
            Вред сахара давно и очевидно доказан. Известно, что белый рафинированный  сахар – это
            энергетическая пустышка, лишенная белков, жиров и питательных веществ и микроэлементов.
            Сахар вреден, он способен вызвать более 70 проблем в нашем организме, приводит к очень
            серьезным заболеваниям, многие из которых неизлечимы и смертельно опасны.
          </p>
        </Collapse>
        <Collapse label={'Образование'} count={'2'} isExpanded>
          <p style={{ margin: 0 }}>
            Вред сахара давно и очевидно доказан. Известно, что белый рафинированный  сахар – это
            энергетическая пустышка, лишенная белков, жиров и питательных веществ и микроэлементов.
            Сахар вреден, он способен вызвать более 70 проблем в нашем организме, приводит к очень
            серьезным заболеваниям, многие из которых неизлечимы и смертельно опасны.
          </p>
        </Collapse>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>label</strong> — заголовок;
        </p>
        <p>
          <strong>count</strong> — количество, если необходимо;
        </p>
        <p>
          <strong>children</strong> — передает все элементы обернутые тегом Collapse;
        </p>
        <p>
          <strong>isExpanded</strong> — будет открытым по умолчанию.
        </p>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <Collapse label={text('label', 'text')} count={text('count', 'text')}>
          <p style={{ margin: 0 }}>{text('text', 'text')}</p>
        </Collapse>
      </div>
    </div>
  ))
)
