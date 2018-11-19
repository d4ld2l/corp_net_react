import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import Vacancies from 'components-folder/Recruitment/Vacancies'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import { Link } from 'react-router-dom'
import Wrapper from 'components-folder/Wrapper'

if (process.env.BROWSER) {
  require('./style.css')
}

type Props = {}

export default class Container extends PureComponent<Props> {
  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>HR - Вакансии</title>
        </Helmet>
        <Breadcrumbs />
        <h1 className={'indent_20'}>Вакансии</h1>
        <Vacancies />
      </Wrapper>
    )
  }
}
