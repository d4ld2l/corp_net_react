import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../../src/style/buttons.css'
import '../../../src/style/base.css'

const stories = storiesOf('Components/Form', module)
stories.addDecorator(withKnobs)

stories.add(
  'Button',
  withNotes('Кнопки')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Кнопки</h2>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Внешний вид:</h3>
        <table>
          <tr>
            <td><p className={'stories__description'}>Обычное состояние (дефолт)</p></td>
            <td>
              <button className={'btn btn-primary btn-margin-right'} onClick={action('clicked')}>
                Найти
              </button>
              <button className={'btn btn-outline btn-margin-right'} onClick={action('clicked')}>
                Найти
              </button>
              <button className={'btn btn-primary btn-small'} onClick={action('clicked')}>
                Найти
              </button>
            </td>
          </tr>
          <tr>
            <td><p className={'stories__description'}>Наведение</p></td>
            <td>
              <button
                className={'btn btn-primary hover btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button
                className={'btn btn-outline hover btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button className={'btn btn-primary hover btn-small'} onClick={action('clicked')}>
                Найти
              </button>
            </td>
          </tr>
          <tr>
            <td><p className={'stories__description'}>Нажатие</p></td>
            <td>
              <button
                className={'btn btn-primary active btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button
                className={'btn btn-outline active btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button className={'btn btn-primary active btn-small'} onClick={action('clicked')}>
                Найти
              </button>
            </td>
          </tr>
          <tr>
            <td><p className={'stories__description'}>Не активная (дизейбл)</p></td>
            <td>
              <button
                className={'btn btn-primary disabled btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button
                className={'btn btn-outline disabled btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button className={'btn btn-primary disabled btn-small'} onClick={action('clicked')}>
                Найти
              </button>
            </td>
          </tr>
          <tr>
            <td><p className={'stories__description'}>Фокус</p></td>
            <td>
              <button
                className={'btn btn-primary focus btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button
                className={'btn btn-outline focus btn-margin-right'}
                onClick={action('clicked')}
              >
                Найти
              </button>
              <button className={'btn btn-primary focus btn-small'} onClick={action('clicked')}>
                Найти
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание классов для кнопок:</h3>
        <p>
          <strong>btn-primary</strong> — заливает кнопку;
        </p>
        <p>
          <strong>btn-outline</strong> — задает кнопке обводку без background'a;
        </p>
        <p>
          <strong>btn-small</strong> — делает кнопку маленького размера;
        </p>
        <p>
          <strong>btn-white</strong> — меняет цвет обводки и текста на белый. Создан для темного фона;
        </p>
        <p>
          <strong>btn-margin-right</strong> — делает отступ 20px справа;
        </p>
        <p>
          <strong>btn-margin-top</strong> — делает отступ 5px сверху;
        </p>
        <p>
          <strong>disabled или [disabled]</strong> — делает кнопку не активной.
        </p>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <button
          className={select(
            'className',
            [
              'btn btn-primary',
              'btn btn-outline',
              'btn btn-primary btn-margin-top',
              'btn btn-outline btn-margin-top',
              'btn btn-primary btn-margin-right',
              'btn btn-outline btn-margin-right',
              'btn btn-outline btn-margin-right btn-white',
              'btn btn-primary btn-small',
              'btn btn-outline btn-small',
              'btn btn-primary btn-small btn-margin-top',
              'btn btn-outline btn-small btn-margin-top',
              'btn btn-primary btn-small btn-margin-right',
              'btn btn-outline btn-small btn-margin-right',
              'btn btn-outline btn-small btn-margin-right btn-white',
            ],
            'btn btn-primary btn-margin-right',
            null
          )}
          style={object('style', {})}
          disabled={boolean('disabled', false)}
        >
          Стилизация кнопки
        </button>
        <button
          className={select(
            'className',
            [
              'btn btn-primary',
              'btn btn-outline',
              'btn btn-primary btn-margin-top',
              'btn btn-outline btn-margin-top',
              'btn btn-primary btn-margin-right',
              'btn btn-outline btn-margin-right',
              'btn btn-outline btn-margin-right btn-white',
              'btn btn-primary btn-small',
              'btn btn-outline btn-small',
              'btn btn-primary btn-small btn-margin-top',
              'btn btn-outline btn-small btn-margin-top',
              'btn btn-primary btn-small btn-margin-right',
              'btn btn-outline btn-small btn-margin-right',
              'btn btn-outline btn-small btn-margin-right btn-white',
            ],
            'btn btn-primary btn-margin-right',
            null
          )}
          style={object('style', {})}
          disabled={boolean('disabled', false)}
        >
          Найти
        </button>
      </div>
    </div>
  ))
)
