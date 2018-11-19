import React, { Component } from 'react'
import ReactCrop, { makeAspectCrop, getPixelCrop } from 'react-image-crop'
import Loader from 'components-folder/Loader'
import transform from 'lodash/transform'

if (process.env.BROWSER) {
  require('react-image-crop/dist/ReactCrop.css')
}

const cn = require('bem-cn')('add-photo')

const defaultCrop = {
  x: 2,
  y: 2,
  width: 96,
  height: 96,
  aspect: 1
}

export default class PhotoCropping extends Component {

  constructor(props) {
    super(props)

    const { photo: { crop_info } } = props
    let initialCrop

    if (crop_info) { // transform values to numbers
      initialCrop = transform(crop_info, (result, value, key) => {
        result[key] = +value
      }, {})
    }

    this.state = {
      crop: initialCrop ? Object.assign({}, defaultCrop, initialCrop) : defaultCrop,
      originalImage: null,
      croppedImage: null,
      croppedImageUrl: null
    }
  }


  getCroppedImage(image, pixelCrop) {
    // const originalFile = this.props.photo
    // const { originalImage } = this.state

    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg')
    // return base64Image

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        // file.name = 'cropped__' + originalFile.name
        resolve(file)
      }, 'image/jpeg')
    })
  }

  onImageLoaded = async (image) => {
    const cropWithAspect = makeAspectCrop(this.state.crop, image.width / image.height)

    this.setState({
      originalImage: image,
      crop: cropWithAspect
    }, () => { // call onCropComplete to show cropped image at start
      if (!this.state.croppedImageUrl) {
        const pixelCrop = getPixelCrop(image, this.state.crop)
        this.onCropComplete(null, pixelCrop)
      }
    })
  }

  onCropComplete = async (_, pixelCrop) => {
    const croppedImage = await this.getCroppedImage(this.state.originalImage, pixelCrop)
    const croppedImageUrl = URL.createObjectURL(croppedImage)

    this.setState({
      croppedImage,
      croppedImageUrl
    })
  }

  onCropChange = (crop) => {
    this.setState({ crop })
  }

  savePhoto = () => {
    const { uploadPhoto } = this.props
    const { croppedImage, crop } = this.state
    uploadPhoto(croppedImage, crop)
  }

  render () {
    const { photoUrl, closeCropping, loading } = this.props
    const { croppedImageUrl } = this.state

    return (
      <div>
        <p className={'p1 p1_theme_light indent_15'}>
          Выбрать область для маленьких фотографий.
        </p>

        <p className={'p1 p1_theme_light indent_15'}>
          Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.
        </p>

        <div className={cn('crop-container')}>
          <div className={cn('crop-wrapper')}>
            <ReactCrop src={photoUrl}
                       onImageLoaded={this.onImageLoaded}
                       onChange={this.onCropChange}
                       crop={this.state.crop}
                       minWidth={10}
                       minHeight={10}
                       keepSelection={true}
                       onComplete={this.onCropComplete}
            />
          </div>

          <div className={cn('crop-preview-wrapper')}>
            {croppedImageUrl && [1,2,3,4].map((i) =>
              <img src={croppedImageUrl} className={cn('crop-preview-image')} key={i} />
            )}
          </div>
        </div>


        <div className={cn('slider-button-box')}>
          <button className={('btn btn-primary btn-margin-right')} onClick={this.savePhoto} disabled={loading}>сохранить</button>
          <button className={('btn btn-outline')} onClick={closeCropping} disabled={loading}>отменить</button>
          {loading && <Loader />}
        </div>
      </div>
    )
  }
}
