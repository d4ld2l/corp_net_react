import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import {change} from 'redux-form'
import {
  parsingFileToCandidate,
} from '../../../../../redux/actions/candidatesActions'
import Loader from 'components-folder/Loader'

const cn = require('bem-cn')('candidate-tab-get-resume')
if (process.env.BROWSER) {
  require('./main.css')
}

export default class CandidateTabGetResume extends Component {
  state = {
    accept: true,
    loading: false,
  }

  render() {
    const {accept, loading} = this.state
    const {dispatch} = this.props
    return (
      <div className={cn}>
        <Dropzone
          accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={`${cn('dropzone')}`}
          multiple={false}
          onDropAccepted={files => {
            this.setState({accept: true, loading: true})
            dispatch(parsingFileToCandidate(files)).then(() => {
              dispatch(change('NewCandidateForm', 'values', files))
              this.setState({loading: false})
            })
          }}
          onDropRejected={() => this.setState({accept: false})}
        >
          {!loading &&
          <p className={cn('dropzone-text').mix('p2 p2_theme_light_second indent_reset')}>Перетащите файл сюда
            или&nbsp;</p>}
          {!loading &&
          <span className={cn('dropzone-link').mix('p2 link link_theme_light_third indent_reset')}>выберите файл</span>}
          {loading && <Loader/>}
        </Dropzone>
        <p className={`${cn('dropzone-warning').mix('p2 p2_theme_light_second')} ${accept ? 'hidden' : ''}`}>
          Файл не поддерживается
        </p>
      </div>
    )
  }
}

