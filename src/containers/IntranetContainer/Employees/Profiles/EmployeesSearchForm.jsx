import React, { Component } from 'react'
import { compose } from 'ramda'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Clearfix } from 'react-bootstrap'

import { getEmployeeSearch, resetEmployeeSearch, getEmployees, resetEmployeeSort } from 'redux-folder/actions/employeesActions'
import { Arrow, Loupe } from 'components-folder/Icon'

import SelectInput from 'components-folder/Form/SelectInput'
import Search from "./Search";
import Filtered from "./Filtered";

const cn = require('bem-cn')('employees-search-form')

if (process.env.BROWSER) {
  require('./employees-search-form.css')
}

// const connector = compose(
//   reduxForm({ form: 'NewsSearchForm' }),
//   connect(state => state, { getEmployeeSearch, getEmployees, resetEmployeeSearch, resetEmployeeSort }),
// )

export default class NewsSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      filter: false,
    }
  }

  // onBlockToggle = (name: string) => {
  //   this.setState({ [name]: !this.state[name] })
  // }
  //
  // startSearch(value){
  //   const { getEmployeeSearch, getEmployees, resetEmployeeSearch, resetEmployeeSort } = this.props
  //   if (value !== '' ) {
  //     getEmployeeSearch(value, 1)
  //     resetEmployeeSort()
  //   } else {
  //     getEmployees()
  //     resetEmployeeSearch()
  //     resetEmployeeSort()
  //   }
  // }

  render() {
    // const { value } = this.state

    return (
      <div className={cn}>
          <Search {...this.props}/>
          {/*<div className={cn('c-search').mix('col-xs-10')}>*/}
            {/*<DebounceInput*/}
              {/*minLength={2}*/}
              {/*className={cn('input-search')}*/}
              {/*debounceTimeout={300}*/}
              {/*onChange={event =>*/}
                {/*this.setState({*/}
                  {/*value: event.target.value,*/}
                {/*})}*/}
              {/*onKeyDown={event => event.key === 'Enter' && this.startSearch(event.target.value)}*/}
            {/*/>*/}
            {/*<Loupe className={cn('icon-magnify')} />*/}
          {/*</div>*/}
          {/*<div className="col-xs-2">*/}
            {/*<button*/}
              {/*type="button"*/}
              {/*className="btn btn-primary btn-block"*/}
              {/*onClick={() => this.startSearch(value)}*/}
            {/*>*/}
              {/*Найти*/}
            {/*</button>*/}
          {/*</div>*/}
        <div className={cn('inner')}>
          <Filtered {...this.props}/>
           {/*<h4 onClick={() => this.onBlockToggle('filter')} className={cn('h4')}>*/}
            {/*Фильтр*/}
            {/*<Arrow*/}
              {/*dir={this.state.filter ? 'up' : 'down'}*/}
              {/*className={cn('arrow')}*/}
              {/*color="#93959a"*/}
            {/*/>*/}
          {/*</h4>*/}
          {/*{this.state.filter && (*/}
            {/*<div className={cn('block')}>*/}
              {/*<Row>*/}
                {/*<Col xs={5}>*/}
                  {/*<Field*/}
                    {/*name="structural_unit"*/}
                    {/*label="Структурное подразделение"*/}
                    {/*component={SelectInput}*/}
                    {/*placeholder="Не выбрано"*/}
                    {/*noResultsText="Нет категорий"*/}
                  {/*/>*/}
                {/*</Col>*/}
                {/*<Col xs={5} xsOffset={1}>*/}
                  {/*<Field*/}
                    {/*name="city"*/}
                    {/*label="Город"*/}
                    {/*component={SelectInput}*/}
                    {/*placeholder="Не выбран"*/}
                    {/*noResultsText="Нет категорий"*/}
                  {/*/>*/}
                {/*</Col>*/}
                {/*<Clearfix />*/}
                {/*<Col xs={5}>*/}
                  {/*<Field*/}
                    {/*name="block"*/}
                    {/*label="Блок"*/}
                    {/*component={SelectInput}*/}
                    {/*placeholder="Не выбран"*/}
                    {/*noResultsText="Нет категорий"*/}
                  {/*/>*/}
                {/*</Col>*/}
                {/*<Clearfix />*/}
                {/*<Col xs={5}>*/}
                  {/*<button type="button" className="btn btn-primary btn-margin-right btn-margin-top">*/}
                    {/*Подобрать*/}
                  {/*</button>*/}
                  {/*<button type="button" className="btn btn-outline btn-margin-top">*/}
                    {/*Сбросить фильтр*/}
                  {/*</button>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</div>*/}
          {/*)}*/}
        </div>
      </div>
    )
  }
}

// export default connector(NewsSearchForm)
