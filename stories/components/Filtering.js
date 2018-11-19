import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, object, boolean } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'
import '../stories.css'

import 'style-folder/base.css'

import Filtering from 'components-folder/Filtering'
import 'components-folder/Filtering/filtering.css'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

const filtering = [
  {
    id: 'tasks-in-work',
    name: 'Задачи в работе',
    count: 85,
  },
  {
    id: 'tasks-in-done',
    name: 'Выполненные задачи',
    count: 85,
  },
]

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Filtering',
  withNotes(
    'Сортировка может быть как с числовым значением, так и без него.\n' +
      'Для некоторых случаев могут быть предусмотрены доп. настройки для отдельного пункта.'
  )(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Сортировка</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Filtering from 'components-folder/Filtering'"
            id="connect"
            className={'stories__connect_input'}
          />
          <button className={'stories__connect_btn btn btn-outline btn-small'} onClick={Clipboard}>Копировать путь</button>
        </div>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Внешний вид:</h3>
        <Filtering filtering={filtering} current={'tasks-in-work'} />
        <Filtering
          filtering={filtering}
          current={'tasks-in-work'}
          showCount={true}
          style={{ marginTop: '20px' }}
        />
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>filtering</strong> — массиво подобный объект для фильтра;
          <ul>
            <li>
              <i>id</i> — уникальный идентификатор кнопки фильтра;
            </li>
            <li>
              <i>name</i> — имя кнопки фильтра;
            </li>
            <li>
              <i>count</i> — если нужно значение для кнопки фильтра;
            </li>
          </ul>
        </p>
        <p>
          <strong>showCount</strong> — показать count;
        </p>
        <p>
          <strong>current</strong> — задать кнопку фильтра по умолчанию при загрузке старницы;
        </p>
        <p>
          <strong>style</strong> — задать стили через style.
        </p>
        <p>
          <strong>className</strong> — задать дополнительный класс через className для обертки.
        </p>

        <p>
          <strong>onClick</strong> — callback по клику.
        </p>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <Filtering
          filtering={filtering}
          current={'tasks-in-work'}
          showCount={boolean('showCount', false)}
          style={object('style', { backgroundColor: '#eee' })}
        />
      </div>
    </div>
  ))
)
