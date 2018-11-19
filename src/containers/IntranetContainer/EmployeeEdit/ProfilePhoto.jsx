import React, { PureComponent } from 'react'
import PhotoPopup from './PhotoPopup'
import { getProfilePhotos } from 'redux-folder/actions/employeesActions'
import { connect } from 'react-redux'

const cn = require('bem-cn')('profile-photo')

if (process.env.BROWSER) {
  require('./profile-photo.css')
}

const connector = connect(
  state => ({
    user_id: state.user.id,
    profile: state.employees.current,
    currentPhotoId: state.user.current_account_photo_id,
  })
)

class ProfilePhoto extends PureComponent {
  state = {
    showPopup: false,
    showCropping: false,
  }

  componentDidMount() {
    if (this.isCurrentUser) {
      this.getPhotos()
    }
  }

  get isCurrentUser() {
    const { user_id, profile } = this.props
    return user_id === profile.id
  }

  getPhotos = () => {
    const { dispatch, profile } = this.props
    dispatch(getProfilePhotos(profile.id))
  }

  get canCrop() {
    const { profile, currentPhotoId } = this.props
    return currentPhotoId && profile.account_photos && profile.account_photos.length > 0
  }

  closePhotoPopup = () => {
    this.setState({
      showPopup: false,
      showCropping: false
    })
  }

  togglePhotoPopup = ({ showCropping } = {}) => {
    this.setState({
      showPopup: !this.state.showPopup,
      showCropping
    })
  }

  render() {
    const { profile } = this.props
    const { showPopup, showCropping } = this.state

    return (
      <div>
        <figure className={cn('logo')}>
          <img
            src={`${profile.photo ? profile.photo.url : '/public/avatar.svg'}`}
            alt="avatar"
            className={cn('user-logo')}
          />

          {this.isCurrentUser && (
            <ul className={cn('menu')}>
              <li className={cn('menu-item')}>
                <a className={cn('menu-link')} onClick={this.togglePhotoPopup}>Обновить</a>
              </li>

              {this.canCrop &&
              <li className={cn('menu-item')}>
                <a className={cn('menu-link')} onClick={() => { this.togglePhotoPopup({ showCropping: true }) }}>Кадрирование</a>
              </li>
              }
            </ul>
          )}
        </figure>

        {this.isCurrentUser && showPopup &&
          <PhotoPopup
            togglePhotoPopup={this.togglePhotoPopup}
            closePhotoPopup={this.closePhotoPopup}
            getPhotos={this.getPhotos}
            refreshPhoto={true}
            showCropping={showCropping}
          />
        }
      </div>
    )
  }
}

export default connector(ProfilePhoto)
