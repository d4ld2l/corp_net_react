import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {connect} from 'react-redux';

const Wrapper = ({ children, className, shrCore }) => (
  <div className={className ? className.mix('container') : 'container'}>
    <Row>
      {shrCore ? (
        <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
          {children}
        </Col>
      ) : (
        <Col lg={12} md={12} sm={12} xs={12}>
          {children}
        </Col>
      )}
    </Row>
  </div>
);

const connector = connect(state => ({
  shrCore: state.system.enabledComponents.shr_core
}));

export default connector(Wrapper);
