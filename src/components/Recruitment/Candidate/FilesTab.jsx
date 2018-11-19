import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import type { Dispatch } from '../../../types/actions'
import moment from 'moment'
import {
  uploadFileToCandidate,
  updateCurrentCandidate,
} from '../../../redux/actions/candidatesActions'
import type { CandidateWithIncludesRaw } from '../../../types/raws'
import type { LoadersState } from '../../../types/states'
import Loader from 'components-folder/Loader'
import {Trash} from 'components-folder/Icon'

const cn = require('bem-cn')('candidate-files-tabs')
if (process.env.BROWSER) {
  require('./candidate-files-tabs.css')
}

function removeType(data) {
  return data.replace(/\..*/g, '')
}

function bytesToSize(bytes) {
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
}

type Props = {
  dispatch: Dispatch,
  candidate: CandidateWithIncludesRaw,
  loaders: LoadersState,
}

type State = {
  accept: boolean,
}

export default class FilesTab extends Component<Props, State> {
  state = {
    accept: true,
  }
  render() {
    const { accept } = this.state
    const { dispatch, candidate, loaders } = this.props
    return (
      <div className={cn}>
        <Dropzone
          accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={`${cn('dnd')}`}
          multiple={false}
          onDropAccepted={files => {
            this.setState({ accept: true })
            dispatch(uploadFileToCandidate(candidate.id, candidate.resume.id, files))
          }}
          onDropRejected={() => this.setState({ accept: false })}
        >
          <p className={cn('dnd-text')}>
            Перетащите файл сюда или <span className={cn('dnd-link')}>выберите файл</span>
          </p>
        </Dropzone>
        <p className={`${cn('bg-danger')} ${accept ? 'hidden' : ''}`}>Файл не поддерживается</p>

        {candidate.resume.resume_documents.length > 0 && (
          <table className={cn('table')}>
            <thead className={cn('thead')}>
              <tr>
                <th className={cn('th')}>Название</th>
                <th className={cn('th')}>Добавил</th>
                <th className={cn('th')}>Дата добавления</th>
                <th className={cn('th')} />
              </tr>
            </thead>
            <tbody>
              {candidate.resume.resume_documents.map(doc => (
                <tr className={cn('tr')} key={doc.id}>
                  <td className={cn('td')}>
                    <a
                      className={cn('link-document')}
                      href={doc.file.url}
                      target="_blank"
                      title={`Скачать ${doc.name}`}
                    >
                      {`${removeType(doc.name)}`}
                    </a>
                    <div className={cn('document-type')}>
                      {`${doc.extension}, `}
                      {bytesToSize(doc.size)}
                    </div>
                  </td>
                  <td className={cn('td')}>{doc.uploaded_by.full_name}</td>
                  <td className={cn('td')}>{moment(doc.created_at).format('DD.MM.YYYY')}</td>
                  <td className={cn('td')}>
                    <span
                      title={`Удалить ${doc.name}`}
                      onClick={() =>
                        dispatch(
                          updateCurrentCandidate(candidate.id, {
                            resume_attributes: {
                              id: candidate.resume.id,
                              resume_documents_attributes: [{ id: doc.id, _destroy: true }],
                            },
                          })
                        )}
                      className={cn('document-remove').mix('cur')}
                    >
                      <Trash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loaders.uploadingFile && (
          <div className={cn('loader')}>
            <Loader />
          </div>
        )}
      </div>
    )
  }
}
