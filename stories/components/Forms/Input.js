import React from 'react'

import { storiesOf, configure } from '@storybook/react'
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs/react'
import { withNotes } from '@storybook/addon-notes'

import '../../../src/style/base.css'
import Input from 'components-folder/Input/'
import 'components-folder/Input/input.css'

const stories = storiesOf('Components/Form', module)
stories.addDecorator(withKnobs)
configure(Clipboard, module)

function Clipboard() {
  const copyText = document.getElementById('connect')
  copyText.select()
  document.execCommand('copy')
}

stories.add(
  'Input',
  withNotes('Поле ввода')(() => (
    <div>
      <div className={'stories__wrap'}>
      <h2>Поле ввода</h2>
      <div className={'stories__connect'}>
        <input
          type="text"
          value="import Input from 'components-folder/Input/'"
          id="connect"
          className={'stories__connect_input'}
        />
        <button className={'stories__connect_btn btn btn-outline btn-small'} onClick={Clipboard}>
          Копировать путь
        </button>
      </div>
    </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Внешний вид:</h3>
        <table>
          <tr>
            <td>
              <p className={'stories__description'}>Обычное состояние (дефолт)</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'test'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled={false}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p className={'stories__description'}>Ввод текста</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'test'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled={false}
                  value={'Text'}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p className={'stories__description'}>Ошибка</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'test'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled={false}
                  showError
                  errorText={'Текст ошибки'}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p className={'stories__description'}>Подсказка</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'test'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled={false}
                  value={'Text'}
                  showWink
                  winkText={'Текст подсказки'}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p className={'stories__description'}>Дизейбл</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'test'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled
                  value={'Text'}
                  showWink
                  winkText={'Текст подсказки'}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p className={'stories__description'}>Фокус</p>
            </td>
            <td>
              <div className={'stories__wrap_input'}>
                <Input
                  showLabel
                  labelText={'Лейбл'}
                  className={'input__focus'}
                  type={'text'}
                  name={'test_input'}
                  id={'test_input'}
                  disabled={false}
                  placeholder={'placeholder'}
                  meta={object('input',
                    {
                      touched: false,
                      error: false,
                      warning: false
                    }
                  )}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Описание свойств:</h3>
        <p>
          <strong>showLabel</strong> — показать label;
        </p>
        <p>
          <strong>labelText</strong> — задать текст label;
        </p>
        <p>
          <strong>toIndent</strong> — сделать отступ;
        </p>
        <p>
          <strong>className</strong> — задать дополнительный класс;
        </p>
        <p>
          <strong>style</strong> — задать стили через style;
        </p>
        <p>
          <strong>type</strong> — сообщает браузеру, к какому типу относится элемент формы;
        </p>
        <p>
          <strong>name</strong> — имя поля, предназначено для того, чтобы обработчик формы мог его
          идентифицировать;
        </p>
        <p>
          <strong>id</strong> — уникальный индетификатор;
        </p>
        <p>
          <strong>placeholder</strong> — выводит подсказывающий текст;
        </p>
        <p>
          <strong>disabled</strong> — блокирует доступ и изменение элемента;
        </p>
        <p>
          <strong>pattern</strong> — устанавливает шаблон ввода;
        </p>
        <p>
          <strong>required</strong> — обязательное для заполнения поле;
        </p>
        <p>
          <strong>value</strong> — значение элемента;
        </p>
        <p>
          <strong>alt</strong> — альтернативный текст для кнопки с изображением;
        </p>
        <p>
          <strong>showWink</strong> — показать подсказку для ввода;
        </p>
        <p>
          <strong>winkText</strong> — задать текст подсказки для ввода;
        </p>
        <p>
          <strong>showError</strong> — показать ошибку ввода;
        </p>
        <p>
          <strong>errorText</strong> — задать текст ошибки ввода.
        </p>
      </div>

      <div className={'stories__wrap'}>
        <h3 className={'stories_h3'}>Переходите во вкладку KNOBS, вносите изменения:</h3>
        <Input
          showLabel={boolean('showLabel', false)}
          labelText={text('label', 'label')}
          toIndent={text('toIndent', false)}
          className={text('className', 'input__focus')}
          style={object('style', { color: 'red' })}
          type={text('type', 'text')}
          name={text('name', 'test_input')}
          id={text('id', 'test_input')}
          placeholder={text('placeholder', 'placeholder')}
          disabled={boolean('disabled', false)}
          pattern={text('pattern', 'placeholder')}
          required={boolean('required', false)}
          showError={boolean('showError', false)}
          errorText={text('errorText', 'errorText')}
          showWink={boolean('showWink', false)}
          winkText={text('winkText', 'winkText')}
          meta={object('input',
            {
              touched: false,
              error: false,
              warning: false
            }
          )}
        />
      </div>
    </div>
  ))
)
