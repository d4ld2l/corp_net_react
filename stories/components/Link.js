import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../src/style/base.css'
import '../../src/style/link.css'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Link',
  withNotes(
    'Отрабатывает во время загрузки исполнимых файлов и запуск соответствующих новых процессов.'
  )(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Link</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Link from 'react-router-dom'"
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
        <h2>Светлая тема:</h2>
        <a href={''} className={'link link_theme_light_first'}>
          Ссылка #34363C
        </a>{' '}
        <a href={''} className={'link link_theme_light_second'}>
          Ссылка #93959A
        </a>{' '}
        <a href={''} className={'link link_theme_light_third'}>
          Ссылка #158CDF
        </a>{' '}
        <a href={''} className={'link link_pseudo link_theme_light_third'}>
          Псевдоссылка #158CDF
        </a>
        <br />
        <br />
        <div style={{ backgroundColor: 'rgba(52, 54, 60, 0.8)' }}>
          <h2 style={{ color: '#fff' }}>Тёмная тема:</h2>
          <a href={''} className={'link link_theme_dark_first'}>
            Ссылка #FFF
          </a>{' '}
          <a href={''} className={'link link_theme_dark_second'}>
            Ссылка #B6BCC3
          </a>{' '}
          <a href={''} className={'link link_theme_dark_third'}>
            Ссылка #43ACF5
          </a>{' '}
          <a href={''} className={'link link_pseudo link_theme_dark_third'}>
            Псевдоссылка #43ACF5
          </a>
        </div>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <a
          href={''}
          className={select(
            'className',
            [
              'link link_theme_light_first',
              'link link_theme_light_second',
              'link link_theme_light_third',
              'link link_pseudo link_theme_light_third',
              'link link_theme_dark_first',
              'link link_theme_dark_second',
              'link link_theme_dark_third',
              'link link_pseudo link_theme_dark_third',
            ],
            'link link_theme_light_first',
            null
          )}
          style={object('style', {})}
        >
          Ссылка test
        </a>
      </div>
    </div>
  ))
)
