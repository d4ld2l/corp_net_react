import React, { Component } from 'react'
import { Like, Close } from 'components-folder/Icon'
import { connect } from 'react-redux'

if (process.env.BROWSER) {
  require('./style.css')
}

export default class SliderItem extends Component {

  render() {
    const { photo, current, setSelectedPhoto, toggleDeleted, deleted } = this.props

    return (
        <div className={'slick-slide-item' + (deleted ? ' slick-slide-item_deleted' : '')}>
          <div
            className={'slick-image-wrap'}
            onClick={ () => { setSelectedPhoto(photo) } }
            style={{
              background: `url('${photo.cropped_photo.url || photo.photo.url}') center center / cover no-repeat`,
            }}

          >
            { !deleted &&
              <span className={`${'slick-image-wrap-check'} ${current ? 'slick-image-wrap-check_active' : ''}`}/>
            }
          </div>

          <div className={'slick-footer'}>
            <div className={'slick-like-wrap'}>
              <Like className={'slick-like-icon'} />
              <span className={'p2 p2_theme_light'}>{photo.likes_count}</span>
            </div>

            <span className={'slick-close-wrap'} onClick={() => { toggleDeleted(photo) }}>
              <Close className={'slick-close'} />
            </span>
          </div>
        </div>
    )
  }
}
