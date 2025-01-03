import React,{Component} from 'react';
import HeaderStaticBar from "../header-static-bar";
import './style.scss'
import {Row, Col} from "reactstrap";
import * as config from "../../../configs/constant";
import AOS from "aos";

class App extends Component {
  componentDidMount() {
    AOS.init();
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={'low-card-diet-wrapper'}>
        <HeaderStaticBar bannerURL={"/image-folder/Recipes-Banner.jpeg"} mainTitle={"The B-LOW Carb Diet"} subTitle={"WHAT YOU NEED TO KNOW!"}/>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0'}>
            <Col md={12}>
              <p className={'fr-font main-txt'}>HOW IT WORKS</p>
              <div className={'sub-txt-wrapper'}>
                <p>How a low carb lifestyle helps you lose fat…</p>
                <p>Our main objective here is to help you reduce the amount of carbohydrates you consume. Go at your own pace and enjoy the extensive collection of exclusive recipes that B-Low provides.</p>
                <p>Once this is done, everything else will fall into place – including health benefits, weight loss, mental stability and more.</p>
              </div>
            </Col>
          </Row>
          <Row className={'m-0 mt-5'}>
            <Col md={3} className={'mb-2 pl-0 mob-wrapper'} data-aos="zoom-in">
              <div className={'card-obj-v1'}>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"THE PERKS OF LOW-CARB"}</p>
                  <p className={'sub-txt'}>{"A BREAKDOWN OF THE BENEFITS YOU CAN RECEIVE ON A LOW-CARB DIET."}</p>
                </div>
              </div>
            </Col>
            <Col className={'green-box mb-2 mob-wrapper'} data-aos="zoom-in">
              <div className={'card-obj'}>
                <div className={'card-img-wrapper-v1'}>
                  <img className={'w-100'} src={"/image-folder/man-measuring-belly-and-waist-with-yellow-tape-PTT4DWX.jpg"} />
                </div>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"WEIGHT LOSS"}</p>
                  <p>{"Low-carb diets have shown to be effective in lowering body weight. Put simply, because your primary source of fuel would usually be carbohydrates (which you would now be consuming less of), your body is able to liberate fat from storage to use as energy instead. Furthermore, science has found that a low-carb diet can actually help you to lose weight faster than a low-fat diet. B-Low will help you slim down without punishing your sense of taste that is so vital for enjoying food and life."}</p>
                </div>
              </div>
            </Col>
            <Col className={'pink-box mb-2 mob-wrapper'} data-aos="zoom-in">
              <div className={'card-obj'}>
                <div className={'card-img-wrapper-v1'}>
                  <img className={'w-100'} src={"/image-folder/Cure-Diabetes.jpg"} />
                </div>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"DIABETES / BLOOD SUGAR"}</p>
                  <p>{"There is scientific evidence that a low-carb diet can improve glucose control in people with Type 2 diabetes. This is a very significant finding considering the link between high blood glucose and numerous other serious and ultimately preventable diseases. By improving insulin sensitivity and preventing insulin resistance, a low-carb diet can improve your metabolic fitness, which actually makes your body become more efficient at using and storing energy. (This is also key to the ability of a low-carb to maintain long-term weight loss!)"}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={'m-0 mt-2'}>
            <Col className={'purple-box mb-2 mob-wrapper'} data-aos="zoom-in">
              <div className={'card-obj'}>
                <div className={'card-img-wrapper-v1'}>
                  <img className={'w-100'} src={"/image-folder/melting-butter-hearts-6YQPRCS.jpg"} />
                </div>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"HEART DISEASE"}</p>
                  <p>{"Triglycerides and cholesterol are known factors affecting heart disease risk, and a low-carb diet has been shown to mitigate this risk. By lowering triglycerides as well as boosting protective HDL, or good cholesterol, a low-carb diet that consists of high-fat, unprocessed, real foods gives some control back to those concerned about a family history of heart disease, as well as those in higher-risk age groups."}</p>
                </div>
              </div>
            </Col>
            <Col className={'yellow-box mb-2 mob-wrapper'} data-aos="zoom-in">
              <div className={'card-obj'}>
                <div className={'card-img-wrapper-v1'}>
                  <img className={'w-100'} src={"/image-folder/B-low-Fertility.jpg"} />
                </div>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"HORMONES / FERTILITY"}</p>
                  <p>{"There is a complex interplay between weight, blood sugar, insulin and a symphony of other hormones that affect the way the body functions. Science indicates that a low-carb diet may improve fertility, particularly in women struggling with Polycystic-ovarian Syndrome (PCOS)."}</p>
                </div>
              </div>
            </Col>
            <Col md={3} className={'mb-2 '}>
              <div className={'card-obj-v1'}>
                <div className={'card-inner'}>
                  <p className={'fr-font'}>{"STILL CURIOUS?"}</p>
                  <p className={'sub-txt'}>{"CHECK OUT OUR FAQS"}</p>
                  <button className={'mt-3'} onClick={()=>this.props.history.push(`${config.BASE_ROUTE_PATH}${config.ROUTE_FAQ}`)}>Click here</button>
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
