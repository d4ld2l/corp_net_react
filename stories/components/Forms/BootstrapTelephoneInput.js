import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, color, text, object } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import BootstrapTelephoneInput from 'components-folder/Form/BootstrapTelephoneInput'

const stories = storiesOf('Components/Form', module)
stories.addDecorator(withKnobs)

stories
  .add(
  'BootstrapTelephoneInput',
    withNotes('This component is on stage where you shouldn\'t touch it')(() => (
      <div >
        <BootstrapTelephoneInput 
          input={object('input', { name: 'llal' })}
          label={text("label", "tralala6")}
          type={text("type", "text")}
          meta={object('input', 
            {
              touched: false,
              error: false,
              warning: false
            }
          )}
         />
      </div>
    ))
  )