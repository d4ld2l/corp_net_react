import React, { Component } from 'react'
import * as ReactDOM from 'react-dom'

if (process.env.BROWSER) {
  require('./style.css')
}

export default class UpDownScroll extends Component {
  constructor(props) {
    super(props)
    this.pageYLabel = 0
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.handleScroll();
    this._updown = ReactDOM.findDOMNode(this._updown)
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div
        id="updown"
        className={'up'}
        ref={(node) => this._updown = node}
        onClick={() => this.handleClick()}
      >
        <span className={'button'}></span>
      </div>
    )
  }

  handleClick() {
    let pageY = window.pageYOffset || document.documentElement.scrollTop;
    const _updown = this._updown
    switch (_updown.className) {
      case 'up':
        this.pageYLabel = pageY;
        window.scrollTo(0, 0);
        _updown.className = 'down';
        break;

      case 'down':
        window.scrollTo(0, this.pageYLabel);
        _updown.className = 'up';
    }
  }

  handleScroll() {
    let pageY = window.pageYOffset || document.documentElement.scrollTop;
    let innerHeight = document.documentElement.clientHeight;
    const _updown = this._updown

    switch (_updown.className) {
      case '':
        if (pageY > innerHeight) {
          _updown.className = 'up';
        }
        break;

      case 'up':
        if (pageY < innerHeight) {
          _updown.className = '';
        }
        break;

      case 'down':
        if (pageY > innerHeight) {
          _updown.className = 'up';
        }
        break;
    }
  }
}
