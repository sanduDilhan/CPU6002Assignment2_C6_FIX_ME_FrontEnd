import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import './hover.scss';
import TopButtons from "./top-buttons";

class App extends Component {
  render() {
    return (
      <div className={'container pt-5 pb-5'}>
        <TopButtons activeIndex={0}/>
        <Row>

        </Row>
      </div>
    );
  }
}

export default App;
