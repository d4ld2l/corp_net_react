import React, { Component } from 'react';
import Loader from 'components-folder/Loader';
import Item from './Item';
import { cn } from './Container';
import * as ReactDOM from 'react-dom';
import { isEmpty } from 'lodash'

export default class Сonduct extends Component {
  componentDidUpdate() {
    this._assessmentsBlock = ReactDOM.findDOMNode(this._assessmentsBlock);
    const _assessmentsBlock = this._assessmentsBlock;

    if (_assessmentsBlock.clientHeight > 580) {
      _assessmentsBlock.classList.add('global-scroll');
      _assessmentsBlock.classList.add('global-scroll_theme_light');
    } else {
      _assessmentsBlock.classList.remove('global-scroll');
      _assessmentsBlock.classList.remove('global-scroll_theme_light');
    }
  }

  render() {
    const {
      assessment: { sessions, page, searchParams, filterParams },
      loaderAssessmentSessions,
    } = this.props;

    return (
      <ul
        className={cn('list').mix(cn('list_indent'))}
        ref={node => (this._assessmentsBlock = node)}>
        {loaderAssessmentSessions && page === 1 ? (
          <Loader />
        ) : (
          <div>
            {sessions.length > 0 ? (
              sessions.map((it, index) => (
                <Item
                  key={index}
                  emblem={it.logo.url}
                  id={it.id}
                  title={it.name}
                  status={it.kind}
                  count_competence={it.skills_count}
                  id_employee={it.account.id}
                  estimated_name={it.account.full_name}
                  creation_date={it.updated_at}
                  filterParams={filterParams}
                  due_date={it.due_date}
                />
              ))
            ) : (
              <div className={cn('search_no-result')}>
                <p className={'indent_reset'}>
                  {
                    isEmpty(searchParams.q) ?
                      'Нет доступных оценок' :
                      'По Вашему запросу ничего не найдено'
                  }
                </p>
              </div>
            )}
            {loaderAssessmentSessions && page !== 1 && <Loader />}
          </div>
        )}
      </ul>
    );
  }
}
