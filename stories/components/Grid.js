import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../src/style/base.css'

import Grid from 'components-folder/Grid'
import 'components-folder/Grid/styles.css'
import { times } from 'ramda'

const stories = storiesOf('Components', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Grid',
  withNotes('Grid')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Grid</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import Grid from 'components-folder/Grid'"
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
        <p>После того как импортируете, нажмите <strong>ctrl+shift+i</strong>, откройте вкладку <strong>console</strong> и введите <strong>grid.show()</strong>. <br/>Ваш Grid будет поверх всех элементов. <br/>Его высота будет равна высоте окна браузера.</p>

        {/*Это пример из компонента*/}
        <div className={'g__wrapper'}>
          <div className={'g'}>
            <div className={'g__rows'}>{times(i => <div key={i} className={'g__row'} />, 1000)}</div>
            <div className={'g__cols'}>{times(i => <div key={i} className={'g__col'} />, 12)}</div>
          </div>
        </div>
      </div>
    </div>
  ))
)
