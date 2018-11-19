// import React from 'react'
// import { comparisonVariants } from 'redux-folder/reducers/comparison'
//
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { withKnobs, object } from '@storybook/addon-knobs/react'
// import { withNotes } from '@storybook/addon-notes'
//
// import ControlPanel from 'components-folder/Recruitment/Comparison/ControlPanel'
// import 'containers-folder/Recruitment/Comparison/style.css'
// import 'components-folder/Form/SelectInput.css'
// import 'style-folder/style.css'
//
// const stories = storiesOf('Components/Recruitment/Comparison', module)
// stories.addDecorator(withKnobs)
//
// stories
//   .add(
//   'ControlPanel',
//     withNotes('ControlPanel WIP select styles')(() => (
//       <div>
//         <ControlPanel
//           saveOneCandidate={action('saveOneCandidate')}
//           saveBothCandidates={action('saveBothCandidates')}
//           changeSaveDecision={action('changeSaveDecision')}
//           comparison={object('select', {
//             select: {
//               value: comparisonVariants,
//               options: comparisonVariants
//             }
//           })}
//          />
//       </div>
//     ))
//   )
