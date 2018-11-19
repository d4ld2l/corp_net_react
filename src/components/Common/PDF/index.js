import React, { Component } from 'react'
import PDF from 'react-pdf-js'
import {Arrow} from '../../Icon'

const cn = require('bem-cn')('pdf-container')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class PDFContainer extends Component {
  state = {
    pages: null,
    page: 1,
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages })
  }

  onPageComplete = (page) => {
    this.setState({ page })
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 })
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 })
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className={cn('button')} onClick={this.handlePrevious}>
      <Arrow className={cn('arrow-left')} /> Назад</li>
    if (page === 1) {
      previousButton = <li className={cn('button').mix('disabled')}><Arrow
        className={cn('arrow-left')}/> Назад</li>
    }
    let nextButton = <li className={cn('button')} onClick={this.handleNext}>Дальше <Arrow
      className={cn('arrow-right')}/></li>
    if (page === pages) {
      nextButton = <li className={cn('button').mix('disabled')}>Дальше <Arrow
        className={cn('arrow-right')}/></li>
    }
    return (
      <nav>
        <ul className={cn}>
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    )
  }

  render() {
    let pagination = null
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages)
    }
    return (<div><PDF
      file={this.props.link}
      onDocumentComplete={this.onDocumentComplete}
      onPageComplete={this.onPageComplete}
      page={this.state.page}
    />
      {pagination}</div>)
  }
}
