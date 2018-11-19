import React from 'react'

if (process.env.BROWSER) {
  require('./LevelOfSalaryBootstrapInput.css')
}

import { Button, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const LevelOfSalaryBootstrapInput = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-horizontal">
    <Row>
      <Col xs={2}>
        <label
          htmlFor={input.name}
          className={`form-group__label ${touched && error ? 'form-group__label_error' : ''}`}
        >
          {label}
        </label>
      </Col>

      <Col xs={9}>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          className={`form-control${touched && error ? ' form-control_error' : ''}`}
          id={input.name}
        />
        {touched &&
          ((error && <span className="form-group__error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </Col>
    </Row>
  </div>
)

export default LevelOfSalaryBootstrapInput

{
  /* <div className="form-group">
  <label htmlFor={input.name}>{label}</label>
  <div>
    <input {...input} placeholder={placeholder} type={type} className="form-control" id={input.name} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div> */
}

{
  /* <Field
  id="level_of_salary_to"
  name="level_of_salary_to"
  component="input"
  type="text"
  className="form-control"
  normalize={onlyNumberNormalize}
/> */
}
