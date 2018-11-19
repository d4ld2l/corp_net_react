import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'nuka-carousel'

const cn = require('bem-cn')('new-carousel')
if (process.env.BROWSER) {
  require('./new-carousel.css')
}

const Decorators = [
  {
    component: React.createClass({
      render() {
        return <button onClick={this.props.previousSlide}>Previous Slide</button>
      },
    }),
    position: 'BottomCenter',
    style: {
      padding: 0,
      left: '37%',
      top: 'unset',
      transform: 'rotate(135deg) !important',
    },
  },
  {
    component: React.createClass({
      render() {
        return <button onClick={this.props.nextSlide}>Next Slide</button>
      },
    }),
    position: 'BottomCenter',
    style: {
      padding: 0,
      left: 'unset',
      right: '37%',
      top: 'unset',
      transform: 'rotate(135deg) !important',
    },
  },
]

export default class NewCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { current } = this.props

    return (
      <div className={cn}>
        <Row>
          <Col xs={12}>
            <Carousel
              className="carousel"
              decorators={Decorators}
              slidesToShow={current.photos.length}
              dragging={true}
              cellSpacing={10}
              wrapAround={true}
            >
              {current.photos.map((photo, idx) => (
                <img src={photo.file.url} alt={photo.name} key={idx} />
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    )
  }
}
