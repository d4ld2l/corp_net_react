import React, { Component } from 'react'
import Loader from 'components-folder/Loader'
import { Close } from 'components-folder/Icon'
import PhotoSlider from './PhotoSlider'
import PhotoCropping from './PhotoCropping'
import { connect } from 'react-redux'
import { uploadProfilePhoto, updateProfilePhoto, getEmployee, setProfilePhoto, deleteProfilePhoto } from 'redux-folder/actions/employeesActions'
import { getProfileInfo } from 'redux-folder/actions/profileInfoActions'
import get from 'lodash/get'
import { toastr } from 'react-redux-toastr'

const cn = require('bem-cn')('add-photo')

if (process.env.BROWSER) {
  require('./style.css')
}

const connector = connect(
  state => ({
    currentPhotoId: state.user.current_account_photo_id,
    accountPhotos: get(state.employees, 'current.account_photos', []),
    loading: state.loaders.employeePhoto
  }),
  dispatch => ({
    uploadProfilePhoto: (...args) => dispatch(uploadProfilePhoto(...args)),
    updateProfilePhoto: (...args) => dispatch(updateProfilePhoto(...args)),
    getEmployee: (id) => dispatch(getEmployee(id)),
    setProfilePhoto: (id) => dispatch(setProfilePhoto(id)),
    deleteProfilePhoto: (id) => dispatch(deleteProfilePhoto(id)),
    getProfileInfo: () => dispatch(getProfileInfo())
  })
)

class PhotoPopup extends Component {
  state = {
    cropping: this.props.showCropping,
    photo: this.props.showCropping ? this.currentPhoto : null,
    photoUrl: this.props.showCropping ? this.currentPhoto.photo.url : null,
    selectedPhoto: this.currentPhoto, // this.photos.find(p => this.isCurrent(p)),
    deletedIds: [],
  }

  componentDidMount(){
    const { closePhotoPopup } = this.props

    // close upon pressing Esc
    document.addEventListener(
      'keydown',
      (e) => { e.keyCode === 27 && closePhotoPopup() },
      false
    )
  }

  get photos() {
    return this.props.accountPhotos
  }

  isCurrent(photo) {
    return photo && photo.id === this.props.currentPhotoId
  }

  get currentPhoto() {
    return this.photos.find(p => p.id === this.props.currentPhotoId)
  }

  setSelectedPhoto = (photo) => {
    this.setState({ selectedPhoto: photo })
  }

  toggleDeleted = (photo) => {
    let { deletedIds } = this.state

    if (deletedIds.includes(photo.id)) {
      deletedIds = deletedIds.filter(id => id !== photo.id)
    } else {
      deletedIds.push(photo.id)
    }

    this.setState({ deletedIds })
  }


  closeCropping = () => {
    const { showCropping, togglePhotoPopup } = this.props

    if (showCropping) {
      togglePhotoPopup()
    } else {
      this.setState({
        cropping: false
      })
    }
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file.type.match(/^image\//)) {
        toastr.error('Допускаются только изображения в формате JPG, GIF или PNG')
        return
      }

      if (file.size > 30 * 1024 * 1024) {
        toastr.error('Файл слишком большой (> 30Mb)')
        return
      }

      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          this.setState({
            cropping: true,
            photo: file,
            photoUrl: reader.result,
          })
        },
        false
      )

      reader.readAsDataURL(file)
    } else {
      this.setState({ cropping: false, photo: null, photoUrl: null })
    }
  }

  uploadPhoto = async (croppedPhoto, cropInfo) => {
    const { uploadProfilePhoto, updateProfilePhoto, showCropping } = this.props

    if (showCropping) {
      await updateProfilePhoto(this.currentPhoto.id, null, croppedPhoto, cropInfo)
    } else {
      await uploadProfilePhoto(this.state.photo, croppedPhoto, cropInfo)
    }

    this.setSelectedPhoto(this.currentPhoto)
    this.closeCropping()
  }

  saveChanges = async () => {
    const { setProfilePhoto, deleteProfilePhoto, togglePhotoPopup, getProfileInfo } = this.props
    const { selectedPhoto, deletedIds } = this.state

    if (selectedPhoto && !this.isCurrent(selectedPhoto) && !deletedIds.includes(selectedPhoto.id)) {
      await setProfilePhoto(selectedPhoto.id)
    }

    for (const id of deletedIds) {
      await deleteProfilePhoto(id)
    }

    this.setState({
      deletedIds: []
    })

    await getProfileInfo()

    togglePhotoPopup()
  }

  render() {
    const { refreshPhoto, togglePhotoPopup, loading } = this.props
    const { cropping, photoUrl, photo, selectedPhoto, deletedIds } = this.state

    return (
      <section className={cn('bg')}
               onMouseDown={(e) => { !e.target.closest('.add-photo__body') && togglePhotoPopup() }}
      >
        <div className={cn('body').mix(refreshPhoto && cn('body_refresh'))}>
          <div className={cn('head').mix('indent_17')}>
            {cropping ? <h1>Кадрирование фотографии</h1> : refreshPhoto ? <h1>Обновить фотографию</h1> : <h1>Загрузить фотографию</h1>}

            <span className={cn('close-icon-wrap')} onClick={togglePhotoPopup}>
              <Close className={cn('close-icon')} />
            </span>
          </div>

          { cropping ?
            <PhotoCropping
              photo={photo}
              photoUrl={photoUrl}
              uploadPhoto={this.uploadPhoto}
              closeCropping={this.closeCropping}
              loading={loading}
            /> :
            <div>
              <p className={'p1 p1_theme_light indent_15'}>
                Вы можете загрузить изображение в формате JPG, GIF или PNG.
              </p>

              <input type="file"
                     accept="image/*"
                     ref={node => this.fileInput = node}
                     style={{display: 'none'}}
                     onChange={this.onSelectFile}
              />

              <button className="btn btn-primary"
                      onClick={() => { this.fileInput.click() }}>
                загрузить
              </button>

              {refreshPhoto && this.photos.length > 0 && (
                <div className={cn('slider-wrapper')}>
                  <p className={'p1 p1_theme_light indent_15'}> Или можете выбрать из загруженных ранее.</p>

                  <PhotoSlider
                    photos={this.photos}
                    selectedPhoto={selectedPhoto}
                    deletedIds={deletedIds}
                    setSelectedPhoto={this.setSelectedPhoto}
                    toggleDeleted={this.toggleDeleted}
                  />

                  <div className={cn('slider-button-box')}>
                    <button className={('btn btn-primary btn-margin-right')} onClick={this.saveChanges} disabled={loading}>
                      сохранить
                    </button>
                    <button className={('btn btn-outline')} onClick={togglePhotoPopup} disabled={loading}>отменить</button>
                    {loading && <Loader />}
                  </div>
                </div>
              )}
            </div>
          }

        </div>
      </section>
    )
  }
}

export default connector(PhotoPopup)
