import React, { Component } from 'react'
import moment from 'moment'
import block from 'bem-cn'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {
  typeOfSalaryOptions,
  typeOfContractOptions,
  experienceOptions,
  typeOfEmploymentOptions,
  scheduleOptions,
} from '../VacancyNew/data'

if (process.env.BROWSER) {
  require('./style/VacancyInfo.css')
}

const cn = block('vacancy-info')

class VacancyInfo extends Component {
  formatSalary(salary = 0) {
    return salary.toFixed().replace(/(\d)(?=(\d{3})+(␣|$))/g, '$1 ')
  }

  render() {
    const { current, hiddenVacancyInfo } = this.props

    return (
      <div className={cn} hidden={hiddenVacancyInfo}>
        <div className={cn('description')}>
          {current.name && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>название вакансии</span>
              <p className={cn('value')}>{current.name}</p>
            </div>
          )}
          {current.positions_count && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>количество позиций</span>
              <p className={cn('value')}>{current.positions_count}</p>
            </div>
          )}
          {current.demands && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>Основные требования</span>
              <div className={cn('value')} dangerouslySetInnerHTML={{ __html: current.demands }} />
            </div>
          )}
          {current.duties && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>Основные обязанности</span>
              <div className={cn('value')} dangerouslySetInnerHTML={{ __html: current.duties }} />
            </div>
          )}

          {current.experience &&
           current.experience.length > 0 &&
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>опыт работы</span>

              <p className={cn('value')}>
                {current.experience
                  .map((e) => experienceOptions.find(el => el.value === e).label)
                  .join(', ')
                }
              </p>
            </div>
          }

          {current.schedule &&
           current.schedule.length > 0 &&
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>график работы</span>

              <p className={cn('value')}>
                {current.schedule
                  .map((e) => scheduleOptions.find(el => el.value === e).label)
                  .join(', ')
                }
              </p>
            </div>
          }

          {current.type_of_employment &&
           current.type_of_employment.length > 0 &&
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>тип занятости</span>

              <p className={cn('value')}>
                {current.type_of_employment
                  .map((e) => typeOfEmploymentOptions.find(el => el.value === e).label)
                  .join(', ')
                }
              </p>
            </div>
          }
          {current.type_of_salary && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>тип зарплаты</span>
              <p className={cn('value')}>
                <span>
                  {typeOfSalaryOptions.find(el => el.value === current.type_of_salary).label}
                </span>
              </p>
            </div>
          )}

          <div className={cn('element')}>
            <span className={cn('label').mix('p3 p3_theme_light')}>уровень зарплаты</span>
            <p className={cn('value')}>
              {`от ${this.formatSalary(current.level_of_salary_from)} - ${this.formatSalary(current.level_of_salary_to)}`}{' '}
              &#8381;
            </p>

            {current.show_salary && (
              <span className={cn('desc')}>
                Указывать уровень заработной платы при публикации вакансии
              </span>
            )}
          </div>

          <div className={cn('element')}>
            <span className={cn('label').mix('p3 p3_theme_light')}>вид договора</span>
            <p className={cn('value')}>
              {current.type_of_contract && (
                <span>
                  {typeOfContractOptions.find(el => el.value === current.type_of_contract).label}
                </span>
              )}
            </p>
          </div>
          {current.place_of_work && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>место работы / город / офис</span>
              <p className={cn('value')}>{current.place_of_work}</p>
            </div>
          )}
          {current.comment && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>комментарий</span>
              <p className={cn('value')} dangerouslySetInnerHTML={{ __html: current.comment }} />
            </div>
          )}
        </div>

        <div className={cn('details')}>
          <h2 className={cn('title')}>Детали заявки</h2>
          {current.creator && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>руководитель / контактное лицо</span>
              <p className={cn('link')}>
                { get(current, 'creator.name_surname') }
              </p>
            </div>
          )}
          {current.owner && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>рекрутер</span>
              <p className={cn('link')}>
                { get(current, 'owner.name_surname') }
              </p>
            </div>
          )}
          {(current.block || current.practice || current.project) && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>Подразделение, куда требуется новый сотрудник</span>
              <p className={cn('value')}>
                {current.block || ''} {current.practice || ''} {current.project || ''}
              </p>
            </div>
          )}
          {current.ends_at && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>желаемый срок исполнения</span>
              <p className={cn('value')}>{moment(current.ends_at).format('DD MMM YYYY')}</p>
            </div>
          )}
          {current.legal_unit && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>Юридическое лицо</span>
              <p className={cn('value')}>{current.legal_unit}</p>
            </div>
          )}
          { !isEmpty(current.account_vacancies) && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>сотрудники, принимающие участие в подборе</span>
              <div className={cn('employee')}>
                {current.account_vacancies.map( ({ account }) => {
                  return (
                    <div className={cn('employee-container').mix('indent_10')} key={account.id}>
                      <img
                        src={ get(account, 'photo.url', '/public/avatar.png') }
                        alt="avatar"
                        className={cn('avatar')}
                      />
                      <div className={''}>
                        <p className={cn('employee-name')}>{ get(account, 'name_surname')}</p>
                        <p className={cn('employee-position').mix('p2 p2_theme_light_second')}>
                          { get(account, 'position_name') }
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {(current.additional_tests || current.documents.length > 0) && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>дополнительные испытания</span>
              <p
                className={cn('text')}
                dangerouslySetInnerHTML={{ __html: current.additional_tests }}
              />
              {current.documents.map(doc => (
                <div className={cn('document')} key={doc.id}>
                  <a href={doc.file.url} download className={cn('document-title')}>
                    {doc.name}
                  </a>
                  {/*<p className={cn('document-text')}>{doc.extension}</p>*/}
                </div>
              ))}
            </div>
          )}
          {current.reason_for_opening && (
            <div className={cn('element')}>
              <span className={cn('label').mix('p3 p3_theme_light')}>причина открытия</span>
              <p
                className={cn('value')}
                dangerouslySetInnerHTML={{ __html: current.reason_for_opening }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default VacancyInfo
