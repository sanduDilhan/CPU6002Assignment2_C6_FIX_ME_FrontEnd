import React,{Component} from 'react';
import {Row, Col} from "reactstrap";
import bconPng from "../../../assets/img/logo/logo.png";
import {withRouter} from "react-router-dom";
import * as config from "../../../configs/constant";
import {ROUTE_LOW_CARB, ROUTE_MA_CARB_COUNTS, ROUTE_REGISTER} from "../../../configs/constant";

class App extends Component {
  render() {
    return (
      <div>
        <Row className={"layer-2-wrapper m-0"}>
          <Col md={6} className={'img-sec p-0'}>
            <img src={"/image-folder/Eating-Low-Carb.jpg"} alt={"."} className={"w-100"} />
          </Col>
          <Col md={6} className={"p-0 purple-sec"}>
            <div className={'f-main-wrapper '}>
              <p className={'f-title fr-font'}>Welcome to B-LOW</p>
              <p className={'mt-2 sub-title'} data-aos="fade-zoom-in">At B-LOW, we live and breathe all things low carb! We’ve done all the research and hard work for you, so that all you have to do is eat delicious food while reaping the benefits.</p>
              <p className={'mt-0 sub-title'} data-aos="fade-zoom-in">You won’t B-LEIVE what you can still eat living a low-carb lifestyle. We have put in tireless hours and test-tasted everything to replicate family favourites and convert them into low carb versions. This means you and your family enjoying all the meals you love absolutely guilt free. Think pizza, pastas, breads, casseroles and amazing desserts – yes, they are all available on B-LOW.</p>

              <button className={'mt-3'} onClick={()=>this.props.history.push(`${config.BASE_ROUTE_PATH}${config.ROUTE_REGISTER}`)}>Join Now</button>
            </div>
          </Col>
        </Row>
        <Row className={"layer-2-wrapper m-0"}>
          <Col md={6} className={"p-0 green-sec"}>
            <div className={'f-main-wrapper '}>
              <p className={'f-title fr-font '}>Enjoy Food</p>
              <p className={'mt-2 sub-title'} data-aos="fade-zoom-in">B-LOW equips you will all the tools and information to help you reach your wellness goals including weight loss, reduced cravings, increased mental stability, along with the possibility of warding off and even reversing Type 2 diabetes. Plus we cater for everyone – so no matter your age, weight, sex or health – B-LOW will work for you.</p>

              <button className={'mt-3'} onClick={()=>this.props.history.push(`${config.BASE_ROUTE_PATH}${config.ROUTE_LOW_CARB}`)}>Learn More</button>
            </div>
          </Col>
          <Col md={6} className={'img-sec p-0'}>
            <img src={"/image-folder/Homepage-group.jpeg"} alt={"."} className={"w-100"} />
          </Col>
        </Row>
      </div>

    );
  }
}
// data-aos-easing="ease-in-back" data-aos-delay="50"
export default withRouter(App);
