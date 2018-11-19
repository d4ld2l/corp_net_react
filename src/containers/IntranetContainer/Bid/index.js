import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import Loader from 'components-folder/Loader'
import { reduxForm } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { getBid, changeState, getStbParticipants } from 'redux-folder/actions/bidsActions'
import NewComment from './NewComment'
import Comment from './Comment'
import Expenses from './Expenses'
import Byod from './Byod'
import TeamBuilding from './TeamBuilding/'

const cn = require('bem-cn')('intranet-bid')

if (process.env.BROWSER) {
  require('./styles.css')
}

const connector = compose(
  connect(
    state => ({
      bid: state.bids.current,
      loading: state.loaders.bids,
      user: state.user,
    }),
    dispatch => ({
      getBid: (...args) => dispatch(getBid(...args)),
      changeState: (...args) => dispatch(changeState(...args)),
    })
  ),
  reduxForm({ form: 'Bid' })
)

// function bytesToSize(bytes) {
//   const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб']
//   if (bytes == 0) return '0 Byte'
//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
//   return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
// }

class Bid extends Component {
  state = {
    edit: false,
    openFullRecord: false,
    parentCommentId: null,
    openFullComment: false,
    commentId: null,
    // editPost: false,
    actions: false,
    lastSpace: [],
    idEditingComment: [],
    openMessage: false,
  }

  componentDidMount() {
    this.props.getBid(this.props.match.params.id | 0)
  }

  toggleActions = () => {
    this.setState({ actions: !this.state.actions })
  }

  onCloseActions = () => {
    this.setState({ actions: false })
  }

  // TODO: get results of changeState
  onChangeState = async state => {
    const { bid, changeState, getBid } = this.props
    const bid_res = await changeState(bid.id, state)

    if (bid_res.success){
      toastr.success('Заявка переведена в статус '+(bid_res.stage ? bid_res.stage : ''))
      await getBid(bid.id)
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  onEdit = () => {
    const { dispatch, bid } = this.props
    dispatch(push(`/bids/${bid.id}/edit`))
  }

  renderComment = () => {
    const { bid, user, dispatch } = this.props
    const { openFullComment } = this.state

    return (
      <Col>
        {<NewComment form="NewComment" bid={bid} />}

        {bid.comments.length > 3 && (
          <span
            className={cn('full-comment-link').state({ open: openFullComment })}
            onClick={() => this.setState({ openFullComment: !openFullComment })}
          >
            {openFullComment ? 'Скрыть' : 'Все комментарии'}
          </span>
        )}

        {openFullComment &&
          bid.comments
            .slice(0, -3)
            .map(comment => [
              <Comment
                key={comment.id + comment.user_id}
                bid={bid}
                comment={comment}
                dispatch={dispatch}
                user={user}
              />,
            ])}

        {bid.comments
          .slice(-3)
          .map(comment => [
            <Comment
              key={comment.id + comment.user_id}
              bid={bid}
              comment={comment}
              dispatch={dispatch}
              user={user}
            />,
          ])}
      </Col>
    )
  }

  renderBid = () => {
    const { bid, user } = this.props
    const { actions, openFullComment } = this.state

    const componentProps = {
      bid,
      user,
      onChangeState: this.onChangeState,
      renderComment: this.renderComment,
      toggleActions: this.toggleActions,
      onCloseActions: this.onCloseActions,
      onEdit: this.onEdit,
      actions,
      openFullComment,
    }

    switch (bid.service.name) {
      case 'Bring your own device':
        return <Byod {...componentProps} />
      case 'Оформление представительских расходов':
        return <Expenses {...componentProps} />
      case 'Проведение TeamBuilding':
        return <TeamBuilding {...componentProps} />
      default:
        return <Expenses {...componentProps} />
    }
  }

  render() {
    const { bid, loading } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: `Заявка ${bid && bid.id}`, active: true }]} />

            {loading ? <Loader /> : bid && this.renderBid()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Bid)
