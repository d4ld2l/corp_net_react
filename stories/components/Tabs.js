import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, object, boolean} from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../src/style/base.css'

import Tabs from 'components-folder/Tabs/Tabs'
import 'components-folder/Tabs/tabs.css'
import Input from 'components-folder/Input/'
import 'components-folder/Input/input.css'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

const tabs = [
  {
    name: 'Задачи в работе',
    id: 'tasks-in-work',
    count: 85,
    content: 'pwd — Показать текущий каталог',
  },
  {
    name: 'Выполненные задачи',
    id: 'tasks-is-done',
    count: 85,
    content: (
      <Input
        showLabel
        labelText={'Лейбл'}
        className={'test'}
        type={'text'}
        name={'test_input'}
        id={'test_input'}
        showWink
        winkText={'Подсказка'}
      />
    ),
  },
]

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Tabs',
  withNotes('Tabs')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Tabs</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Tabs from 'components-folder/Tabs/Tabs'"
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
        <Tabs tabs={tabs} current={'tasks-is-done'} style={{ margin: '0 0 20px' }} />
        <Tabs tabs={tabs} current={'tasks-in-work'} showCount={'true'} />
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>tabs</strong> — массиво подобный объект для табов;
          <ul>
            <li>
              <i>name</i> — имя таба;
            </li>
            <li>
              <i>id</i> — уникальный идентификатор дял таба;
            </li>
            <li>
              <i>count</i> — если нужно значение в табах;
            </li>
            <li>
              <i>content</i> — данные внутри таба.
            </li>
          </ul>
        </p>
        <p>
          <strong>showCount</strong> — показать count;
        </p>
        <p>
          <strong>current</strong> — задать таб по умолчанию при загрузке старницы;
        </p>
        <p>
          <strong>style</strong> — задать стили через style.
        </p>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <Tabs
          tabs={tabs}
          current={'tasks-in-work'}
          showCount={boolean('showCount', false)}
          style={object('style', { backgroundColor: '#eee' })}
        />
      </div>
    </div>
  ))
)
