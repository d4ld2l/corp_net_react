import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Vk,
  Fb,
  Insta,
  Oks,
  Twitter,
  WhatSapp,
  Telegram,
  Tumblr,
  Flickr,
  Reddit,
  HabraHabr,
  LinkedIn,
  GitHub,
  GitLab,
  CodePen,
  Sketch,
  Dribbble,
  Behance,
  Pinterest,
} from 'components-folder/Icon'

const cn = require('bem-cn')('aggregator')
if (process.env.BROWSER) {
  require('./aggregator.css')
}

export default class Aggregator extends Component {
  render() {
    return (
      <div className={cn()}>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Vk className={cn('social-network', { icon: 'vk' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Fb className={cn('social-network', { icon: 'fb' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Insta className={cn('social-network', { icon: 'insta' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Oks className={cn('social-network', { icon: 'oks' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Twitter className={cn('social-network', { icon: 'twitter' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <WhatSapp className={cn('social-network', { icon: 'whatsapp' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Telegram className={cn('social-network', { icon: 'telegram' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Tumblr className={cn('social-network', { icon: 'tumblr' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Flickr className={cn('social-network', { icon: 'flickr' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Reddit className={cn('social-network', { icon: 'reddit' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <HabraHabr className={cn('social-network', { icon: 'habrahabr' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <LinkedIn className={cn('social-network', { icon: 'linkedin' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <GitHub className={cn('social-network', { icon: 'github' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <GitLab className={cn('social-network', { icon: 'gitlab' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <CodePen className={cn('social-network', { icon: 'codepen' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Sketch className={cn('social-network', { icon: 'sketch' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Dribbble className={cn('social-network', { icon: 'dribbble' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Behance className={cn('social-network', { icon: 'behance' })} />
        </Link>
        <Link className={cn('link')} to={`/`} title="Перейти на сайт">
          <Pinterest className={cn('social-network', { icon: 'pinterest' })} />
        </Link>
      </div>
    )
  }
}
