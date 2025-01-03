import React,{Component} from 'react';
import {Col, Row} from "reactstrap";
import {Check} from "react-feather";

class App extends Component {
  render() {
    return (
      <div>
        <Row className={"layer-6-wrapper m-0 mb-0"}>
          <Col md={6} >
            <div className={'pink-wrapper'}>
              <img src={"/image-folder/B-Low-Benefits.jpeg"} className={'w-100'} />
            </div>
          </Col>
          <Col md={6} className={'right-sections-wrapper'} >
            <div className={'right-sections'}>
              <p className={'fr-font'}>SAY GOODBYE TO <br/> PRE-PACKAGED FOOD</p>
              <p className={'fr-font'}>and say hello to flavoursome, fresh food prepared by you!</p>
            </div>
            <div className={'tick-texts mt-3'}>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Massive variety of foods and flavours</p></div>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Fresh and tasty ingredients</p></div>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Eat the food you love</p></div>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Create meals that can feed the whole family (that they will actually enjoy!)</p></div>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Modify recipes to fit your tastes and needs</p></div>
              <div className={'d-flex'} data-aos="slide-left"><Check size={46}/> <p>Improve your cooking skills – as we teach you the tricks of the trade along the way!</p></div>
            </div>

          </Col>
        </Row>
      </div>
    );
  }
}
export default App;
