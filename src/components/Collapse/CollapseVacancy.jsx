import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Arrow } from '../Icon'

const cn = require('bem-cn')('collapse')

if (process.env.BROWSER) {
  require('./main.css')
}

class CollapseVacancy extends Component {
  state = {
    isOpened: true,
  }

  componentDidMount() {
    if(this.props.open) {
      this.setState({isOpened: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open !== this.props.open){
      this.setState({isOpened: nextProps.open})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('Update');
    // if(this.state.isOpened !== prevState.isOpened) {
    //   this.props.onCollapseClick()
    // }
  }

  render() {
    const { isOpened } = this.state
    const { link, title, avatar, name, location, date, children } = this.props
    // console.log('isOpened', isOpened);

    return (
      <div className={cn('wrapper')} onClick={() => this.setState({ isOpened: !isOpened })}>
        <div className={cn('head')}>
          <div>
            {title && (
              <Link to={`${link}`} title={`${title}`} className={cn('head-link').mix('link link_theme_light_first indent_5')}>
                {title}
              </Link>
            )}

            <div className={cn('head-data')}>
              <div
                className={cn('avatar')}
                style={{
                  background: `url(${avatar}) center center / cover no-repeat`,
                }}
                title={`${name}`}
              />

              {name && <span className={cn('name').mix('p3 p3_theme_light')}>{name}</span>}

              {location && <span className={cn('location').mix('p3 p3_theme_light')}>{location}</span>}

              {date && (
                <time className={cn('date').mix('p3 p3_theme_light')} dateTime={`${date}`}>
                  {date}
                </time>
              )}
            </div>
          </div>

          {isOpened ? (
            <Arrow className={cn('arrow-icon_open')} />
          ) : (
            <Arrow className={cn('arrow-icon_close')} />
          )}
        </div>

        <Collapse in={isOpened}>
          <div>
            <div className={cn('content')}>{children}</div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default CollapseVacancy
