const postcss = require('postcss')

const mixins = {
  link(mixin, link, hover, active, focus, outline) {
    return {
      'color': link,
      'text-decoration': 'underline',
      '&:hover': {
        'color': hover,
        'text-decoration': 'underline',
        '& > h1, & > h2, & > h3, & > h4': {
          'color': hover,
          'text-decoration': 'underline',
        }
      },
      '&:active': {
        'color': active,
        'text-decoration': 'none',
        '& > h1, & > h2, & > h3, & > h4': {
          'color': active,
          'text-decoration': 'none',
        }
      },
      '&:focus': {
        'color': focus,
        'outline': '1px solid ' + outline,
        'outline-offset': '1px',
        '& > h1, & > h2, & > h3, & > h4': {
          'color': focus,
        }
      },
    }
  },
  font(mixin, weight, px, height) {
    return {
      'font-weight': weight,
      'font-size': px + 'px',
      'line-height': height + 'px'
    }
  },
  range(mixin, max_width, min_width, max_height, min_height) {
    return {
      'max-width': max_width,
      'min-width': min_width,
      'max-height': max_height,
      'min-height': min_height,
    }
  },
  flex(mixin, display, jc, ai) {
    return {
      'display': display,
      'justify-content': jc,
      'align-items': ai
    }
  },
  outline(mixin, outline = '#158cdf') {
    return {
      'outline': '1px solid ' + outline,
      'outline-offset': '1px',
    }
  }
}
module.exports = mixins
