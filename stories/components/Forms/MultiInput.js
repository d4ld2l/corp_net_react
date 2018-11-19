import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../../src/style/base.css'

import SkillsFIeldProfile from 'components-folder/Form/SkillsFIeldProfile'
import 'components-folder/Form/skills-field.scss'

const stories = storiesOf('Components/Form', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'MultiInput',
  withNotes('MultiInput')(() => (
    <div>
      <div className={'stories__wrap'}>
        <h2>Мультиинпут</h2>
        <div className={'stories__connect'}>
          <input
            type="text"
            value="import SkillsFIeldProfile from 'components-folder/Form/SkillsFIeldProfile'"
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
        <SkillsFIeldProfile />
      </div>
    </div>
  ))
)
