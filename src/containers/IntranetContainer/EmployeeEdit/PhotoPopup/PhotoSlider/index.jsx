import React, { Component } from 'react'
import Slider from 'react-slick'
import SliderItem from './SliderItem'
import orderBy from 'lodash/orderBy'

if (process.env.BROWSER) {
  require('./style.css')
}

class PhotoSlider extends Component {

  componentDidMount() {
    const { selectedPhoto } = this.props
    const images = this.sortedImages

    if (selectedPhoto && images.length >= 4) {
      const indexOfSelected = images.findIndex(p => p.id === selectedPhoto.id)
      const slideOfSelected = Math.ceil((indexOfSelected + 1) / 3)

      setTimeout(() => {
        slideOfSelected > 1 && this.slider.slickGoTo(slideOfSelected)
      }, 100)
    }
  }

  get sortedImages() {
    return orderBy(this.props.photos, 'updated_at', 'desc')
  }

  render() {
    const { photos, selectedPhoto, deletedIds, setSelectedPhoto, toggleDeleted } = this.props

    let settings = {
      infinite: photos.length > 3,
      speed: 500,
      slidesToShow: photos.length < 4 ? photos.length : 3,
      slidesToScroll: 1,
      draggable: false,
      variableWidth: true
    }

    return (
      <Slider {...settings}
              className={'indent_17'}
              ref={slider => (this.slider = slider)}
      >
        {this.sortedImages.map((it) => (
          <SliderItem
            key={it.id}
            photo={it}
            current={selectedPhoto && it.id === selectedPhoto.id}
            deleted={deletedIds.includes(it.id)}
            setSelectedPhoto={setSelectedPhoto}
            toggleDeleted={toggleDeleted}
          />
        ))}
      </Slider>
    )
  }
}

export default PhotoSlider
