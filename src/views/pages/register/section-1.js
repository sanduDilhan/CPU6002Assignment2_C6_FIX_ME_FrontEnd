import React,{Component} from 'react';
import {Col, Row} from "reactstrap";
import './style.scss';
import {CheckCircle} from "react-feather";

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className={'section-1-wrapper pb-5 pt-5'}>
        {/*<p className={'p1 fr-font'}>Congratulations on taking your first step towards a healthier you!</p>*/}
        <p className={'p2'}>We offer different pricing options to make it easy for anyone to come onboard. <br/>
          Please select the option that best suits you. </p>
        <p className={'p3 fr-font'}>B-LOW PLANS</p>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0'}>
            <Col md={6}>
              <div className={'weekly-plan weekly-1'}>
                <p className={'fr-font'}>WEEKLY PLAN</p>
                <div className={'inner-content'}>
                  <div className={'price'}>
                    <span>$</span>
                    <span>5</span>
                  </div>
                  <p className={'pb-2 desc'}>Introductory Prices Per Month</p>
                  <p className={'circle'}><CheckCircle /> 2 Week Free Trial</p>
                  <hr/>
                  <p className={'circle'}><CheckCircle /> Unrestricted access to B-Low exclusive recipes, meal plans, program support and more.</p>
                  <p className={'desc-s pt-2'}>Losing or maintaining weight has never been tastier!</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={'weekly-plan annual-1'}>
                <p className={'fr-font'}>ANNUAL PLAN</p>
                <div className={'inner-content'}>
                  <div className={'price'}>
                    <span>$</span>
                    <span>60</span>
                  </div>
                  <p className={'pb-2 desc'}>Introductory Prices Per Year</p>
                  <p className={'circle'}><CheckCircle /> 2 Week Free Trial</p>
                  <hr/>
                  <p className={'circle'}><CheckCircle /> Unrestricted access to B-Low exclusive recipes, meal plans, program support and more.</p>
                  <p className={'desc-s pt-2'}>Losing or maintaining weight has never been tastier!</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default App;
