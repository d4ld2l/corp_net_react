import React, { Component } from 'react'
import { Modal, Carousel } from 'react-bootstrap'

const style = {
  image: {
    maxHeight: '900px',
    width: '700px',
    margin: '0 auto',
  },
}

export default class Gallery extends Component {
  state = {
    index: 0,
    direction: null,
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ index: nextProps.idx })
  }
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    })
  }
  render() {
    const { photos } = this.props
    const { index, direction } = this.state
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Carousel
            activeIndex={index}
            indicators={false}
            slide={false}
            direction={direction}
            onSelect={(index, e) => this.handleSelect(index, e)}
          >
            {photos.map(photo => (
              <Carousel.Item key={photo.id}>
                <img style={style.image} src={photo.file.url} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    )
  }
}
